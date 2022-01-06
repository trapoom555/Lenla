import { InOutBlock, Number, Bool } from "./block_behavior";

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
            else {
                this.value -= this.inValPorts[i].value
            }
        }
        this.inValPorts[0].value + this.inValPorts[1].value
        this.outValPorts[0].value = this.value

        // console.log("sum updated")
    }

}

export class Slider extends InOutBlock {

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
