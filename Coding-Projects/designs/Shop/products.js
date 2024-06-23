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
                    <h2>${product.product_name}</h2>
                    <div class="lrsplit">
                        <p>${product.in_stock} in stock</p>
                        <p>${product.price}</p>
                    </div>
                `;
                productList.appendChild(productElement);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});