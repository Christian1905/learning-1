import { Rating } from '../../models/rating.entity.js'
import { RatingResponse } from '../responses/rating.response.js'

export class RatingAssembler {
  static toModel (response) {
    if (!response) return null
    return new Rating(
      response.id,
      response.attendee_id,
      response.event_id,
      response.rating,
      response.rated_at ? new Date(response.rated_at) : null
    )
  }

  static toResponse (model) {
    if (!model) return null

    return new RatingResponse({
      id: model.id,
      attendee_id: model.attendeeId,
      event_id: model.eventId,
      rating: model.rating,
      rated_at: model.ratedAt ? model.ratedAt.toISOString() : null
    })
  }

  static toModelList (responseList = []) {
    return responseList.map(this.toModel)
  }

  static toResponseList (modelList = []) {
    return modelList.map(this.toResponse)
  }
}
