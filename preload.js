const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    encrypt: (m1) => ipcRenderer.sendSync('encrypt', m1),
    store: (m1,m2) => ipcRenderer.sendSync('store',m1,m2),
    compare: (m1,m2) => ipcRenderer.sendSync('compare',m1,m2)
})