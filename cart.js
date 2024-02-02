const btnCart = document.querySelector('.btn-cart');
const cartMenu = document.querySelector('.cart');
const productsCart = document.querySelector('.cart-content');
const total = document.querySelector('.total');
const cartBubbleQuantity = document.querySelector('.cart-quantity');
const btnClearCart = document.querySelector('.btn-clear-cart');
const btnBuy = document.querySelector('.btn-buy');
const modal = document.querySelector('.modal');
const productsContainer = document.querySelector('.products-container');

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

export const anadirProducto = (e) => {
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


// CÓDIGO CORRECCIÓN MODAL CONFIRMAR

const btnDownEvent = (id) => {
    const existingProduct = cart.find((product) => product.id === id);
    if(existingProduct.quantity === 1) {
        mostrarModalConfirmacion(existingProduct);
        return;
    } 
    sustraerUnidad(existingProduct);
    actualizarCarrito();
}

const mostrarModalConfirmacion = (existingProduct) => {
    let confirmMessage = '';

    if (cart.length === 1) {
        confirmMessage = 'Are you sure you want to clear the cart?';
    } else {
        confirmMessage = `Are you sure you want to remove ${existingProduct.name} from the cart?`;
    }

    const confirmar = confirm(confirmMessage);

    if (confirmar) {
        if (cart.length === 1) {
            // Limpiar el carrito
            cart = [];
            alert('Cart cleared!');
        } else {
            // Eliminar un producto específico
            removerProductoCarrito(existingProduct);
            alert(`Product ${existingProduct.name} removed from the cart.`);
        }

        actualizarCarrito();
    }
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


export const cartInit = () => {
    productsContainer.addEventListener('click', anadirProducto);
    btnCart.addEventListener('click', (showCart));
    document.addEventListener('DOMContentLoaded', renderizarCarrito);
    document.addEventListener('DOMContentLoaded', mostrarTotalCarrito);
    renderizarBubble();
    desabilitarBtn(btnClearCart);
    desabilitarBtn(btnBuy);
    productsCart.addEventListener('click', manejarCantidades);
    btnBuy.addEventListener('click', completarCompra)
    btnClearCart.addEventListener('click', vaciarCarrito);
}