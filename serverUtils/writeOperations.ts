import fs from "fs/promises";
export async function writeFileToServer(path:string, name:string, ext:string, fileContent:string|any){
    try{
        if(fileContent !== null){
            await fs.writeFile(`${path}/${name}${ext}`, fileContent);
        }
    }catch(error){
        console.error(error);
    }
}