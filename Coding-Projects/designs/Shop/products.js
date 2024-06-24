document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:1337/products')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('products');
            data.products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.alt_text}">
                    <p class="title">${product.product_name}</p>
                    <div class="lrsplit">
                        <p>${product.in_stock} in stock</p>
                        <p class="price">${product.price}€</p>
                    </div>
                `;
                productList.appendChild(productElement);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});

function fetchTotalProductsCount() {
    return fetch('http://localhost:1337/api/products/count')
        .then(response => response.json())
        .then(data => data.count);
}

function updateProductCountIndicator() {
    fetchTotalProductsCount().then(totalProducts => {
        const perPageTotal = totalProducts < 40 ? totalProducts : 40;
        const productCountIndicatorElement = document.getElementById('productCountIndicator');
        if (productCountIndicatorElement) {
            productCountIndicatorElement.textContent = `Showing ${perPageTotal} of ${totalProducts}`;
        }
    });
}

updateProductCountIndicator();