
export default class WindowManager {
  constructor(ipcMain, win, app) {

    this.win = win
    this.ipcMain = ipcMain
    this.app = app
    
    ipcMain.on("window_manager", (event, payload) => {
      console.log(payload)
      if (payload.type) {

        if (payload.type === "close_app") {
          this.closeApp()
        }

        if (payload.type === "toggle_maximize") {
          this.toggleMaximize()
        }

        if (payload.type === "minimize") {
          this.minimize()
        }
        
      }
    });
  }

  closeApp () {
    this.app.quit()
  }

  toggleMaximize () {
    if (win.isMaximized()) {
      this.win.unmaximize()
    } else {
      this.win.maximize()
    }
  }

  minimize () {
    this.win.minimize()
  }
}