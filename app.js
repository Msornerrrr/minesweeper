require('dotenv').config();
require('express-async-errors');

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const mapRouter = require('./routes/maps');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(cors());

app.use('/api/v1/maps', mapRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__filename, "client", "build", "index.html"));
    });
}

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, () => {
        console.log(`Server is listening port ${PORT}...`);
    }))
    .catch(err => console.log(err));