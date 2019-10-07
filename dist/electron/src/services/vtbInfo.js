"use strict";
exports.__esModule = true;
var io = require("socket.io-client");
var socket = io('https://api.vtbs.moe');
var VtbInfoService = (function () {
    function VtbInfoService() {
        var _this = this;
        this.vtbInfos = [];
        this.update = null;
        socket.on('info', function (infos) {
            _this.vtbInfos = _this.vtbInfos.concat(infos);
            if (_this.update) {
                _this.update(_this.vtbInfos);
            }
        });
    }
    VtbInfoService.prototype.onUpdate = function (callback) {
        this.update = callback;
    };
    VtbInfoService.prototype.getVtbInfos = function () {
        return this.vtbInfos;
    };
    return VtbInfoService;
}());
exports.VtbInfoService = VtbInfoService;
//# sourceMappingURL=vtbInfo.js.map