
import { InOutBlock } from "./block_behavior";
import { Number, Bool, Signal } from "./object";
import { CANVAS_DISPLAY_TYPE } from "./stringConfig";
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
