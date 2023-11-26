const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLFloat, GraphQLInputObjectType } = require('graphql');
const { compare, genSalt, hash } = require("bcrypt");
const bcrypt = require('bcryptjs');

// Mongoose models
const User = require('../models/User');
const Item = require('../models/Item');
const Trade = require('../models/Trade');

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        weaponName: { type: GraphQLString },
        skinName: { type: GraphQLString },
        quality: { type: GraphQLString },
        price: { type: GraphQLFloat },
        quantity: { type: GraphQLInt },
        rarity: { type: GraphQLString },
        image: { type: GraphQLString },
        case: { type: GraphQLString },
    })
})

const ItemInputType = new GraphQLInputObjectType({
    name: 'ItemInput',
    fields: () => ({
        weaponName: { type: GraphQLString },
        skinName: { type: GraphQLString },
        quality: { type: GraphQLString },
        price: { type: GraphQLFloat },
        quantity: { type: GraphQLInt },
        rarity: { type: GraphQLString },
        image: { type: GraphQLString },
        case: { type: GraphQLString },
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        total_price: { type: GraphQLFloat },
        inventory: { type: GraphQLList(ItemType) },
        status: { type: GraphQLBoolean },
        friends: { type: GraphQLList(GraphQLID) },
        trades: { type: GraphQLList(TradeType) }, // New field for trades
    }),
});

