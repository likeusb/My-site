let columns = Math.floor(document.body.clientWidth / 100),
    rows = Math.floor(document.body.clientHeight / 100);

const wrapper = document.getElementById('tiles');

const createTile = index => {
    const tile = document.createElement("div");

    tile.classList.add("tile");

    return tile;
}

const createTiles = quantity => {
    Array.from(Array(quantity)).map((tile, index) => {
        wrapper.appendChild(createTile(index));
    })
}

const createGrid = () => {
    wrapper.innerHTML = "";

    const tileSize = 100; // Desired tile size in pixels
    columns = Math.floor(document.body.clientWidth / tileSize);
    rows = Math.floor(document.body.clientHeight / tileSize);

    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);

    createTiles(columns * rows);
}

window.onresize = () => createGrid();

createGrid();

const currentMonth = new Date().getMonth();

const tableRows = document.querySelectorAll('table tr');

const customStyle = 'background-color: rgb(155, 5, 255);'; 

if (currentMonth + 2 < tableRows.length) {
    tableRows[currentMonth + 2].style = customStyle;
}