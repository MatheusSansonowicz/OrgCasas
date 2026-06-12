export const ProductService = {
    async searchByBarcode(barcode) {
        const response = await fetch(
            `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
        );
        const data = await response.json();

        if (data.status === 0) {
            throw new Error("Produto não encontrado.");
        }

        return {
            nome: data.product.product_name || "Nome não disponível",
            marca: data.product.brands || "Marca não disponível",
            codigoBarras: barcode,
            fotoUrl: data.product.image_front_url || null,
        };
    }
};