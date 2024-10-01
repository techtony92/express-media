export type MediaCache = {
    contents:ReadableStream;
    cachedAt:Date|null;
    updatedAt:Date |null;
    cacheId:number;
    // handle replacement conflict: if file changes to something else
}
export class UploadThingMediaCache{
    mediaCache:Array<MediaCache> | null = null;
    isInitialized:Boolean = false;
    cachedAt:Date | null = null;
    updatedAt:Date | null = null;
    cacheId:number = 0; 
    constructor(){
        this.checkExistence();
    }
    initialize(){
            this.mediaCache = [];
            this.isInitialized = true;
            this.cacheId = 0;
    }
    checkExistence(){
        if(this.mediaCache === null){
            this.initialize();
        }else{
            return this.mediaCache;
        }
    }

    createInitialTimeStamp(){
        this.cachedAt = new Date(Date.now());
    }

    createUpdatedTimeStamp(){
        this.updatedAt = new Date(Date.now());
    }

    // MediaCache: DS = Queue
    addMediaStreamSource(mediaData:ReadableStream ){
        if(this.isInitialized && this.mediaCache){
            this.createInitialTimeStamp();
            console.log(this.mediaCache.length);

                this.mediaCache[this.mediaCache.length] = {contents: mediaData, cachedAt: this.cachedAt, updatedAt:this.updatedAt, cacheId: this.cacheId++ };
            
        }
        console.log(this.mediaCache?.length);
    }

    

    verifyCache():Array<MediaCache> | null{
        if(this.mediaCache){
            return this.mediaCache;
        }else{
            return null
        }
    }
}

const UploadThingCache = new UploadThingMediaCache();
export default UploadThingCache;