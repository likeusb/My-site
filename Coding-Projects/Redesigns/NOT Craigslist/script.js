$(document).ready(function() {
    $(".custom-select").click(function(event) {
        event.stopPropagation();
        $(".custom-select").not(this).removeClass('active');
        $(".options").not($(this).find(".options")).removeClass('active').addClass('inactive');
        $(this).toggleClass('active');
        $(this).find(".options").toggleClass('active').toggleClass('inactive');
    });

    $(".option").click(function(event) {
        event.stopPropagation();
        var value = $(this).text();
        $(this).parent().parent().find(".selected-option").text(value);
        $(this).parent().removeClass('active').addClass('inactive');
        $(this).parent().parent().removeClass('active');

        $(".option").removeClass('active');

        $(this).addClass('active');
    });

    $(".Toggle").click(function() {
        $(".Toggle").removeClass('active');

        $(this).addClass('active');
    });

    $(document).click(function() {
        $(".options").removeClass('active').addClass('inactive');
        $(".custom-select").removeClass('active');
    });
});

$(document).ready(function() {
    fetch('http://localhost:1337/Listings')
        .then(response => response.json())
        .then(data => {
            console.log('Data received from server:', data);
            const listingsGrid = document.querySelector('.Listings');
            data.Listings.slice(0, 40).forEach(listing => { // Added slice(0, 40) here
                const listingDiv = document.createElement('div');
                listingDiv.className = 'Listing';

                const titleDiv = document.createElement('div');
                titleDiv.className = 'LTitle';
                titleDiv.textContent = listing.title;
                listingDiv.appendChild(titleDiv);

                const imageDiv = document.createElement('div');
                imageDiv.className = 'LImage';
                const image = document.createElement('img');
                image.src = listing.imglink;
                imageDiv.appendChild(image);
                listingDiv.appendChild(imageDiv);

                const bottomDiv = document.createElement('div');
                bottomDiv.className = 'LBottom';
                const span = document.createElement('span');
                span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0,0,256,256"
                style="fill:#000000;">
                <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M25,1c-8.83984,0 -16,7.16016 -16,16c0,7.30859 3.85938,15.16406 7.65625,21.25c3.79688,6.08594 7.59375,10.40625 7.59375,10.40625c0.19141,0.21484 0.46484,0.33984 0.75,0.33984c0.28516,0 0.55859,-0.125 0.75,-0.33984c0,0 3.80078,-4.41016 7.59375,-10.53125c3.79297,-6.12109 7.65625,-13.95703 7.65625,-21.125c0,-8.83984 -7.16016,-16 -16,-16zM25,3c7.76172,0 14,6.23828 14,14c0,6.43359 -3.63672,14.08203 -7.34375,20.0625c-3.10547,5.01172 -5.73437,8.23828 -6.65625,9.34375c-0.92969,-1.09766 -3.55859,-4.25391 -6.65625,-9.21875c-3.70312,-5.9375 -7.34375,-13.59766 -7.34375,-20.1875c0,-7.76172 6.23828,-14 14,-14zM25,11c-3.85547,0 -7,3.14453 -7,7c0,3.85547 3.14453,7 7,7c3.85547,0 7,-3.14453 7,-7c0,-3.85547 -3.14453,-7 -7,-7zM25,13c2.77344,0 5,2.22656 5,5c0,2.77344 -2.22656,5 -5,5c-2.77344,0 -5,-2.22656 -5,-5c0,-2.77344 2.22656,-5 5,-5z"></path></g></g>
            </svg> ${listing.location}<div class="LBPrice">$${listing.price}</div>`;

                bottomDiv.appendChild(span);
                listingDiv.appendChild(bottomDiv);

                listingsGrid.appendChild(listingDiv);
            });
        })
        .catch(error => console.error('Error:', error));
});

const listingsGrid = document.querySelector('#listingsGrid');

document.addEventListener('DOMContentLoaded', (event) => {
    // Function to fetch data and populate the table
    function populateTable() {
        fetch('http://localhost:1337/Listings')
            .then(response => response.json())
            .then(data => {
                // Get the table
                const table = document.querySelector('#listingsGrid');

                // If the table does not exist, log an error and return
                if (!table) {
                    console.error('Error: #listingsGrid does not exist in the DOM');
                    return;
                }

                // Get the table body, or create it if it doesn't exist
                let tbody = table.querySelector('tbody');
                if (!tbody) {
                    tbody = document.createElement('tbody');
                    table.appendChild(tbody);
                }

                // Loop through the data and create a row for each item
                data.Listings.forEach(item => {
                    const row = document.createElement('tr');

                    const titleCell = document.createElement('td');
                    titleCell.textContent = item.title;
                    row.appendChild(titleCell);

                    const imgLinkCell = document.createElement('td');
                    imgLinkCell.textContent = item.imglink;
                    row.appendChild(imgLinkCell);

                    const priceCell = document.createElement('td');
                    priceCell.textContent = item.price;
                    row.appendChild(priceCell);

                    const locationCell = document.createElement('td');
                    locationCell.textContent = item.location;
                    row.appendChild(locationCell);

                    const idCell = document.createElement('td');
                    idCell.textContent = item.id;
                    row.appendChild(idCell);

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.className = 'action-button delete-button';
                    deleteButton.addEventListener('click', () => {
                        fetch(`http://localhost:1337/Listings/${item.id}`, {
                            method: 'DELETE',
                        })
                        .then(() => {
                            // After a successful deletion, repopulate the table
                            populateTable();
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    });
                    row.appendChild(deleteButton);

                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.className = 'action-button edit-button';
                    editButton.addEventListener('click', () => {
                        // Open the edit form and fill it with the item data
                        const editForm = document.querySelector('#editForm');
                        editForm.elements.title.value = item.title;
                        editForm.elements.imglink.value = item.imglink;
                        editForm.elements.price.value = item.price;
                        editForm.elements.location.value = item.location;
                        editForm.elements.id.value = item.id;
                        editForm.style.display = 'block';
                    });
                    row.appendChild(editButton);

                    tbody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // Populate the table when the page loads
    populateTable();

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        fetch('http://localhost:1337/Listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);

            // After a successful submission, repopulate the table
            populateTable();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    document.querySelector('#editForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        fetch(`http://localhost:1337/Listings/${data.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);

            // After a successful update, repopulate the table and hide the edit form
            populateTable();
            event.target.style.display = 'none';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});