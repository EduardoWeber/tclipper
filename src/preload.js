// in preload scripts, we have access to node.js and electron APIs
// the remote web app will not have access, so this is safe
const { ipcRenderer, remote } = require('electron')

process.once('loaded', () => {
  window.addEventListener('message', event => {
    // do something with custom event
    const message = event.data;

    ipcRenderer.send('logging', message);

    if (message.type) {

      if (message.type === "download") {
        ipcRenderer.send('logging', "Iniciando download" + message.properties.directory);
        ipcRenderer.send('download', message)
      }

      if (message.type === "close_app") {
        closeApp()
      }

      if (message.type === "toggle_maximize") {
        toggleMaximize()
      }

      if (message.type === "minimize") {
        minimize()
      }
      
    }
  });
});

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

function minimize () {
  let win = remote.getCurrentWindow()
  win.minimize()
}