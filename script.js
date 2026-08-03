// ================================
// Année automatique
// ================================

document.getElementById("year").textContent = new Date().getFullYear();


// ================================
// Bouton Retour en haut
// ================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        backToTop.style.display = "block";

    } else {

        backToTop.style.display = "none";

    }

});

backToTop.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// ================================
// Formulaire de contact
// ================================

const form = document.getElementById("contact-form");

const submitBtn = document.getElementById("submit-btn");

const successMessage = document.getElementById("success-message");

const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const sujet = document.getElementById("sujet").value.trim();
    const message = document.getElementById("message").value.trim();

    if (nom.length < 3) {

        errorMessage.innerHTML =
        '<i class="fas fa-circle-xmark"></i> Le nom doit contenir au moins 3 caractères.';

        errorMessage.style.display = "block";

        return;

    }

    if (!email.includes("@")) {

        errorMessage.innerHTML =
        '<i class="fas fa-circle-xmark"></i> Adresse email invalide.';

        errorMessage.style.display = "block";

        return;

    }

    if (sujet.length < 5) {

        errorMessage.innerHTML =
        '<i class="fas fa-circle-xmark"></i> Le sujet est trop court.';

        errorMessage.style.display = "block";

        return;

    }

    if (message.length < 20) {

        errorMessage.innerHTML =
        '<i class="fas fa-circle-xmark"></i> Votre message doit contenir au moins 20 caractères.';

        errorMessage.style.display = "block";

        return;

    }

    submitBtn.disabled = true;

    submitBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

    try {

        const response = await fetch(form.action, {

            method: "POST",

            body: new FormData(form),

            headers: {

                "Accept": "application/json"

            }

        });

        const data = await response.json();

        if (response.ok && data.success !== "false") {

            successMessage.innerHTML =
            '<i class="fas fa-circle-check"></i> Votre message a été envoyé avec succès.';

            successMessage.style.display = "block";

            form.reset();

        }

        else {

            throw new Error(data.message || "");

        }

    }

    catch {

        errorMessage.innerHTML =
        '<i class="fas fa-circle-xmark"></i> Impossible d\'envoyer le message.';

        errorMessage.style.display = "block";

    }

    submitBtn.disabled = false;

    submitBtn.innerHTML =
    '<i class="fas fa-paper-plane"></i> Envoyer le message';

});


// ================================
// Menu mobile
// ================================

const menuToggle = document.getElementById("menu-toggle");

const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("active")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-times");

    }

    else {

        icon.classList.remove("fa-times");

        icon.classList.add("fa-bars");

    }

});

navMenu.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-times");

        icon.classList.add("fa-bars");

    });

});
