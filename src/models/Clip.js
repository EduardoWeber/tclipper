const ClipStatus = {
  NOT_STARTED: 0,
  STARTED: 1,
  FINISHED: 2,
  CANCELLED: 3,
  ERROR: 4
}

class Clip {
  constructor(url, thumbUrl, title, streamTitle, streamer, category, clippedBy, progress = 0, data = null) {
    if (data != null) {

    } else {
      this.url = url
      this.progress = progress
      this.thumbUrl = thumbUrl
      this.title = title
      this.streamTitle = streamTitle
      this.streamer = streamer
      this.category = category
      this.clippedBy = clippedBy
      this.status = ClipStatus.NOT_STARTED
    }
  }
}