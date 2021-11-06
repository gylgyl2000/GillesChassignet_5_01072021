/** Récupère les données dans localStorage */
let order = localStorage.getItem("orderId");
order = JSON.parse(order);

/** Affiche le numéro de commande */
let idOrder = document.querySelector("#orderId");
function displayId() {
    idOrder.innerHTML = order.orderId;
}
displayId();

/** Retour à l'accueil et vide le localStorage */
function viderStorage() {
    let backIndex = document.querySelectorAll(".limitedWidthBlock a");
    for (let i = 0; i < backIndex.length; i++) {
        backIndex[i].addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = "index.html";
        });
    }
}
viderStorage();
