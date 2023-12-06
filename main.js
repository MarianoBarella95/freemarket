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



// VALIDACION DEL FORMULARIO

const formValidation = (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
        window.alert('Your message has been sent');
        form.reset();
    } else {
        form.reportValidity();
        window.alert('Please complete the required fields');
    }
}


// Función Init
const init = () => {
    productInit();
    cartInit();
    form.addEventListener('submit', formValidation);
};

init();