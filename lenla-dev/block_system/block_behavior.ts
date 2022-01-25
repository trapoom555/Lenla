
import { Vector2D } from "./Input_block";
import { BLOCK_TYPE, BLOCK_CATE } from "./stringConfig";
import { Number, Color, Bool, Signal, Obj, Vector2d } from "./object";

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
        this.recivers.forEach(reciver => {
            reciver.update();
        });
    }
    addReciver(reciver: ISub) {
        this.recivers.push(reciver);
    }

}

export interface ISub extends IBlock {
    inValPorts: Array<Obj>
    addValPort: (index: number, obj: Obj) => any
    update: () => any
}

export interface IPub extends IBlock {
    outValPorts: Array<Obj>
    notiPorts: NotiPort[];
    addPortReciver: (index: number, reciver: ISub) => any
    // getNotiPort: (index: number, port: NotiPort) => any
    notifyAllPort: () => any
}

export interface IDisplay {
    display: () => any
    getDisplayData()
    position: Vector2d
    setDisplayDetail(detail: any)
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
    addPortReciver(index: number, reciver: ISub) {
        if (index >= this.notiPorts.length) {
            this.notiPorts.push(new NotiPort)
        }
        this.notiPorts[index].addReciver(reciver)
    }
    notifyAllPort() {
        notifyAllPort(this.notiPorts)
    }
    deleteAllPort() {
        this.notiPorts = []
    }

}


export abstract class InputDisplay implements IPub, IDisplay {
    // type = BLOCK_CATE.IN_BLOCK
    id: string
    notiPorts: NotiPort[] = [];
    position: Vector2d = new Vector2d(0, 0)
    outValPorts: Array<Obj>
    type: string
    displayDetail = {}
    constructor(id: string, type: string) {
        this.id = id
        this.type = type
    }
    addPortReciver(index: number, reciver: ISub) {
        if (index >= this.notiPorts.length) {
            this.notiPorts.push(new NotiPort)
        }
        this.notiPorts[index].addReciver(reciver)
    }
    notifyAllPort() {
        notifyAllPort(this.notiPorts)
    }
    deleteAllPort() {
        this.notiPorts = []
    }
    setDisplayDetail(detail: any) {
        this.displayDetail = { ...this.displayDetail, ...detail }
    }
    displayContent() {

    }
    display() {
        try {
            this.displayContent();
        }
        catch (err) {
            //console.log(err)
        }
    }
    getDisplayData() {

    }

}
export abstract class OutputBlock implements ISub, IDisplay {
    // type = BLOCK_CATE.OUT_BLOCK
    id: string
    inValPorts: Array<Obj>
    position: Vector2d = new Vector2d(0, 0)
    displayDetail = {}
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

    // setDisplayPosition(x: number, y: number) {
    //     this.position.x = x
    //     this.position.y = y

    // }
    setDisplayDetail(detail: any) {
        this.displayDetail = { ...this.displayDetail, ...detail }
    }
    update() {
        try {
            this.updateContent();
            this.display();
            this.setDisplayDetail({})
        }
        catch (err) {
            // //console.log(err)
        }

    }
    displayContent() {

    }
    display() {
        try {
            this.displayContent();
        }
        catch (err) {
            //console.log(err)
        }
    }
    getDisplayData() {
        try {

            return this.displayDetail
        }
        catch {

        }

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

        while (this.inValPorts.length <= index) {
            this.inValPorts.push(null)
        }
        this.inValPorts[index] = obj

    }
    // addValNum(index: number, obj: Obj) {

    //     while (this.inValPorts.length <= index) {
    //         this.inValPorts.push(null)
    //     }
    //     this.inValPorts[index] = obj

    // }
    updateContent() {

    }

    update() {

        try {
            this.updateContent();
            this.notifyAllPort();
        }
        catch (err) {
            //console.log(err)
        }

    }


    addPortReciver(index: number, reciver: ISub) {
        if (index >= this.notiPorts.length) {
            this.notiPorts.push(new NotiPort)
        }
        this.notiPorts[index].addReciver(reciver)
    }
    notifyAllPort() {
        notifyAllPort(this.notiPorts)
    }
}

export abstract class InOutDisplay extends InOutBlock implements IDisplay {
    id: string
    inValPorts: Array<Obj>
    notiPorts: NotiPort[] = [];
    outValPorts: Array<Obj>
    displayDetail = {}
    position: Vector2d = new Vector2d(0, 0)
    type: string
    constructor(id: string, type: string) {
        super(id, type);
    }
    addValPort(index: number, obj: Obj) {

        while (this.inValPorts.length <= index) {
            this.inValPorts.push(null)
        }
        this.inValPorts[index] = obj

    }
    addPortReciver(index: number, reciver: ISub) {
        if (index >= this.notiPorts.length) {
            this.notiPorts.push(new NotiPort)
        }
        this.notiPorts[index].addReciver(reciver)
    }

    setDisplayDetail(detail: any) {
        this.displayDetail = { ...this.displayDetail, ...detail }
    }

    displayContent() {

    }
    display() {
        try {
            this.displayContent();
        }
        catch (err) {
            //console.log(err)
        }
    }
    getDisplayData() {
        try {

            return this.displayDetail
        }
        catch {

        }

    }
}
