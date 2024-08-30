import express from "express";
import allRoutes from "./routes/index.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { Server } from "socket.io";
import { connectMongoDB } from "./config/mongoDB.config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import envs from "./config/envs.config.js"


const app = express();

connectMongoDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

//COOKIES
app.use(cookieParser());

app.use(session({
  secret: envs.SECRET_CODE,
  resave: true,
  saveUninitialized: true,
}));

app.engine("handlebars", handlebars.engine()); 
app.set("views", __dirname + "/views"); 
app.set("view engine", "handlebars"); 


initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", allRoutes);

const httpServer = app.listen(envs.PORT, () => {
    console.log(`Server on port ${envs.PORT}`);
});

export const socketServer = new Server(httpServer);

socketServer.on("connection", async() => {
  console.log("Nuevo usuario conectado");
  const products = await productsManager.getProducts();
  socketServer.emit("products", products)
});