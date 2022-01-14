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
exports.Condition = exports.NOT = exports.OR = exports.AND = exports.GreaterOrEqual = exports.Greater = exports.Slider = exports.Sum = void 0;
var block_behavior_1 = require("./block_behavior");
var object_1 = require("./object");
var stringConfig_1 = require("./stringConfig");
var Sum = /** @class */ (function (_super) {
    __extends(Sum, _super);
    function Sum(id, type, ports_symbol) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [];
        _this.outValPorts = [new object_1.Number];
        _this.symbols = ports_symbol;
        for (var i = 0; i < _this.symbols.length; i++) {
            var tmp = new object_1.Number;
            tmp.value = 0;
            _this.inValPorts.push(tmp);
        }
        return _this;
    }
    Sum.prototype.addValPort = function (index, num) {
        while (this.inValPorts.length <= index) {
            var tmp = new object_1.Number;
            tmp.value = 0;
            this.inValPorts.push(tmp);
        }
        this.inValPorts[index] = num;
    };
    Sum.prototype.updateContent = function () {
        console.log(this.inValPorts);
        console.log("sum updated " + this.inValPorts[0].value + "," + this.inValPorts[1].value);
        this.value = 0;
        for (var i = 0; i < this.symbols.length; i++) {
            if (this.symbols[i] == "+") {
                this.value += this.inValPorts[i].value;
            }
            else if (this.symbols[i] == "-") {
                this.value -= this.inValPorts[i].value;
            }
            else {
                this.value += parseInt(this.symbols[i]);
            }
        }
        this.inValPorts[0].value + this.inValPorts[1].value;
        this.outValPorts[0].value = this.value;
        // console.log("sum updated")
    };
    return Sum;
}(block_behavior_1.InOutBlock));
exports.Sum = Sum;
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    // position = new Vector2d(0, 0)
    function Slider(id, type) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [new object_1.Number(0), new object_1.Number(100), new object_1.Number(50), new object_1.Number(1)]; //min max default step
        _this.outValPorts = [new object_1.Number];
        _this.displayDetail = {
            color: "#FFFFFF",
            value: _this.value,
            type: stringConfig_1.CANVAS_DISPLAY_TYPE.IN_SLIDE,
            position: _this.position
        };
        return _this;
    }
    Slider.prototype.setValue = function (val) {
        this.value = val;
    };
    Slider.prototype.addValPort = function (index, num) {
        this.inValPorts[index] = num;
    };
    Slider.prototype.updateContent = function () {
        // this.value = this.inValPorts[0].value
        this.displayDetail.value = this.value;
    };
    Slider.prototype.setDisplayDetail = function (detail) {
        if (this.inValPorts[0] != null && this.inValPorts[0]) {
            console.log("port is not null");
            this.updateContent();
            this.displayDetail = __assign(__assign(__assign({}, this.displayDetail), { value: this.inValPorts[0].value }), detail);
        }
        else {
            console.log("port is null");
            this.displayDetail = __assign({ type: stringConfig_1.CANVAS_DISPLAY_TYPE.OUT_STR, position: this.displayDetail.position }, detail);
        }
        this.position = this.displayDetail.position;
    };
    return Slider;
}(block_behavior_1.InOutDisplay));
exports.Slider = Slider;
var Greater = /** @class */ (function (_super) {
    __extends(Greater, _super);
    function Greater(id, type) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [null, null];
        _this.outValPorts = [new object_1.Bool];
        return _this;
    }
    Greater.prototype.updateContent = function () {
        this.value = this.inValPorts[0].value > this.inValPorts[1].value;
        this.outValPorts[0].value = this.value;
        // console.log("sum updated")
    };
    return Greater;
}(block_behavior_1.InOutBlock));
exports.Greater = Greater;
var GreaterOrEqual = /** @class */ (function (_super) {
    __extends(GreaterOrEqual, _super);
    function GreaterOrEqual(id, type) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [null, null];
        _this.outValPorts = [new object_1.Bool];
        return _this;
    }
    GreaterOrEqual.prototype.updateContent = function () {
        this.value = this.inValPorts[0].value >= this.inValPorts[1].value;
        this.outValPorts[0].value = this.value;
        // console.log("sum updated")
    };
    return GreaterOrEqual;
}(block_behavior_1.InOutBlock));
exports.GreaterOrEqual = GreaterOrEqual;
var AND = /** @class */ (function (_super) {
    __extends(AND, _super);
    function AND(id, type) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [null, null];
        _this.outValPorts = [new object_1.Bool];
        return _this;
    }
    AND.prototype.updateContent = function () {
        this.value = this.inValPorts[0].value && this.inValPorts[1].value;
        this.outValPorts[0].value = this.value;
        // console.log("sum updated")
    };
    return AND;
}(block_behavior_1.InOutBlock));
exports.AND = AND;
var OR = /** @class */ (function (_super) {
    __extends(OR, _super);
    function OR(id, type) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [null, null];
        _this.outValPorts = [new object_1.Bool];
        return _this;
    }
    OR.prototype.updateContent = function () {
        this.value = this.inValPorts[0].value || this.inValPorts[1].value;
        this.outValPorts[0].value = this.value;
        // console.log("sum updated")
    };
    return OR;
}(block_behavior_1.InOutBlock));
exports.OR = OR;
var NOT = /** @class */ (function (_super) {
    __extends(NOT, _super);
    function NOT(id, type) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [null];
        _this.outValPorts = [new object_1.Bool];
        return _this;
    }
    NOT.prototype.updateContent = function () {
        this.value = !this.inValPorts[0].value;
        this.outValPorts[0].value = this.value;
        // console.log("sum updated")
    };
    return NOT;
}(block_behavior_1.InOutBlock));
exports.NOT = NOT;
var Condition = /** @class */ (function (_super) {
    __extends(Condition, _super);
    function Condition(id, type) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [null, null];
        _this.outValPorts = [new object_1.Number];
        return _this;
    }
    Condition.prototype.updateContent = function () {
        this.value = this.inValPorts[0].value + this.inValPorts[1].value;
        this.outValPorts[0].value = this.value;
        // console.log("sum updated")
    };
    return Condition;
}(block_behavior_1.InOutBlock));
exports.Condition = Condition;
