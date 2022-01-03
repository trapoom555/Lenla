import { OutputBlock, Number, Bool } from "./block_behavior";
import { CANVAS_DISPLAY_TYPE } from "./stringConfig";
export class NumberDisplay extends OutputBlock {
    value: number
    inValPorts: Array<Number> = [null];
    color: string
    displayDetail: any;
    constructor(id: string, type: string) {
        super(id, type);
        this.displayDetail = {
            color: this.color,
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
        // this.log();
    }
    setDisplayDetail(detail: any): void {
        this.displayDetail = {
            color: this.color,
            value: this.value,
            type: CANVAS_DISPLAY_TYPE.OUT_STR,
            position: this.position,
            ...detail
        }
    }
    log() {
        console.log(`value is ${this.value.toString()}`)
        // console.log(this.value)
    }
    displayContent() {

        // this.log();
    }
    setColor(color) {
        this.color = color
    }
    getDisplayData() {
        // console.log("position " + this.position.x + " " + this.position.y)
        try {
            // this.update()
            // this.log()
            // console.log("this valur is " + this.value)

            return this.displayDetail
        }
        catch {

        }

    }
    // displayDetial:
}

export class BoolDisplay extends OutputBlock {
    value: boolean
    inValPorts: Array<Bool> = [null];

    // port 0 <Number> : number to display
    constructor(id: string, type: string) {
        super(id, type);
    }

    addValPort(index: number, bool: Bool) {
        this.inValPorts[index] = bool
    }
    updateContent() {
        this.value = this.inValPorts[0].value
        this.log();
    }
    log() {
        console.log(`value is ${this.value.toString()}`)
        // console.log(this.value)
    }
    displayContent() {
        this.log();
    }
}