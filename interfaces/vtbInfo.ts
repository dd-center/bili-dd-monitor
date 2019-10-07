interface LastLive {
    online?: number;
    time?: number;
}
export interface VtbInfo {
    mid?: number;
    uuid?: string;
    uname?: string;
    video?: number;
    sign?: string;//介绍
    face?: string;//头像
    rise?: number;//粉丝变化
    topPhoto?: string;
    archiveView?: number;//播放量
    notice?: string;
    roomid?: number;//直播间
    follower?: number;//粉丝
    liveStatus?: number;//直播状态
    recordNum?: number;
    guardNum?: number;//舰团
    liveNum?: number;
    averageLive?: number;
    weekLive?: number;
    guardChange?: number;
    areaRank?: number;
    lastLive?: LastLive;//上次直播 [online,time]
    bot?: number;
    guardType?: number[];//舰队 [总督，提督，舰长]
    online?: number;//人气
    title?: string;//直播间标题
    time?: number;
}