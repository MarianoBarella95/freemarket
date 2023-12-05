import { appState, ProductsData } from "./data.js";
// import { anadirProducto } from "./cart.js";


const productsContainer = document.querySelector('.products-container');
const loadMoreBtn = document.querySelector('.load-more-btn');
const filterContainer = document.querySelector('.filter-container');
const categoriesList = document.querySelectorAll('.filter-btn');

const crearPlantillaProducto = (product) => {
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
}


export const productInit = () => {
    renderizarProductos(appState.products[0]);
    loadMoreBtn.addEventListener('click', loadMoreProducts);
    filterContainer.addEventListener('click', applyFilter);
}