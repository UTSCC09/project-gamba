const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;

const app = express();

// Connect to database
connectDB();

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    }));
    
app.use(cookieParser());

// Configure sessions
app.use(
    '/graphql',
    session({
        secret: "please change this secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            //httpOnly: true, // Set the HttpOnly flag
            //secure: true, // Set the Secure flag
            //sameSite: 'Strict', // Set the SameSite flag to 'Lax'
        }
    })
);

app.use(
    '/graphql', 
    (req,res) => {
        return graphqlHTTP({
            schema,
            graphiql: process.env.NODE_ENV === 'development',
            context: { req, res},
        })(req, res);
    }
    
);

app.listen(port, console.log(`Server running on port ${port}`));