[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/KRLE_tfD)
# Project Title: CSGO Case Simulator
Team Members: Mark Lin, Harris Chong

## Description of web application
This web application will simulate the case opening feature from the game CSGO/CS2. Users can make an account and the items will be stored in their account. It will also include a social media-like ecosystem where users can interact, add each other, view each others items, etc.

Example of an existing case simulator: https://convars.com/en

## Key features that will be completed by the Beta version
1. At least 3 cases that can be opened
   - Get item information from Steam marketplace api
2. Database of multiple users that can sign up and store things
   - Users have an inventory that can store all opened items
   - Users have a customizable profile that can display user data
3. Users can trade items with one another
   - Can go to a user's profile and send a direct trade request
   - Or can post a trade request on a trade tab/forum for other users to see

## Additional features that will be completed by the Final version
1. Leaderboard to compare users based on total inventory price
   - You can view other user's profiles on the leaderboard
2. Add more cases if we have time
3. Ability to add other users and chat with them in real-time
4. Realtime user betting
   - Users can bet skins in a coinflip battle against another user in real-time
5. Implement trade-ups for skins
   - Exchange 10 skins of the same rarity up to a skin of the next rarity

## Technology Stack
- React
- Express
- GraphQL
- Three.js (Maybe)
- togetherjs

## 5 Technical Challenges
- Figuring out how to do the case spin animation/figure out how to possibly display 3-D renders of a case/weapon
- Implementing the GraphQL Database
- Learning how to use React for the frontend
- Using existing API for the correct item info needed
- Web RTC for the realtime betting battles and user messaging
