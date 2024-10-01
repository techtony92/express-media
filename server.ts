import dotenv from "dotenv";
import cors from "cors";
import express,{ request } from "express";
import type { Request, Response } from "express";
import { UploadThingInit } from "./mediaHosts/uploadThingMiddleware";
import luxMedia from './routes/lux_cars/lux_video';
import { allowedOrigins } from "./constants/AllowedOrigins";
import UploadThingCache from "./mediaHosts/uploadThing/mediaCache";
const app = express();
const PORT = 3500 || process.env.PORT;
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
        origin:(origin, originVerificationResult) =>{
            if(allowedOrigins.indexOf(origin!) === -1){
            if(!origin) return originVerificationResult(null, true);
            let message = "This origin is not allowed to access content on this server";
        return originVerificationResult(new Error(message));
        }
    }
}));

UploadThingInit(app);
UploadThingCache.initialize();
UploadThingCache.checkExistence();
console.log(UploadThingCache.verifyCache());
app.use('/lux_video', luxMedia )   // <== after your middleware

app.get("/", (req:Request, res:Response)=>{
    
    res.send({message:"Initial Get Request Successful"});
})

app.listen(PORT, function(){
    console.log(`Success: Server Running on PORT ${PORT}`);
});
