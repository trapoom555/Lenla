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
exports.Vector2d = exports.Signal = exports.Color = exports.Number = exports.String = exports.Bool = exports.Obj = void 0;
var Obj = /** @class */ (function () {
    function Obj() {
    }
    return Obj;
}());
exports.Obj = Obj;
var Int = /** @class */ (function (_super) {
    __extends(Int, _super);
    function Int() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Int;
}(Obj));
var Bool = /** @class */ (function (_super) {
    __extends(Bool, _super);
    function Bool(val) {
        if (val === void 0) { val = null; }
        var _this = _super.call(this) || this;
        if (val != null)
            _this.value = val;
        return _this;
    }
    return Bool;
}(Obj));
exports.Bool = Bool;
var String = /** @class */ (function (_super) {
    __extends(String, _super);
    function String(val) {
        if (val === void 0) { val = null; }
        var _this = _super.call(this) || this;
        if (val != null)
            _this.value = val;
        return _this;
    }
    return String;
}(Obj));
exports.String = String;
var Number = /** @class */ (function (_super) {
    __extends(Number, _super);
    function Number(val) {
        if (val === void 0) { val = null; }
        var _this = _super.call(this) || this;
        if (val instanceof Bool) {
            _this.value = val.value ? 1 : 0;
        }
        else if (typeof val == "number") {
            _this.value = val;
        }
        else {
            //arise error
        }
        return _this;
    }
    return Number;
}(Obj));
exports.Number = Number;
var Color = /** @class */ (function (_super) {
    __extends(Color, _super);
    function Color(val) {
        if (val === void 0) { val = null; }
        var _this = _super.call(this) || this;
        if (val != null)
            _this.hex = val;
        return _this;
    }
    Color.prototype.getRGB = function () {
    };
    return Color;
}(Obj));
exports.Color = Color;
var Signal = /** @class */ (function (_super) {
    __extends(Signal, _super);
    function Signal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = false;
        _this.risingCallback = [];
        _this.rNullIndex = [];
        _this.fNullIndex = [];
        _this.fallingCallback = [];
        return _this;
    }
    Signal.prototype.setState = function (newState) {
        this.lastState = this.state;
        this.state = newState;
        if (this.lastState == false && this.state == true) {
            this.risingCallback.forEach(function (fnc) {
                fnc();
            });
        }
        if (this.lastState == true && this.state == false) {
            this.fallingCallback.forEach(function (fnc) {
                fnc();
            });
        }
    };
    Signal.prototype.addRisingCallback = function (fnc) {
        if (this.rNullIndex != []) {
            var index = this.rNullIndex.pop();
            this.risingCallback[index] = fnc;
            return index;
        }
        this.risingCallback.push(fnc);
        return this.risingCallback.length - 1;
    };
    Signal.prototype.addFallingCallback = function (fnc) {
        if (this.fNullIndex != []) {
            var index = this.fNullIndex.pop();
            this.fallingCallback[index] = fnc;
            return index;
        }
        this.fallingCallback.push(fnc);
        return this.fallingCallback.length - 1;
    };
    Signal.prototype.removeRisingCallback = function (index) {
        this.risingCallback[index] = null;
        this.rNullIndex.push(index);
    };
    return Signal;
}(Obj));
exports.Signal = Signal;
var Vector2d = /** @class */ (function (_super) {
    __extends(Vector2d, _super);
    function Vector2d(x, y) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    return Vector2d;
}(Obj));
exports.Vector2d = Vector2d;
