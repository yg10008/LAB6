const express = require('express');
const app = express();
const connectDB = require('./config/database');
const taskRouter = require('./router/taskRouter');
app.use(express.json());


connectDB()
    .then(() => {
        console.log("CONNECTION_TO_DATABASE_IS_SUCCESSFULLY_ESTABLISHED");

        app.use(taskRouter);
        
        app.listen(108, () => {
            console.log("SERVER_UP_108");
        });
    })
    .catch((err) => {
        console.error("ERROR_OCCURED_IN_DATABASE_CONNECTION : " + err);
    });
