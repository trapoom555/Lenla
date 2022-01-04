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
var stringConfig_1 = require("./stringConfig");
var NumberDisplay = /** @class */ (function (_super) {
    __extends(NumberDisplay, _super);
    function NumberDisplay(id, type) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [null];
        _this.displayDetail = {
            color: "#FFFFFF",
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
        // console.log("this is updatd  fuck")
        // this.log();
    };
    NumberDisplay.prototype.setDisplayDetail = function (detail) {
        if (this.inValPorts[0] != null && this.inValPorts[0]) {
            console.log("port is not null");
            this.updateContent();
            console.log(this.value);
            this.displayDetail = __assign(__assign(__assign({}, this.displayDetail), { value: this.inValPorts[0].value }), detail);
            console.log("position: ");
            console.log(this.displayDetail.position);
        }
        else {
            console.log("port is null");
            this.displayDetail = __assign({ color: this.displayDetail.color, type: stringConfig_1.CANVAS_DISPLAY_TYPE.OUT_STR, position: this.displayDetail.position }, detail);
            console.log(this.displayDetail.position);
        }
        this.position = this.displayDetail.position;
    };
    NumberDisplay.prototype.log = function () {
        console.log("value is ".concat(this.value.toString()));
        // console.log(this.value)
    };
    NumberDisplay.prototype.displayContent = function () {
        // this.setDisplayDetail({});
        // this.log();
    };
    NumberDisplay.prototype.getDisplayData = function () {
        // console.log("position " + this.position.x + " " + this.position.y)
        try {
            // this.update()
            // this.log()
            // if (this.inValPorts[0] != null && this.inValPorts[0]) {
            //     console.log("port is not null   -- " + this.inValPorts[0].value)
            // }
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
