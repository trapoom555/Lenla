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
exports.Vector2D = exports.Vector3D = exports.Constant = void 0;
var block_behavior_1 = require("./block_behavior");
var Constant = /** @class */ (function (_super) {
    __extends(Constant, _super);
    function Constant(id, value) {
        var _this = _super.call(this, id) || this;
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
var Vector3D = /** @class */ (function (_super) {
    __extends(Vector3D, _super);
    function Vector3D(id, x, y, z) {
        var _this = _super.call(this, id) || this;
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
var Vector2D = /** @class */ (function (_super) {
    __extends(Vector2D, _super);
    function Vector2D(id, x, y) {
        var _this = _super.call(this, id) || this;
        _this.notiPorts = [null, null];
        _this.outValPorts = [null, null];
        _this.x = x;
        _this.y = y;
        return _this;
    }
    Vector2D.prototype.deletePort = function () {
        this.notiPorts = [null, null];
    };
    return Vector2D;
}(block_behavior_1.InputBlock));
exports.Vector2D = Vector2D;
