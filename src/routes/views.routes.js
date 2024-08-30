import { Router } from "express";
import productManager from "../dao/fileSystem/productsManager.js";
import { socketServer } from "../app.js";

const router = Router();
///RENDERIZADO DE LOS PRODUCTOS CON HANDLEBARS
router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    console.log(products);
    res.render("home", { products, styles: "index.css" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
///RENDERIZADO MEDIANTE HANDLEBARS Y WEBSOCKETS DE PRODUCTOS Y FORM
router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    socketServer.emit("products", products);
    res.render("realTimeProducts", { styles: "index.css" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
///METODO POST PARA AGREGADO DE PRODUCTOS A DATA JS
router.post("/realtimeproducts", async (req, res) => {
  try {
    const { title, description, price, stock, category, code } = req.body;

    await productManager.addProduct({
      title,
      description,
      price,
      stock,
      category,
      code,
    });
    const products = await productManager.getProducts();
    socketServer.emit("products", products);

    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
////ELIMINAR UN PRODUCTO MEDIANTE EL ID GENERADO
router.delete("/realtimeproducts", async (req, res) => {
  try {
    const { id } = req.body;
    await productManager.deleteProduct(id);
    const products = await productManager.getProducts();
    socketServer.emit("products", products);

    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//SETEANDO COOKIES
router.get("/setCookie", async (req, res) => {
  res.cookie("userData", "Hello", { maxAge: 100000 }).send("Cookie set");
});

//OBTENIENDO COOKIE
router.get("/getCookie", (req, res) => {
  res.send(req.cookies.userData);
});

//ELIMINANDO COOKIES
router.get("/deleteCookie", (req, res) => {
  res.clearCookie("userData").send("Cookie Delete");
});

router.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`A ingresado ${req.session.counter} veces a este sitio`);
  } else {
    req.session.counter = 1;
    res.send("Welcome");
  }
});

// GENERANDO UN ADMINISTRADOR

router.get("/login", (req, res) => {
  const { username, password } = req.query;

  if (username !== "coder" || password !== "coder") {
    return res.send("Vuelve a intentarlo");
  }

  req.session.user = username;
  req.session.admin = true;
  res.send(`Welcome ${username}`);
});

//ENDPOINT LUEGO DE SER ADMIN REGISTRADO
router.get("/admin", (req, res) => {
  if (!req.session.admin) {
    return res.send("Danied");
  }

  res.send(`Welcome ${req.session.user} eres el mas capo`);
});

//LOGOUT PARA EL ADMIN

router.get("/logout", (req, res) => {
  req.session.destroy();

  res.send("Session close");
});

export default router;