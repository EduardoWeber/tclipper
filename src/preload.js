// in preload scripts, we have access to node.js and electron APIs
// the remote web app will not have access, so this is safe
const { ipcRenderer: ipc, remote } = require('electron');

init();

function init() {
  if (typeof window === 'undefined') {
    return
  }
  window.Bridge = {
    closeApp: closeApp,
    toggleMaximize: toggleMaximize
  };

}

function closeApp () {
    remote.app.quit()
}

function toggleMaximize () {
    let win = remote.getCurrentWindow()
    if (win.isMaximized()) {
        win.unmaximize()
    } else {
        win.maximize()
    }
}