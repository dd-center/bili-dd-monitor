import * as io from 'socket.io-client';
const socket = io('https://api.vtbs.moe');
import { VtbInfo, FollowList } from '../../../interfaces';
import { FollowListService } from './followList';

export class VtbInfoService {
    private vtbInfos: Map<number, VtbInfo> = new Map<number, VtbInfo>();
    private update: Function = null;
    private _onceUpdate: Function = null;
    constructor() {
        socket.on('info', (infos: VtbInfo[]) => {
            infos.forEach((info: VtbInfo) => {
                this.vtbInfos.set(info.mid, info);
            })
            if (this.update) {
                this.update([...this.vtbInfos.values()]);
            }
            if (this._onceUpdate) {
                this._onceUpdate([...this.vtbInfos.values()]);
                this._onceUpdate = null;
            }
        })
    }
    onceUpdate(callback: (vtbInfos: VtbInfo[]) => void) {
        this._onceUpdate = callback;
    }
    onUpdate(callback: (vtbInfos: VtbInfo[]) => void) {
        this.update = callback;

    }
    getVtbInfos(): VtbInfo[] {
        return [...this.vtbInfos.values()].sort((vtbInfoA, vtbInfoB) => vtbInfoB.online - vtbInfoA.online);
    }
    getFollowedVtbInfos(): VtbInfo[] {
        let followedVtbInfos: VtbInfo[] = [];
        const vtbInfos: VtbInfo[] = this.getVtbInfos();
        FollowListService.getFollowLists().forEach((followList: FollowList) => {
            followedVtbInfos = [...followedVtbInfos, ...vtbInfos.filter((vtbInfo: VtbInfo) => followList.mids.includes(vtbInfo.mid))];
        })
        return followedVtbInfos.sort((vtbInfoA, vtbInfoB) => vtbInfoB.online - vtbInfoA.online);
    }
    getFollowedVtbMids(): number[] {
        let followedVtbMids: number[] = [];
        FollowListService.getFollowLists().forEach((followList: FollowList) => {
            followedVtbMids = [...followedVtbMids, ...followList.mids];
        })
        return followedVtbMids;
    }
}