export class AttendeeResponse {
  constructor(
    id,
    name,
    description,
    event_id,
    ticket_identifier,
    checked_in_at
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.event_id = event_id;
    this.ticket_identifier = ticket_identifier;
    this.checked_in_at = checked_in_at;
  }
}
