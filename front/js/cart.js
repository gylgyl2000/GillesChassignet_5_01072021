/** Récupère les données dans localStorage */
let panier = localStorage.getItem("kanap");
panier = JSON.parse(panier);

/** Afficher les articles dans le panier */
function afficherArticlesPanier() {
    if (panier === null) {
        let panierVide = document.querySelector("#cart__items");
        panierVide.innerHTML =
            `<p style="font-size: 20px; text-align: center; margin-top: -50px;">
                Votre panier est vide
            </p>`;
    } else {
        for (let i = 0; i < panier.length; i++) {
            let articlePanier = document.querySelector("#cart__items");
            articlePanier.innerHTML +=
                `<article class="cart__item" data-id="${panier[i].id}" data-couleur="${panier[i].couleur}">
                    <div class="cart__item__img">
                        <img src="${panier[i].image}" alt="${panier[i].altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__titlePrice">
                            <h2>${panier[i].name}</h2>
                            <p>${panier[i].quantite * panier[i].price},00 €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__color">
                                <p>Couleur : ${panier[i].couleur}</p>
                            </div>
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : ${panier[i].quantite}</p>
                                <input type="number"
                                       name="itemQuantity"
                                       min="1"
                                       max="100"
                                       value=${panier[i].quantite}
                                       id="itemQuantity">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`;
        }    
    }
};
afficherArticlesPanier();

/** Supprime un article */
function supprimerArticle() {
    if (panier != null) {
        let boutonSupprimer = document.querySelectorAll(".deleteItem");
        boutonSupprimer.forEach((bouton) => {
            let parent = bouton.closest("article");
            let parentId = parent.dataset.id;
            let parentCouleur = parent.dataset.couleur;
            bouton.addEventListener("click", (e) => {
                e.preventDefault();
                let panierFiltre = panier.filter(
                    element => element.id !== parentId ||
                               element.couleur !== parentCouleur
                );
                if (panierFiltre == 0) {
                    localStorage.clear();
                } else {
                    localStorage.setItem("kanap", (JSON.stringify(panierFiltre)));
                }
                alert("L'article a bien été supprimé de votre panier !");
                window.location.reload();
            })
        })
    }
};
supprimerArticle();

/** Modifier la quantité d'un article */
function modifierQuantite() {
    if (panier != null) {
        let quantiteChoisie = document.querySelectorAll("#itemQuantity");
        quantiteChoisie.forEach((quantiteEntree) => {
            let parent = quantiteEntree.closest("article");
            let parentId = parent.dataset.id;
            let parentCouleur = parent.dataset.couleur;
            quantiteEntree.addEventListener("change", (e) => {
                e.preventDefault();
                let nouvelleQuantite = Number(quantiteEntree.value);
                panier.forEach((element) => {
                    if(element.id == parentId && element.couleur == parentCouleur) {
                        element.quantite = nouvelleQuantite;
                    }
                })
                localStorage.setItem("kanap", (JSON.stringify(panier)));
                alert("Quantité modifiée !");
                window.location.reload();
            });
        });
    };
};
modifierQuantite();

/** Calcul de la quantité totale d'articles dans le panier */
function calculQuantitePanier() {
    if (panier == null) {
        return 0;
    } else {
        let quantitePanier = 0;
        panier.forEach((kanap) => {
            quantitePanier += JSON.parse(kanap.quantite);
        })
        return quantitePanier;
    }
};

/** Affichage de la quantité totale d'articles dans le panier */
function affichageQuantitePanier() {
    const quantiteTotale = document.querySelector("#totalQuantity");
    quantiteTotale.innerHTML = `${calculQuantitePanier()}`;
};
affichageQuantitePanier();

/** Calcul du prix total du panier */
function calculTotalPanier() {
    if (panier == null) {
        return 0;
    } else {
        let totalPanier = 0;
        panier.forEach((kanap) => {
            totalPanier = totalPanier + kanap.price * kanap.quantite;
        });
        return totalPanier;
    }
};

/** Affichage du prix total du panier */
function affichageTotalPanier() {
    const panierTotal = document.querySelector("#totalPrice");
    panierTotal.innerHTML = `${calculTotalPanier()}`;
};
affichageTotalPanier();

