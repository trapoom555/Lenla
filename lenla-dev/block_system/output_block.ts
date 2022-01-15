import { OutputBlock } from "./block_behavior";
import { Signal, Number, Bool, Obj } from "./object";
import { CANVAS_DISPLAY_TYPE } from "./stringConfig";
export class NumberDisplay extends OutputBlock {
    value: number
    inValPorts: Array<Number> = [null];
    displayDetail: any;
    constructor(id: string, type: string) {
        super(id, type);
        this.displayDetail = {
            color: "#000000",
            value: this.value,
            type: CANVAS_DISPLAY_TYPE.OUT_STR,
            position: this.position,
        }
    }

    addValPort(index: number, num: Number) {
        this.inValPorts[index] = num

    }
    updateContent() {
        this.value = this.inValPorts[0].value
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
                color: this.displayDetail.color,
                type: CANVAS_DISPLAY_TYPE.OUT_STR,
                position: this.displayDetail.position,
                ...detail
            }

        }
        this.position = this.displayDetail.position

    }
    log() {
        console.log(`value is ${this.value.toString()}`)
    }
    displayContent() {


        // this.setDisplayDetail({});
        // this.log();
    }

    // displayDetial:
}

export class StringDisplay extends OutputBlock {
    value: any
    inValPorts: Array<Obj> = [null];//value
    displayDetail: any;
    // port 0 <Number> : number to display
    constructor(id: string, type: string) {
        super(id, type);
        this.displayDetail = {
            color: "#000000",
            value: this.value,
            type: CANVAS_DISPLAY_TYPE.OUT_STR,
            position: this.position,
        }
    }

    addValPort(index: number, val: any) {
        this.inValPorts[index] = val
    }
    updateContent() {
        if (this.inValPorts[0] instanceof Signal) {
            this.value = this.inValPorts[0].state
            // console.log("is Signal")
        }
        console.log("value is " + this.value)
        this.displayDetail.value = this.value
    }
    setDisplayDetail(detail: any): void {
        if (this.inValPorts[0] != null && this.inValPorts[0]) {
            console.log("port is not null")
            this.updateContent()
            this.displayDetail = {
                ...this.displayDetail,
                value: this.value,
                ...detail
            }
        }
        else {

            console.log("port is null")
            this.displayDetail = {
                color: this.displayDetail.color,
                type: CANVAS_DISPLAY_TYPE.OUT_STR,
                position: this.displayDetail.position,
                ...detail
            }

        }
        this.position = this.displayDetail.position

    }
    log() {
        console.log(`value is ${this.value.toString()}`)
    }
    displayContent() {


        // this.setDisplayDetail({});
        // this.log();
    }
}