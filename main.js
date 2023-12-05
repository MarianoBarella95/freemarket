import { cartInit } from "./cart.js";
import { productInit } from "./products.js";

const btnToggle = document.querySelector('.btn-toggle-menu');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('header');
// const productsContainer = document.querySelector('.products-container');
// const loadMoreBtn = document.querySelector('.load-more-btn');
// const filterContainer = document.querySelector('.filter-container');
// const categoriesList = document.querySelectorAll('.filter-btn');
// const btnCart = document.querySelector('.btn-cart');
// const cartMenu = document.querySelector('.cart');
// const productsCart = document.querySelector('.cart-content');
// const total = document.querySelector('.total');
// const cartBubbleQuantity = document.querySelector('.cart-quantity');
// const btnClearCart = document.querySelector('.btn-clear-cart');
// const btnBuy = document.querySelector('.btn-buy');
// const modal = document.querySelector('.modal');
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

// Mostrar Carrito 

const showCart = () => {
    cartMenu.classList.toggle('show-cart');

    if (navMenu.classList.contains('show-nav-menu')) {
        navMenu.classList.remove('show-nav-menu');
        return;
    } 
}

// Guardar el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const guardarCarrito = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/*const crearPlantillaProducto = (product) => {
    const {id, name, price, img, category} = product;
    return `
    <div class="product">
        <img class="product-img" src="${img}" alt="">
        <div class="product-info">
            <h3 class="product-title">${name}</h3>
            <p class="product-price">$${price}</p>
            <p class="product-category">${category.toUpperCase()}</p>
        </div>
        <button class="add-to-cart-btn" 
            data-id="${id}"
            data-name="${name}"
            data-price="${price}"
            data-category="${category}">Add to cart <i class="fa-solid fa-cart-shopping"></i></button>
    </div>`
}

const renderizarProductos = (ProductsData) => {
    productsContainer.innerHTML += ProductsData.map(crearPlantillaProducto).join('');
}

// Botón cargar más productos

const loadMoreProducts = () => {
    appState.currentProductIndex += 1;
    let {products, currentProductIndex} = appState;
    renderizarProductos(products[currentProductIndex]);

    if(currentProductIndex === products.length - 1) {
        loadMoreBtn.style.display = 'none';
    }
}

// Mostrar visibilidad del botón cargar más

const loadMoreBtnVisibility = () => {
    if(!appState.activeFilter) {
        loadMoreBtn.style.display = 'block';
        return;
    }
    loadMoreBtn.style.display = 'none';

}

// Aplicar filtros 

const changebtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];

    categories.forEach(filterBtn => {
        if (filterBtn.dataset.category !== selectedCategory) {
            filterBtn.classList.remove('active');
            return
        } 
        filterBtn.classList.add('active');
    })
}

const cambiarEstadoFiltro = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changebtnActiveState(appState.activeFilter);
    loadMoreBtnVisibility(appState.activeFilter);
}

const applyFilter = ({target}) => {
    if (!isInactiveFilterBtn(target)) {
        return;
    }
    cambiarEstadoFiltro(target);
    productsContainer.innerHTML = '';
    
    if (appState.activeFilter) {
        renderizarProductosFiltrados();
        appState.currentProductIndex = 0;
        return; 
    } 
    renderizarProductos(appState.products[0]);
}

const isInactiveFilterBtn = (element) => {
    return (
        element.classList.contains('filter-btn') && !element.classList.contains('active')
    )
}


const renderizarProductosFiltrados = () => {
    const productosFiltrados = ProductsData.filter((product) => {
        return product.category === appState.activeFilter
    })
    renderizarProductos(productosFiltrados);
}*/

// FUNCIONES RELATIVAS AL CARRITO

const createCartProductTemplate = (product) => {
    console.log(product);
    const {id, name, price, quantity} = product
    return `  <div class="cart-item">
    <div class="item-info">
      <h3 class="item-title">${name}</h3>
      <span class="item-price">$${price}</span>
    </div>
    <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
    </div>
    </div> `
}

