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
exports.Vector3D = exports.Vector2D = exports.BasicButton = exports.Constant = void 0;
var block_behavior_1 = require("./block_behavior");
var object_1 = require("./object");
var stringConfig_1 = require("./stringConfig");
var Constant = /** @class */ (function (_super) {
    __extends(Constant, _super);
    function Constant(id, type, value) {
        var _this = _super.call(this, id, type) || this;
        _this.outValPorts = [null];
        _this.notiPorts = [];
        console.log("cleate Constant block");
        var num = new object_1.Number();
        num.value = value;
        _this.outValPorts = [num];
        return _this;
    }
    return Constant;
}(block_behavior_1.InputBlock));
exports.Constant = Constant;
var BasicButton = /** @class */ (function (_super) {
    __extends(BasicButton, _super);
    // position = new Vector2d(0, 0)
    function BasicButton(id, type, initState) {
        if (initState === void 0) { initState = false; }
        var _this = _super.call(this, id, type) || this;
        _this.inValPorts = [new object_1.Bool(false), new object_1.Color("#F8DE7E"), new object_1.Color("#7E7E7E"), new object_1.Number(0)];
        //initial state,on color,off color,button type(0->toggle,1-> hold to on,2->hold to off)
        _this.outValPorts = [new object_1.Signal];
        _this.inValPorts[0] = initState;
        _this.state = initState;
        _this.displayDetail = {
            off_color: _this.inValPorts[1].hex,
            on_color: _this.inValPorts[2].hex,
            state: initState,
            init: initState,
            type: stringConfig_1.CANVAS_DISPLAY_TYPE.IN_BASIC_BUTTON,
            position: _this.position
        };
        return _this;
    }
    BasicButton.prototype.setState = function (val) {
        this.state = val;
        this.outValPorts[0].setState(val);
        this.update();
    };
    BasicButton.prototype.addValPort = function (index, num) {
        this.inValPorts[index] = num;
    };
    BasicButton.prototype.updateContent = function () {
        // this.value = this.inValPorts[0].value
        this.displayDetail.state = this.state;
        // console.log(this.state)
    };
    BasicButton.prototype.setDisplayDetail = function (detail) {
        if (this.inValPorts[0] != null && this.inValPorts[0]) {
            console.log("port is not null");
            this.updateContent();
            this.displayDetail = __assign(__assign(__assign({}, this.displayDetail), { state: this.inValPorts[0].value }), detail);
        }
        else {
            console.log("port is null");
            this.displayDetail = __assign(__assign(__assign({}, this.displayDetail), { type: stringConfig_1.CANVAS_DISPLAY_TYPE.IN_BASIC_BUTTON, position: this.displayDetail.position }), detail);
        }
        this.position = this.displayDetail.position;
    };
    return BasicButton;
}(block_behavior_1.InOutDisplay));
exports.BasicButton = BasicButton;
// export class Slider extends InputDisplay {
//     public value: number;
//     notiPorts = [null];
//     outValPorts: Array<Number> = [null, null];
//     constructor(id: string, type: string, x: number, y: number) {
//         super(id, type);
//         this.x = x
//         this.y = y
//         this.outValPorts = [new Number, new Number]
//         this.outValPorts[0].value = x
//         this.outValPorts[1].value = y
//         console.log("cleate slider block");
//     }
//     deletePort() {
//         this.notiPorts = [null, null]
//     }
// }
var Vector2D = /** @class */ (function (_super) {
    __extends(Vector2D, _super);
    function Vector2D(id, type, x, y) {
        var _this = _super.call(this, id, type) || this;
        _this.notiPorts = [null, null];
        _this.outValPorts = [null, null];
        _this.x = x;
        _this.y = y;
        _this.outValPorts = [new object_1.Number, new object_1.Number];
        _this.outValPorts[0].value = x;
        _this.outValPorts[1].value = y;
        console.log("cleate 2d vector block");
        return _this;
    }
    Vector2D.prototype.deletePort = function () {
        this.notiPorts = [null, null];
    };
    return Vector2D;
}(block_behavior_1.InputBlock));
exports.Vector2D = Vector2D;
var Vector3D = /** @class */ (function (_super) {
    __extends(Vector3D, _super);
    function Vector3D(id, type, x, y, z) {
        var _this = _super.call(this, id, type) || this;
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
