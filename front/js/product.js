fetch("http://localhost:4000/api/products/" + index)
    .then( data => data.json())
    .catch((error) => {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    })
    .then( jsonKanap => {
        document.querySelector(".item__img").innerHTML = `<img src="${jsonKanap.imageUrl}" alt="${jsonKanap.altTxt}"></img>`;
        document.querySelector("#title").innerHTML = jsonKanap.name;
        document.querySelector("#price").innerHTML = jsonKanap.price;
        document.querySelector("#description").innerHTML = jsonKanap.description;
        for(let i = 0; i < jsonKanap.colors.length; i++) {
            let newColor = jsonKanap.colors[i];
            let element = document.createElement("OPTION");
            element.innerHTML = newColor;
            element.setAttribute("value", newColor);
            document.querySelector("#colors").append(element);

            // Appel de la fonction Choisir la couleur //
            choixCouleur();
            //Appel de la fonction Choisir la quantite //
            quantiteKanap();            
        };
        
        // Enregistrer les données pour le panier //
        let handleClick = document.querySelector('#addToCart');
        handleClick.addEventListener("click", () => {
            // Vérifier si la couleur et une quantité sont sélectionnées //
            nonChoix();
            // Vérifier que quantité et couleur ne sont pas vides //
            if (quantite != null && couleur != null) {
                // Comparer le panier //
                let presencePanier = localStorage.getItem("kanap");
                presencePanier = JSON.parse(presencePanier);
                if (presencePanier != null) {
                    comparePanier();
                } else {
                    // Si le panier est vide //
                    panierVide();
                }
            }
        });
        // Si le panier est vide //
        function panierVide() {
            productinCard.push(new Panier(index, couleur, quantite, jsonKanap.imageUrl, jsonKanap.altTxt, jsonKanap.name, jsonKanap.price));
            localStorage.setItem("kanap", JSON.stringify(productinCard));
            articlePanier();
        };
        // Comparer le panier //
        function comparePanier() {
            let comparePanier = localStorage.getItem("kanap");
            comparePanier = JSON.parse(comparePanier);

            if (comparePanier) {
                let resultatRecherche = comparePanier.find(
                    (article) => article.id === index && article.couleur === couleur
                );
                if (resultatRecherche) {
                    resultatRecherche.quantite = parseInt(quantite) + parseInt(resultatRecherche.quantite);
                    localStorage.setItem("kanap", (JSON.stringify(comparePanier)));
                } else {
                    productinCard.push(new Panier(index, couleur, quantite, jsonKanap.imageUrl, jsonKanap.altTxt, jsonKanap.name, jsonKanap.price));
                    localStorage.setItem("kanap", JSON.stringify(productinCard));
                }
                articlePanier();
            }

            /* for (let i = 0; i < comparePanier.length; i++) {
                // Vérifier si un canapé choisi a la même couleur, si oui, rajouter la quantité //
                if (index == comparePanier[i].id && couleur == comparePanier[i].couleur) {
                    comparePanier[i].quantite = JSON.parse(comparePanier[i].quantite) + JSON.parse(quantite);
                    localStorage.setItem("kanap", (JSON.stringify(comparePanier)));
                } else {
                    productinCard.push(new Panier(index, couleur, quantite, jsonKanap.imageUrl, jsonKanap.altTxt, jsonKanap.name, jsonKanap.price));
                    localStorage.setItem("kanap", JSON.stringify(productinCard));
                }
                articlePanier();
            } */
        };
    });
