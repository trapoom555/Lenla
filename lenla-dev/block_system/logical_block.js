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
exports.Condition = exports.NOT = exports.OR = exports.AND = exports.GreaterOrEqual = exports.Greater = void 0;
var block_behavior_1 = require("./block_behavior");
var object_1 = require("./object");
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
