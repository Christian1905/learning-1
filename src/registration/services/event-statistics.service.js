import { EventService } from './event.service.js';
import { AttendeeService } from './attendee.service.js';
import { EventStatistics } from '../models/event-statics.entity.js';

export class EventStatisticsService {
  constructor() {
    this.eventService = new EventService();
    this.attendeeService = new AttendeeService();
  }
  async getAllEventsWithStatistics() {
    const events = await this.eventService.getAll();
    const allAttendees = await this.attendeeService.getAll();
    
    return Promise.all(events.map(async (event) => {
      const eventAttendees = allAttendees.filter(attendee => attendee.eventId === event.id);
      const registeredCount = eventAttendees.length;
      const checkedInCount = eventAttendees.filter(attendee => attendee.isCheckedIn()).length;
      return new EventStatistics(
        event,
        registeredCount,
        checkedInCount
      );
    }));
  }

  async getEventStatistics(eventId) {
    const event = await this.eventService.getById(eventId);
    if (!event) {
      throw new Error(`Event with ID ${eventId} not found`);
    }
    const allAttendees = await this.attendeeService.getAll();
    const eventAttendees = allAttendees.filter(attendee => attendee.eventId === event.id);
    
    const registeredCount = eventAttendees.length;
    
    const checkedInCount = eventAttendees.filter(attendee => attendee.isCheckedIn()).length;
    
    return new EventStatistics(
      event,
      registeredCount,
      checkedInCount
    );
  }
}
