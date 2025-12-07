import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/auth"
});

export const login = (data) => 
    API.post("/login", data);
