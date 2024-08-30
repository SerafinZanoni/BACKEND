import { Router } from "express";
import productsRoutes from "./products.routes.js";
import cartsRoutes from "./carts.routes.js";
import viewsRoutes from "./views.routes.js";
import sessionRouter from "./session.routes.js"
import contactRouter from "./contact.routes.js"


const allRoutes = Router();

allRoutes.use("/api/products", productsRoutes);
allRoutes.use("/api/carts", cartsRoutes);
allRoutes.use("/api/session", sessionRouter);
allRoutes.use("/api/contact", contactRouter);
allRoutes.use("/", viewsRoutes);
allRoutes.get("*", async (req, res) => {
    try {
        res.status(404).json({status: "error", msg: "Route not found"});
    } catch (error) {
        res.status(500).json({status: "Erro", msg: "Internal Error Server"});
    }
} )

export default allRoutes;