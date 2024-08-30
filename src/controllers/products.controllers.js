import { request, response } from "express";
import productServices from "../services/product.services.js";


const createproduct = async (req= request, res = response) => {

    try {
        const newProduct = req.body;
        const product = await productServices.createproduct(newProduct);
    
        res.status(200).json({ status: "sucess", payload: product });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
      }
}

const getProducts = async (req, res) => {
    try {
        ///OBTENEMOS DATOS PARA PAGINACION
        const { limit, page, sort, category, status } = req.query;
  
        const options = {
          limit: limit || 10,
          page: page || 1,
          sort: {
            price: sort === "asc" ? 1 : -1,
          },
          learn: true,
        };
        if (category) {
          const products = await productServices.getProducts({ category }, options);
          return res.status(200).json({ status: "sucess", products });
        }
        if (status) {
          const products = await productServices.getProducts({ status }, options);
          return res.status(200).json({ status: "sucess", products });
        }
  
        const products = await productServices.getProducts({}, options);
  
        res.status(200).json({ status: "sucess", payload: products });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
      }
}

const getproductById = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productServices.getproductById(pid);
  
      res.status(200).json({ status: "sucess", payload: product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
}

const updateModifyProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const data = req.body;
      const product = await productServices.updateModifyProduct(pid, data);
  
      res.status(200).json({ status: "sucess", payload: product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal server error" });
    }  
};

const deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      await productServices.deleteProduct(pid);
  
      res
        .status(200)
        .json({
          status: "sucess",
          msg: `El producto con el ID numero ${pid} fue eliminado`,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal server error" });
    }  
}

export default {
    createproduct,
    getProducts,
    getproductById,
    updateModifyProduct,
    deleteProduct,
}