const renderizarCarrito = () => {
    if (!cart.length) {
        productsCart.innerHTML = `<p>Your cart is empty</p>`;
        return;
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join('');
}

const obtenerTotal = () => {
    return cart.reduce((acc, cur) => {
        console.log('Price:', cur.price);
        console.log('Quantity:', cur.quantity);
        return acc + Number(cur.price) * cur.quantity;
    }, 0);
}

const mostrarTotalCarrito = () => {
    total.innerHTML = `$${obtenerTotal().toFixed(2)}`
}


const renderizarBubble = () => {
    cartBubbleQuantity.innerHTML = cart.length;
}

// Desabilitar botones

const desabilitarBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add('disabled-btn');
        return;
    }
    btn.classList.remove('disabled-btn');
}

const actualizarCarrito = () => {
    guardarCarrito();
    renderizarCarrito();
    mostrarTotalCarrito();
    renderizarBubble();
    desabilitarBtn(btnClearCart);
    desabilitarBtn(btnBuy);
}

const anadirProducto = (e) => {
    if (!e.target.classList.contains('add-to-cart-btn')) {
        return;
    }
    const product = crearProductInfo(e.target.dataset);
    if(checkExistingProduct(product)) {
        añadirUnidad(product);
        mostrarModal(`A unit of ${product.name} has been added to cart`);
    } else {
        crearProductoCarrito(product);
        mostrarModal(`Added ${product.name} to cart`);
    }
    actualizarCarrito();
}


const mostrarModal = (mensaje) => {
    modal.classList.toggle('show-modal');
    modal.textContent = mensaje;
    setTimeout(() => {
        modal.classList.remove('show-modal');
    }, 1500);
    //console.log('modal', modal);
}

const añadirUnidad = (product) => {
    cart = cart.map((cartProduct) => {
        return cartProduct?.id === product.id ? {...cartProduct, quantity: cartProduct.quantity + 1} : cartProduct;
    })
}

const crearProductoCarrito = (product) => {
    cart = [...cart, {...product, quantity: 1}];
}

const checkExistingProduct = (product) => {
    return cart.find((item) => {
        return item.id === product.id;
    })
}

const crearProductInfo = (product) => {
    const {id, name, price} = product;
    return {id, name, price};
}

// Manejar cantidades 

const manejarCantidades = (e) => {
    if(e.target.classList.contains('down')) {
        btnDownEvent(e.target.dataset.id);
    } else if (e.target.classList.contains('up')) {
        btnUpEvent(e.target.dataset.id);
    }
    actualizarCarrito();
}
const btnUpEvent = (id) => {
    const existingProduct = cart.find((product) => product.id === id);
    añadirUnidad(existingProduct);
    actualizarCarrito();    
}

const btnDownEvent = (id) => {
    const existingProduct = cart.find((product) => product.id === id);
    if(existingProduct.quantity === 1) {
        removerProductoCarrito(existingProduct);
        return;
    } 
    sustraerUnidad(existingProduct);
}


const sustraerUnidad = (existingProduct) => {
    cart = cart.map((product) => {
        return product.id === existingProduct.id ? {...product, quantity: product.quantity - 1} : product;
    })
}

const removerProductoCarrito = (existingProduct) => {
    cart = cart.filter((product) => {
        return product.id !== existingProduct.id;
    })
    actualizarCarrito();
}

// Confirmar compra

const completarAccion = (confirmar, exito) => {
    if(!cart.length) return;
    if(window.confirm(confirmar)) {
        cart = [];
        actualizarCarrito();
        alert(exito);
    }
}

const completarCompra = () => {
    completarAccion('Are you sure you want to buy these products?', 'Thank you for your purchase!');        
}

const vaciarCarrito = () => {
    completarAccion('Are you sure you want to clear the cart?', 'Cart cleared!');
}

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
    // renderizarProductos(appState.products[0]);
    // loadMoreBtn.addEventListener('click', loadMoreProducts);
    // filterContainer.addEventListener('click', applyFilter);
    productInit();
    cartInit();
    /*productsContainer.addEventListener('click', anadirProducto);
    btnCart.addEventListener('click', (showCart));
    document.addEventListener('DOMContentLoaded', renderizarCarrito);
    document.addEventListener('DOMContentLoaded', mostrarTotalCarrito);
    renderizarBubble();
    desabilitarBtn(btnClearCart);
    desabilitarBtn(btnBuy);
    productsCart.addEventListener('click', manejarCantidades);
    btnBuy.addEventListener('click', completarCompra)
    btnClearCart.addEventListener('click', vaciarCarrito);*/
    form.addEventListener('submit', formValidation)

};

init();