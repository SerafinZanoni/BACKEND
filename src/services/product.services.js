import productRepository from "../dao/mongoDB/product.repository.js";
import { respProductDto } from "../dto/product.dto.js";


const createproduct = async (productData) => {
    return await productRepository.create(productData);
}

const getProducts = async (query, options) => {
    return await productRepository.getAll(query, options);
}

const getproductById = async (pid) => {
    const product = await productRepository.getById(pid)
    const productResponse = respProductDto(product)
    return productResponse;
}

const updateModifyProduct = async (pid, productData) => {
    return await productRepository.update(pid, productData);
};

const deleteProduct = async (pid) => {
    return await productRepository.deleteOne(pid);
}

export default {
    createproduct,
    getProducts,
    getproductById,
    updateModifyProduct,
    deleteProduct,
}