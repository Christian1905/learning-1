import httpInstance from "../../shared/services/http.instance.js";
import { EventAssembler } from "./assemblers/event.assembler.js";

export class EventService {
    resourceEndpoint = import.meta.env.VITE_EVENTS_ENDPOINT_PATH;

    async getAll() {
        const response = await httpInstance.get(this.resourceEndpoint);
        return EventAssembler.toModelList(response.data);
    }

    async getById(id) {
        const response = await httpInstance.get(`${this.resourceEndpoint}/${id}`);
        return EventAssembler.toModel(response.data);
    }

    async create(eventEntity) {
        const lastId = await this.getLastId();
        eventEntity.id = lastId + 1;
        const eventResponse = EventAssembler.toResponse(eventEntity);
        const response = await httpInstance.post(this.resourceEndpoint, eventResponse);
        return EventAssembler.toModel(response.data);
    }

    async update(id, eventEntity) {
        const eventResponse = EventAssembler.toResponse(eventEntity);
        const response = await httpInstance.put(`${this.resourceEndpoint}/${id}`, eventResponse);
        return EventAssembler.toModel(response.data);
    }

    async delete(id) {
        await httpInstance.delete(`${this.resourceEndpoint}/${id}`);
    }

    async getByName(name) {
        const response = await httpInstance.get(`${this.resourceEndpoint}?name=${name}`);
        return EventAssembler.toModelList(response.data);
    }

    async getLastId(){
        const response = await httpInstance.get(`${this.resourceEndpoint}`);
        const lastId = response.data[response.data.length - 1].id;
        return lastId;
    }
}