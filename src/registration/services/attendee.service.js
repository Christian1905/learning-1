import httpInstance from "../../shared/services/http.instance.js";
import { AttendeeAssembler } from "./assemblers/attendee.assembler.js";

export class AttendeeService {
    resourceEndpoint = import.meta.env.VITE_ATTENDEES_ENDPOINT_PATH;

    async getAll() {
        const response = await httpInstance.get(this.resourceEndpoint);
        return AttendeeAssembler.toModelList(response.data);
    }

    async getById(id) {
        const response = await httpInstance.get(`${this.resourceEndpoint}/${id}`);
        return AttendeeAssembler.toModel(response.data);
    }

    async create(attendeeEntity) {
        const lastId = await this.getLastId();
        attendeeEntity.id = lastId + 1;
        const attendeeResponse = AttendeeAssembler.toResponse(attendeeEntity);
        const response = await httpInstance.post(this.resourceEndpoint, attendeeResponse);
        return AttendeeAssembler.toModel(response.data);
    }

    async update(id, attendeeEntity) {
        const attendeeResponse = AttendeeAssembler.toResponse(attendeeEntity);
        const response = await httpInstance.put(`${this.resourceEndpoint}/${id}`, attendeeResponse);
        return AttendeeAssembler.toModel(response.data);
    }

    async delete(id) {
        await httpInstance.delete(`${this.resourceEndpoint}/${id}`);
    }

    async getByName(name) {
        const response = await httpInstance.get(`${this.resourceEndpoint}?name=${name}`);
        return AttendeeAssembler.toModelList(response.data);
    }

    async getByTicketIdentifier(ticketIdentifier) {
        const response = await httpInstance.get(`${this.resourceEndpoint}?ticket_identifier=${ticketIdentifier}`);
        return AttendeeAssembler.toModelList(response.data);
    }

    async getLastId(){
        const response = await httpInstance.get(`${this.resourceEndpoint}`);
        const lastId = response.data[response.data.length - 1].id;
        return lastId;
    }
}