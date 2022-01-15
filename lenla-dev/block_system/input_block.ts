import { InputBlock, InputDisplay, InOutDisplay } from "./block_behavior";
import { Number, Bool, Color, Signal } from "./object";
import { CANVAS_DISPLAY_TYPE } from "./stringConfig";
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

export class BasicButton extends InOutDisplay {
    inValPorts: Array<any> = [new Bool(false), new Color("#F8DE7E"), new Color("#7E7E7E"), new Number(0)];
    //initial state,on color,off color,button type(0->toggle,1-> hold to on,2->hold to off)
    outValPorts: Array<Signal> = [new Signal];
    state: boolean
    displayDetail: any
    // position = new Vector2d(0, 0)
    constructor(id: string, type: string, initState = false) {
        super(id, type);
        this.inValPorts[0] = initState
        this.state = initState
        this.displayDetail = {
            on_color: this.inValPorts[1].hex,
            off_color: this.inValPorts[2].hex,
            state: initState,
            init: initState,
            type: CANVAS_DISPLAY_TYPE.IN_BASIC_BUTTON,
            position: this.position,
        }
    }
    setState(val: boolean) {
        this.state = val
        this.outValPorts[0].setState(val)
        this.update()
    }
    addValPort(index: number, num: Number) {
        this.inValPorts[index] = num

    }
    updateContent() {
        // this.value = this.inValPorts[0].value
        this.displayDetail.state = this.state
        // console.log(this.state)
    }
    setDisplayDetail(detail: any): void {

        if (this.inValPorts[0] != null && this.inValPorts[0]) {
            console.log("port is not null")
            this.updateContent()
            this.displayDetail = {
                ...this.displayDetail,
                state: this.inValPorts[0].value,
                ...detail
            }
        }
        else {

            console.log("port is null")
            this.displayDetail = {
                ...this.displayDetail,
                type: CANVAS_DISPLAY_TYPE.IN_BASIC_BUTTON,
                position: this.displayDetail.position,
                ...detail
            }

        }
        this.position = this.displayDetail.position

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

