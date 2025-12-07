require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
const conection = require("./src/config/conection");

const app = express();
const port = 3000;

conection();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // puerto por defecto de Vite
  methods: ["GET","POST","PUT","DELETE","OPTIONS", "PATCH"],
  credentials: true
}));

const placeRoutes = require("./src/routes/touristPlace.routes");
const historyRoutes = require("./src/routes/history.routes");
const gastronomyRoutes = require("./src/routes/gastronomy.routes.js");
const userRoutes = require("./src/routes/user.routes");
const authRoute = require("./src/routes/auth.routes");

app.use("/auth", authRoute);
app.use("/touristPlace", placeRoutes);
app.use("/history", historyRoutes);
app.use("/gastronomy", gastronomyRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("¡Hola desde Express!");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
