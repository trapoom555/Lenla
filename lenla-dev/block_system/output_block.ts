import { OutputBlock, Number, Bool } from "./block_behavior";
import { CANVAS_DISPLAY_TYPE } from "./stringConfig";
export class NumberDisplay extends OutputBlock {
    value: number
    inValPorts: Array<Number> = [null];
    displayDetail: any;
    constructor(id: string, type: string) {
        super(id, type);
        this.displayDetail = {
            color: "#FFFFFF",
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
        // console.log("this is updatd  fuck")
        // this.log();
    }
    setDisplayDetail(detail: any): void {
        if (this.inValPorts[0] != null && this.inValPorts[0]) {
            console.log("port is not null")
            this.updateContent()
            console.log(this.value)
            this.displayDetail = {
                ...this.displayDetail,
                value: this.inValPorts[0].value,
                ...detail
            }
            console.log("position: ")
            console.log(this.displayDetail.position)
        }
        else {

            console.log("port is null")
            this.displayDetail = {
                color: this.displayDetail.color,
                type: CANVAS_DISPLAY_TYPE.OUT_STR,
                position: this.displayDetail.position,
                ...detail
            }
            console.log(this.displayDetail.position)

        }
        this.position = this.displayDetail.position

    }
    log() {
        console.log(`value is ${this.value.toString()}`)
        // console.log(this.value)
    }
    displayContent() {


        // this.setDisplayDetail({});
        // this.log();
    }
    getDisplayData() {
        // console.log("position " + this.position.x + " " + this.position.y)
        try {
            // this.update()
            // this.log()
            // if (this.inValPorts[0] != null && this.inValPorts[0]) {
            //     console.log("port is not null   -- " + this.inValPorts[0].value)
            // }

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