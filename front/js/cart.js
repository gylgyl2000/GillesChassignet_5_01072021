// Afficher les articles du panier //
afficherArticlesPanier();
// Affichage de la quantité totale d'articles dans le panier //
affichageQuantitePanier();
// Affichage du prix total du panier //
affichageTotalPanier();

// Supprimer un article //
function supprimerArticle() {
  if (panier != null) {
    for (let i = 0; i < panier.length; i++) {
      const boutonSupprimer = document.querySelector(`.deleteItem-${panier[i].id}`);
      boutonSupprimer.addEventListener("click", (e) => {
        e.preventDefault();
        const filtragePanier = panier.filter((el) => el.id !== panier[i].id);
        if (filtragePanier == 0) {
          localStorage.clear();
        } else {
          localStorage.setItem("kanap", (JSON.stringify(filtragePanier)));
        }
        alert("Panier modifié !");
        window.location.reload();
      })
  }}
};
supprimerArticle();

// Modifier la quantité d'un article //
function modifierQuantite() {
  if (panier != null) {
    for (let i = 0; i < panier.length; i++) {
      let quantiteChoisie = document.querySelector(`#itemQuantity-${panier[i].id}`);
      quantiteChoisie.addEventListener("change", (e) => {
        e.preventDefault();
        panier[i].quantite = quantiteChoisie.value;
        localStorage.setItem("kanap", (JSON.stringify(panier)));
        alert("Quantité modifiée !");
        window.location.reload();
      });
    }
  }
};
modifierQuantite();

// Validation du formulaire //
function checkIfFieldIsValid(input, regExp) {
  return input.value.match(regExp) !== null;
}

function validationFormulaire() {
  let inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length ; i++) {
      inputs[i].classList.remove("is-invalid");
      inputs[i].classList.remove("is-valid");
  }

  let alertMessages = document.querySelectorAll(".alertMessages");
  for (let i = 0; i < alertMessages.length ; i++) {
      alertMessages[i].remove();
  };

  // Récupérer les informations du formulaire //
  let firstName = document.querySelector("#firstName"),
      lastName = document.querySelector("#lastName"),
      address = document.querySelector("#address"),
      city = document.querySelector("#city"),
      email = document.querySelector("#email");

  // Définition des expressions régulières pour vérifier la validité des champs //
  let stringRegExp = /([A-Za-z0-9_\s\-'\u00C0-\u024F]+)/;
  let emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // Vérification de la validité des champs
  let isfirstNameValid = checkIfFieldIsValid(firstName, stringRegExp),
      isLastNameValid = checkIfFieldIsValid(lastName, stringRegExp),
      isAddressValid = checkIfFieldIsValid(address, stringRegExp),
      isCityValid = checkIfFieldIsValid(city, stringRegExp),
      isEmailValid = checkIfFieldIsValid(email, emailRegExp);

  // Alerter l'utilisateur si le formulaire est mal rempli
  let fields = [firstName, lastName, address, city, email],
      fieldsValidity = [isfirstNameValid, isLastNameValid, isAddressValid, isCityValid, isEmailValid],
      isAFieldInvalid = false;

  for (let i = 0; i < fields.length; i++) {
      // si un champ n'est pas valide
      if (!fieldsValidity[i]) {
          // un champ au moins est incorrect, sera utilisé plus loin pour empêcher la requête POST à l'API
          isAFieldInvalid = true;
          //Création du message à envoyer à l'utilisateur
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
  
          // Création et stylisation de l'alerte
          let alert = document.createElement("div");
          alert.appendChild(document.createTextNode(message));
          fields[i].classList.add("is-invalid");
          alert.classList.add("alertMessages", "invalid-feedback");
          fields[i].parentElement.appendChild(alert);
  
      } else {
          fields[i].classList.add("is-valid");
      }
      }
      // Si l'un des champs a été vidé ...
      if (isAFieldInvalid) return; // la fonction s'arrête 
      // sinon on continue
  
      // les entrer dans un objet
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

      // Récupérer l'orderId
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

document.querySelector("#order").addEventListener("click", (e) => {
  e.preventDefault();
  validationFormulaire();}, false);
