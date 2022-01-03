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
exports.BoolDisplay = exports.NumberDisplay = void 0;
var block_behavior_1 = require("./block_behavior");
var NumberDisplay = /** @class */ (function (_super) {
    __extends(NumberDisplay, _super);
    function NumberDisplay(id, type) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [null];
        _this.displayDetail = {
            color: _this.color,
            value: _this.value,
            type: "number",
            position: _this.position
        };
        return _this;
    }
    NumberDisplay.prototype.addValPort = function (index, num) {
        this.inValPorts[index] = num;
    };
    NumberDisplay.prototype.updateContent = function () {
        this.value = this.inValPorts[0].value;
        this.displayDetail.value = this.value;
        // this.log();
    };
    NumberDisplay.prototype.setDisplayDetail = function (detail) {
        this.displayDetail = __assign({ color: this.color, value: this.value, type: "number", position: this.position }, detail);
    };
    NumberDisplay.prototype.log = function () {
        console.log("value is ".concat(this.value.toString()));
        // console.log(this.value)
    };
    NumberDisplay.prototype.displayContent = function () {
        // this.log();
    };
    NumberDisplay.prototype.setColor = function (color) {
        this.color = color;
    };
    NumberDisplay.prototype.getDisplayData = function () {
        // console.log("position " + this.position.x + " " + this.position.y)
        try {
            // this.update()
            // this.log()
            // console.log("this valur is " + this.value)
            return this.displayDetail;
        }
        catch (_a) {
        }
    };
    return NumberDisplay;
}(block_behavior_1.OutputBlock));
exports.NumberDisplay = NumberDisplay;
var BoolDisplay = /** @class */ (function (_super) {
    __extends(BoolDisplay, _super);
    // port 0 <Number> : number to display
    function BoolDisplay(id, type) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [null];
        return _this;
    }
    BoolDisplay.prototype.addValPort = function (index, bool) {
        this.inValPorts[index] = bool;
    };
    BoolDisplay.prototype.updateContent = function () {
        this.value = this.inValPorts[0].value;
        this.log();
    };
    BoolDisplay.prototype.log = function () {
        console.log("value is ".concat(this.value.toString()));
        // console.log(this.value)
    };
    BoolDisplay.prototype.displayContent = function () {
        this.log();
    };
    return BoolDisplay;
}(block_behavior_1.OutputBlock));
exports.BoolDisplay = BoolDisplay;
