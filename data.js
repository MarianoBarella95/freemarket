export const ProductsData = [
    {
        id: 1,
        name: 'Xiaomi Redmi Buds Essential',
        price: 19.899,
        img: 'img/img-products/xiaomi-redmi-buds-essential.webp',
        category: 'audio',
    }
    ,
    {
        id: 2,
        name: 'Aiwa AW-BT301',
        price: 29.989,
        img: 'img/img-products/aiwa-bt301.webp',
        category: 'audio',
    }
    ,
    {
        id: 3,
        name: 'Noblex MNT1050',
        price: 299.999,
        img: 'img/img-products/parlante-noblex-mnt-1050.webp',
        category: 'audio',
    }
    ,
    {
        id: 4,
        name: 'Parlante JBL Charge Essential 2',
        price: 149.989,
        img: 'img/img-products/parlante-jbl-essential.webp',
        category: 'audio',
    }
    ,
    {
        id: 5,
        name: 'Smart Tv 32¨ Philips Android',
        price: 125.979,
        img: 'img/img-products/smart-tv-phillips.webp',
        category: 'tv',
    }
    ,
    {
        id: 6,
        name: 'Smart Tv Samsung',
        price: 149.999,
        img: 'img/img-products/smart-tv-samsung.webp',
        category: 'tv',
    }
    ,
    {
        id: 7,
        name: 'Smart TV Quint',
        price: 120.671,
        img: 'img/img-products/smart-tv-quint.webp',
        category: 'tv',
    }
    ,
    {
        id: 8,
        name: 'Xbox Series S 512gb',
        price: 799.999,
        img: 'img/img-products/xblx.webp',
        category: 'gaming',
    }
    ,
    {
        id: 9,
        name: 'Sony PlayStation 5 825GB',
        price: 949.999,
        img: 'img/img-products/sony-ps5.webp',
        category: 'gaming',
    }
    ,
    {
        id: 10,
        name: 'WILSON NFL Super Grip Composite Football',
        price: 125.999,
        img: 'img/img-products/wilson-nfl.webp',
        category: 'sports', 
    }
    ,
    {
        id: 11,
        name: 'Bicicleta Nordic X',
        price: 199.141,
        img: 'img/img-products/nordic-x.webp',  
        category: 'sports',
    }
    ,
    {
        id: 12,
        name: 'Monopatín de pie Wondrus',
        price: 19.499,
        img: 'img/img-products/monopatin-wondrus.webp',
        category: 'sports',
    }
    ,
    {
        id: 13,
        name: 'Buzo Puma Modern Sports',
        price: 33.666,
        img: 'img/img-products/buzo-puma.webp',
        category: 'sports',
    }
    ,
    {
        id: 14,
        name: 'H.D.P',
        price: 16.191,
        img: 'img/img-products/hdp.webp',   
        category: 'toys',
    }
    ,
    {
        id: 15,
        name: 'Buzz Lightyear Toy Story 4',
        price: 17.154,
        img: 'img/img-products/buzz-lightyear.webp',
        category: 'toys',
    }
    ,
    {
        id: 16,
        name: 'Action Figure Thor',
        price: 4.966,
        img: 'img/img-products/thor-action-figure.webp',
        category: 'toys',
    }
]

const dividirProductos = (size) => {
    const productsList = [];

    for (let i = 0; i < ProductsData.length; i += size) {
        productsList.push(ProductsData.slice(i, i + size));
    }
    return productsList;
}


export const appState = {
    products: dividirProductos(6),
    productLimit: dividirProductos(6).length,
    currentProductIndex: 0,
    activeFilter: null,
}