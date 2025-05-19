import { Attendee } from '../../models/attendee.entity.js';
import { AttendeeResponse } from '../responses/attendee.response.js';

export class AttendeeAssembler {
  static toModel(response) {
    if (!response) return null;
    
    return new Attendee(
      response.id,
      response.name,
      response.description,
      response.event_id,
      response.ticket_identifier,
      response.checked_in_at ? new Date(response.checked_in_at) : null
    );
  }

  static toResponse(model) {
    if (!model) return null;
    
    return new AttendeeResponse(
      model.id,
      model.name,
      model.description,
      model.eventId,
      model.ticketIdentifier,
      model.checkedInAt ? new Date(model.checkedInAt).toISOString() : null
    );
  }

  static toModelList(responseList) {
    if (!responseList) return [];
    
    return responseList.map(response => this.toModel(response));
  }

  static toResponseList(modelList) {
    if (!modelList) return [];
    
    return modelList.map(model => this.toResponse(model));
  }
}
