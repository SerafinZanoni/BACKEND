import cartRepository from "../dao/mongoDB/cart.repository.js";
import productRepository from "../dao/mongoDB/product.repository.js";

const createCart = async () => {
    return await cartRepository.create();
}

const getCartById = async (cId) => {
    return await cartRepository.getById(cId);
}

const addProductToCart = async ( cId, pid ) => {
    return await cartRepository.addProductToCart(cId, pid);
}

const updateModifyQuantity = async (cId, pid, quantity) => {
    return await cartRepository.updateModifyQuantity(cId, pid, quantity);
};

const deletePorductToCart = async (cId, pid) => {
    return await cartRepository.deletePorductToCart(cId, pid);
}

const deletePorductsToCarts = async (cId) => {
    return await cartRepository.deleteProductsTocarts(cId);

}
const purchaseCart = async (cid) => {
    const cart = await cartRepository.getById(cid);
    let total = 0;
    const productsWithOutStock = [];

    for (const productCart of cart.products) {
        const product = await productRepository.getById(productCart.product);

        if (product.stock >= productCart.quantity) {
            total += product.price * productCart.quantity;
            await productRepository.update(product._id, {stock: product.stock - productCart.quantity})
        } else {
            productsWithOutStock.push(productCart);
        }

        await cartRepository.update(cid, { products: productsWithOutStock });
    }

    return total;
};

export default {
    createCart,
    getCartById,
    addProductToCart,
    deletePorductToCart,
    deletePorductsToCarts,
    updateModifyQuantity,
    purchaseCart,
}