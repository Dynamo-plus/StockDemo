// const endpoint = "https://api.bybit.com/v5/market/tickers?category=linear";

const endpoint = "https://openexchangerates.org/api/latest.json?app_id=325dfede08434887bb83d74a154b85c7";
const itemsPerPage = 8;
let currentPage = 1;

var forexData = [];
var base;

const colors = ["#0f0b19", "#ffcf00", "#c5e946", "#af4fa2"];
let colorIndex = 0;

function sliceObject(obj, start, end) {
    return Object.fromEntries(
        Object.entries(obj).slice(start, end)
    );
}

async function dataTable() {
    await getData();

    const record = document.querySelector("ul#record");
    record.innerHTML = ""; // Clear existing rows

    const indexOfLastPage = currentPage * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;
    const currentItems = sliceObject(forexData, indexOfFirstPage, indexOfLastPage);

    console.log(currentItems);

    for (const [currency, rate] of Object.entries(currentItems)) {
        const listItem = document.createElement('li');
        listItem.className = "record";
        const color = colors[colorIndex % colors.length]; // Get the color based on the current index
        colorIndex++; // Increment the color index

        listItem.innerHTML = `
            <div class="record-item flex-row flex-gap">
                <div class="square" style="background-color: ${color};"></div>
                <div>
                    <h5>${base}/${currency}</h5>
                    <span class="bull">${rate}</span>
                </div>
            </div>
        `;
        record.appendChild(listItem);
    }
}

async function getData() {
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
    forexData = data.rates;
    base = data.base;
}

const prevBtn = () => {
    if (currentPage > 1) {
        currentPage--;
        dataTable();
    }
}

const nextBtn = () => {
    if (currentPage < Math.ceil(Object.keys(forexData).length / itemsPerPage)) {
        currentPage++;
        dataTable();
    }
}

document.getElementById('prevBtn').addEventListener('click', prevBtn);
document.getElementById('nextBtn').addEventListener('click', nextBtn);

dataTable();



/* async function urgentGet(){
const data = await fetch("https://openexchangerates.org/api/latest.json?app_id=325dfede08434887bb83d74a154b85c7")
const result = await data.json();

console.log(result.rates);

}

urgentGet()
 */

