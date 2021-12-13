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
exports.InOutBlock = exports.OutputBlock = exports.InputBlock = exports.Number = exports.Bool = exports.NotiPort = exports.isIPub = exports.isISub = exports.isDisplayable = void 0;
var blockType_1 = require("./blockType");
// import { Constant } from "./Input_block.js";
// export class System {
//     idToIndex: {}
//     childNode: Array<IBlock>
//     constructor() {
//         this.idToIndex = {};
//         this.childNode = [];
//     }
//     add_element(element) {
//         this.idToIndex[element.id] = this.childNode.length;
//         let node: IBlock
//         if (element.type == NAME_TYPE.IN_CONSTANT) {
//             node = new Constant(element.id, element.data.data);
//         }
//         if (element.type == NAME_TYPE.OUT_NUMBER_DISPLAY) {
//             node = new NumberDisplay(element.id)
//         }
//         if (element.type == NAME_TYPE.OP_SUM) {
//             node = new Sum(element.id)
//         }
//         if (node)
//             this.childNode.push(node);
//     }
//     set_port(sourceId: string, targetId: string, sourcePortIndex?, targetPortIndex?) {
//         if (!sourcePortIndex) sourcePortIndex = 0
//         if (!targetPortIndex) targetPortIndex = 0
//         let tmp = this.childNode[this.idToIndex[targetId]]
//         let target: ISub
//         if (isISub(tmp)) {
//             target = tmp
//         }
//         else {
//         }
//         tmp = this.childNode[this.idToIndex[sourceId]]
//         let source: IPub
//         if (isIPub(tmp)) {
//             source = tmp
//         }
//         else {
//         }
//         target.addValPort(targetPortIndex, source.outValPorts[sourcePortIndex])
//         let notiPort = new NotiPort
//         notiPort.addReciver(target)
//         source.addNotiPort(sourcePortIndex, notiPort)
//     }
//     compile() {
//         this.childNode.forEach(element => {
//             if (isIPub(element)) {
//                 element.notifyAllPort();
//             }
//         });
//         this.childNode.forEach(element => {
//             if (isDisplayable(element)) {
//                 element.display();
//             }
//         });
//     }
// }
function isDisplayable(object) {
    return "display" in object;
}
exports.isDisplayable = isDisplayable;
function isISub(object) {
    return "update" in object;
}
exports.isISub = isISub;
function isIPub(object) {
    return "notifyAllPort" in object;
}
exports.isIPub = isIPub;
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
exports.NotiPort = NotiPort;
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
var Bool = /** @class */ (function (_super) {
    __extends(Bool, _super);
    function Bool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bool;
}(Obj));
exports.Bool = Bool;
var Number = /** @class */ (function (_super) {
    __extends(Number, _super);
    function Number() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Number;
}(Obj));
exports.Number = Number;
function notifyAllPort(notiPorts) {
    notiPorts.forEach(function (port) {
        if (port)
            port.notify();
    });
}
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
        notifyAllPort(this.notiPorts);
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
        notifyAllPort(this.notiPorts);
    };
    return InOutBlock;
}());
exports.InOutBlock = InOutBlock;
