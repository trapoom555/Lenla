import { InOutBlock } from "./block_behavior";
import { Number, Bool, Signal } from "./object";
import { CANVAS_DISPLAY_TYPE } from "./stringConfig";


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

        this.outValPorts[0].value = this.value

        // console.log("sum updated")
    }

}
export class Product extends InOutBlock {
    inValPorts: Array<Number> = [];
    outValPorts: Array<Number> = [new Number];
    value: number
    symbols: string[]
    constructor(id: string, type: string, ports_symbol: string[]) {
        super(id, type);
        this.symbols = ports_symbol
        for (let i = 0; i < this.symbols.length; i++) {
            const tmp = new Number
            tmp.value = 1
            this.inValPorts.push(tmp)
        }
    }
    addValPort(index: number, num: Number) {

        while (this.inValPorts.length <= index) {
            const tmp = new Number
            tmp.value = 1
            this.inValPorts.push(tmp)
        }
        this.inValPorts[index] = num

    }
    updateContent() {
        this.value = 1
        for (let i = 0; i < this.symbols.length; i++) {
            if (this.symbols[i] == "*") {
                this.value *= this.inValPorts[i].value
            }
            else if (this.symbols[i] == "/") {
                this.value /= this.inValPorts[i].value
            }
            else {
                this.value += parseInt(this.symbols[i])
            }
        }
        this.outValPorts[0].value = this.value

        // console.log("sum updated")
    }

}

export class Log extends InOutBlock {
    inValPorts: Array<Number> = [new Number, new Number(Math.E)];//num,base 
    outValPorts: Array<Number> = [new Number];
    value: number
    constructor(id: string, type: string) {
        super(id, type);
    }
    addValPort(index: number, num: Number) {
        this.inValPorts[index] = num
    }
    updateContent() {
        this.value = Math.log(this.inValPorts[0].value) / Math.log(this.inValPorts[1].value)
        this.outValPorts[0].value = this.value
    }

}

export class Power extends InOutBlock {
    inValPorts: Array<Number> = [new Number, new Number(Math.E)];//base,power 
    outValPorts: Array<Number> = [new Number];
    value: number
    constructor(id: string, type: string) {
        super(id, type);
    }
    addValPort(index: number, num: Number) {
        this.inValPorts[index] = num
    }
    updateContent() {
        this.value = Math.pow(this.inValPorts[0].value, this.inValPorts[1].value)
        this.outValPorts[0].value = this.value
    }

}