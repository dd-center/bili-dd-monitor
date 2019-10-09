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
var setting = require("electron-settings");
var initFollowList = function () {
    if (!setting.has('followLists')) {
        var defaultList = { id: 0, name: '默认分组', mids: [] };
        setting.set('followLists', JSON.stringify([defaultList]));
    }
};
exports.initFollowList = initFollowList;
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
    setFollowList(followLists[followLists.findIndex(function (followList) { return followList.id == id; })].mids, 0);
    followLists = JSON.parse(setting.get('followLists'));
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
var follow = function (mid) {
    var followLists = JSON.parse(setting.get('followLists'));
    var listIndex = followLists.findIndex(function (followList) { return followList.id == 0; });
    var isFollow = false;
    followLists.forEach(function (followList) {
        var midIndex = followList.mids.findIndex(function (listMid) { return listMid == mid; });
        if (midIndex != -1) {
            followList.mids.splice(midIndex, 1);
            isFollow = true;
        }
    });
    if (!isFollow) {
        followLists[listIndex].mids.push(mid);
    }
    setting.set('followLists', JSON.stringify(followLists));
};
exports.follow = follow;
var setFollowList = function (mids, listId) {
    var _a;
    mids.forEach(function (mid) {
        follow(mid);
    });
    var followLists = JSON.parse(setting.get('followLists'));
    (_a = followLists[followLists.findIndex(function (followList) { return followList.id == listId; })].mids).push.apply(_a, __spread(mids));
    setting.set('followLists', JSON.stringify(followLists));
};
exports.setFollowList = setFollowList;
//# sourceMappingURL=followList.js.map