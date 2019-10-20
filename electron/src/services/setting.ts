import * as setting from 'electron-settings';

namespace Setting {
    export const setIsNotifiedOnStart = (isNotifiedOnstart: boolean): boolean => {
        console.log(isNotifiedOnstart)
        setting.set('isNotifiedOnstart', isNotifiedOnstart);
        return <boolean>setting.get('isNotifiedOnstart');
    }
    export const getIsNotifiedOnstart = (): boolean => {
        if (!setting.has('isNotifiedOnstart')) {
            setting.set('isNotifiedOnstart', false);
        }
        return <boolean>setting.get('isNotifiedOnstart');
    }
}
export { Setting }