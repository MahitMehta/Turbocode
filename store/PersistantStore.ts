import Store from "./Store";
import { watch, ref, Ref} from "vue";
import {set, get} from 'idb-keyval'

export default abstract class PersistantStore<T extends Object> extends Store<T> {
    private isInitialized = ref(false);

    constructor(readonly storeName: string) {
        super(storeName);
    }

    public async init() {
        if(this.isInitialized) {
            let stateFromIndexedDB: string = await get(this.storeName);
            if(stateFromIndexedDB) {
                Object.assign(this.state, JSON.parse(stateFromIndexedDB))
            }
            watch(() => this.state, (val) => set(this.storeName, JSON.stringify(val)), {deep: true})

            this.isInitialized.value = true;
        }
    }

    public getIsInitialized(): Ref<boolean> {
        return this.isInitialized
    }
}