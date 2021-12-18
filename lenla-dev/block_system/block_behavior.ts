
import { BLOCK_TYPE, BLOCK_CATE } from "./stringConfig";
// import { Constant } from "./Input_block.js";
// export class System {
//     idToIndex: {}
//     childNode: Array<IBlock>
//     constructor() {
//         this.idToIndex = {};
//         this.childNode = [];
//     }
//     add_element(element) {
//         this.idToIndex[element.id] = this.childNode.length;
//         let node: IBlock
//         if (element.type == BLOCK_TYPE.IN_CONSTANT) {
//             node = new Constant(element.id, element.data.data);

//         }
//         if (element.type == BLOCK_TYPE.OUT_NUMBER_DISPLAY) {
//             node = new NumberDisplay(element.id)
//         }
//         if (element.type == BLOCK_TYPE.OP_SUM) {
//             node = new Sum(element.id)
//         }
//         if (node)
//             this.childNode.push(node);
//     }
//     set_port(sourceId: string, targetId: string, sourcePortIndex?, targetPortIndex?) {
//         if (!sourcePortIndex) sourcePortIndex = 0
//         if (!targetPortIndex) targetPortIndex = 0
//         let tmp = this.childNode[this.idToIndex[targetId]]
//         let target: ISub
//         if (isISub(tmp)) {
//             target = tmp
//         }
//         else {

//         }
//         tmp = this.childNode[this.idToIndex[sourceId]]
//         let source: IPub
//         if (isIPub(tmp)) {
//             source = tmp
//         }
//         else {

//         }
//         target.addValPort(targetPortIndex, source.outValPorts[sourcePortIndex])
//         let notiPort = new NotiPort
//         notiPort.addReciver(target)
//         source.addNotiPort(sourcePortIndex, notiPort)

//     }

//     compile() {
//         this.childNode.forEach(element => {
//             if (isIPub(element)) {
//                 element.notifyAllPort();
//             }
//         });
//         this.childNode.forEach(element => {

//             if (isDisplayable(element)) {
//                 element.display();
//             }

//         });

//     }
// }
export function isDisplayable(object: any): object is IDisplay {
    return "display" in object
}
export function isISub(object: any): object is ISub {
    return "update" in object
}
export function isIPub(object: any): object is IPub {
    return "notifyAllPort" in object
}
export interface IBlock {
    id: string
    type: string
}
export class NotiPort {
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
export class Bool extends Obj {
    value: boolean
}
export class Number extends Obj {
    value: number
}

export interface ISub extends IBlock {
    inValPorts: Array<Number>
    addValPort: (index: number, obj: Obj) => any
    update: () => any
}

export interface IPub extends IBlock {
    outValPorts: Array<Obj>
    notiPorts: NotiPort[];
    addNotiPort: (index: number, port: NotiPort) => any
    notifyAllPort: () => any
}

interface IDisplay {
    display: () => any
}
function notifyAllPort(notiPorts: NotiPort[]) {
    notiPorts.forEach(port => {
        if (port)
            port.notify();
    });
}
export abstract class InputBlock implements IPub {
    type = BLOCK_CATE.IN_BLOCK
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
        notifyAllPort(this.notiPorts)
    }
    deleteAllPort() {
        this.notiPorts = []
    }

}

export abstract class OutputBlock implements ISub, IDisplay {
    type = BLOCK_CATE.OUT_BLOCK
    id: string
    inValPorts: Array<Obj>
    // ports: NotiPort[] = [];
    constructor(id: string) {
        this.id = id
    }
    addValPort(index: number, obj: Obj) {
        this.inValPorts[index] = obj
    }
    updateContent() {

    }

    update() {
        try {
            this.updateContent();
            this.display();
        }
        catch (err) {
            console.log(err)
        }

    }
    displayContent() {

    }
    display() {
        try {
            this.displayContent();
        }
        catch (err) {
            console.log(err)
        }
    }

}

export abstract class InOutBlock implements ISub, IPub {
    type = BLOCK_CATE.IN_OUT_BLOCK
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

    updateContent() {

    }

    update() {
        let check = 0
        this.inValPorts.forEach(portVal => {
            if (portVal == null) {
                console.log("inValPorts is null")
                check = 1
            }
        });
        if (check == 0) {
            this.updateContent();
        }

    }


    addNotiPort(index: number, port: NotiPort) {
        this.notiPorts[index] = port
    }
    notifyAllPort() {
        notifyAllPort(this.notiPorts)
    }
}

