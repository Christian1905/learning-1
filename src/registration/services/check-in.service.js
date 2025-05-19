import { AttendeeService } from './attendee.service.js';
import { EventService } from './event.service.js';
import { TicketValidationResponse } from './responses/ticket-validation.response.js';
import { Attendee } from '../models/attendee.entity.js';

export class CheckInService {
  constructor() {
    this.attendeeService = new AttendeeService();
    this.eventService = new EventService();
  }

  async validateAndCheckIn(ticketIdentifier) {
    const response = await this.attendeeService.getByTicketIdentifier(ticketIdentifier);
    
    if (!response || response.length === 0) return new TicketValidationResponse(TicketValidationResponse.RESULT.INVALID);

    const attendee = response[0];

    if (attendee.isCheckedIn()) {
      const event = await this.eventService.getById(attendee.eventId);
      return new TicketValidationResponse(
        TicketValidationResponse.RESULT.ALREADY_CHECKED_IN,
        attendee,
        event
      );
    }

    const updatedAttendee = new Attendee(
      attendee.id,
      attendee.name,
      attendee.description,
      attendee.eventId,
      attendee.ticketIdentifier,
      new Date()
    );

    const savedAttendee = await this.attendeeService.update(attendee.id, updatedAttendee);

    const event = await this.eventService.getById(savedAttendee.eventId);

    return new TicketValidationResponse(
      TicketValidationResponse.RESULT.SUCCESS,
      savedAttendee,
      event
    );
  }
}
