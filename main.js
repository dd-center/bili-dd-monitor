const {app,BrowserWindow,ipcMain} = require('electron');
function createMainWindow() {
  win = new BrowserWindow({
    width:1200,
    height:800,
    resizable:false,
    maximizable:false,
    fullscreen:false,
    fullscreenable:false,
    title:'bili-dd-monitor',
    webPreferences: {
      nodeIntegration: true,
    },
  });
  //DEV
  win.loadURL('http://127.0.0.1:4200');
  win.on('close',()=>{
    win = null;
    app.quit();
  });
}

let win;

app.on("ready", createMainWindow);
app.on("activate", ()=>{
  if(!win){
    createMainWindow();
  }
});


