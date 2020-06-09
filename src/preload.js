// in preload scripts, we have access to node.js and electron APIs
// the remote web app will not have access, so this is safe
const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
  "api", {
    send: (channel, data) => {
        // whitelist channels
        let validChannels = ["toMain", "window_manager", "download_manager"];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
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
);