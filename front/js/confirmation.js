let order = localStorage.getItem("orderId");
order = JSON.parse(order);

let idOrder = document.querySelector("#orderId");

// Affiche le numéro de commande //

function displayId() {
    idOrder.innerHTML = order.orderId;
}

displayId();

// Retour à l'accueil avec le Storage qui se vide //
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