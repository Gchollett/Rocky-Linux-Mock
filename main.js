const { ipcMain } = require('electron')
const bcrypt = require('bcrypt')
const fs = require('fs')
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

function createWindow () {

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    // titleBarStyle: "hidden"
  })

  win.loadFile('index.html')
  // win.setMenu(null)
  win.maximize()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  
  ipcMain.on('encrypt', async (_event,message) => {
    _event.returnValue = await bcrypt.hash(message,10)
  })
  ipcMain.on('compare', async (_event,m1,m2) =>{
    _event.returnValue = await bcrypt.compare(m1,m2);
  })
  ipcMain.on('store', (_event,filename,message) => {
    fs.appendFileSync(filename,message)
    _event.returnValue = null
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})