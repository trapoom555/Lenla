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
    }
    System.prototype.add_element = function (element) {
        this.idToIndex[element.id] = this.childNode.length;
        var node;
        if (element.type == stringConfig_1.BLOCK_TYPE.IN_CONSTANT) {
            node = new InBlock.Constant(element.id, element.data.info[0].value);
        }
        if (element.type == stringConfig_1.BLOCK_TYPE.OUT_NUMBER_DISPLAY) {
            node = new OutBlock.NumberDisplay(element.id);
        }
        if (element.type == stringConfig_1.BLOCK_TYPE.OUT_BOOLEAN_DISPLAY) {
            node = new OutBlock.BoolDisplay(element.id);
        }
        if (element.type == stringConfig_1.BLOCK_TYPE.OP_SUM) {
            node = new InOutBlock.Sum(element.id, element.data.port["in"]);
        }
        if (element.type == stringConfig_1.BLOCK_TYPE.OP_ADD) {
            node = new InOutBlock.Plus(element.id);
        }
        // if (element.type == BLOCK_TYPE.IN_VECTOR_2D) {
        //     node = new InBlock.Vector2D(element.id, element.data.valOut[0], element.data.valOut[1]);
        // }
        if (element.type == stringConfig_1.BLOCK_TYPE.CON_GREATER) {
            node = new InOutBlock.Greater(element.id);
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
        target.addValPort(targetPortIndex, source.outValPorts[sourcePortIndex]);
        var notiPort = new Block.NotiPort;
        notiPort.addReciver(target);
        source.addNotiPort(sourcePortIndex, notiPort);
    };
    System.prototype.compile = function () {
        this.childNode.forEach(function (element) {
            if (Block.isIPub(element)) {
                element.notifyAllPort();
            }
        });
        // this.childNode.forEach(element => {
        //     if (Block.isDisplayable(element)) {
        //         element.update();
        //     }
        // });
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
        port: {},
        flag: "node"
    };
    switch (type) {
        case stringConfig_1.BLOCK_TYPE.IN_CONSTANT:
            return __assign(__assign({}, obj), { data: {
                    // data: data.value,
                    info: [{
                            index: 0,
                            name: "value",
                            value: data.value,
                            type: stringConfig_1.INS_DISPLAY_TYPE.INPUT_NUM
                        }],
                    port: {
                        "in": [],
                        inType: [],
                        out: ["value"],
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
                        inType: ["num,num"],
                        out: ["value"],
                        outType: ["num"],
                        inEnable: [true, true]
                    }
                } });
        case stringConfig_1.BLOCK_TYPE.OUT_NUMBER_DISPLAY:
            return __assign(__assign({}, obj), { data: {
                    info: [{
                            index: 0,
                            name: "value",
                            value: null,
                            type: stringConfig_1.INS_DISPLAY_TYPE.OUT_NUM
                        }],
                    port: {
                        "in": ["num"],
                        inType: ["num"],
                        out: [],
                        outType: [],
                        inEnable: [true]
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
        case stringConfig_1.BLOCK_TYPE.OUT_NUMBER_DISPLAY:
            return {
                limitIn: [1, 1],
                choice: []
            };
    }
}
exports.blockConfig = blockConfig;