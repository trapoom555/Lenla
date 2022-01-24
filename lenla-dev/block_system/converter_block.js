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
exports.Signal2Num = void 0;
var block_behavior_1 = require("./block_behavior");
var object_1 = require("./object");
var Signal2Num = /** @class */ (function (_super) {
    __extends(Signal2Num, _super);
    function Signal2Num(id, type) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [new object_1.Signal()];
        _this.outValPorts = [new object_1.Number()];
        return _this;
    }
    Signal2Num.prototype.addValPort = function (index, sig) {
        while (this.inValPorts.length <= index) {
            this.inValPorts.push(null);
        }
        this.inValPorts[index] = sig;
    };
    Signal2Num.prototype.updateContent = function () {
        this.value = this.inValPorts[0].state ? 1 : 0;
        this.outValPorts[0].value = this.value;
    };
    return Signal2Num;
}(block_behavior_1.InOutBlock));
exports.Signal2Num = Signal2Num;
