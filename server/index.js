import express from 'express'
import dotenv from 'dotenv'
dotenv.config()


import { connectDB } from './config/db.js'
import { apiRouter } from './routes/server.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
const app = express()

const PORT = 3001

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
        origin: ["http://localhost:5174"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);


app.get("/", (req, res) => {
    res.send("Hello World!!!!!");
});


app.use("/api", apiRouter);

app.all("/{*any}", (req, res, next) => {
    res.status(404).json({ message: "endpoint does not exist" });
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});