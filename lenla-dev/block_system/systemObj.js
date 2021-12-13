"use strict";
exports.__esModule = true;
exports.System = void 0;
var blockType_1 = require("./blockType");
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
        if (element.type == blockType_1.NAME_TYPE.IN_CONSTANT) {
            node = new InBlock.Constant(element.id, element.data.data);
        }
        if (element.type == blockType_1.NAME_TYPE.OUT_NUMBER_DISPLAY) {
            node = new OutBlock.NumberDisplay(element.id);
        }
        if (element.type == blockType_1.NAME_TYPE.OUT_BOOLEAN_DISPLAY) {
            node = new OutBlock.BoolDisplay(element.id);
        }
        if (element.type == blockType_1.NAME_TYPE.OP_SUM) {
            node = new InOutBlock.Sum(element.id, element.data.portsIn);
        }
        if (element.type == blockType_1.NAME_TYPE.OP_ADD) {
            node = new InOutBlock.Plus(element.id);
        }
        if (element.type == blockType_1.NAME_TYPE.IN_VECTOR_2D) {
            node = new InBlock.Vector2D(element.id, element.data.valOut[0], element.data.valOut[1]);
        }
        if (element.type == blockType_1.NAME_TYPE.CON_GREATER) {
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
        this.childNode.forEach(function (element) {
            if (Block.isDisplayable(element)) {
                element.display();
            }
        });
    };
    return System;
}());
exports.System = System;
