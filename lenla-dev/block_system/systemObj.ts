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
            node = new InBlock.Constant(element.id, element.type, element.data.info[0].value);

        }
        if (element.type == BLOCK_TYPE.OUT_NUMBER_DISPLAY) {
            node = new OutBlock.NumberDisplay(element.id, element.type)
            // console.log("333")
            if (Block.isDisplayable(node)) {
                // console.log("444")
                console.log({ position: element.data.info[1].value[0].value, color: element.data.info[1].value[1].value })
                node.setDisplayDetail({ position: element.data.info[1].value[0].value, color: element.data.info[1].value[1].value })
            }

        }
        if (element.type == BLOCK_TYPE.OUT_BOOLEAN_DISPLAY) {
            node = new OutBlock.BoolDisplay(element.id, element.type)
        }
        if (element.type == BLOCK_TYPE.OP_SUM) {
            node = new InOutBlock.Sum(element.id, element.type, element.data.port.in)
        }
        if (element.type == BLOCK_TYPE.OP_ADD) {
            node = new InOutBlock.Plus(element.id, element.type)
        }
        // if (element.type == BLOCK_TYPE.IN_VECTOR_2D) {
        //     node = new InBlock.Vector2D(element.id, element.data.valOut[0], element.data.valOut[1]);
        // }
        if (element.type == BLOCK_TYPE.CON_GREATER) {
            node = new InOutBlock.Greater(element.id, element.type);
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
        console.log("add val port for " + targetId)
        target.addValPort(targetPortIndex, source.outValPorts[sourcePortIndex])
        let notiPort = new Block.NotiPort
        notiPort.addReciver(target)
        source.addNotiPort(sourcePortIndex, notiPort)


    }
    delete_element(element_id: string) {

    }
    compile() {
        // console.log("////////////////////////////////////")
        console.log(this.childNode)
        this.childNode.forEach(element => {
            console.log(element.type)
            if (Block.isIPub(element)) {
                element.notifyAllPort();
                // console.log(element.type + " is notify")
            }
        });
        // console.log("done notify")
        this.childNode.forEach(element => {

            if (Block.isISub(element)) {
                element.update();
                // console.log(element.type + " is updatedddddd")
            }

        });
        // console.log("done update")

    }
}

export function createElementObj(id: string, type: string, position = { x: 100, y: 100 }, data: any = {}, name?: string) {
    let obj = {
        id,
        name,
        position,
        type,
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
                        inType: ["num", "num"],
                        out: ["value"],
                        outType: ["num"],
                        inEnable: [true, true, true],
                    },
                }
            }
        case BLOCK_TYPE.OUT_NUMBER_DISPLAY:
            return {
                ...obj,

                data:
                {
                    info: [
                        {
                            index: 0,
                            name: "value",
                            value: null,
                            type: INS_DISPLAY_TYPE.OUT_NUM
                        },
                        {
                            index: 1,
                            name: "display properties",
                            value: [
                                {
                                    index: 0,
                                    name: "position",
                                    value: { x: 0, y: 0 },
                                    type: INS_DISPLAY_TYPE.IN_VECTOR_2D
                                },
                                {
                                    index: 1,
                                    name: "letter color",
                                    value: "#FFFFFF",
                                    type: INS_DISPLAY_TYPE.IN_COLOR
                                },

                            ],
                            type: INS_DISPLAY_TYPE.LAYOUT_GROUP

                        }
                        // , {
                        //     index: 1,
                        //     name: "position",
                        //     value: null,
                        //     type: INS_DISPLAY_TYPE.IN_VECTOR_2D
                        // }
                    ],
                    port:
                    {
                        in: ["num"],
                        inType: ["num"],
                        out: [],
                        outType: [],
                        inEnable: [true],
                    },
                },

                display: {
                    type: "number",
                    valueName: "value",
                    value: 0
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