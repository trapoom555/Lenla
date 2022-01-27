import { InOutBlock } from "./block_behavior";
import { Number, Bool, Signal } from "./object";
import { CANVAS_DISPLAY_TYPE } from "./stringConfig";
export class Signal2Num extends InOutBlock {
    inValPorts: Array<Signal> = [new Signal()];
    outValPorts: Array<Number> = [new Number()];
    value: number;
    symbols: string[];
    constructor(id: string, type: string) {
        super(id, type);
    }
    addValPort(index: number, sig: Signal) {
        while (this.inValPorts.length <= index) {
            this.inValPorts.push(null);
        }
        this.inValPorts[index] = sig;
    }
    updateContent() {
        this.value = this.inValPorts[0].state ? 1 : 0;
        this.outValPorts[0].value = this.value;
    }
}

export class Signal2Bool extends InOutBlock {
    inValPorts: Array<Signal> = [new Signal()];
    outValPorts: Array<Bool> = [new Bool()];
    value: boolean;
    symbols: string[];
    constructor(id: string, type: string) {
        super(id, type);
    }
    addValPort(index: number, sig: Signal) {
        while (this.inValPorts.length <= index) {
            this.inValPorts.push(null);
        }
        this.inValPorts[index] = sig;
    }
    updateContent() {
        this.value = this.inValPorts[0].state;
        this.outValPorts[0].value = this.value;
    }
}