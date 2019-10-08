import * as io from 'socket.io-client';
const socket = io('https://api.vtbs.moe');
import { VtbInfo } from '../../../interfaces';

export class VtbInfoService {
    private vtbInfos: Map<number, VtbInfo> = new Map<number, VtbInfo>();
    private update: Function = null;
    constructor() {
        socket.on('info', (infos: VtbInfo[]) => {
            infos.forEach((info: VtbInfo) => {
                this.vtbInfos.set(info.mid, info);
            })
            if (this.update) {
                this.update([...this.vtbInfos.values()]);
            }
        })
    }
    onUpdate(callback: (vtbInfos: VtbInfo[]) => void) {
        this.update = callback;

    }
    getVtbInfos(): VtbInfo[] {
        return [...this.vtbInfos.values()];
    }
}