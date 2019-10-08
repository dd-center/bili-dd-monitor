"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var electron_1 = require("electron");
var services_1 = require("./services");
var createMainWindow = function () {
    var win = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        resizable: false,
        maximizable: false,
        fullscreen: false,
        fullscreenable: false,
        title: 'DD监控室',
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL('http://localhost:4200');
    win.on('close', function () {
        electron_1.app.quit();
    });
    return win;
};
var createPlayerWinodw = function () {
    return null;
};
var mainWindowInit = new Promise(function (resolve) {
    electron_1.app.on('ready', function () {
        resolve(createMainWindow());
    });
});
var vtbInfosInit = new Promise(function (resolve) {
    var vtbInfosService = new services_1.VtbInfoService();
    setInterval(function () {
        if (vtbInfosService.getVtbInfos().length > 0) {
            resolve(vtbInfosService);
        }
    }, 50);
});
var settingInit = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        services_1.initFollows();
        return [2];
    });
}); };
var test = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2];
    });
}); };
var win = null;
var vtbInfosService;
(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, settingInit()];
            case 1:
                _a.sent();
                return [4, vtbInfosInit];
            case 2:
                vtbInfosService = _a.sent();
                return [4, mainWindowInit];
            case 3:
                win = _a.sent();
                electron_1.ipcMain.on('vtbInfos', function (event) {
                    event.returnValue = vtbInfosService.getVtbInfos();
                });
                electron_1.ipcMain.on('setFollow', function (event, value) {
                    services_1.setFollow(value);
                    event.returnValue = services_1.getFollows();
                });
                electron_1.ipcMain.on('getFollows', function (event) {
                    event.returnValue = services_1.getFollows();
                });
                return [2];
        }
    });
}); })();
//# sourceMappingURL=main.js.map