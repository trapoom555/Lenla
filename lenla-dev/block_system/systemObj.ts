import { NAME_TYPE } from "./blockType";
import * as InBlock from "./Input_block";
import * as Block from "./block_behavior";
import * as OutBlock from "./output_block";
import * as InOutBlock from "./inout_block";
export class System {
    idToIndex: {}
    childNode: Array<Block.IBlock>
    constructor() {
        this.idToIndex = {};
        this.childNode = [];
    }
    add_element(element) {
        this.idToIndex[element.id] = this.childNode.length;
        let node: Block.IBlock
        if (element.type == NAME_TYPE.IN_CONSTANT) {
            node = new InBlock.Constant(element.id, element.data.data);

        }
        if (element.type == NAME_TYPE.OUT_NUMBER_DISPLAY) {
            node = new OutBlock.NumberDisplay(element.id)
        }
        if (element.type == NAME_TYPE.OUT_BOOLEAN_DISPLAY) {
            node = new OutBlock.BoolDisplay(element.id)
        }
        if (element.type == NAME_TYPE.OP_SUM) {
            node = new InOutBlock.Sum(element.id, element.data.portsIn)
        }
        if (element.type == NAME_TYPE.OP_ADD) {
            node = new InOutBlock.Plus(element.id)
        }
        if (element.type == NAME_TYPE.IN_VECTOR_2D) {
            node = new InBlock.Vector2D(element.id, element.data.valOut[0], element.data.valOut[1]);
        }
        if (element.type == NAME_TYPE.CON_GREATER) {
            node = new InOutBlock.Greater(element.id);
        }
        if (node)
            this.childNode.push(node);
    }
    set_port(sourceId: string, targetId: string, sourcePortIndex?, targetPortIndex?) {
        if (!sourcePortIndex) sourcePortIndex = 0
        if (!targetPortIndex) targetPortIndex = 0
        let tmp = this.childNode[this.idToIndex[targetId]]
        let target: Block.ISub
        if (Block.isISub(tmp)) {
            target = tmp
        }
        else {

        }
        tmp = this.childNode[this.idToIndex[sourceId]]
        let source: Block.IPub
        if (Block.isIPub(tmp)) {
            source = tmp
        }
        else {

        }
        target.addValPort(targetPortIndex, source.outValPorts[sourcePortIndex])
        let notiPort = new Block.NotiPort
        notiPort.addReciver(target)
        source.addNotiPort(sourcePortIndex, notiPort)

    }

    compile() {
        this.childNode.forEach(element => {
            if (Block.isIPub(element)) {
                element.notifyAllPort();
            }
        });
        this.childNode.forEach(element => {

            if (Block.isDisplayable(element)) {
                element.display();
            }

        });

    }
}

export function createElementObj(id: string, type: string, position = { x: 100, y: 100 }, data: any = {}, name?: string) {
    let obj = {
        id,
        name,
        position,
        type,
        port: {},
        data: {},
        flag: "node"
    }
    switch (type) {
        case NAME_TYPE.IN_CONSTANT:
            return {
                ...obj,
                port:
                {
                    in: [],
                    inType: [],
                    out: ["value"],
                    outType: ["num"],
                    inEnable: [],
                },
                data:
                {
                    data: data.value
                }
            }
        case NAME_TYPE.OP_SUM:
            return {
                ...obj,
                port:
                {
                    in: ["+", "+"],
                    inType: ["num,num"],
                    out: ["value"],
                    outType: ["num"],
                    inEnable: [true, true],
                },
                data:
                {
                    symbol: ["+", "+"]
                }
            }
        case NAME_TYPE.OUT_NUMBER_DISPLAY:
            return {
                ...obj,
                port:
                {
                    in: ["num"],
                    inType: ["num"],
                    out: [],
                    outType: [],
                    inEnable: [true],
                },
                data:
                {

                }
            }
    }


}