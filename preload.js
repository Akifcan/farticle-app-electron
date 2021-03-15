const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
    setDarkMode: async () => { return await ipcRenderer.invoke('dark-mode:toggle') },
})