import { OutputBlock } from "./block_behavior";
import { Signal, Number, Bool, Obj, String } from "./object";
import { CANVAS_DISPLAY_TYPE } from "./stringConfig";
export class NumberDisplay extends OutputBlock {
    value: number
    inValPorts: Array<Number> = [null];
    displayDetail: any;
    constructor(id: string, type: string) {
        super(id, type);
        // console.log("create num dis")
        this.displayDetail = {
            color: "#000000",
            digit: 2,
            value: this.value,
            type: CANVAS_DISPLAY_TYPE.OUT_STR,
            position: this.position,
        }
    }

    addValPort(index: number, num: Number) {
        this.inValPorts[index] = num
    }
    updateContent() {
        console.log(this.inValPorts[0])
        this.value = this.inValPorts[0].value

        this.displayDetail.value = this.value
    }
    setDisplayDetail(detail: any): void {

        if (this.inValPorts[0] != null && this.inValPorts[0]) {
            // console.log("port is not null")
            this.updateContent()
            this.displayDetail = {
                ...this.displayDetail,
                value: this.inValPorts[0].value,
                ...detail
            }
        }
        else {

            // console.log("port is null")
            this.displayDetail = {
                color: this.displayDetail.color,
                type: CANVAS_DISPLAY_TYPE.OUT_STR,
                position: this.displayDetail.position,
                ...detail
            }

        }
        this.position = this.displayDetail.position
        // console.log("Good")

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
    value: string
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
            this.value = this.inValPorts[0].state ? "true" : "false"
            // console.log("is Signal")
        }
        else if (this.inValPorts[0] instanceof Number) {
            this.value = this.inValPorts[0].value.toString();
            // console.log("is Signal")
        }
        if (this.inValPorts[0] instanceof String) {
            this.value = this.inValPorts[0].value
            // console.log("is String")
        }
        if (this.inValPorts[0] instanceof Bool) {
            this.value = this.inValPorts[0].value ? "true" : "false"
        }
        console.log("value is " + this.value)
        this.displayDetail.value = this.value
    }
    setDisplayDetail(detail: any): void {
        if (this.inValPorts[0] != null && this.inValPorts[0]) {
            // console.log("port is not null")
            this.updateContent()
            this.displayDetail = {
                ...this.displayDetail,
                value: this.value,
                ...detail
            }
        }
        else {

            // console.log("port is null")
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