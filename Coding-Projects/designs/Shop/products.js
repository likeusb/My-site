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

let currentPage = 1;
let totalPages = 1; // Placeholder, will be updated based on total products count

function updateProductsAndIndicator(page) {
    displayProductsForPage(page);
    updateProductCountIndicator(); // This might need adjustments to show page numbers
}

document.getElementById('leftDoubleArrow').addEventListener('click', () => {
    currentPage = 1;
    updateProductsAndIndicator(currentPage);
});

document.getElementById('leftSingleArrow').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateProductsAndIndicator(currentPage);
    }
});

document.getElementById('rightSingleArrow').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        updateProductsAndIndicator(currentPage);
    }
});

document.getElementById('rightDoubleArrow').addEventListener('click', () => {
    currentPage = totalPages;
    updateProductsAndIndicator(currentPage);
});

// Fetch total products count to calculate total pages
fetchTotalProductsCount().then(totalProducts => {
    const productsPerPage = 40;
    totalPages = Math.ceil(totalProducts / productsPerPage);
    updateProductsAndIndicator(currentPage); // Initial update
});