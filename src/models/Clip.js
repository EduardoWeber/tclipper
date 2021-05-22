export const ClipStatus = {
  NOT_STARTED: 0,
  STARTED: 1,
  FINISHED: 2,
  CANCELLED: 3,
  ERROR: 4,
  QUEUED: 5,
}

export class Clip {
  constructor({data = null, id = null}) {
    if (data !== null) {
      this.uniqueId = data.uniqueId
      this.id = data.id
      this.url = data.url
      this.embedUrl = data.embed_url
      this.broadcasterId = data.broadcaster_id
      this.broadcasterName = data.broadcaster_name
      this.creatorId = data.creator_id
      this.creatorName = data.creator_name
      this.videoId = data.video_id
      this.gameId = data.game_id
      this.language = data.language
      this.title = data.title
      this.viewCount = data.view_count
      this.createdAt = data.created_at
      this.thumbnailUrl = data.thumbnail_url
      this.status = ClipStatus.NOT_STARTED
      this.progress = 0
    } else {

    }
  }
}