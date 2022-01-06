import { InputBlock, Number, InputDisplay } from "./block_behavior";
export class Constant extends InputBlock {
    outValPorts: Array<Number> = [null];

    notiPorts = [];

    constructor(id: string, type: string, value?: number) {
        super(id, type);
        console.log("cleate Constant block");
        var num = new Number()
        num.value = value
        this.outValPorts = [num]
    }



}
// export class Slider extends InputDisplay {
//     public value: number;
//     notiPorts = [null];
//     outValPorts: Array<Number> = [null, null];
//     constructor(id: string, type: string, x: number, y: number) {
//         super(id, type);
//         this.x = x
//         this.y = y
//         this.outValPorts = [new Number, new Number]
//         this.outValPorts[0].value = x
//         this.outValPorts[1].value = y
//         console.log("cleate slider block");
//     }

//     deletePort() {
//         this.notiPorts = [null, null]
//     }

// }

export class Vector2D extends InputBlock {
    public x: number;
    public y: number;
    notiPorts = [null, null];
    outValPorts: Array<Number> = [null, null];
    constructor(id: string, type: string, x: number, y: number) {
        super(id, type);
        this.x = x
        this.y = y
        this.outValPorts = [new Number, new Number]
        this.outValPorts[0].value = x
        this.outValPorts[1].value = y
        console.log("cleate 2d vector block");
    }
    deletePort() {
        this.notiPorts = [null, null]
    }

}
export class Vector3D extends InputBlock {
    public x: number;
    public y: number;
    public z: number;
    notiPorts = [null, null, null];
    outValPorts: Array<Number> = [null, null, null];

    constructor(id: string, type: string, x: number, y: number, z: number) {
        super(id, type);
        this.x = x
        this.y = y
        this.z = z


    }

    deletePort() {
        this.notiPorts = [null, null]

    }

}

