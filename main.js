import { cartInit } from "./cart.js";
import { productInit } from "./products.js";

const btnToggle = document.querySelector('.btn-toggle-menu');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('header');
const form = document.querySelector('.form-container');

// Menú Toggle
const showMenu = () => {
    navMenu.classList.toggle('show-nav-menu');

    if (navMenu.classList.contains('show-nav-menu')) {
        header.style.boxShadow = ('none')
        btnToggle.innerHTML = '<i class="fa-solid fa-xmark" style="color: #ffffff;"></i>';
    } else {
        header.style.boxShadow = ('0 0 0.5rem rgba(0, 0, 0, 0.5)');
        btnToggle.innerHTML = '<i class="fa-solid fa-bars" style="color: #ffffff";></i>';
    }
    
    if (cartMenu.classList.contains('show-cart')) {
        cartMenu.classList.remove('show-cart');
        return; 
    }

}

btnToggle.addEventListener('click', (showMenu));



// VALIDACION DEL FORMULARIO CORREGIDO

const formValidation = (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('mail');
    const messageInput = document.getElementById('message');
    const menuSelect = document.getElementById('menu-select');

    // Validar el correo electrónico usando una expresión regular simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let errorMessage = '';

    if (!nameInput.validity.valid) {
        errorMessage += 'Please enter your name.\n';
    }

    if (!emailInput.validity.valid) {
        errorMessage += 'Please enter a valid email address.\n';
    } else if (!emailRegex.test(emailInput.value)) {
        errorMessage += 'Please enter a valid email address.\n';
    }

    if (!menuSelect.validity.valid) {
        errorMessage += 'Please select a question.\n';
    }

    if (!messageInput.validity.valid) {
        errorMessage += 'Please enter your message.\n';
    }

    if (errorMessage) {
        window.alert(errorMessage);
    } else {
        window.alert('Your message has been sent');
        form.reset();
    }
}


// Función Init
const init = () => {
    productInit();
    cartInit();
    form.addEventListener('submit', formValidation);
};

init();