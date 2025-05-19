export class Attendee {
  constructor(
    id,
    name,
    description,
    eventId,
    ticketIdentifier,
    checkedInAt
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.eventId = eventId;
    this.ticketIdentifier = ticketIdentifier;
    this.checkedInAt = checkedInAt;
  }

  isCheckedIn() {
    return this.checkedInAt !== null;
  }
}
