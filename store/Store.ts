import { reactive, readonly } from "vue";

export default abstract class Store<T extends Object> {
    protected state: T; 

    constructor(readonly storeName:string) {
        const data = this.data();
        this.state = reactive<T>(data) as T; 
    }

    protected abstract data() : T;

    public getState(): T {
        return readonly(this.state) as T
    }
} 