const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');
const { compare, genSalt, hash } = require("bcrypt");
const bcrypt = require('bcryptjs');

// Mongoose models
const User = require('../models/User');
const Item = require('../models/Item');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        total_price: { type: GraphQLInt },
        inventory: { type: GraphQLList(ItemType) },
        status: { type: GraphQLBoolean },
        friends: { type: GraphQLList(GraphQLID) }
    })
});

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        weaponName: { type: GraphQLString },
        skinName: { type: GraphQLString },
        quality: { type: GraphQLString },
        price: { type: GraphQLInt },
        quantity: { type: GraphQLInt }
    })
})


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
                            friends: []
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
                price: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                const user = User.findOne({ username: args.username });
                if (user) {
                    const gun = user.collection('inventory').find({
                        weaponName: args.weaponName, skinName: args.skinName, quality: args.quality});
                    if (gun) {
                        user.collection('inventory').updateOne(
                            { weaponName: gun.weaponName, skinName: gun.skinName, quality: gun.quality },
                            { $set: { "quantity": gun.quantity++ } }
                        );
                    }
                    else {
                        const item = new Item({
                            weaponName: args.weaponName,
                            skinName: args.skinName,
                            quality: args.quality,
                            price: args.price,
                            quantity: 1
                        });
                        user.inventory.push(item);
                        user.save();
                    }
                }
            }
        },
    }
});





module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})