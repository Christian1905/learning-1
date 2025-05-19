export class Rating {
    constructor(
        id,
        attendeeId,
        eventId,
        rating,
        ratedAt
    ){
        this.id = id;
        this.attendeeId = attendeeId;
        this.eventId = eventId;
        this.rating = rating;
        this.ratedAt = ratedAt;
    }
}
