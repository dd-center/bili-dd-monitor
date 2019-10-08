import * as setting from 'electron-settings';
import { FollowList } from '../../../interfaces';
const getFollowLists = (): FollowList[] => {
    const followLists: FollowList[] = JSON.parse(<string>setting.get('followLists'));
    return followLists;
}
const addFollowList = (name: string) => {
    let followLists: FollowList[] = JSON.parse(<string>setting.get('followLists'));
    followLists.push({
        id: followLists[followLists.length - 1].id + 1,
        name,
        mids: []
    });
    setting.set('followLists', JSON.stringify(followLists));
}
const deleteFollowList = (id: number) => {
    let followLists: FollowList[] = JSON.parse(<string>setting.get('followLists'));
    followLists = followLists.filter((followList: FollowList) => followList.id != id);
    setting.set('followLists', JSON.stringify(followLists));
}
const renameFollowList = (id: number, name: string) => {
    let followLists: FollowList[] = JSON.parse(<string>setting.get('followLists'));
    followLists = followLists.map((followList: FollowList) => {
        if (followList.id == id) {
            return ({
                ...followList,
                name
            })
        }
    });
    setting.set('followLists', JSON.stringify(followLists));
}
export {
    getFollowLists,
    addFollowList,
    deleteFollowList,
    renameFollowList
}