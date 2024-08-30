//data transfer oprions


export const respProductDto = (product) => {
    return {
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
    };
};