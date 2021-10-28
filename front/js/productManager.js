class Panier {
    constructor(id, couleur, quantite, image, altTxt, name, price) {
        this.id = id;
        this.couleur = couleur;
        this.quantite = quantite;
        this.image = image;
        this.altTxt = altTxt;
        this.name = name;
        this.price = price;
    }
}

// Récupérer l'URL affichée et récupérer le paramètre "id" //
let url = new URL(window.location.href);
let index = url.searchParams.get("id");

// Vérifier si un panier existe déjà, sinon en créer un //
let productinCard = localStorage.getItem("kanap") ?
    JSON.parse(localStorage.getItem("kanap")) : [];

// Choisir la couleur du canapé //
let couleur;
function choixCouleur() {
    let couleurSelectionnee = document.querySelector("#colors");
    couleurSelectionnee.addEventListener("change", () => {
        couleur = couleurSelectionnee.value;
    })
}

// Choisir la quantité de canapés //
let quantite;
function quantiteKanap() {
    let quantiteChoisie = document.querySelector("#quantity");
    quantiteChoisie.addEventListener("change", () => {
        quantite = quantiteChoisie.value;
    })
}

// Couleur et/ou quantite vides //
function nonChoix() {
    // Vérifier si la couleur est sélectionnée //
    if (couleur == null) {
        alert("Veuillez choisir une couleur");
    }
    // Vérifier si une quantité est sélectionnée //
    if (quantite == null) {
        alert("Le nombre d'article est vide");
    }
}

// Enregistrer l'article dans le panier //
function articlePanier() {
    alert("L'article a bien été enregistré dans votre panier.");
    window.location.reload();
    window.location.href = "index.html";
};

