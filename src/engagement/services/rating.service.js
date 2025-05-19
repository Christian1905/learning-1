import httpInstance from "../../shared/services/http.instance.js";
import { RatingAssembler } from "./assemblers/rating.assembler.js";

export class RatingService {
    resourceEndpoint = import.meta.env.VITE_RATINGS_ENDPOINT_PATH;

    async getAll() {
        const response = await httpInstance.get(this.resourceEndpoint);
        return RatingAssembler.toModelList(response.data);
    }

    async getById(id) {
        const response = await httpInstance.get(`${this.resourceEndpoint}/${id}`);
        return RatingAssembler.toModel(response.data);
    }

    async create(ratingEntity) {
        const lastId = await this.getLastId();
        ratingEntity.id = lastId + 1;
        console.log('ratingEntity', ratingEntity)
        const ratingResponse = RatingAssembler.toResponse(ratingEntity);
        console.log('ratingResponse', ratingResponse)
        const response = await httpInstance.post(this.resourceEndpoint, ratingResponse);
        return RatingAssembler.toModel(response.data);
    }

    async update(id, ratingEntity) {
        const ratingResponse = RatingAssembler.toResponse(ratingEntity);
        const response = await httpInstance.put(`${this.resourceEndpoint}/${id}`, ratingResponse);
        return RatingAssembler.toModel(response.data);
    }

    async delete(id) {
        await httpInstance.delete(`${this.resourceEndpoint}/${id}`);
    }

    async getLastId(){
        const response = await httpInstance.get(`${this.resourceEndpoint}`);
        const lastId = response.data[response.data.length - 1].id;
        return lastId;
    }
}