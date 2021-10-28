// localStorage //
let panier = localStorage.getItem("kanap");
panier = JSON.parse(panier);

// Remplissage du panier //
function afficherArticlesPanier() {
    if (panier != null) {
    for (let i = 0; i < panier.length; i++) {
        const articlePanier = document.querySelector("#cart__items");
        articlePanier.innerHTML +=
            `<article class="cart__item" data-id="${panier[i].id}">
                <div class="cart__item__img">
                    <img src="${panier[i].image}" alt="${panier[i].altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${panier[i].name}</h2>
                        <p>${panier[i].quantite * panier[i].price},00 €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : ${panier[i].quantite}</p>
                            <input type="number" name="itemQuantity" min="1" max="100" value=${panier[i].quantite} id="itemQuantity-${panier[i].id}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem-${panier[i].id}">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`;
        }
    }
};

// Calcul de la quantité totale d'articles dans le panier //
function calculQuantitePanier() {
    if (panier != null) {
        let quantitePanier = 0;
        panier.forEach((kanap) => {
            quantitePanier += JSON.parse(kanap.quantite);
        })
        return quantitePanier;
    } else {
        return 0;
    }
};

// Affichage de la quantité totale d'articles dans le panier //
function affichageQuantitePanier() {
    const quantiteTotale = document.querySelector("#totalQuantity");
    quantiteTotale.innerHTML = `${calculQuantitePanier()}`;
};

// Calcul du prix total du panier //
function calculTotalPanier() {
    if (panier != null) {
        let totalPanier = 0;
        panier.forEach((kanap) => {
            totalPanier = totalPanier + kanap.price * kanap.quantite;
        });
        return totalPanier;
    } else {
        return 0;
    }
};

// Affichage du prix total du panier //
function affichageTotalPanier() {
    const panierTotal = document.querySelector("#totalPrice");
    panierTotal.innerHTML = `${calculTotalPanier()}`;
};