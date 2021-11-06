/** Class représentant un produit. */
class Product {
    /**
     *  @param {json} jsonProduct - le produit au format json
     */
    constructor(jsonProduct) {
        /**
         * Assigner toutes les propriétés dans le format json à la classe Product
         * @param {Object} sources - jsonProduct
         * @param {Object} cible - this, l'objet Product
         */
        jsonProduct && Object.assign(this, jsonProduct);
    }
}
/** Requête fetch pour récupérer la ressource products */
fetch("http://localhost:4000/api/products")
    /**
     * Analyse la réponse en tant qu’objet JSON et retourne data quand la promesse est résolue
     * @function data.json() récupère les objets renvoyés par la requête GET
     */
    .then(data => data.json())
    /** Une promesse fetch() va retourner une TypeError si un problème réseau s'est produit. */
    .catch((error) => {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    })
    /** @function avec la réponse jsonListProduct */
    .then(jsonListProduct => {
        /** Pour chaque variable jsonProduct de jsonListProduct */
        for(let jsonProduct of jsonListProduct) {
            /** Crée un nouveau Product */
            let product = new Product(jsonProduct);
            /** Remplace le noeud #items */
            document.querySelector("#items").innerHTML +=
            `<a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>`
        }
    })
