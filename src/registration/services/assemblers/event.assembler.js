import { Event } from '../../models/event.entity.js';
import { EventResponse } from '../responses/event.response.js';

export class EventAssembler {
  static toModel(response) {
    if (!response) return null;
    
    return new Event(
      response.id,
      response.name,
      response.description,
      new Date(response.schedule_at)
    );
  }

  static toResponse(model) {
    if (!model) return null;
    
    return new EventResponse(
      model.id,
      model.name,
      model.description,
      new Date(model.scheduledAt).toISOString()
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
