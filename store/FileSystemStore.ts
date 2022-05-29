import { UserFileObject } from "@prisma/client";
import { STORE_NAME } from "./enums/storeName";
import PersistantStore from "./PersistantStore";

type IFileState = UserFileObject & { saved: boolean };

interface IFileSystem extends Object {
    files: {
        [ fileId: string ]: IFileState
    }
}

class FileSystemStore extends PersistantStore<IFileSystem> {
    protected data(): IFileSystem {
        return {
            files: {}
        };
    }

    public setFile(file:IFileState) {
        this.state.files[file.id] = { ...file }; 
    }

    public setFileSaved(fileId:string, saved:boolean = true) {
        this.state.files[fileId].saved = saved;
    }
}

const fileSystemStore = new FileSystemStore(STORE_NAME.FILE_SYSTEM);

export { fileSystemStore, IFileSystem };