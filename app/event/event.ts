
export interface Listener {
    Name:string
    trigger: () => void 
    addHandler(handle:any) : number;
    removeHandler(handle:number) : void;
}

export interface Listenable {

    addEventListener():any

    removeEventListener():any

}