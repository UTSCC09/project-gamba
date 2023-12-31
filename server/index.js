const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8080;
const MongoStore = require('connect-mongo');

const app = express();

// Connect to database
connectDB();

app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND,
    }));

app.use(cookieParser());
app.set("trust proxy", 1);

// Configure sessions
app.use(
    '/graphql',
    session({
        secret: "please change this secret",
        resave: false,
        saveUninitialized: true,
        name: 'AppCookie',
        cookie: {
        },
    })
);

app.use(
    '/graphql', 
    (req,res) => {
        return graphqlHTTP({
            schema,
            graphiql: process.env.NODE_ENV === 'development' ? true : false,
            context: { req, res},
        })(req, res);
    }
    
);

app.listen(port, console.log(`Server running on port ${port}`));