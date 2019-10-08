"use strict";
exports.__esModule = true;
var setting = require("electron-settings");
var setFollow = function (mid) {
    var follows = setting.get('follows');
    if (follows.includes(mid)) {
        setting.set('follows', follows.filter(function (follow) { return follow != mid; }));
    }
    else if (!follows.includes(mid)) {
        follows.push(mid);
        setting.set('follows', follows);
    }
};
exports.setFollow = setFollow;
var getFollows = function () {
    return setting.get('follows');
};
exports.getFollows = getFollows;
var initFollows = function () {
    if (!setting.has('follows')) {
        setting.set('follows', []);
    }
};
exports.initFollows = initFollows;
//# sourceMappingURL=follow.js.map