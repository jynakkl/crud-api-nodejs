import mongoose from "mongoose";

import { MONGO_URI } from "../constants/env.js";

const connect = async() => {
    try {
        await mongoose.connect(MONGO_URI);
    } catch (error) {
        console.log(`Database connection failed ${error}`);
        process.exit(1);
    }
}

export default connect;