import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";

dotenv.config()

const app=express();
const PORT=process.env.PORT
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
if(process.env.NODE_ENV!=="production"){
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))}
app.use(express.json())
app.use(rateLimiter)

app.use("/api/notes",notesRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.resolve(__dirname,"../../frontend/dist")))
    app.get("/*splat",(req,res)=>{
    res.sendFile(path.join(path.resolve(__dirname,"../../frontend/dist"),"index.html"))
})}

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("sERVER STARTED")
    })
})


