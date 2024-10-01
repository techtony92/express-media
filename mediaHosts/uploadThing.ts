import {createUploadthing, type FileRouter} from "uploadthing/express";

const fileUploader = createUploadthing();

export const expressUploadRouter = {
    imageUploader: fileUploader({
        image:{
            maxFileSize:"4MB",
            maxFileCount:4,
        },
    }).onUploadComplete((data) =>{
        console.log("upload completed", data);
    })
} satisfies FileRouter;

export type ExpressFileRouter = typeof expressUploadRouter;