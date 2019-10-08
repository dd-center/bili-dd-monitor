"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
var io = require("socket.io-client");
var socket = io('https://api.vtbs.moe');
var VtbInfoService = (function () {
    function VtbInfoService() {
        var _this = this;
        this.vtbInfos = new Map();
        this.update = null;
        socket.on('info', function (infos) {
            infos.forEach(function (info) {
                _this.vtbInfos.set(info.mid, info);
            });
            if (_this.update) {
                _this.update(__spread(_this.vtbInfos.values()));
            }
        });
    }
    VtbInfoService.prototype.onUpdate = function (callback) {
        this.update = callback;
    };
    VtbInfoService.prototype.getVtbInfos = function () {
        return __spread(this.vtbInfos.values());
    };
    return VtbInfoService;
}());
exports.VtbInfoService = VtbInfoService;
//# sourceMappingURL=vtbInfo.js.map