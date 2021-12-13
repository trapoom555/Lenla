import { OutputBlock, Number } from "./block_behavior";
export class NumberDisplay extends OutputBlock {
    value: number
    inValPorts: Array<Number> = [null];

    // port 0 <Number> : number to display
    constructor(id: string) {
        super(id);
    }
    addValPort(index: number, num: Number) {
        this.inValPorts[index] = num
    }
    update() {
        this.value = this.inValPorts[0].value
        this.log();
    }
    log() {
        console.log(`value is ${this.value.toString()}`)
        // console.log(this.value)
    }
    display() {
        this.log();
    }
}