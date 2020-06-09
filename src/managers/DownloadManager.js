const { download } = require('electron-dl');
import { BrowserWindow, ipcMain, app } from 'electron'

export default class DownloadManager {
  constructor(win) {
    this.win = win
    this.downloadItemList = []
    this.directory = app.getPath('downloads')
    
    ipcMain.on("download_manager", (event, payload) => {
      if (payload.type) {

        if (payload.type === "start_download") {
          const clipUrl = this.generateClipUrl(payload.clip.thumbnailUrl)
          this.startDownload(clipUrl, payload.clip.uniqueId, this.directory)
        }
        
      }
    });
  }

  insertDownloadItem(uniqueId, downloadItem) {
    this.win.webContents.send('download_started', {
      uniqueId
    })
    this.downloadItemList.push({
      uniqueId,
      downloadItem
    })
  }

  removeDownloadItem(uniqueId) {
    for (let i = 0; i < this.downloadItemList.length; i++) {
      const downloadItem = this.downloadItemList[i];
      if (downloadItem.uniqueId === uniqueId) {
        this.downloadItemList.splice(i, 1);
        return
      }
    }
    throw new Error('Could not find the specified uniqueId')
  }

  startDownload(twitchClipUrl, uniqueId, directory) {
    const options = {
      directory,
      onStarted: (downloadItem) => this.insertDownloadItem(uniqueId, downloadItem),
      onProgress: ({percent}) => this.win.webContents.send('download_progress', {
        percent,
        uniqueId
      })
    }
    download(BrowserWindow.getFocusedWindow(), twitchClipUrl, options).then((dl) => {
      console.log("Downloaded")
      this.removeDownloadItem(uniqueId)
    })
  }

  generateClipUrl(clipThumbUrl) {
    const startIndex = clipThumbUrl.indexOf('-p');
    return clipThumbUrl.slice(0, startIndex) + '.mp4'
  }
}