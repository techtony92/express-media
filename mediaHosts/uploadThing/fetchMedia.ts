import fs from "fs/promises";
import { writeFileToServer } from "../../serverUtils/writeOperations";
import type { MediaCache } from "./mediaCache";
import UploadThingCache from "./mediaCache";

export function fetchMedia(mediaId:string, mediaExt:string, asyncResult:(mediaOrError:Array<MediaCache>| null |PromiseRejectedResult) => void){
    console.log(mediaId);
    fetch(`${process.env.UPLOADTHING_PROTOCOL}${process.env.UPLOADTHING_DOMAIN}${process.env.UPLOADTHING_SUBDIR}${mediaId}${mediaExt}`)
    .then((responseSuccess) => { return responseSuccess})
    .then(dataSuccess => {
        console.log("data transformed:");
        if(dataSuccess.body !== null){
            writeFileToServer(process.env.LOCAL_MEDIA_PATH!, 
                'sample_file',
                 mediaExt, 
                 dataSuccess.body); 
                 
                 UploadThingCache.addMediaStreamSource(dataSuccess.body)

        } 
         asyncResult(UploadThingCache.verifyCache())}
        )
    .catch((rejected:PromiseRejectedResult) => {
        console.error(rejected)
        console.log(`Something went wrong with the request`)
        asyncResult(rejected);
    });
}

