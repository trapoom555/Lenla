import { OutputBlock, Number, Bool } from "./block_behavior";
export class NumberDisplay extends OutputBlock {
    value: number
    inValPorts: Array<Number> = [null];

    constructor(id: string, type: string) {
        super(id, type);
    }

    addValPort(index: number, num: Number) {
        this.inValPorts[index] = num
    }
    updateContent() {
        this.value = this.inValPorts[0].value
        // this.log();
    }
    log() {
        console.log(`value is ${this.value.toString()}`)
        // console.log(this.value)
    }
    displayContent() {

        // this.log();
    }

    getDisplayData() {
        // console.log("position " + this.position.x + " " + this.position.y)
        try {
            // this.update()
            // this.log()
            // console.log("this valur is " + this.value)
            return {
                color: 255,
                value: this.value,
                type: "number",
                position: this.position

            }
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