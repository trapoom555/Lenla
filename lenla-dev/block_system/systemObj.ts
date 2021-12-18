import { BLOCK_TYPE, INS_DISPLAY_TYPE } from "./stringConfig";
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
        if (element.type == BLOCK_TYPE.IN_CONSTANT) {
            node = new InBlock.Constant(element.id, element.data.info[0].value);

        }
        if (element.type == BLOCK_TYPE.OUT_NUMBER_DISPLAY) {
            node = new OutBlock.NumberDisplay(element.id)
        }
        if (element.type == BLOCK_TYPE.OUT_BOOLEAN_DISPLAY) {
            node = new OutBlock.BoolDisplay(element.id)
        }
        if (element.type == BLOCK_TYPE.OP_SUM) {
            node = new InOutBlock.Sum(element.id, element.data.port.in)
        }
        if (element.type == BLOCK_TYPE.OP_ADD) {
            node = new InOutBlock.Plus(element.id)
        }
        // if (element.type == BLOCK_TYPE.IN_VECTOR_2D) {
        //     node = new InBlock.Vector2D(element.id, element.data.valOut[0], element.data.valOut[1]);
        // }
        if (element.type == BLOCK_TYPE.CON_GREATER) {
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
        // this.childNode.forEach(element => {

        //     if (Block.isDisplayable(element)) {
        //         element.update();
        //     }

        // });

    }
}

export function createElementObj(id: string, type: string, position = { x: 100, y: 100 }, data: any = {}, name?: string) {
    let obj = {
        id,
        name,
        position,
        type,
        port: {},
        flag: "node"
    }
    switch (type) {
        case BLOCK_TYPE.IN_CONSTANT:
            return {
                ...obj,
                data:
                {
                    // data: data.value,
                    info: [{
                        index: 0,
                        name: "value",
                        value: data.value,
                        type: INS_DISPLAY_TYPE.INPUT_NUM
                    }],
                    port:
                    {
                        in: [],
                        inType: [],
                        out: ["value"],
                        outType: ["num"],
                        inEnable: [],
                    },

                }
            }
        case BLOCK_TYPE.OP_SUM:
            return {
                ...obj,

                data:
                {
                    info: [{
                        index: 0,
                        name: "sum result",
                        value: null,
                        type: INS_DISPLAY_TYPE.OUT_NUM
                    }],
                    symbol: ["+", "+"],
                    port:
                    {
                        in: ["+", "+"],
                        inType: ["num,num"],
                        out: ["value"],
                        outType: ["num"],
                        inEnable: [true, true],
                    },
                }
            }
        case BLOCK_TYPE.OUT_NUMBER_DISPLAY:
            return {
                ...obj,

                data:
                {
                    info: [{
                        index: 0,
                        name: "value",
                        value: null,
                        type: INS_DISPLAY_TYPE.OUT_NUM
                    }],
                    port:
                    {
                        in: ["num"],
                        inType: ["num"],
                        out: [],
                        outType: [],
                        inEnable: [true],
                    },
                }
            }
    }


}

export function blockConfig(type: string) {
    switch (type) {
        case BLOCK_TYPE.IN_CONSTANT:
            return {
                limitIn: [0, 0],
                choice: [],

            }
        case BLOCK_TYPE.OP_SUM:
            return {
                limitIn: [2, "inf"],
                choice: ["+", "-"],
                choiceType: ["num", "num"]
            }
        case BLOCK_TYPE.OUT_NUMBER_DISPLAY:
            return {
                limitIn: [1, 1],
                choice: []
            }
    }
}