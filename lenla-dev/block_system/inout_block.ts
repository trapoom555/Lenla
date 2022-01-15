import { InOutBlock, InOutDisplay } from "./block_behavior";
import { Number, Bool, Vector2d, Signal } from "./object";
import { Vector2D } from "./Input_block";
import { CANVAS_DISPLAY_TYPE } from "./stringConfig";
import { ThemeProvider } from "styled-components";


export class Sum extends InOutBlock {
    inValPorts: Array<Number> = [];
    outValPorts: Array<Number> = [new Number];
    value: number
    symbols: string[]
    constructor(id: string, type: string, ports_symbol: string[]) {
        super(id, type);
        this.symbols = ports_symbol
        for (let i = 0; i < this.symbols.length; i++) {
            const tmp = new Number
            tmp.value = 0
            this.inValPorts.push(tmp)
        }
    }
    addValPort(index: number, num: Number) {

        while (this.inValPorts.length <= index) {
            const tmp = new Number
            tmp.value = 0
            this.inValPorts.push(tmp)
        }
        this.inValPorts[index] = num

    }
    updateContent() {
        console.log(this.inValPorts)
        console.log("sum updated " + this.inValPorts[0].value + "," + this.inValPorts[1].value)
        this.value = 0
        for (let i = 0; i < this.symbols.length; i++) {
            if (this.symbols[i] == "+") {
                this.value += this.inValPorts[i].value
            }
            else if (this.symbols[i] == "-") {
                this.value -= this.inValPorts[i].value
            }
            else {
                this.value += parseInt(this.symbols[i])
            }
        }
        this.inValPorts[0].value + this.inValPorts[1].value
        this.outValPorts[0].value = this.value

        // console.log("sum updated")
    }

}

export class Signal2Num extends InOutBlock {
    inValPorts: Array<Signal> = [new Signal];
    outValPorts: Array<Number> = [new Number];
    value: number
    symbols: string[]
    constructor(id: string, type: string) {
        super(id, type);

    }
    addValPort(index: number, sig: Signal) {

        while (this.inValPorts.length <= index) {
            this.inValPorts.push(null)
        }
        this.inValPorts[index] = sig

    }
    updateContent() {
        this.value = this.inValPorts[0].state ? 1 : 0;
        this.outValPorts[0].value = this.value
    }

}
export class Slider extends InOutDisplay {
    inValPorts: Array<Number> = [new Number(0), new Number(100), new Number(50), new Number(1)];//min max default step
    outValPorts: Array<Number> = [new Number];
    value: number
    displayDetail: any
    // position = new Vector2d(0, 0)
    constructor(id: string, type: string) {
        super(id, type);
        this.displayDetail = {
            color: "#FFFFFF",
            value: this.value,
            type: CANVAS_DISPLAY_TYPE.IN_SLIDE,
            position: this.position,
        }
    }
    setValue(val: number) {
        this.value = val
    }
    addValPort(index: number, num: Number) {
        this.inValPorts[index] = num

    }
    updateContent() {
        // this.value = this.inValPorts[0].value
        this.displayDetail.value = this.value
    }
    setDisplayDetail(detail: any): void {

        if (this.inValPorts[0] != null && this.inValPorts[0]) {
            console.log("port is not null")
            this.updateContent()
            this.displayDetail = {
                ...this.displayDetail,
                value: this.inValPorts[0].value,
                ...detail
            }
        }
        else {

            console.log("port is null")
            this.displayDetail = {
                type: CANVAS_DISPLAY_TYPE.OUT_STR,
                position: this.displayDetail.position,
                ...detail
            }

        }
        this.position = this.displayDetail.position

    }
}
export class Greater extends InOutBlock {
    inValPorts: Array<Number> = [null, null];
    outValPorts: Array<Bool> = [new Bool];
    value: boolean
    constructor(id: string, type: string) {
        super(id, type);
    }


    updateContent() {
        this.value = this.inValPorts[0].value > this.inValPorts[1].value
        this.outValPorts[0].value = this.value
        // console.log("sum updated")
    }

}

export class GreaterOrEqual extends InOutBlock {
    inValPorts: Array<Number> = [null, null];
    outValPorts: Array<Bool> = [new Bool];
    value: boolean
    constructor(id: string, type: string) {
        super(id, type);
    }


    updateContent() {
        this.value = this.inValPorts[0].value >= this.inValPorts[1].value
        this.outValPorts[0].value = this.value
        // console.log("sum updated")
    }

}

export class AND extends InOutBlock {
    inValPorts: Array<Bool> = [null, null];
    outValPorts: Array<Bool> = [new Bool];
    value: boolean
    constructor(id: string, type: string) {
        super(id, type);
    }


    updateContent() {
        this.value = this.inValPorts[0].value && this.inValPorts[1].value
        this.outValPorts[0].value = this.value
        // console.log("sum updated")
    }

}

export class OR extends InOutBlock {
    inValPorts: Array<Bool> = [null, null];
    outValPorts: Array<Bool> = [new Bool];
    value: boolean
    constructor(id: string, type: string) {
        super(id, type);
    }


    updateContent() {
        this.value = this.inValPorts[0].value || this.inValPorts[1].value
        this.outValPorts[0].value = this.value
        // console.log("sum updated")
    }

}

export class NOT extends InOutBlock {
    inValPorts: Array<Bool> = [null];
    outValPorts: Array<Bool> = [new Bool];
    value: boolean
    constructor(id: string, type: string) {
        super(id, type);
    }


    updateContent() {
        this.value = !this.inValPorts[0].value
        this.outValPorts[0].value = this.value
        // console.log("sum updated")
    }

}
export class Condition extends InOutBlock {
    inValPorts: Array<Number> = [null, null];
    outValPorts: Array<Number> = [new Number];
    value: number
    constructor(id: string, type: string) {
        super(id, type);
    }

    updateContent() {
        this.value = this.inValPorts[0].value + this.inValPorts[1].value
        this.outValPorts[0].value = this.value
        // console.log("sum updated")
    }

}
