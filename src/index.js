import express from "express";
import "dotenv/config";
import cors from "cors";

import {APP_ORIGIN, PORT} from "./constants/env.js";
import connect from "./database/connect.js";
import productRouter from "./routes/productRoute.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:APP_ORIGIN,credentials:true}));
app.use('/api/products',productRouter);
app.use(errorHandler);

app.listen(PORT,() => {
    connect();
    console.log(`Server is working on ${PORT} port`);
});