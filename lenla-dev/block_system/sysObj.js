"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Sum = exports.NumberDisplay = exports.Vector2D = exports.Constant = exports.InOutBlock = exports.OutputBlock = exports.InputBlock = exports.System = void 0;
var blockType_1 = require("./blockType");
var System = /** @class */ (function () {
    function System() {
        this.idToIndex = {};
        this.childNode = [];
    }
    System.prototype.add_element = function (element) {
        this.idToIndex[element.id] = this.childNode.length;
        var node;
        if (element.type == blockType_1.NAME_TYPE.IN_CONSTANT) {
            node = new Constant(element.id, element.data.data);
        }
        if (element.type == blockType_1.NAME_TYPE.OUT_NUMBER_DISPLAY) {
            node = new NumberDisplay(element.id);
        }
        if (element.type == blockType_1.NAME_TYPE.OP_SUM) {
            node = new Sum(element.id);
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
        if (isISub(tmp)) {
            target = tmp;
        }
        else {
        }
        tmp = this.childNode[this.idToIndex[sourceId]];
        var source;
        if (isIPub(tmp)) {
            source = tmp;
        }
        else {
        }
        target.addValPort(targetPortIndex, source.outValPorts[sourcePortIndex]);
        var notiPort = new NotiPort;
        notiPort.addReciver(target);
        source.addNotiPort(sourcePortIndex, notiPort);
    };
    System.prototype.compile = function () {
        this.childNode.forEach(function (element) {
            if (isIPub(element)) {
                element.notifyAllPort();
            }
        });
        this.childNode.forEach(function (element) {
            if (isDisplayable(element)) {
                element.display();
            }
        });
    };
    return System;
}());
exports.System = System;
function isDisplayable(object) {
    return "display" in object;
}
function isISub(object) {
    return "update" in object;
}
function isIPub(object) {
    return "notifyAllPort" in object;
}
var NotiPort = /** @class */ (function () {
    function NotiPort() {
        this.recivers = [];
    }
    NotiPort.prototype.notify = function () {
        // console.log(`reciver is ${this.recivers}`)
        this.recivers.forEach(function (reciver) {
            reciver.update();
            // console.log(`reciver id ${reciver.id}`)
        });
    };
    NotiPort.prototype.addReciver = function (reciver) {
        this.recivers.push(reciver);
        // console.log(`add reciver id ${reciver.id}`)
    };
    return NotiPort;
}());
var Obj = /** @class */ (function () {
    function Obj() {
    }
    return Obj;
}());
var Int = /** @class */ (function (_super) {
    __extends(Int, _super);
    function Int() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Int;
}(Obj));
var Number = /** @class */ (function (_super) {
    __extends(Number, _super);
    function Number() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Number;
}(Obj));
var InputBlock = /** @class */ (function () {
    function InputBlock(id) {
        this.type = blockType_1.BLOCK_TYPE.IN_BLOCK;
        this.notiPorts = [];
        this.id = id;
    }
    InputBlock.prototype.addNotiPort = function (index, port) {
        this.notiPorts[index] = port;
    };
    InputBlock.prototype.notifyAllPort = function () {
        this.notiPorts.forEach(function (port) {
            port.notify();
        });
    };
    InputBlock.prototype.deleteAllPort = function () {
        this.notiPorts = [];
    };
    return InputBlock;
}());
exports.InputBlock = InputBlock;
var OutputBlock = /** @class */ (function () {
    // ports: NotiPort[] = [];
    function OutputBlock(id) {
        this.type = blockType_1.BLOCK_TYPE.OUT_BLOCK;
        this.id = id;
    }
    OutputBlock.prototype.addValPort = function (index, obj) {
        this.inValPorts[index] = obj;
    };
    OutputBlock.prototype.update = function () {
        this.display();
    };
    OutputBlock.prototype.display = function () {
    };
    return OutputBlock;
}());
exports.OutputBlock = OutputBlock;
var InOutBlock = /** @class */ (function () {
    function InOutBlock(id) {
        this.type = blockType_1.BLOCK_TYPE.IN_OUT_BLOCK;
        this.notiPorts = [];
        this.id = id;
    }
    InOutBlock.prototype.addValPort = function (index, obj) {
        this.inValPorts[index] = obj;
    };
    InOutBlock.prototype.update = function () {
    };
    InOutBlock.prototype.addNotiPort = function (index, port) {
        this.notiPorts[index] = port;
    };
    InOutBlock.prototype.notifyAllPort = function () {
        this.notiPorts.forEach(function (port) {
            port.notify();
        });
    };
    return InOutBlock;
}());
exports.InOutBlock = InOutBlock;
var Constant = /** @class */ (function (_super) {
    __extends(Constant, _super);
    function Constant(id, value) {
        var _this = _super.call(this, id) || this;
        _this.outValPorts = [null];
        _this.notiPorts = [];
        console.log("cleate Constant block");
        var num = new Number();
        num.value = value;
        _this.outValPorts = [num];
        return _this;
    }
    return Constant;
}(InputBlock));
exports.Constant = Constant;
var Vector2D = /** @class */ (function (_super) {
    __extends(Vector2D, _super);
    function Vector2D(id, x, y) {
        var _this = _super.call(this, id) || this;
        _this.notiPorts = [null, null];
        _this.x = x;
        _this.y = y;
        return _this;
    }
    Vector2D.prototype.addPort = function (portX, portY) {
        if (portX)
            this.notiPorts[0] = portX;
        if (portY)
            this.notiPorts[1] = portY;
    };
    Vector2D.prototype.deletePort = function () {
        this.notiPorts = [null, null];
    };
    return Vector2D;
}(InputBlock));
exports.Vector2D = Vector2D;
var NumberDisplay = /** @class */ (function (_super) {
    __extends(NumberDisplay, _super);
    // port 0 <Number> : number to display
    function NumberDisplay(id) {
        var _this = _super.call(this, id) || this;
        _this.inValPorts = [null];
        return _this;
    }
    NumberDisplay.prototype.addValPort = function (index, num) {
        this.inValPorts[index] = num;
    };
    NumberDisplay.prototype.update = function () {
        this.value = this.inValPorts[0].value;
        this.log();
    };
    NumberDisplay.prototype.log = function () {
        console.log("value is ".concat(this.value.toString()));
        // console.log(this.value)
    };
    NumberDisplay.prototype.display = function () {
        this.log();
    };
    return NumberDisplay;
}(OutputBlock));
exports.NumberDisplay = NumberDisplay;
var Sum = /** @class */ (function (_super) {
    __extends(Sum, _super);
    function Sum(id) {
        var _this = _super.call(this, id) || this;
        _this.inValPorts = [null, null];
        _this.outValPorts = [new Number];
        return _this;
    }
    Sum.prototype.update = function () {
        this.value = this.inValPorts[0].value + this.inValPorts[1].value;
        this.outValPorts[0].value = this.value;
        // console.log("sum updated")
    };
    return Sum;
}(InOutBlock));
exports.Sum = Sum;
