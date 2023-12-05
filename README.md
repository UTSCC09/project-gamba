# Gamba

## Project URL

**Task:** Provide the link to your deployed application. Please make sure the link works. 

http://gambacase.me/

## Project Video URL 

**Task:** Provide the link to your youtube video. Please make sure the link works. 

## Project Description

**Task:** Provide a detailed description of your app

This app is an all-encompassing CS:GO case simulator. The main feature is a case-opening feature with 6 different cases to choose from, where the weapons are stored in the user's inventory. Each weapon item has it's own price value, and each user has a 'score' which is based off the total price of their inventory. Users can view all their weapons in their inventory, as well as other user's inventories on the leaderboard page based on the highest inventory prices where you can compare and rank yourself among all of the other top users. Other prominent features included from CS:GO include contract trade-ups where you can trade up 10 of the same rarity weapons in exchange for one weapon of the next rarity above, and a trading system between users, where you can send and accept trade requests to other users just like you can in Steam. 

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. 

Frontend: 

We are using the React framework Nextjs. Specifically, the code design/layout uses Nextjs's app router which was newly introduced in version 13 and allows us to define routes and components. Most of the frontend consists of the basic things we used in class like Javascript and CSS files, and React hooks such as useEffect and useState. We implemented dynamic routes for the inventory page based on the specific user using the Nextjs app router, and most of the page routes consist of components that can be reused in other pages (things like the header component and inventory component which are reused multiple times). Page navigation was done using the useRouter and Link libraries from Nextjs. Because we are using GraphQL which we will talk about more later, we use Apollo Client which is a state management library for JavaScript that allows us to manage data with GraphQL. We then use Apollo provider to wrap our Nextjs App and place the Apollo Client on the context so we can access it anywhere in our component tree. With Apollo Client, we can call queries and mutations in the Frontend and update the UI automatically.

Backend: 

For the backend we are using Express, GraphQL, and MongoDB. For our server we use the library graphqlHTTP from express-graphql which creates an express server that runs a GraphQL API which we've written. For our database we used MongoDB, we connect to the database and create models via mongoose. In our GraphQL API, we define queries and mutations with defined object types. We can provide the mongoose models with arguments/fields from the defined object types in our schema to modify the database (add/remove/update the database). We used the salt and hash from bcrypt for the account details and MongoStore to store the session in mongodb as well as express-session isn't compatible in production. 

## Deployment

**Task:** Explain how you have deployed your application. 

We have a client and server dockerfile which we build images in a google cloud vm instance after pulling our code from the GitHub repository. After running docker build, we run docker run which runs a new container that pulls the images created. Similar to the lab in class, we now have the client running locally in the vm in a container, and the server also running locally in the vm in a different container. 

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for your app? Please restrict your answer to only three items. 

1. Learning the concept of GraphQL itself vs the traditional REST API , using a type system to define our data types/input types, creating schema to define queries/ mutations, and using the query language to define how to access/modify data from our database.
2. Updating the UI in realtime according to changes done elsewhere/rendering things in the frontend appropriately, learning about state management through Apollo Client, learning more in-depth about React hooks like useEffect and useState, refetching queries with Apollo Client.
3. The main feature of the site which is the case spinning was challenging to develop the scrolling animation, as well as implementing variance and probability based on the real-life percentages to mimic the real game, from everything to the weapon drop chances and the variance in rarity, condition, etc. 

## Contributions

**Task:** Describe the contribution of each team member to the project. Please provide the full name of each team member (but no student number). 

Harris Chong: 

Worked on mostly backend things including the server setup, mongoDB models/setup, GraphQL types and schema, and frontend components that utilized GraphQL queries/mutations like Inventory, Contracts, Leaderboard and User Trading.

Mark Lin:

Worked on the main case spin feature, also worked on Inventory, Contracts, Leaderboard, User Trading, Styling, and Deployment (Dockerfiles, Google Cloud VM Setup, etc).

# One more thing? 

**Task:** Any additional comment you want to share with the course staff? 

We hope the marking is a just *little* bit lenient as a large majority of features implemented/developed were new technologies that had to be learned from scratch and not really from any materials in lectures. It was definitely fun and was a great experience to learn and develop skills useful on our resumes, but at the same time even with a month, also very hard to manage learning/implementing new things from scratch with a very busy school schedule all year round. Overall C09 is probably one of the most useful courses we'll take in our degree and we learned lots :).
