import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/touristPlace"
});

export const getTouristPlace = () =>
    API.get("/getAll");

export const createTouristPlace = (data) =>
    API.post("/save", data);

export const updateTouristPlace = (id, data) =>
    API.patch(`/updateById/${id}`, data);

export const deleteTouristPlace = (id) =>
    API.delete(`/deleteById/${id}`);