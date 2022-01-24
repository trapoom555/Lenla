import { BLOCK_TYPE, INS_DISPLAY_TYPE } from "./stringConfig";
import * as InBlock from "./Input_block";
import * as Block from "./block_behavior";
import * as OutBlock from "./output_block";
import * as InOutBlock from "./inout_block";
import * as ConverterBlock from "./converter_block"
import * as LogicBlock from "./logical_block"
export class System {
    idToIndex: {}
    childNode: Array<Block.IBlock>
    blankSpace: number
    constructor() {
        this.idToIndex = {};
        this.childNode = [];
        this.blankSpace = 0;
    }
    add_element(element, fnc) {
        this.idToIndex[element.id] = this.childNode.length;
        let node: Block.IBlock
        switch (element.type) {
            case BLOCK_TYPE.IN_CONSTANT:
                node = new InBlock.Constant(element.id, element.type, element.data.info[0].value);
                break
            case BLOCK_TYPE.IN_STRING:
                node = new InBlock.StringConstant(element.id, element.type, element.data.info[0].value);
                break
            case BLOCK_TYPE.IN_BASIC_BUTTON:
                console.log(element.type)
                node = new InBlock.BasicButton(element.id, element.type)
                // console.log(element.data.info[4].value[0])

                if (Block.isISub(node)) {
                    node.addValPort(1, element.data.info[1].value)
                    node.addValPort(2, element.data.info[2].value)


                }
                if (Block.isDisplayable(node)) {
                    node.setDisplayDetail({ position: element.data.info[4].value[0].value })
                    // console.log("help")

                }
                break
            case BLOCK_TYPE.OP_SUM:
                node = new InOutBlock.Sum(element.id, element.type, element.data.port.in)
                break
            case BLOCK_TYPE.OP_PRODUCT:
                node = new InOutBlock.Product(element.id, element.type, element.data.port.in)
                break
            case BLOCK_TYPE.OP_LOG:
                node = new InOutBlock.Log(element.id, element.type)
                break
            case BLOCK_TYPE.OP_POWER:
                node = new InOutBlock.Power(element.id, element.type)
                break
            case BLOCK_TYPE.CON_SIG2NUM:
                node = new ConverterBlock.Signal2Num(element.id, element.type)
                break
            case BLOCK_TYPE.OUT_NUMBER_DISPLAY:
                node = new OutBlock.NumberDisplay(element.id, element.type)
                if (Block.isDisplayable(node)) {
                    console.log({ position: element.data.info[1].value[0].value, color: element.data.info[1].value[1].value })
                    node.setDisplayDetail({ position: element.data.info[1].value[0].value, color: element.data.info[1].value[1].value })
                }
                break
            case BLOCK_TYPE.OUT_STRING_DISPLAY:
                node = new OutBlock.StringDisplay(element.id, element.type)
                // console.log("333")
                if (Block.isDisplayable(node)) {
                    node.setDisplayDetail({ position: element.data.info[0].value[0].value, color: element.data.info[0].value[1].value })
                }
                break
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
        source.addPortReciver(sourcePortIndex, target)


    }
    delete_element(element_id: string) {
        this.blankSpace += 1

        this.childNode[element_id] = null

    }

    delete_port(sourceId: string, targetId: string, sourcePortIndex?, targetPortIndex?) {

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
    const displaySetting = [
        {
            index: 0,
            name: "position",
            value: { x: 0, y: 0 },
            type: INS_DISPLAY_TYPE.IN_VECTOR_2D
        },


    ]
    const disLen = 1
    switch (type) {
        case BLOCK_TYPE.IN_CONSTANT:
            return {
                ...obj,
                data:
                {
                    // data: data.num,
                    info: [
                        {
                            index: 0,
                            name: "num",
                            value: 0,
                            type: INS_DISPLAY_TYPE.INPUT_NUM
                        }
                    ],
                    port:
                    {
                        in: [],
                        inType: [],
                        out: ["num"],
                        outType: ["num"],
                        inEnable: [],
                    },

                }
            }
        case BLOCK_TYPE.IN_STRING:
            return {
                ...obj,
                data:
                {
                    // data: data.num,
                    info: [{
                        index: 0,
                        name: "string",
                        value: data.value,
                        type: INS_DISPLAY_TYPE.IN_STR
                    }],
                    port:
                    {
                        in: [],
                        inType: [],
                        out: ["string"],
                        outType: ["string"],
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
                        inEnable: [true, true],
                    },
                }
            }
        case BLOCK_TYPE.OP_PRODUCT:
            return {
                ...obj,

                data:
                {
                    info: [],
                    symbol: ["*", "*"],
                    port:
                    {
                        in: ["*", "*"],
                        inType: ["num", "num"],
                        out: ["value"],
                        outType: ["num"],
                        inEnable: [true, true],
                    },
                }
            }
        case BLOCK_TYPE.OP_LOG:
            return {
                ...obj,

                data:
                {
                    info: [],
                    port:
                    {
                        in: ["num", "base"],
                        inType: ["num", "num"],
                        out: ["num"],
                        outType: ["num"],
                        inEnable: [true, true],
                    },
                }
            }
        case BLOCK_TYPE.OP_POWER:
            return {
                ...obj,

                data:
                {
                    info: [],
                    port:
                    {
                        in: ["base", "power"],
                        inType: ["num", "num"],
                        out: ["num"],
                        outType: ["num"],
                        inEnable: [true, true],
                    },
                }
            }
        case BLOCK_TYPE.CON_SIG2NUM:
            return {
                ...obj,

                data:
                {
                    info: [],
                    port:
                    {
                        in: ["signal"],
                        inType: ["signal"],
                        out: ["value"],
                        outType: ["num"],
                        inEnable: [true,],
                    },
                }
            }
        case BLOCK_TYPE.OUT_NUMBER_DISPLAY:
            console.log("fuck")
            return {
                ...obj,

                data:
                {
                    info: [
                        {
                            index: 0,
                            name: "num",
                            value: null,
                            type: INS_DISPLAY_TYPE.OUT_NUM
                        },
                        {
                            index: 1,
                            name: "display properties",
                            value: [
                                ...displaySetting,
                                {
                                    index: disLen,
                                    name: "color",
                                    value: "#000000",
                                    type: INS_DISPLAY_TYPE.INPUT_COLOR
                                },
                                {
                                    index: disLen + 1,
                                    name: "digit display",
                                    value: 2,
                                    type: INS_DISPLAY_TYPE.INPUT_NUM
                                },

                            ],
                            type: INS_DISPLAY_TYPE.LAYOUT_GROUP

                        },

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
                    valueName: "num",
                    value: 0
                }
            }
        case BLOCK_TYPE.OUT_STRING_DISPLAY:
            return {
                ...obj,

                data:
                {
                    info: [

                        {
                            index: 0,
                            name: "display properties",
                            value: [
                                ...displaySetting,
                                {
                                    index: disLen,
                                    name: "color",
                                    value: "#000000",
                                    type: INS_DISPLAY_TYPE.INPUT_COLOR
                                },
                            ],
                            type: INS_DISPLAY_TYPE.LAYOUT_GROUP

                        }
                    ],
                    port:
                    {
                        in: ["in"],
                        inType: ["any"],
                        out: [],
                        outType: [],
                        inEnable: [true],
                    },
                },

                // display: {
                //     type: "number",
                //     valueName: "num",
                //     value: 0
                // }
            }
        case BLOCK_TYPE.IN_SLIDER:
            return {
                ...obj,
                data:
                {
                    // data: data.num,
                    info: [
                        {
                            index: 0,
                            name: "min",
                            value: 0,
                            type: INS_DISPLAY_TYPE.INPUT_NUM
                        },
                        {
                            index: 1,
                            name: "max",
                            value: 100,
                            type: INS_DISPLAY_TYPE.INPUT_NUM
                        },
                        {
                            index: 2,
                            name: "default",
                            value: 50,
                            type: INS_DISPLAY_TYPE.INPUT_NUM
                        },
                        {
                            index: 3,
                            name: "step",
                            value: 1,
                            type: INS_DISPLAY_TYPE.INPUT_NUM
                        },
                        {
                            index: 4,
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
                                    type: INS_DISPLAY_TYPE.INPUT_COLOR
                                },

                            ],
                            type: INS_DISPLAY_TYPE.LAYOUT_GROUP

                        }
                    ],
                    port:
                    {
                        in: [],
                        inType: [],
                        out: ["num"],
                        outType: ["num"],
                        inEnable: [],
                    },

                }
            }
        case BLOCK_TYPE.IN_BASIC_BUTTON:
            return {
                ...obj,
                data:
                {
                    // data: data.num,
                    info: [
                        {
                            index: 0,
                            name: "initial state",
                            value: 0,
                            type: INS_DISPLAY_TYPE.INPUT_BOOL
                        },
                        {
                            index: 1,
                            name: "on color",
                            value: '#F8DE7E',
                            type: INS_DISPLAY_TYPE.INPUT_COLOR
                        },
                        {
                            index: 2,
                            name: "off color",
                            value: "#7E7E7E",
                            type: INS_DISPLAY_TYPE.INPUT_COLOR
                        },
                        {
                            index: 3,
                            name: "type",
                            value: 1,
                            type: INS_DISPLAY_TYPE.INPUT_NUM
                        },
                        {
                            index: 4,
                            name: "display properties",
                            value: [
                                ...displaySetting,

                            ],
                            type: INS_DISPLAY_TYPE.LAYOUT_GROUP

                        }
                    ],
                    port:
                    {
                        in: ["bool"],
                        inType: ["bool"],
                        out: ["signal"],
                        outType: ["signal"],
                        inEnable: [false],
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
        case BLOCK_TYPE.IN_STRING:
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
        case BLOCK_TYPE.OP_PRODUCT:
            return {
                limitIn: [2, "inf"],
                choice: ["*", "/"],
                choiceType: ["num", "num"]
            }
        case BLOCK_TYPE.OP_LOG:
            return {
                limitIn: [2, 2],
                choice: []
            }
        case BLOCK_TYPE.OP_POWER:
            return {
                limitIn: [2, 2],
                choice: []
            }
        case BLOCK_TYPE.CON_SIG2NUM:
            return {
                limitIn: [1, 1],
                choice: [],
            }
        case BLOCK_TYPE.OUT_NUMBER_DISPLAY:
            return {
                limitIn: [1, 1],
                choice: []
            }
        case BLOCK_TYPE.OUT_STRING_DISPLAY:
            return {
                limitIn: [1, 1],
                choice: []
            }
        case BLOCK_TYPE.IN_SLIDER:
            return {
                limitIn: [0, 0],
                choice: [],

            }
        case BLOCK_TYPE.IN_BASIC_BUTTON:
            return {
                limitIn: [0, 0],
                choice: [],

            }
    }
}