import { InputBlock, InputDisplay, InOutDisplay } from "./block_behavior";
import { Number, Bool, Color, Signal, String } from "./object";
import { CANVAS_DISPLAY_TYPE } from "./stringConfig";
export class Constant extends InputBlock {
    outValPorts: Array<Number> = [null];

    notiPorts = [];

    constructor(id: string, type: string, value: number = 0) {
        super(id, type);
        console.log("cleate Constant block");
        var num = new Number()
        num.value = value
        this.outValPorts = [num]
    }



}

export class StringConstant extends InputBlock {
    outValPorts: Array<String> = [null];

    notiPorts = [];

    constructor(id: string, type: string, value: string = "") {
        super(id, type);
        console.log("cleate Constant block");
        var str = new String()
        str.value = value
        this.outValPorts = [str]
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
    addValPort(index: number, val: any) {
        if (typeof (val) == "string") {
            this.inValPorts[index] = new Color(val)
        }
        else this.inValPorts[index] = val
        this.setDisplayDetail({})
        console.log("add port at " + index + " to be " + val)
        console.log(this.inValPorts[index])

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
                on_color: this.inValPorts[1].hex,
                off_color: this.inValPorts[2].hex,
                state: this.inValPorts[0].value,
                ...detail
            }
        }
        else {

            console.log("port is null")
            this.displayDetail = {
                ...this.displayDetail,
                on_color: this.inValPorts[1].hex,
                off_color: this.inValPorts[2].hex,
                ...detail
            }
            console.log(this.displayDetail.off_color)
            console.log(this.displayDetail.on_color)
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

