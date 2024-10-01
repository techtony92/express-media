import express, {Router} from "express";
import type { Request, Response } from "express";
import { fetchMedia } from "../../mediaHosts/uploadThing/fetchMedia"; 
const luxMedia = Router();


luxMedia.get("/", (req:Request, res:Response) =>{
    console.log("landing Media Route Hit!!");
    res.send({message:"server router working"})
})

luxMedia.post("/getMedia", (req,res) =>{
    const mediaId = req.body.mediaId;
    const mediaExt = req.body.mediaExt;
    fetchMedia(mediaId,mediaExt,  (onSuccessOrError) =>{
        res.send({onSuccessOrError})
    });
});

luxMedia.post("/landing/:id", (req:Request, res:Response) =>{
    const {id} = req.params; // https://utfs.io/f/ <-- origin || --> media Id a36f6c66-9751-44b9-a219-e35aa6229430-oeqy8k.mp4
    res.send({mediaId:id});
})
export default luxMedia;