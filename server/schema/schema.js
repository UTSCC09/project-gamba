const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull} = require('graphql');
import { compare, genSalt, hash } from "bcrypt";

// Mongoose models
const User = require('../models/User');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        username: {type: GraphQLString},
        password: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({});
            }
        },
        user: {
            type: UserType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args){
                return User.findById(args.id);
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
                username: {type: GraphQLNonNull(GraphQLString)},
                password: {type: GraphQLNonNull(GraphQLString)}
            },

            resolve(parent, args){
                genSalt(10, function(err, salt) {
                    hash(args.password, salt, function(err, hash) {
                        const user = new User({
                            username: args.username,
                            password: args.password
                        });
                        return user.save();
                    });
                  });
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return User.findByIdAndDelete(args.id);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})