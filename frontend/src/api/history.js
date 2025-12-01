import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/history"
})

export const getHistory = () => 
    API.get("/getAll");

export const createHistory = (data) => 
    API.post("/save", data);

export const updateHistory = (id, data) =>
  API.patch(`/updateById/${id}`, data);

export const deleteHistory = (id) =>
    API.delete(`/deleteById/${id}`);