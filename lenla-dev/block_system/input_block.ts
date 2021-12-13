import { InputBlock, Number } from "./block_behavior";
export class Constant extends InputBlock {
    outValPorts: Array<Number> = [null];

    notiPorts = [];

    constructor(id: string, value?: number) {
        super(id);
        console.log("cleate Constant block");
        var num = new Number()
        num.value = value
        this.outValPorts = [num]
    }



}
export class Vector3D extends InputBlock {
    public x: number;
    public y: number;
    public z: number;
    notiPorts = [null, null, null];
    outValPorts: Array<Number> = [null, null, null];

    constructor(id: string, x: number, y: number, z: number) {
        super(id);
        this.x = x
        this.y = y
        this.z = z
    }

    deletePort() {
        this.notiPorts = [null, null]

    }

}


export class Vector2D extends InputBlock {
    public x: number;
    public y: number;
    notiPorts = [null, null];
    outValPorts: Array<Number> = [null, null];
    constructor(id: string, x: number, y: number) {
        super(id);
        this.x = x
        this.y = y
    }
    deletePort() {
        this.notiPorts = [null, null]
    }

}
