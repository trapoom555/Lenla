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
exports.Power = exports.Log = exports.Product = exports.Sum = void 0;
var block_behavior_1 = require("./block_behavior");
var object_1 = require("./object");
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
        this.outValPorts[0].value = this.value;
        // console.log("sum updated")
    };
    return Sum;
}(block_behavior_1.InOutBlock));
exports.Sum = Sum;
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product(id, type, ports_symbol) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [];
        _this.outValPorts = [new object_1.Number];
        _this.symbols = ports_symbol;
        for (var i = 0; i < _this.symbols.length; i++) {
            var tmp = new object_1.Number;
            tmp.value = 1;
            _this.inValPorts.push(tmp);
        }
        return _this;
    }
    Product.prototype.addValPort = function (index, num) {
        while (this.inValPorts.length <= index) {
            var tmp = new object_1.Number;
            tmp.value = 1;
            this.inValPorts.push(tmp);
        }
        this.inValPorts[index] = num;
    };
    Product.prototype.updateContent = function () {
        this.value = 1;
        for (var i = 0; i < this.symbols.length; i++) {
            if (this.symbols[i] == "*") {
                this.value *= this.inValPorts[i].value;
            }
            else if (this.symbols[i] == "/") {
                this.value /= this.inValPorts[i].value;
            }
            else {
                this.value += parseInt(this.symbols[i]);
            }
        }
        this.outValPorts[0].value = this.value;
        // console.log("sum updated")
    };
    return Product;
}(block_behavior_1.InOutBlock));
exports.Product = Product;
var Log = /** @class */ (function (_super) {
    __extends(Log, _super);
    function Log(id, type) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [new object_1.Number, new object_1.Number(Math.E)]; //num,base 
        _this.outValPorts = [new object_1.Number];
        return _this;
    }
    Log.prototype.addValPort = function (index, num) {
        this.inValPorts[index] = num;
    };
    Log.prototype.updateContent = function () {
        this.value = Math.log(this.inValPorts[0].value) / Math.log(this.inValPorts[1].value);
        this.outValPorts[0].value = this.value;
    };
    return Log;
}(block_behavior_1.InOutBlock));
exports.Log = Log;
var Power = /** @class */ (function (_super) {
    __extends(Power, _super);
    function Power(id, type) {
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [new object_1.Number, new object_1.Number(Math.E)]; //base,power 
        _this.outValPorts = [new object_1.Number];
        return _this;
    }
    Power.prototype.addValPort = function (index, num) {
        this.inValPorts[index] = num;
    };
    Power.prototype.updateContent = function () {
        this.value = Math.pow(this.inValPorts[0].value, this.inValPorts[1].value);
        this.outValPorts[0].value = this.value;
    };
    return Power;
}(block_behavior_1.InOutBlock));
exports.Power = Power;
