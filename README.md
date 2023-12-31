# Gamba

## Project URL

**Task:** Provide the link to your deployed application. Please make sure the link works. 

http://gambacase.me/

## Project Video URL 

**Task:** Provide the link to your youtube video. Please make sure the link works. 

https://www.youtube.com/watch?v=sH6VVQ8WDgo

## Project Description

**Task:** Provide a detailed description of your app

This app is an all-encompassing CS:GO case simulator where you don't have to spend money. The main feature is a case-opening feature with six different cases to choose from, each having a different set of weapons. The weapons unboxed are stored in the user's inventory and each weapon item has its own price value. Each user also has a 'score' which is based on the total price of the weapons in their inventory. Users can view all owned weapons in their inventory, as well as other user's inventories on the leaderboard page, which is based on the highest inventory prices where you can compare and rank yourself among all of the other top users. Other prominent features included from the original CS:GO game include contract trade-ups where you can trade up 10 of the same rarity weapons in exchange for one weapon of the next rarity above, and a trading system between users, where you can send and accept trade requests to other users just like you can in Steam. 

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. 

**Frontend:** 

Our frontend is built on the React framework Next.js, leveraging the newly introduced app router in version 13. The design and layout are structured around Next.js's app router, enabling us to define routes and components seamlessly. The codebase primarily involves standard elements such as JavaScript and CSS files, and the integration of React hooks like useEffect and useState. Dynamic routes for the inventory page are implemented using Next.js app router, with page routes composed of reusable components like the header and inventory components. Page navigation is facilitated through the useRouter and Link libraries from Next.js.

The adoption of GraphQL as our data query language prompted the utilization of Apollo Client for state management. Apollo Client, a JavaScript library, is integrated with Next.js through Apollo Provider, allowing us to manage data with GraphQL efficiently. The Apollo Client is placed in the context via Apollo Provider, ensuring accessibility throughout the component tree. This setup empowers us to seamlessly execute queries and mutations in the frontend, with automatic UI updates.

**Backend:**

Our backend architecture is structured around Express, GraphQL, and MongoDB. The server utilizes the graphqlHTTP library from express-graphql to create an Express server running a GraphQL API. MongoDB serves as the database, with connectivity established and models defined using Mongoose. In the GraphQL API, queries and mutations are defined with specific object types, allowing interaction with the database. The Mongoose models are supplied with arguments and fields from the defined object types in the schema, allowing modification of the database, including additions, removals, and updates. Security measures are implemented for user account details, utilizing bcrypt for salt and hash procedures. 

## Deployment

**Task:** Explain how you have deployed your application. 

We have a client and server dockerfile which we used to build images on our Google Cloud VM. We imported our code to the VM by pulling from the GitHub repo. The dockerfiles when run would copy the necessary files and then create images that would be used to create the containers. After running docker build on our dockerfiles, we used docker run on our images to start our dockerized containers for client and server. The client and server run in separate Docker containers so we had to make sure that cors was properly implemented so that they could communicate with one another. Now we have client running on port 80:3000 on our VM and server running on port 8080:8080. Finally we routed our domain, gambacase.me, to our VM.

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for your app? Please restrict your answer to only three items. 

1. Learning the concept of GraphQL itself vs the traditional REST API done in class was challenging,  as well as learning how to create a type system to define our data types/input types using GraphQL. Creating a schema to define queries/mutations was also challenging as it involved integration with the database to modify the contents in the database, such as using the query language to define how to access/modify data from our database.
2. Updating the UI in real-time to changes done elsewhere/rendering things in the frontend responsively was important to learn/develop for the user experience, and learning about state management through Apollo Client as well as learning more in-depth about React hooks like useEffect, useState, and refetching queries with Apollo Client.
3. The main feature of the site which is the case spinning was challenging to develop the scrolling animation, as well as implementing variance and probability based on the real-life percentages to mimic the real game, from everything to the weapon drop chances and the variance in rarity, condition, etc. 

## Contributions

**Task:** Describe the contribution of each team member to the project. Please provide the full name of each team member (but no student number). 

**Harris Chong:**

Worked on mostly backend things including the server setup, mongoDB models/setup, GraphQL types and schema, and frontend components that utilized GraphQL queries/mutations like Inventory, Contracts, Leaderboard and User Trading.

**Mark Lin:**

Worked on the main case spin feature, also worked on Inventory, Contracts, Leaderboard, User Trading, Styling, and Deployment (Dockerfiles, Google Cloud VM Setup, etc).

# One more thing? 

**Task:** Any additional comment you want to share with the course staff? 

We hope the marking is a just *little* bit lenient as a large majority of features implemented/developed were new technologies that had to be learned from scratch and not really from any materials in lectures. It was definitely fun and was a great experience to learn and develop skills useful on our resumes, but at the same time even with a month, also very hard to manage learning/implementing new things from scratch with a very busy school schedule all year round. Overall C09 is probably one of the most useful courses we'll take in our degree and we learned lots :).
