/** Récupère l'URL affichée et récupère le paramètre id */
let url = new URL(window.location.href);
let index = url.searchParams.get("id");

/** Vérifie si un panier existe déjà, sinon en crée un */
let produitDansPanier = localStorage.getItem("kanap") ?
    JSON.parse(localStorage.getItem("kanap")) : [];


/**Choisir la couleur du canapé */
let couleur;
function choixCouleur() {
    let couleurSelectionnee = document.querySelector("#colors");
    couleurSelectionnee.addEventListener("change", () => {
        couleur = couleurSelectionnee.value;
    })
};

/** Choisir la quantité de canapés */
let quantite;
function quantiteKanap() {
    let quantiteChoisie = document.querySelector("#quantity");
    quantiteChoisie.addEventListener("change", () => {
        quantite = quantiteChoisie.value;
    })
};

/** Couleur et/ou quantité vides */
function nonChoix() {
    /** Vérifie si la couleur est sélectionnée */
    if (couleur == null) {
        alert("Veuillez choisir une couleur");
    }
    /** Vérifie si une quantité est sélectionnée */
    if (quantite == null) {
        alert("Le nombre d'article est vide");
    }
};

/** Enregistre l'article dans le panier */
function articlePanier() {
    alert("L'article a bien été enregistré dans votre panier.");
    window.location.reload();
    window.location.href = "index.html";
};

/** Classe représentant un produit */
class Produit {
    /**
     * Crée un produit
     * @param {string} id 
     * @param {array} couleur 
     * @param {number} quantite 
     * @param {string} image 
     * @param {string} altTxt 
     * @param {string} name 
     * @param {number} price 
     */
    constructor(id, couleur, quantite, image, altTxt, name, price) {
        this.id = id;
        this.couleur = couleur;
        this.quantite = quantite;
        this.image = image;
        this.altTxt = altTxt;
        this.name = name;
        this.price = price;
    };
};

/** Requête fetch pour récupérer la ressource products */
fetch("http://localhost:4000/api/products/" + index)
    /** Analyse la réponse en tant qu’objet JSON et retourne data quand la promesse est résolue */
    .then(data => data.json())
    /** Une promesse fetch() va retourner une TypeError si un problème réseau s'est produit. */
    .catch((error) => {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    })
    .then(jsonKanap => {
        /** Remplace le noeud .item__img */
        document.querySelector(".item__img").innerHTML =
            `<img src="${jsonKanap.imageUrl}"
                alt="${jsonKanap.altTxt}">
            </img>`;
        /** Remplace le noeud #title */
        document.querySelector("#title").innerHTML = jsonKanap.name;
        /** Remplace le noeud #price */
        document.querySelector("#price").innerHTML = jsonKanap.price;
        /** Remplace le noeud #description */
        document.querySelector("#description").innerHTML = jsonKanap.description;
        /** Remplace le noeud #colors et crée le sélecteur de couleurs */
        for (let i = 0; i < jsonKanap.colors.length; i++) {
            let newColor = jsonKanap.colors[i];
            let element = document.createElement("OPTION");
            element.innerHTML = newColor;
            element.setAttribute("value", newColor);
            document.querySelector("#colors").append(element);
            /** @function Choisir la couleur */
            choixCouleur();
            /** @function Choisir la quantité */
            quantiteKanap();            
        };
        
        /** Sélectionne le bouton #addToCart et enregistre les données pour le panier */
        let handleClick = document.querySelector('#addToCart');
        /** @event click#addToCart */
        handleClick.addEventListener("click", () => {
            /** @function Vérifier si la couleur et une quantité sont sélectionnées */
            nonChoix();
            /** Vérifier que quantité et couleur ne sont pas vides */
            if (quantite != null && couleur != null) {
                /** Récupère les données dans localStorage */
                let presencePanier = localStorage.getItem("kanap");
                presencePanier = JSON.parse(presencePanier);
                if (presencePanier != null) {
                    /** @function comparePanier */
                    comparePanier();
                } else {
                    /** @function panierVide */
                    panierVide();
                }
            }
        });

        /** Enregistre le nouvel article dans le panier */
        function nouvelArticleDansPanier() {
            produitDansPanier.push(new Produit(index, couleur, quantite, jsonKanap.imageUrl, jsonKanap.altTxt, jsonKanap.name, jsonKanap.price));
            localStorage.setItem("kanap", JSON.stringify(produitDansPanier));
        }

        /** Si le panier est vide */
        function panierVide() {
            nouvelArticleDansPanier();
            articlePanier();
        };
        /** Compare le panier */
        function comparePanier() {
            /** Récupère les données dans localStorage */
            let comparePanier = localStorage.getItem("kanap");
            comparePanier = JSON.parse(comparePanier);
            if (comparePanier) {
                /** Crée une comparaison de id et de couleur */
                let resultatRecherche = comparePanier.find(
                    (article) => article.id === index && article.couleur === couleur
                );
                /** Si identique, modifie quantité */
                if (resultatRecherche) {
                    resultatRecherche.quantite = parseInt(quantite) + parseInt(resultatRecherche.quantite);
                    localStorage.setItem("kanap", (JSON.stringify(comparePanier)));
                /** Sinon crée un nouvel article dans le panier */
                } else {
                    /** @function nouvelArticleDansPanier() */
                    nouvelArticleDansPanier();
                }
                /** @function articlePanier() */
                articlePanier();
            }
        };
    });
