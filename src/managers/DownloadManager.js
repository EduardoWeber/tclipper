const { download } = require('edl');
const fs = require('fs');
import { BrowserWindow, ipcMain, app, shell } from 'electron'

export default class DownloadManager {
  constructor(win) {
    this.win = win
    this.downloadItemList = []
    this.finishedDownloadItemList = []
    this.directory = app.getPath('downloads')
    
    ipcMain.on("download_manager", (event, payload) => {
      if (payload.type) {

        if (payload.type === "start_download") {
          const clipUrl = this.generateClipUrl(payload.clip.thumbnailUrl)
          this.startDownload(clipUrl, payload.clip.uniqueId, this.directory)
        }

        if (payload.type === "cancel_download") {
          this.cancelDownload(payload.clip.uniqueId)
        }

        if (payload.type === "delete_download") {
          this.deleteFile(payload.clip.uniqueId)
        }

        if (payload.type === "open_download") {
          this.openFile(payload.clip.uniqueId)
        }
        
      }
    });
  }

  getDownloadItemByUniqueId(uniqueId, array) {
    for (let i = 0; i < array.length; i++) {
      const downloadItem = array[i];
      if (downloadItem.uniqueId === uniqueId) {
        return downloadItem
      }
    }
    return null
  }

  deleteFile(uniqueId) {
    let downloadItemDict = this.getDownloadItemByUniqueId(uniqueId, this.finishedDownloadItemList)
    if (downloadItemDict) {
      const filepath = downloadItemDict.filepath
      if (fs.existsSync(filepath)) {
        fs.unlink(filepath, (err) => {
          if (err) {
            return;
          }
          this.removeDownloadItem(downloadItemDict.uniqueId, this.finishedDownloadItemList)
        });
      }
    }
  }

  openFile(uniqueId) {
    let downloadItemDict = this.getDownloadItemByUniqueId(uniqueId, this.finishedDownloadItemList)
    if (downloadItemDict) {
      const filepath = downloadItemDict.filepath
      shell.showItemInFolder(filepath);
    }
  }

  cancelDownload(uniqueId) {
    let downloadItemDict = this.getDownloadItemByUniqueId(uniqueId, this.downloadItemList)
    if (downloadItemDict) {
      let downloadItem = downloadItemDict.downloadItem
      downloadItem.cancel()
      this.removeDownloadItem(uniqueId, this.downloadItemList)
    }

  }

  insertDownloadItem(uniqueId, downloadItem, array) {
    this.win.webContents.send('download_started', {
      uniqueId
    })
    array.push({
      uniqueId,
      downloadItem
    })
  }

  removeDownloadItem(uniqueId, array) {
    for (let i = 0; i < array.length; i++) {
      const downloadItem = array[i];
      if (downloadItem.uniqueId === uniqueId) {
        array.splice(i, 1);
        return
      }
    }
    throw new Error('Could not find the specified uniqueId')
  }

  startDownload(twitchClipUrl, uniqueId, directory) {
    console.log(uniqueId, 'started')
    const options = {
      directory,
      onStarted: (downloadItem) => this.insertDownloadItem(uniqueId, downloadItem, this.downloadItemList),
      onProgress: ({percent}) => this.win.webContents.send('download_progress', {
        percent,
        uniqueId
      })
    }
    download(BrowserWindow.getFocusedWindow(), twitchClipUrl, options).then((dl) => {
      console.log("Downloaded")
      this.win.webContents.send('download_finished', {
        uniqueId
      })
      const filepath = dl.getSavePath();
      this.finishedDownloadItemList.push({
        uniqueId,
        filepath
      })
      this.removeDownloadItem(uniqueId, this.downloadItemList)
    })
  }

  generateClipUrl(clipThumbUrl) {
    const startIndex = clipThumbUrl.indexOf('-p');
    return clipThumbUrl.slice(0, startIndex) + '.mp4'
  }
}