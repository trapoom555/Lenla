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
exports.Sum = void 0;
var block_behavior_1 = require("./block_behavior");
var Sum = /** @class */ (function (_super) {
    __extends(Sum, _super);
    function Sum(id) {
        var _this = _super.call(this, id) || this;
        _this.inValPorts = [null, null];
        _this.outValPorts = [new block_behavior_1.Number];
        return _this;
    }
    Sum.prototype.update = function () {
        this.value = this.inValPorts[0].value + this.inValPorts[1].value;
        this.outValPorts[0].value = this.value;
        // console.log("sum updated")
    };
    return Sum;
}(block_behavior_1.InOutBlock));
exports.Sum = Sum;
