"use strict";
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
var setting = require("electron-settings");
var getFollowLists = function () {
    var followLists = JSON.parse(setting.get('followLists'));
    return followLists;
};
exports.getFollowLists = getFollowLists;
var addFollowList = function (name) {
    var followLists = JSON.parse(setting.get('followLists'));
    followLists.push({
        id: followLists[followLists.length - 1].id + 1,
        name: name,
        mids: []
    });
    setting.set('followLists', JSON.stringify(followLists));
};
exports.addFollowList = addFollowList;
var deleteFollowList = function (id) {
    var followLists = JSON.parse(setting.get('followLists'));
    followLists = followLists.filter(function (followList) { return followList.id != id; });
    setting.set('followLists', JSON.stringify(followLists));
};
exports.deleteFollowList = deleteFollowList;
var renameFollowList = function (id, name) {
    var followLists = JSON.parse(setting.get('followLists'));
    followLists = followLists.map(function (followList) {
        if (followList.id == id) {
            return (__assign({}, followList, { name: name }));
        }
    });
    setting.set('followLists', JSON.stringify(followLists));
};
exports.renameFollowList = renameFollowList;
//# sourceMappingURL=followList.js.map