/**
 * Validation du formulaire
 * @param {string} input 
 * @param {string} regExp 
 * @returns {null} nul ou pas
 */
function checkIfFieldIsValid(input, regExp) {
    return input.value.match(regExp) !== null;
}

/** Validation du formulaire */
function validationFormulaire() {
    /** Ajoute une classe aux inputs */
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length ; i++) {
        inputs[i].classList.remove("is-invalid");
        inputs[i].classList.remove("is-valid");
    }

    /** Retire les alertes natives */
    let alertMessages = document.querySelectorAll(".alertMessages");
    for (let i = 0; i < alertMessages.length ; i++) {
        alertMessages[i].remove();
    };

    /** Récupère les informations du formulaire */
    let firstName = document.querySelector("#firstName"),
        lastName = document.querySelector("#lastName"),
        address = document.querySelector("#address"),
        city = document.querySelector("#city"),
        email = document.querySelector("#email");

    /** Défini les expressions régulières pour vérifier la validité des champs */
    let nameRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
    let stringRegExp = new RegExp("^[a-zA-Z0-9 ,.'-]+$");
    let emailRegExp = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

    /** Vérifie la validité des champs */
    let isfirstNameValid = checkIfFieldIsValid(firstName, nameRegExp),
        isLastNameValid = checkIfFieldIsValid(lastName, nameRegExp),
        isAddressValid = checkIfFieldIsValid(address, stringRegExp),
        isCityValid = checkIfFieldIsValid(city, stringRegExp),
        isEmailValid = checkIfFieldIsValid(email, emailRegExp);

    /** Alerte l'utilisateur si le formulaire est mal rempli */
    let fields = [firstName, lastName, address, city, email],
        fieldsValidity = [isfirstNameValid, isLastNameValid, isAddressValid, isCityValid, isEmailValid],
        isAFieldInvalid = false;

    for (let i = 0; i < fields.length; i++) {
        /** Si un champ n'est pas valide */
        if (!fieldsValidity[i]) {
            /** Un champ au moins est incorrect (sera utilisé plus loin pour empêcher la requête POST à l'API) */
            isAFieldInvalid = true;
            /** Crée un message à envoyer à l'utilisateur */
            let message;
            if (fields[i] === document.querySelector("#firstName")) {
                message = "Le prénom est incorrect !";
            } else if (fields[i] === document.querySelector("#lastName")) {
                message = "Le nom est incorrect !";
            } else if (fields[i] === document.querySelector("#address")) {
                message = "L'adresse postale est incorrecte !";
            } else if (fields[i] === document.querySelector("#city")) {
                message = "La ville est incorrecte !";
            } else {
                message = "L'adresse mail est incorrecte !";
            }
    
            /** Crée et stylise l'alerte */
            let alert = document.createElement("div");
            alert.appendChild(document.createTextNode(message));
            fields[i].classList.add("is-invalid");
            alert.classList.add("alertMessages", "invalid-feedback");
            fields[i].parentElement.appendChild(alert);
    
        } else {
            fields[i].classList.add("is-valid");
        }
    }
        /**Si l'un des champs a été vidé... */
        if (isAFieldInvalid) return; /** la fonction s'arrête */
        /** sinon on continue */
    
        /** les entrer dans un objet */
        let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        },
        product = [];
        for (let i = 0; i < panier.length; i++) {
            product.push(panier[i].id);
        }
        panier;

        /** Poste le formulaire avec les infos et récupère l'orderId */
        fetch('http://localhost:4000/api/products/order', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            body: JSON.stringify({
                contact: contact,
                products: product
            })
        })
        .then(response => response.json())
        .then((order) => {
            localStorage.setItem("orderId", JSON.stringify(order));
            window.location.href = "confirmation.html";
        })
        .catch((error) => alert("Un des champ du formulaire n'est pas correct !"));
      
}

/** Déclenche la commande */
document.querySelector("#order").addEventListener("click", (e) => {
    e.preventDefault();
    validationFormulaire();}, false);
