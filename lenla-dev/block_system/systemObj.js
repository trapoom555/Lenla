"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.blockConfig = exports.createElementObj = exports.System = void 0;
var stringConfig_1 = require("./stringConfig");
var InBlock = require("./Input_block");
var Block = require("./block_behavior");
var OutBlock = require("./output_block");
var InOutBlock = require("./inout_block");
var System = /** @class */ (function () {
    function System() {
        this.idToIndex = {};
        this.childNode = [];
        this.blankSpace = 0;
    }
    System.prototype.add_element = function (element, fnc) {
        this.idToIndex[element.id] = this.childNode.length;
        var node;
        switch (element.type) {
            case stringConfig_1.BLOCK_TYPE.IN_CONSTANT:
                node = new InBlock.Constant(element.id, element.type, element.data.info[0].value);
                break;
            case stringConfig_1.BLOCK_TYPE.IN_BASIC_BUTTON:
                console.log(element.type);
                node = new InBlock.BasicButton(element.id, element.type);
                // console.log(element.data.info[4].value[0])
                if (Block.isDisplayable(node)) {
                    node.setDisplayDetail({ position: element.data.info[4].value[0].value });
                }
                break;
            case stringConfig_1.BLOCK_TYPE.OP_SUM:
                node = new InOutBlock.Sum(element.id, element.type, element.data.port["in"]);
                break;
            case stringConfig_1.BLOCK_TYPE.OP_PRODUCT:
                node = new InOutBlock.Product(element.id, element.type, element.data.port["in"]);
                break;
            case stringConfig_1.BLOCK_TYPE.CON_SIG2NUM:
                node = new InOutBlock.Signal2Num(element.id, element.type);
                break;
            case stringConfig_1.BLOCK_TYPE.OUT_NUMBER_DISPLAY:
                node = new OutBlock.NumberDisplay(element.id, element.type);
                // console.log("333")
                if (Block.isDisplayable(node)) {
                    // console.log("444")
                    console.log({ position: element.data.info[1].value[0].value, color: element.data.info[1].value[1].value });
                    node.setDisplayDetail({ position: element.data.info[1].value[0].value, color: element.data.info[1].value[1].value });
                }
                break;
            case stringConfig_1.BLOCK_TYPE.OUT_STRING_DISPLAY:
                node = new OutBlock.StringDisplay(element.id, element.type);
                // console.log("333")
                if (Block.isDisplayable(node)) {
                    node.setDisplayDetail({ position: element.data.info[0].value[0].value, color: element.data.info[0].value[1].value });
                }
                break;
        }
        if (node)
            this.childNode.push(node);
    };
    System.prototype.set_port = function (sourceId, targetId, sourcePortIndex, targetPortIndex) {
        if (!sourcePortIndex)
            sourcePortIndex = 0;
        if (!targetPortIndex)
            targetPortIndex = 0;
        var tmp = this.childNode[this.idToIndex[targetId]];
        var target;
        if (Block.isISub(tmp)) {
            target = tmp;
        }
        else {
        }
        tmp = this.childNode[this.idToIndex[sourceId]];
        var source;
        if (Block.isIPub(tmp)) {
            source = tmp;
        }
        else {
        }
        console.log("add val port for " + targetId);
        target.addValPort(targetPortIndex, source.outValPorts[sourcePortIndex]);
        var notiPort = new Block.NotiPort;
        notiPort.addReciver(target);
        source.addNotiPort(sourcePortIndex, notiPort);
    };
    System.prototype.delete_element = function (element_id) {
        this.blankSpace += 1;
        this.childNode[element_id] = null;
    };
    System.prototype.delete_port = function (sourceId, targetId, sourcePortIndex, targetPortIndex) {
    };
    System.prototype.compile = function () {
        // console.log("////////////////////////////////////")
        console.log(this.childNode);
        this.childNode.forEach(function (element) {
            console.log(element.type);
            if (Block.isIPub(element)) {
                element.notifyAllPort();
                // console.log(element.type + " is notify")
            }
        });
        // console.log("done notify")
        this.childNode.forEach(function (element) {
            if (Block.isISub(element)) {
                element.update();
                // console.log(element.type + " is updatedddddd")
            }
        });
        // console.log("done update")
    };
    return System;
}());
exports.System = System;
function createElementObj(id, type, position, data, name) {
    if (position === void 0) { position = { x: 100, y: 100 }; }
    if (data === void 0) { data = {}; }
    var obj = {
        id: id,
        name: name,
        position: position,
        type: type,
        flag: "node"
    };
    switch (type) {
        case stringConfig_1.BLOCK_TYPE.IN_CONSTANT:
            return __assign(__assign({}, obj), { data: {
                    // data: data.num,
                    info: [{
                            index: 0,
                            name: "num",
                            value: data.value,
                            type: stringConfig_1.INS_DISPLAY_TYPE.INPUT_NUM
                        }],
                    port: {
                        "in": [],
                        inType: [],
                        out: ["num"],
                        outType: ["num"],
                        inEnable: []
                    }
                } });
        case stringConfig_1.BLOCK_TYPE.OP_SUM:
            return __assign(__assign({}, obj), { data: {
                    info: [{
                            index: 0,
                            name: "sum result",
                            value: null,
                            type: stringConfig_1.INS_DISPLAY_TYPE.OUT_NUM
                        }],
                    symbol: ["+", "+"],
                    port: {
                        "in": ["+", "+"],
                        inType: ["num", "num"],
                        out: ["value"],
                        outType: ["num"],
                        inEnable: [true, true]
                    }
                } });
        case stringConfig_1.BLOCK_TYPE.OP_PRODUCT:
            return __assign(__assign({}, obj), { data: {
                    info: [],
                    symbol: ["*", "*"],
                    port: {
                        "in": ["*", "*"],
                        inType: ["num", "num"],
                        out: ["value"],
                        outType: ["num"],
                        inEnable: [true, true]
                    }
                } });
        case stringConfig_1.BLOCK_TYPE.CON_SIG2NUM:
            return __assign(__assign({}, obj), { data: {
                    info: [],
                    port: {
                        "in": ["signal"],
                        inType: ["signal"],
                        out: ["value"],
                        outType: ["num"],
                        inEnable: [true,]
                    }
                } });
        case stringConfig_1.BLOCK_TYPE.OUT_NUMBER_DISPLAY:
            return __assign(__assign({}, obj), { data: {
                    info: [
                        {
                            index: 0,
                            name: "num",
                            value: null,
                            type: stringConfig_1.INS_DISPLAY_TYPE.OUT_NUM
                        },
                        {
                            index: 1,
                            name: "display properties",
                            value: [
                                {
                                    index: 0,
                                    name: "position",
                                    value: { x: 0, y: 0 },
                                    type: stringConfig_1.INS_DISPLAY_TYPE.IN_VECTOR_2D
                                },
                                {
                                    index: 1,
                                    name: "letter color",
                                    value: "#000000",
                                    type: stringConfig_1.INS_DISPLAY_TYPE.INPUT_COLOR
                                },
                            ],
                            type: stringConfig_1.INS_DISPLAY_TYPE.LAYOUT_GROUP
                        }
                        // , {
                        //     index: 1,
                        //     name: "position",
                        //     value: null,
                        //     type: INS_DISPLAY_TYPE.IN_VECTOR_2D
                        // }
                    ],
                    port: {
                        "in": ["num"],
                        inType: ["num"],
                        out: [],
                        outType: [],
                        inEnable: [true]
                    }
                }, display: {
                    type: "number",
                    valueName: "num",
                    value: 0
                } });
        case stringConfig_1.BLOCK_TYPE.OUT_STRING_DISPLAY:
            return __assign(__assign({}, obj), { data: {
                    info: [
                        {
                            index: 0,
                            name: "display properties",
                            value: [
                                {
                                    index: 0,
                                    name: "position",
                                    value: { x: 0, y: 0 },
                                    type: stringConfig_1.INS_DISPLAY_TYPE.IN_VECTOR_2D
                                },
                                {
                                    index: 1,
                                    name: "letter color",
                                    value: "#000000",
                                    type: stringConfig_1.INS_DISPLAY_TYPE.INPUT_COLOR
                                },
                            ],
                            type: stringConfig_1.INS_DISPLAY_TYPE.LAYOUT_GROUP
                        }
                    ],
                    port: {
                        "in": ["in"],
                        inType: ["any"],
                        out: [],
                        outType: [],
                        inEnable: [true]
                    }
                } });
        case stringConfig_1.BLOCK_TYPE.IN_SLIDER:
            return __assign(__assign({}, obj), { data: {
                    // data: data.num,
                    info: [
                        {
                            index: 0,
                            name: "min",
                            value: 0,
                            type: stringConfig_1.INS_DISPLAY_TYPE.INPUT_NUM
                        },
                        {
                            index: 1,
                            name: "max",
                            value: 100,
                            type: stringConfig_1.INS_DISPLAY_TYPE.INPUT_NUM
                        },
                        {
                            index: 2,
                            name: "default",
                            value: 50,
                            type: stringConfig_1.INS_DISPLAY_TYPE.INPUT_NUM
                        },
                        {
                            index: 3,
                            name: "step",
                            value: 1,
                            type: stringConfig_1.INS_DISPLAY_TYPE.INPUT_NUM
                        },
                        {
                            index: 4,
                            name: "display properties",
                            value: [
                                {
                                    index: 0,
                                    name: "position",
                                    value: { x: 0, y: 0 },
                                    type: stringConfig_1.INS_DISPLAY_TYPE.IN_VECTOR_2D
                                },
                                {
                                    index: 1,
                                    name: "letter color",
                                    value: "#FFFFFF",
                                    type: stringConfig_1.INS_DISPLAY_TYPE.INPUT_COLOR
                                },
                            ],
                            type: stringConfig_1.INS_DISPLAY_TYPE.LAYOUT_GROUP
                        }
                    ],
                    port: {
                        "in": [],
                        inType: [],
                        out: ["num"],
                        outType: ["num"],
                        inEnable: []
                    }
                } });
        case stringConfig_1.BLOCK_TYPE.IN_BASIC_BUTTON:
            return __assign(__assign({}, obj), { data: {
                    // data: data.num,
                    info: [
                        {
                            index: 0,
                            name: "initial state",
                            value: 0,
                            type: stringConfig_1.INS_DISPLAY_TYPE.INPUT_BOOL
                        },
                        {
                            index: 1,
                            name: "on color",
                            value: '#F8DE7E',
                            type: stringConfig_1.INS_DISPLAY_TYPE.INPUT_COLOR
                        },
                        {
                            index: 2,
                            name: "of color",
                            Evalue: "#7E7E7E",
                            type: stringConfig_1.INS_DISPLAY_TYPE.INPUT_COLOR
                        },
                        {
                            index: 3,
                            name: "type",
                            value: 1,
                            type: stringConfig_1.INS_DISPLAY_TYPE.INPUT_NUM
                        },
                        {
                            index: 4,
                            name: "display properties",
                            value: [
                                {
                                    index: 0,
                                    name: "position",
                                    value: { x: 0, y: 0 },
                                    type: stringConfig_1.INS_DISPLAY_TYPE.IN_VECTOR_2D
                                },
                            ],
                            type: stringConfig_1.INS_DISPLAY_TYPE.LAYOUT_GROUP
                        }
                    ],
                    port: {
                        "in": [],
                        inType: [],
                        out: ["signal"],
                        outType: ["signal"],
                        inEnable: []
                    }
                } });
    }
}
exports.createElementObj = createElementObj;
function blockConfig(type) {
    switch (type) {
        case stringConfig_1.BLOCK_TYPE.IN_CONSTANT:
            return {
                limitIn: [0, 0],
                choice: []
            };
        case stringConfig_1.BLOCK_TYPE.OP_SUM:
            return {
                limitIn: [2, "inf"],
                choice: ["+", "-"],
                choiceType: ["num", "num"]
            };
        case stringConfig_1.BLOCK_TYPE.OP_PRODUCT:
            return {
                limitIn: [2, "inf"],
                choice: ["*", "/"],
                choiceType: ["num", "num"]
            };
        case stringConfig_1.BLOCK_TYPE.CON_SIG2NUM:
            return {
                limitIn: [1, 1],
                choice: []
            };
        case stringConfig_1.BLOCK_TYPE.OUT_NUMBER_DISPLAY:
            return {
                limitIn: [1, 1],
                choice: []
            };
        case stringConfig_1.BLOCK_TYPE.OUT_STRING_DISPLAY:
            return {
                limitIn: [1, 1],
                choice: []
            };
        case stringConfig_1.BLOCK_TYPE.IN_SLIDER:
            return {
                limitIn: [0, 0],
                choice: []
            };
        case stringConfig_1.BLOCK_TYPE.IN_BASIC_BUTTON:
            return {
                limitIn: [0, 0],
                choice: []
            };
    }
}
exports.blockConfig = blockConfig;
