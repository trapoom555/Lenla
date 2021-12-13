
import { NAME_TYPE, BLOCK_TYPE } from "./blockType";
export class System {
    hash: {}
    childNode: Array<IBlock>
    constructor() {
        this.hash = {};
        this.childNode = [];

    }
    add_element(element) {
        this.hash[element.id] = this.childNode.length;
        let node: IBlock
        if (element.type == "blk_constant") {
            node = new Constant(element.id, element.data.data);

        }
        if (element.type == "blk_gauge") {
            node = new NumberDisplay(element.id)
        }
        if (element.type == "blk_plus") {
            node = new Sum(element.id)
        }
        if (node)
            this.childNode.push(node);
    }
    set_port(sId, tId: string, sPortIndex?, tPortIndex?) {
        if (!sPortIndex) sPortIndex = 0
        if (!tPortIndex) tPortIndex = 0
        let tmp = this.childNode[this.hash[tId]]
        let target: ISub
        if (isISub(tmp)) {
            target = tmp
        }
        else {

        }
        tmp = this.childNode[this.hash[sId]]
        let source: IPub
        if (isIPub(tmp)) {
            source = tmp
        }
        else {

        }
        target.addValPort(tPortIndex, source.outValPort[sPortIndex])
        let notiPort = new NotiPort
        notiPort.addReciver(target)
        source.addNotiPort(sPortIndex, notiPort)

    }

    compile() {
        this.childNode.forEach(element => {

            if (isIPub(element)) {
                element.notifyAllPort();
                // console.log(element.notiPorts)
                // console.log(`element id ${element.id} notify all port`)
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
// class BlockGenerator {
//     public factoryMethod(type:string): IBlock {
//         if(type==)
//     }
// }
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

interface Int extends Obj {
    value: Int
}
interface Obj {
    value: any
}
class Number implements Obj {
    value: number
}

interface ISub extends IBlock {
    inValPorts: Array<Number>
    // notiPorts: NotiPort[]
    addValPort: (index: number, obj: Obj) => any
    update: () => any
}

interface IPub extends IBlock {
    outValPort: Array<Number>
    notiPorts: NotiPort[];
    addNotiPort: (index: number, port: NotiPort) => any
    notifyAllPort: () => any
}

interface IDisplay {
    display: () => any
}

abstract class InputBlock implements IPub {
    type = BLOCK_TYPE.IN_BLOCK
    id: string
    notiPorts: NotiPort[] = [];
    outValPort: Array<Number>
    constructor(id: string) {
        this.id = id
    }
    addNotiPort(index: number, port: NotiPort) {

    }
    notifyAllPort() {
        this.notiPorts.forEach(port => {
            port.notify();
            // console.log(`${this.notiPorts} with id ${this.id} is notified`)
        });
    }

}

abstract class OutputBlock implements ISub {
    type = BLOCK_TYPE.OUT_BLOCK
    id: string
    inValPorts: Array<Number>
    // ports: NotiPort[] = [];
    constructor(id: string) {
        this.id = id
    }
    addValPort(index: number, obj: Obj) {

    }

    update() {

    }

}

abstract class InOutBlock implements ISub, IPub {
    type = BLOCK_TYPE.IN_OUT_BLOCK
    id: string
    inValPorts: Array<Number>
    notiPorts: NotiPort[] = [];
    outValPort: Array<Number>
    constructor(id: string) {
        this.id = id
    }
    addValPort(index: number, obj: Obj) {

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
    outValPort: Array<Number> = [null];

    notiPorts = [];

    constructor(id: string, value?: number) {
        super(id);
        console.log("cleate Constant block");
        var num = new Number()
        num.value = value
        this.outValPort = [num]
    }
    addNotiPort(index: number, port: NotiPort) {
        this.notiPorts[index] = port
    }
    deletePort() {
        this.notiPorts = []
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

export class NumberDisplay extends OutputBlock implements IDisplay {
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
    outValPort: Array<Number> = [new Number];
    value: number
    constructor(id: string) {
        super(id);
    }
    addValPort(index: number, num: Number) {
        this.inValPorts[index] = num
    }
    update() {
        this.value = this.inValPorts[0].value + this.inValPorts[1].value
        this.outValPort[0].value = this.value
        // console.log("sum updated")
    }



}

// export class Sum extends InputBlock,OutputBlock{

// }
