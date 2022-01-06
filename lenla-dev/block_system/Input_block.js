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
exports.Vector3D = exports.Vector2D = exports.Constant = void 0;
var block_behavior_1 = require("./block_behavior");
var Constant = /** @class */ (function (_super) {
    __extends(Constant, _super);
    function Constant(id, type, value) {
        var _this = _super.call(this, id, type) || this;
        _this.outValPorts = [null];
        _this.notiPorts = [];
        console.log("cleate Constant block");
        var num = new block_behavior_1.Number();
        num.value = value;
        _this.outValPorts = [num];
        return _this;
    }
    return Constant;
}(block_behavior_1.InputBlock));
exports.Constant = Constant;
// export class Slider extends InputDisplay {
//     public value: number;
//     notiPorts = [null];
//     outValPorts: Array<Number> = [null, null];
//     constructor(id: string, type: string, x: number, y: number) {
//         super(id, type);
//         this.x = x
//         this.y = y
//         this.outValPorts = [new Number, new Number]
//         this.outValPorts[0].value = x
//         this.outValPorts[1].value = y
//         console.log("cleate slider block");
//     }
//     deletePort() {
//         this.notiPorts = [null, null]
//     }
// }
var Vector2D = /** @class */ (function (_super) {
    __extends(Vector2D, _super);
    function Vector2D(id, type, x, y) {
        var _this = _super.call(this, id, type) || this;
        _this.notiPorts = [null, null];
        _this.outValPorts = [null, null];
        _this.x = x;
        _this.y = y;
        _this.outValPorts = [new block_behavior_1.Number, new block_behavior_1.Number];
        _this.outValPorts[0].value = x;
        _this.outValPorts[1].value = y;
        console.log("cleate 2d vector block");
        return _this;
    }
    Vector2D.prototype.deletePort = function () {
        this.notiPorts = [null, null];
    };
    return Vector2D;
}(block_behavior_1.InputBlock));
exports.Vector2D = Vector2D;
var Vector3D = /** @class */ (function (_super) {
    __extends(Vector3D, _super);
    function Vector3D(id, type, x, y, z) {
        var _this = _super.call(this, id, type) || this;
        _this.notiPorts = [null, null, null];
        _this.outValPorts = [null, null, null];
        _this.x = x;
        _this.y = y;
        _this.z = z;
        return _this;
    }
    Vector3D.prototype.deletePort = function () {
        this.notiPorts = [null, null];
    };
    return Vector3D;
}(block_behavior_1.InputBlock));
exports.Vector3D = Vector3D;
