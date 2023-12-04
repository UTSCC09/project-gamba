const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLFloat, GraphQLInputObjectType } = require('graphql');
const { genSalt, hash } = require("bcrypt");
const bcrypt = require('bcryptjs');
const { serialize } = require("cookie");

// Mongoose models
const User = require('../models/User');
const Item = require('../models/Item');
const Trade = require('../models/Trade');
const Session = require('../models/Session');

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
        trades: { type: GraphQLList(TradeType) },
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

const SessionQuery = new GraphQLObjectType({
    name: 'SessionQuery',
    fields: {
        getSessionUser: {
            type: UserType,
            resolve(parent, args, { req }) {
                return req.session.user;

            }
        }
    }
});

// Middleware for authorization
const requireAuth = async (context) => {
    const sessionData = await Session.findOne({ _id: context.req.session.id });

    if (!sessionData.session) {
        throw new Error('Unauthorized');
    }
};

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            args: {
                page: { type: GraphQLInt, defaultValue: 1 },
                limit: { type: GraphQLInt, defaultValue: 10 },
            },
            resolve(parent, args, context) {
                requireAuth(context);
                const skip = (args.page - 1) * args.limit;
                const limit = args.limit;
                return User.find({}).sort({ total_price: -1 }).skip(skip).limit(limit);
            }
        },
        user: {
            type: UserType,
            args: {
                username: { type: GraphQLString }
            },
            resolve(parent, args, context) {
                requireAuth(context);
                return User.findOne({ username: args.username });
            }
        },
        session: {
            type: SessionQuery,
            resolve: (parent, args, context) => {
                return {};
            }

        }
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
                        req.session.user = user;
                        req.session.save();
                        res.setHeader(
                            "Set-Cookie",
                            serialize("username", user.username, {
                                path: "/",
                                maxAge: 60 * 60 * 24 * 7,
                            }),
                        );

                        return user;
                    }

                }
                return false;
            }
        },
        signout: {
            type: UserType,
            resolve(parent, args, { req, res }) {
                req.session.destroy();
                res.setHeader(
                    "Set-Cookie",
                    serialize("username", "", {
                        path: "/",
                        maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
                    }),
                );
                return true;
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
            async resolve(parent, args, context) {
                //requireAuth(context);
                if (args.username !== context.req.session.user.username) {
                    throw new Error('Unauthorized: User in argument does not match session user');
                }
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
            async resolve(parent, args, context) {
                //requireAuth(context);
                if (args.sender !== context.req.session.user.username) {
                    throw new Error('Unauthorized: User in argument does not match session user');
                }
                const user = await User.findOne({ username: args.username });
                if (user) {
                    const trade = new Trade({
                        sender: args.sender,
                        offer: args.receive,
                        receive: args.offer,
                    });
                    user.trades.push(trade);

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
                offer: { type: GraphQLList(ItemInputType) },
                receive: { type: GraphQLList(ItemInputType) },
                action: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args, context) {
                requireAuth(context);
                if (args.user !== context.req.session.user.username) {
                    throw new Error('Unauthorized: User in argument does not match session user');
                }
                const user = await User.findOne({ username: args.user });
                const other_user = await User.findOne({ username: args.other_user });

                if (!user || !other_user) {
                    throw new Error('User not found');
                }

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
                            const item_index = other_user.inventory.findIndex((inventory_item) => {
                                return (
                                    inventory_item.weaponName === item.weaponName &&
                                    inventory_item.skinName === item.skinName &&
                                    inventory_item.quality === item.quality
                                )
                            });

                            if (item_index === -1) {
                                other_user.inventory.push(item);
                            } else {
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
        tradeUp: {
            type: UserType,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                item: { type: GraphQLNonNull(ItemInputType) },
                removeItems: { type: GraphQLList(ItemInputType) },
            },
            async resolve(parent, args, context) {
                //requireAuth(context);
                if (args.username !== context.req.session.user.username) {
                    throw new Error('Unauthorized: User in argument does not match session user');
                }

                const user = await User.findOne({ username: args.username });
                if (user) {
                    user.total_price += args.item.price;
                    const gunIndex = user.inventory.findIndex((item) =>
                        item.weaponName === args.item.weaponName &&
                        item.skinName === args.item.skinName &&
                        item.quality === args.item.quality
                    );
                    if (gunIndex != -1) {
                        const item = new Item({
                            weaponName: args.item.weaponName,
                            skinName: args.item.skinName,
                            quality: args.item.quality,
                            price: args.item.price,
                            quantity: user.inventory[gunIndex].quantity + 1,
                            rarity: args.item.rarity,
                            image: args.item.image,
                            case: args.item.case
                        });
                        user.inventory[gunIndex] = item;
                    }
                    else {
                        const item = new Item({
                            weaponName: args.item.weaponName,
                            skinName: args.item.skinName,
                            quality: args.item.quality,
                            price: args.item.price,
                            quantity: 1,
                            rarity: args.item.rarity,
                            image: args.item.image,
                            case: args.item.case
                        });
                        user.inventory.push(item);
                    }
                    args.removeItems.forEach((rmItem) => {
                        const itemIndex = user.inventory.findIndex((inventory_item) => {
                            return (
                                inventory_item.weaponName === rmItem.weaponName &&
                                inventory_item.skinName === rmItem.skinName &&
                                inventory_item.quality === rmItem.quality
                            )
                        });

                        if (itemIndex === -1) {
                            throw new Error('Item not found');
                        } else {
                            if (user.inventory[itemIndex].quantity > 1) {
                                const newitem = new Item({
                                    weaponName: rmItem.weaponName,
                                    skinName: rmItem.skinName,
                                    quality: rmItem.quality,
                                    price: rmItem.price,
                                    quantity: user.inventory[itemIndex].quantity - 1,
                                    rarity: rmItem.rarity,
                                    image: rmItem.image,
                                    case: rmItem.case
                                });
                                user.inventory[itemIndex] = newitem;
                            } else {
                                user.inventory.splice(itemIndex, 1);
                            }
                        }
                    })

                    await user.save();
                    return user;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})