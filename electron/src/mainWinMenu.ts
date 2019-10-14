import { Menu, screen } from 'electron';
import { PlayerObj } from '../../interfaces';
const createMainWinMenu = (app: Electron.App, players: Map<number, PlayerObj>) => {
    const primaryDisplays: Electron.Display[] = screen.getAllDisplays();
    const autoSetPlayerBounds = (display: Electron.Display) => {
        const displayProportion = display.size.height / display.size.width;
        const playerNum = players.size;
        if (playerNum > 0) {
            const { width, height } = display.workAreaSize;
            const getProportion = (playerNum: number, rowNum: number) => {
                const colNum = Math.ceil(playerNum / rowNum);
                return (rowNum * 2) / (colNum * 3);
            }
            let betterRowNumber = -1;
            let min = 999999;
            for (let rowNum = 1; rowNum <= playerNum; rowNum++) {
                const deviation = Math.abs(getProportion(playerNum, rowNum) - displayProportion);
                if (deviation < min) {
                    min = deviation;
                    betterRowNumber = rowNum
                }
            }
            const playerWidth = Math.floor(width / Math.ceil(playerNum / betterRowNumber));
            const playerHeight = Math.floor(height / betterRowNumber);
            [...players.values()].forEach((player: PlayerObj, index: number) => {
                const row = Math.floor(index / Math.ceil(playerNum / betterRowNumber));
                const col = index % Math.ceil(playerNum / betterRowNumber);
                console.log(`${row} ${col}`)
                try {
                    player.playerWin.setBounds({ x: display.bounds.x + col * playerWidth, y: display.bounds.y + row * playerHeight, height: playerHeight, width: playerWidth })
                } catch (e) {
                    console.log(e);
                    console.log({ x: display.bounds.x + col * playerWidth, y: display.bounds.y + row * playerHeight, height: playerHeight, width: playerWidth })
                }
            })
        }
    }
    const template = [// { role: 'appMenu' }
        ...(process.platform === 'darwin' ? [{
            label: app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        }] : []), {
            label: '播放器',
            submenu: [
                {
                    label: '置顶显示所有播放器',
                    click: () => {
                        players.forEach((player: PlayerObj) => {
                            player.playerWin.focus();
                        })
                    }
                },
                {
                    label: '自动调整布局',
                    submenu: primaryDisplays.map((display: Electron.Display, index: number): Electron.MenuItem => (<Electron.MenuItem>{
                        label: `显示器${index.toString()}  ${display.size.width}X${display.size.height}`,
                        click: <Function>(() => {
                            return autoSetPlayerBounds(display);
                        })
                    }))
                },
                {
                    label: '关闭所有播放器',
                    click: () => {
                        players.forEach((player: PlayerObj) => {
                            player.playerWin.close();
                        })
                    }
                },
            ]
        }

    ];
    return Menu.buildFromTemplate(<any>template);
}
export {
    createMainWinMenu
}