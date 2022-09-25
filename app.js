import * as dotenv from 'dotenv'
dotenv.config()

import 'express-async-errors';

import path from 'path';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// routers
import userRouter from './routes/user.js'
import mapRouter from './routes/maps.js';

// middlewares
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error-handler.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', userRouter);
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