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
exports.StringDisplay = exports.NumberDisplay = void 0;
var block_behavior_1 = require("./block_behavior");
var object_1 = require("./object");
var stringConfig_1 = require("./stringConfig");
var NumberDisplay = /** @class */ (function (_super) {
    __extends(NumberDisplay, _super);
    function NumberDisplay(id, type) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [null];
        _this.displayDetail = {
            color: "#000000",
            value: _this.value,
            type: stringConfig_1.CANVAS_DISPLAY_TYPE.OUT_STR,
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
    };
    NumberDisplay.prototype.setDisplayDetail = function (detail) {
        if (this.inValPorts[0] != null && this.inValPorts[0]) {
            console.log("port is not null");
            this.updateContent();
            this.displayDetail = __assign(__assign(__assign({}, this.displayDetail), { value: this.inValPorts[0].value }), detail);
        }
        else {
            console.log("port is null");
            this.displayDetail = __assign({ color: this.displayDetail.color, type: stringConfig_1.CANVAS_DISPLAY_TYPE.OUT_STR, position: this.displayDetail.position }, detail);
        }
        this.position = this.displayDetail.position;
    };
    NumberDisplay.prototype.log = function () {
        console.log("value is ".concat(this.value.toString()));
    };
    NumberDisplay.prototype.displayContent = function () {
        // this.setDisplayDetail({});
        // this.log();
    };
    return NumberDisplay;
}(block_behavior_1.OutputBlock));
exports.NumberDisplay = NumberDisplay;
var StringDisplay = /** @class */ (function (_super) {
    __extends(StringDisplay, _super);
    // port 0 <Number> : number to display
    function StringDisplay(id, type) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [null]; //value
        _this.displayDetail = {
            color: "#000000",
            value: _this.value,
            type: stringConfig_1.CANVAS_DISPLAY_TYPE.OUT_STR,
            position: _this.position
        };
        return _this;
    }
    StringDisplay.prototype.addValPort = function (index, val) {
        this.inValPorts[index] = val;
    };
    StringDisplay.prototype.updateContent = function () {
        if (this.inValPorts[0] instanceof object_1.Signal) {
            this.value = this.inValPorts[0].state;
            // console.log("is Signal")
        }
        console.log("value is " + this.value);
        this.displayDetail.value = this.value;
    };
    StringDisplay.prototype.setDisplayDetail = function (detail) {
        if (this.inValPorts[0] != null && this.inValPorts[0]) {
            console.log("port is not null");
            this.updateContent();
            this.displayDetail = __assign(__assign(__assign({}, this.displayDetail), { value: this.value }), detail);
        }
        else {
            console.log("port is null");
            this.displayDetail = __assign({ color: this.displayDetail.color, type: stringConfig_1.CANVAS_DISPLAY_TYPE.OUT_STR, position: this.displayDetail.position }, detail);
        }
        this.position = this.displayDetail.position;
    };
    StringDisplay.prototype.log = function () {
        console.log("value is ".concat(this.value.toString()));
    };
    StringDisplay.prototype.displayContent = function () {
        // this.setDisplayDetail({});
        // this.log();
    };
    return StringDisplay;
}(block_behavior_1.OutputBlock));
exports.StringDisplay = StringDisplay;
