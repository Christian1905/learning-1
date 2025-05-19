import { AttendeeService } from '../../registration/services/attendee.service.js';
import { RatingService } from './rating.service.js';
import { Rating } from '../models/rating.entity.js';

export class EventRatingService {
    constructor() {
        this.attendeeService = new AttendeeService();
        this.ratingService = new RatingService();
    }

    async rateEvent(ticketIdentifier, ratingValue) {
        if (ratingValue < 1 || ratingValue > 5) {
            return {
                success: false,
                message: "Rating must be between 1 and 5"
            };
        }
        const attendees = await this.attendeeService.getByTicketIdentifier(ticketIdentifier);
        if (!attendees || attendees.length === 0) {
            return {
                success: false,
                message: "Invalid Ticket Identifier"
            };
        }
        const attendee = attendees[0];
        if (!attendee.checkedInAt) {
            return {
                success: false,
                message: "You can only rate events you have attended to"
            };
        }
        const existingRatings = await this.ratingService.getAll();
        const hasRated = existingRatings.some(rating => 
            rating.attendeeId === attendee.id && 
            rating.eventId === attendee.eventId
        );
        if (hasRated) {
            return {
                success: false,
                message: "You have already rated this event"
            };
        }
        const newRating = new Rating(
            null,
            attendee.id,
            attendee.eventId,
            ratingValue,
            new Date()
        );
        await this.ratingService.create(newRating);
        return {
            success: true,
            message: "Event successfully rated"
        };
    }
}
