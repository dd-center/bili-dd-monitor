import * as setting from 'electron-settings';
import { FollowList } from '../../../interfaces';
namespace FollowListService {
    export const initFollowList = () => {
        if (!setting.has('followLists')) {
            const defaultList: FollowList = { id: 0, name: '默认分组', mids: [] };
            setting.set('followLists', JSON.stringify([defaultList]));
        }
    }
    export const getFollowLists = (): FollowList[] => {
        const followLists: FollowList[] = JSON.parse(<string>setting.get('followLists'));
        return followLists;
    }
    export const addFollowList = (name: string) => {
        let followLists: FollowList[] = JSON.parse(<string>setting.get('followLists'));
        followLists.push({
            id: followLists[followLists.length - 1].id + 1,
            name,
            mids: []
        });
        setting.set('followLists', JSON.stringify(followLists));
    }
    export const deleteFollowList = (id: number) => {
        let followLists: FollowList[] = JSON.parse(<string>setting.get('followLists'));
        setFollowList(followLists[followLists.findIndex((followList: FollowList) => followList.id == id)].mids, 0);
        followLists = JSON.parse(<string>setting.get('followLists'));
        followLists = followLists.filter((followList: FollowList) => followList.id != id);
        setting.set('followLists', JSON.stringify(followLists));
    }
    export const renameFollowList = (id: number, name: string) => {
        let followLists: FollowList[] = JSON.parse(<string>setting.get('followLists'));
        followLists = followLists.map((followList: FollowList) => {
            if (followList.id == id) {
                return ({
                    id,
                    name,
                    mids: followList.mids
                })
            } else {
                return followList;
            }
        });
        setting.set('followLists', JSON.stringify(followLists));
    }
    export const follow = (mid: number) => {
        let followLists: FollowList[] = JSON.parse(<string>setting.get('followLists'));
        const listIndex = followLists.findIndex((followList: FollowList) => followList.id == 0);
        let isFollow = false;
        followLists.forEach((followList: FollowList) => {
            const midIndex = followList.mids.findIndex((listMid: number) => listMid == mid);
            if (midIndex != -1) {
                followList.mids.splice(midIndex, 1);
                isFollow = true;
            }
        })
        if (!isFollow) {
            followLists[listIndex].mids.push(mid);
        }
        setting.set('followLists', JSON.stringify(followLists));
    }
    export const setFollowList = (mids: number[], listId: number) => {
        mids.forEach((mid: number) => {
            follow(mid);
        });
        let followLists: FollowList[] = JSON.parse(<string>setting.get('followLists'));
        followLists[followLists.findIndex((followList: FollowList) => followList.id == listId)].mids.push(...mids);
        setting.set('followLists', JSON.stringify(followLists));
    }
}
export {
    FollowListService
}