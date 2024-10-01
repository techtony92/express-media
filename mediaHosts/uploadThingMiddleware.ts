import express, {Router} from "express";
import { createRouteHandler } from "uploadthing/express";
import {expressUploadRouter} from "./uploadThing";


export function UploadThingInit(app:Router){
    app.use("/api/uploadThing", createRouteHandler({
        router:expressUploadRouter,
        config:{ 
           uploadthingId:process.env.UPLOADTHING_APP_ID,
           uploadthingSecret:process.env.UPLOADTHING_SECRET}
    }))
}