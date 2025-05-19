export class RatingResponse {
    constructor({ id, attendee_id, event_id, rating, rated_at }) {
        this.id = id;
        this.attendee_id = attendee_id;
        this.event_id = event_id;
        this.rating = rating;
        this.rated_at = rated_at;
    }
}
