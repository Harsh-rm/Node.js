# NASA Launch Project #
- This project is a version of the NASA Mission Control project from the Complete Node.js Developer: Zero to Mastery course on Udemy.
- The front end is a **React-clone** which can be found under the client folder of the project.
- The user interface is built using the **Arwes** web framework which provides futuristic science fiction designs, animation and sound effects. It tries to inspire advanced science and technology.
- The front end makes requests to the server through the *express API* on *Node.js runtime* hosted on your local machine.
- The server is connected to the *MongoDB* database hosted on the cloud using the Node.js *Mongoose* package following the MVC Pattern.

## Getting Started ##
- - - -
1. Ensure you have Node.js installed.
2. Create a free Mongo Atlas database online or start a local MongoDB database.
3. Create a `server/.env` file with a `MONGO_URL` property set to your MongoDB connection string.
4. In the terminal, run: `npm install`

## Getting Started ##
- - - -
1. In the terminal, run: npm run deploy
2. Browse to the mission control frontend at [localhost:8000] and schedule an interstellar launch!

## Running Tests ##
- - - -
To run any automated tests, `run npm test`. This will:

1. Run all the client-side tests: `npm test --prefix client`
2. Run all the server-side tests: `npm test --prefix server`
