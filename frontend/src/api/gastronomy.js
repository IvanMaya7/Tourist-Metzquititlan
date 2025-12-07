import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/gastronomy"
});

export const getGastronomy = () => 
    API.get("/getAll");

export const createGastronomy = (data) => 
    API.post("/save", data);

export const updateGastronomy = (id, data) =>
  API.patch(`/updateById/${id}`, data);

export const deleteGastronomy = (id) =>
    API.delete(`/deleteById/${id}`);
