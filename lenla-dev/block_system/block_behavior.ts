
import { Vector2D } from "./Input_block";
import { BLOCK_TYPE, BLOCK_CATE } from "./stringConfig";

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
export class Vector2d extends Obj {
    x: number
    y: number
    constructor(x, y) {
        super();
        this.x = x
        this.y = y
    }

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
    getDisplayData()
    position: Vector2d
    setDisplayPosition(x: number, y: number)
}
function notifyAllPort(notiPorts: NotiPort[]) {
    notiPorts.forEach(port => {
        if (port)
            port.notify();
    });
}
export abstract class InputBlock implements IPub {
    // type = BLOCK_CATE.IN_BLOCK
    id: string
    notiPorts: NotiPort[] = [];
    outValPorts: Array<Obj>
    type: string
    constructor(id: string, type: string) {
        this.id = id
        this.type = type
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
    // type = BLOCK_CATE.OUT_BLOCK
    id: string
    inValPorts: Array<Obj>
    position: Vector2d = new Vector2d(0, 0)

    type: string
    constructor(id: string, type: string) {
        this.id = id
        this.type = type
    }
    addValPort(index: number, obj: Obj) {
        this.inValPorts[index] = obj
    }
    updateContent() {

    }
    setDisplayPosition(x: number, y: number) {
        this.position.x = x
        this.position.y = y

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
    getDisplayData() {

    }
}

export abstract class InOutBlock implements ISub, IPub {
    // type = BLOCK_CATE.IN_OUT_BLOCK
    id: string
    inValPorts: Array<Obj>
    notiPorts: NotiPort[] = [];
    outValPorts: Array<Obj>
    type: string
    constructor(id: string, type: string) {
        this.id = id
        this.type = type
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