const TradeType = new GraphQLObjectType({
    name: 'Trade',
    fields: () => ({
        id: { type: GraphQLID },
        sender: { type: GraphQLString },
        offer: { type: GraphQLList(ItemType) },
        receive: { type: GraphQLList(ItemType) },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({}).sort({ total_price: -1 }); //add max and possibly pagination
            }
        },
        user: {
            type: UserType,
            args: {
                username: { type: GraphQLString }
            },
            resolve(parent, args) {
                return User.findOne({ username: args.username });
            }
        },
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },

            resolve(parent, args) {
                genSalt(10, function (err, salt) {
                    hash(args.password, salt, function (err, hash) {
                        //user with default values
                        const user = new User({
                            username: args.username,
                            password: hash,
                            total_price: 0,
                            inventory: [],
                            status: false,
                            friends: [],
                            trades: [],
                        });
                        return user.save()
                    });
                });
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return User.findByIdAndDelete(args.id);
            }
        },
        login: {
            type: UserType,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args, { req, res }) {
                const user = await User.findOne({ username: args.username });
                if (user) {
                    const match = await bcrypt.compare(args.password, user.password);

                    if (match) {
                        console.log("User signed in");
                        // req.session.user = user;
                        // req.session.save()
                        // res.cookie('username', user.username, {
                        //     maxAge: 60 * 60 * 24 * 7,
                        //     httpOnly: false
                        // });
                        console.log(user)
                        return user;
                    }

                }
                console.log("User not found")
                return false;
            }
        },
        addItem: {
            type: UserType,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                weaponName: { type: GraphQLNonNull(GraphQLString) },
                skinName: { type: GraphQLNonNull(GraphQLString) },
                quality: { type: GraphQLNonNull(GraphQLString) },
                price: { type: GraphQLNonNull(GraphQLFloat) },
                rarity: { type: GraphQLNonNull(GraphQLString) },
                image: { type: GraphQLNonNull(GraphQLString) },
                case: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                const user = await User.findOne({ username: args.username });
                if (user) {
                    user.total_price += args.price;
                    const gunIndex = user.inventory.findIndex((item) =>
                        item.weaponName === args.weaponName &&
                        item.skinName === args.skinName &&
                        item.quality === args.quality
                    );
                    if (gunIndex != -1) {
                        // If the item already exists in the inventory, update the quantity
                        const item = new Item({
                            weaponName: args.weaponName,
                            skinName: args.skinName,
                            quality: args.quality,
                            price: args.price,
                            quantity: user.inventory[gunIndex].quantity + 1,
                            rarity: args.rarity,
                            image: args.image,
                            case: args.case
                        });
                        user.inventory[gunIndex] = item;
                    }
                    else {
                        const item = new Item({
                            weaponName: args.weaponName,
                            skinName: args.skinName,
                            quality: args.quality,
                            price: args.price,
                            quantity: 1,
                            rarity: args.rarity,
                            image: args.image,
                            case: args.case
                        });
                        user.inventory.push(item);
                    }
                    // Save the user with the updated inventory
                    await user.save();
                    return user;
                }
            }
        },
        addTrade: {
            type: UserType,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                sender: { type: GraphQLNonNull(GraphQLString) },
                offer: { type: GraphQLList(ItemInputType) },
                receive: { type: GraphQLList(ItemInputType) },
            },
            async resolve(parent, args) {
                const user = await User.findOne({ username: args.username });
                if (user) {
                    // Assuming you want to create a new trade document
                    const trade = new Trade({
                        sender: args.sender,
                        offer: args.receive,
                        receive: args.offer,
                    });

                    // Add the trade to the user's trades array
                    user.trades.push(trade);

                    // Save the user with the updated trades
                    await user.save();

                    return user;
                }
            }
        },
        resolveTrade: {
            type: UserType,
            args: {
                user: { type: GraphQLNonNull(GraphQLString) },
                other_user: { type: GraphQLNonNull(GraphQLString) },
                offer: { type: GraphQLList(ItemInputType) }, // Items offered in the trade
                receive: { type: GraphQLList(ItemInputType) }, // Items expected to receive in the trade
                action: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                const user = await User.findOne({ username: args.user });
                const other_user = await User.findOne({ username: args.other_user });

                if (!user || !other_user) {
                    throw new Error('User not found');
                }

                // Function to compare arrays of objects
                function arraysOfObjectsEqual(arr1, arr2) {
                    if (arr1.length !== arr2.length) {
                        return false;
                    }

                    for (let i = 0; i < arr1.length; i++) {
                        const obj1 = arr1[i];
                        const obj2 = arr2[i];

                        // Assuming the objects have the same set of properties
                        const keys1 = Object.keys(obj1);
                        const keys2 = Object.keys(obj2);

                        if (keys1.length !== keys2.length || !keys1.every(key => keys2.includes(key))) {
                            return false;
                        }

                        if (!keys1.every(key => obj1[key] === obj2[key])) {
                            return false;
                        }
                    }

                    return true;
                }

                if (user && other_user) {
                    const trade_index = user.trades.findIndex((trade) => {
                        return (
                            arraysOfObjectsEqual(trade.offer, args.offer) &&
                            arraysOfObjectsEqual(trade.receive, args.receive)
                        );
                    })

                    if (trade_index === -1) {
                        throw new Error('Trade not found');
                    }

                    if (args.action === 'accept') {
                        for (const item of args.receive) {
                            // Add the receive items to the user's inventory
                            const item_index = user.inventory.findIndex((inventory_item) => {
                                return (
                                    inventory_item.weaponName === item.weaponName &&
                                    inventory_item.skinName === item.skinName &&
                                    inventory_item.quality === item.quality
                                )
                            });

                            if (item_index === -1) {
                                // If the item doesn't exist in the user's inventory, add it
                                user.inventory.push(item);
                            } else {
                                // Otherwise, update the quantity
                                const newitem = new Item({
                                    weaponName: item.weaponName,
                                    skinName: item.skinName,
                                    quality: item.quality,
                                    price: item.price,
                                    quantity: user.inventory[item_index].quantity + 1,
                                    rarity: item.rarity,
                                    image: item.image,
                                    case: item.case
                                });
                                user.inventory[item_index] = newitem;
                            }

                            // Remove the receive items from the other user's inventory
                            const other_item_index = other_user.inventory.findIndex((inventory_item) => {
                                return (
                                    inventory_item.weaponName === item.weaponName &&
                                    inventory_item.skinName === item.skinName &&
                                    inventory_item.quality === item.quality
                                )
                            });

                            if (other_item_index === -1) {
                                throw new Error('Item not found');
                            } else {
                                if (other_user.inventory[other_item_index].quantity > 1) {
                                    const newitem = new Item({
                                        weaponName: item.weaponName,
                                        skinName: item.skinName,
                                        quality: item.quality,
                                        price: item.price,
                                        quantity: other_user.inventory[other_item_index].quantity - 1,
                                        rarity: item.rarity,
                                        image: item.image,
                                        case: item.case
                                    });
                                    other_user.inventory[other_item_index] = newitem;
                                } else {
                                    other_user.inventory.splice(other_item_index, 1);
                                }
                            }
                        }

                        for (const item of args.offer) {
                            // Remove the offer items from the other user's inventory
                            const item_index = other_user.inventory.findIndex((inventory_item) => {
                                return (
                                    inventory_item.weaponName === item.weaponName &&
                                    inventory_item.skinName === item.skinName &&
                                    inventory_item.quality === item.quality
                                )
                            });

                            if (item_index === -1) {
                                // If the item doesn't exist in the user's inventory, add it
                                other_user.inventory.push(item);
                            } else {
                                // Otherwise, update the quantity
                                const newitem = new Item({
                                    weaponName: item.weaponName,
                                    skinName: item.skinName,
                                    quality: item.quality,
                                    price: item.price,
                                    quantity: other_user.inventory[item_index].quantity + 1,
                                    rarity: item.rarity,
                                    image: item.image,
                                    case: Item.case
                                });
                                other_user.inventory[item_index] = newitem;
                            }

                            // Remove the offer items from the user's inventory
                            const other_item_index = user.inventory.findIndex((inventory_item) => {
                                return (
                                    inventory_item.weaponName === item.weaponName &&
                                    inventory_item.skinName === item.skinName &&
                                    inventory_item.quality === item.quality
                                )
                            });

                            if (other_item_index === -1) {
                                throw new Error('Item not found');
                            } else {
                                if (user.inventory[other_item_index].quantity > 1) {
                                    const newitem = new Item({
                                        weaponName: item.weaponName,
                                        skinName: item.skinName,
                                        quality: item.quality,
                                        price: item.price,
                                        quantity: user.inventory[other_item_index].quantity - 1,
                                        rarity: item.rarity,
                                        image: item.image,
                                        case: item.case
                                    });
                                    user.inventory[other_item_index] = newitem;
                                } else {
                                    user.inventory.splice(other_item_index, 1);
                                }
                            }
                        }
                    }
                    user.trades.splice(trade_index, 1);


                    await user.save();
                    await other_user.save();

                    return user;
                }
            },
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})