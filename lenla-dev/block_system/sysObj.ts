
import { NAME_TYPE, BLOCK_TYPE } from "./blockType";

export class System {
    idToIndex: {}
    childNode: Array<IBlock>
    constructor() {
        this.idToIndex = {};
        this.childNode = [];
    }
    add_element(element) {
        this.idToIndex[element.id] = this.childNode.length;
        let node: IBlock
        if (element.type == NAME_TYPE.IN_CONSTANT) {
            node = new Constant(element.id, element.data.data);

        }
        if (element.type == NAME_TYPE.OUT_NUMBER_DISPLAY) {
            node = new NumberDisplay(element.id)
        }
        if (element.type == NAME_TYPE.OP_SUM) {
            node = new Sum(element.id)
        }
        if (node)
            this.childNode.push(node);
    }
    set_port(sourceId: string, targetId: string, sourcePortIndex?, targetPortIndex?) {
        if (!sourcePortIndex) sourcePortIndex = 0
        if (!targetPortIndex) targetPortIndex = 0
        let tmp = this.childNode[this.idToIndex[targetId]]
        let target: ISub
        if (isISub(tmp)) {
            target = tmp
        }
        else {

        }
        tmp = this.childNode[this.idToIndex[sourceId]]
        let source: IPub
        if (isIPub(tmp)) {
            source = tmp
        }
        else {

        }
        target.addValPort(targetPortIndex, source.outValPorts[sourcePortIndex])
        let notiPort = new NotiPort
        notiPort.addReciver(target)
        source.addNotiPort(sourcePortIndex, notiPort)

    }

    compile() {
        this.childNode.forEach(element => {
            if (isIPub(element)) {
                element.notifyAllPort();
            }
        });
        this.childNode.forEach(element => {

            if (isDisplayable(element)) {
                element.display();
            }

        });

    }
}
function isDisplayable(object: any): object is IDisplay {
    return "display" in object
}
function isISub(object: any): object is ISub {
    return "update" in object
}
function isIPub(object: any): object is IPub {
    return "notifyAllPort" in object
}
interface IBlock {
    id: string
    type: string
}
class NotiPort {
    recivers: ISub[] = []
    notify() {
        // console.log(`reciver is ${this.recivers}`)
        this.recivers.forEach(reciver => {
            reciver.update();
            // console.log(`reciver id ${reciver.id}`)
        });
    }
    addReciver(reciver: ISub) {
        this.recivers.push(reciver);
        // console.log(`add reciver id ${reciver.id}`)
    }

}
class Obj {
    value: any
}
class Int extends Obj {
    value: Int
}

class Number extends Obj {
    value: number
}

interface ISub extends IBlock {
    inValPorts: Array<Number>
    addValPort: (index: number, obj: Obj) => any
    update: () => any
}

interface IPub extends IBlock {
    outValPorts: Array<Obj>
    notiPorts: NotiPort[];
    addNotiPort: (index: number, port: NotiPort) => any
    notifyAllPort: () => any
}

interface IDisplay {
    display: () => any
}

export abstract class InputBlock implements IPub {
    type = BLOCK_TYPE.IN_BLOCK
    id: string
    notiPorts: NotiPort[] = [];
    outValPorts: Array<Obj>
    constructor(id: string) {
        this.id = id
    }
    addNotiPort(index: number, port: NotiPort) {
        this.notiPorts[index] = port
    }
    notifyAllPort() {
        this.notiPorts.forEach(port => {
            port.notify();
        });
    }
    deleteAllPort() {
        this.notiPorts = []
    }

}

export abstract class OutputBlock implements ISub, IDisplay {
    type = BLOCK_TYPE.OUT_BLOCK
    id: string
    inValPorts: Array<Obj>
    // ports: NotiPort[] = [];
    constructor(id: string) {
        this.id = id
    }
    addValPort(index: number, obj: Obj) {
        this.inValPorts[index] = obj
    }

    update() {
        this.display();
    }
    display() {

    }

}

export abstract class InOutBlock implements ISub, IPub {
    type = BLOCK_TYPE.IN_OUT_BLOCK
    id: string
    inValPorts: Array<Obj>
    notiPorts: NotiPort[] = [];
    outValPorts: Array<Obj>
    constructor(id: string) {
        this.id = id
    }
    addValPort(index: number, obj: Obj) {
        this.inValPorts[index] = obj
    }

    update() {

    }


    addNotiPort(index: number, port: NotiPort) {
        this.notiPorts[index] = port
    }
    notifyAllPort() {
        this.notiPorts.forEach(port => {
            port.notify();
        });
    }
}

export class Constant extends InputBlock {
    outValPorts: Array<Number> = [null];

    notiPorts = [];

    constructor(id: string, value?: number) {
        super(id);
        console.log("cleate Constant block");
        var num = new Number()
        num.value = value
        this.outValPorts = [num]
    }



}

export class Vector2D extends InputBlock {
    public x: number;
    public y: number;
    notiPorts = [null, null];

    constructor(id: string, x: number, y: number) {
        super(id);
        this.x = x
        this.y = y
    }
    addPort(portX?: NotiPort, portY?) {
        if (portX) this.notiPorts[0] = portX
        if (portY) this.notiPorts[1] = portY
    }
    deletePort() {
        this.notiPorts = [null, null]
    }

}

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

export class Sum extends InOutBlock {
    inValPorts: Array<Number> = [null, null];
    outValPorts: Array<Number> = [new Number];
    value: number
    constructor(id: string) {
        super(id);
    }

    update() {
        this.value = this.inValPorts[0].value + this.inValPorts[1].value
        this.outValPorts[0].value = this.value
        // console.log("sum updated")
    }

}

