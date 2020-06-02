// in preload scripts, we have access to node.js and electron APIs
// the remote web app will not have access, so this is safe
const { ipcRenderer, remote, ipcMain } = require('electron')

process.once('loaded', () => {
  // Custom bridge, hopefully safe
  window.bridge = {
    // returns the new callback
    on: (eventName, callback) => { 
      const newCallback = (_, data) => callback(data);
      ipcRenderer.on(eventName, newCallback);
      return newCallback;
    },
    once: (eventName, callback) => { 
      const newCallback = (_, data) => callback(data);
      ipcRenderer.once(eventName, newCallback);
      return newCallback;
    },
    removeListener: (eventName, callback) => ipcRenderer.removeListener(eventName, callback),
    removeAllListeners: (eventName) => ipcRenderer.removeAllListeners(eventName),
  }
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

function sendTo(channel, payload) {
  ipcRenderer.send('send_to', {
    channel: channel,
    payloadMessage: payload
  });
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

function minimize () {
  let win = remote.getCurrentWindow()
  win.minimize()
}