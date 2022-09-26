const inputSearch = document.getElementById('inputSearch');
const mainContainer = document.querySelector('.mainContainer');
// const inputLetter = document.getElementById("searchByLetter");

const templateCardPokemon = document.getElementById('cardPokemon').content;
const cardFragment = document.createDocumentFragment();
// const showNumberResult = document.querySelector(".resultNumber");
// const showLetterResult = document.querySelector(".resultLetter");

const cardContainer = document.getElementById('cardContainer');

const form = document.getElementById('form');

const quantity = document.getElementById('quantity');
const name = document.getElementById('name');
const type = document.getElementById('type');
const all = document.getElementById('all');
const navBar = document.getElementById('navBar');

const getResults = async (number) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${number}&offset=0`
    );
    const data = await response.json();
    return data.results;
};

const getUrl = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
};

// const resultSearchByNumber = async () => {
//     const response = await fetch(
//         `https://pokeapi.co/api/v2/pokemon?limit=${inputNumber.value}&offset=0`
//     );
//     const data = await response.json();
//     const { results } = data;

//     if (inputNumber.value !== "") {
//         showNumberResult.textContent = "";
//         for (let i = 0; i < inputNumber.value; i++) {
//             showNumberResult.innerHTML += `<div><b>${i + 1}</b>- ${
//                 results[i].name
//             }</div>`;
//         }
//     } else {
//         showNumberResult.textContent = "";
//     }
// };

// const resultSearchByLetter = async () => {
//     const response = await fetch(
//         `https://pokeapi.co/api/v2/pokemon?limit=200&offset=0`
//     );
//     const data = await response.json();
//     const { results } = data;

//     showLetterResult.textContent = "";
//     for (let i = 0; i < 200; i++) {
//         if (inputLetter.value !== "") {
//             if (results[i].name.startsWith(inputLetter.value)) {
//                 showLetterResult.innerHTML += `<div>${results[i].name}</div>`;
//             }
//         } else {
//             showLetterResult.textContent = "";
//         }
//     }
// };

// inputNumber.addEventListener("keyup", () => {
//     if (!isNaN(inputNumber.value)) {
//         showNumberResult.textContent = "";
//         resultSearchByNumber();
//     } else {
//         showNumberResult.innerHTML = "<div>Ingrese un numero</div>";
//     }
// });
// inputLetter.addEventListener("keyup", () => {
//     if (isNaN(inputLetter.value)) {
//         resultSearchByLetter();
//     } else if (inputLetter.value === "") {
//         showLetterResult.textContent = "";
//     } else {
//         showLetterResult.innerHTML = "<div>Ingrese una letra</div>";
//     }
// });

const searchByQuantity = (url) => {
    const clone = templateCardPokemon.cloneNode(true);
    cardFragment.textContent = '';
    cardContainer.textContent = '';
    if (!isNaN(inputSearch.value) && inputSearch.value !== '') {
        getUrl(url).then((item) => {
            let type = item.types.map((item) => item.type.name);
            clone.querySelector('.card h1').innerText = item.name.toUpperCase();
            clone.querySelector('.card img').src = item.sprites.front_default;
            clone.querySelector('.card img').alt = item.name;
            clone.querySelector('.card h4').innerText = type.join(' - ');

            cardFragment.appendChild(clone);
            cardContainer.appendChild(cardFragment);
            mainContainer.appendChild(cardContainer);
        });
        return;
    }
    cardFragment.textContent = '';
    cardContainer.textContent = '';
};

const searchByName = (name, url) => {
    const clone = templateCardPokemon.cloneNode(true);
    cardFragment.textContent = '';
    cardContainer.textContent = '';
    if (name.startsWith(inputSearch.value) && inputSearch.value !== '') {
        getUrl(url).then((item) => {
            let type = item.types.map((item) => item.type.name);
            clone.querySelector('.card h1').innerText = item.name.toUpperCase();
            clone.querySelector('.card img').src = item.sprites.front_default;
            clone.querySelector('.card img').alt = item.name;
            clone.querySelector('.card h4').innerText = type.join(' - ');

            cardFragment.appendChild(clone);
            cardContainer.appendChild(cardFragment);
            mainContainer.appendChild(cardContainer);
        });
        return;
    }
    cardFragment.textContent = '';
    cardContainer.textContent = '';
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputSearch.placeholder === 'Buscar por cantidad') {
        getResults(inputSearch.value).then((item) =>
            item.forEach((item) => searchByQuantity(item.url))
        );
    } else if (inputSearch.placeholder === 'Buscar por nombre') {
        getResults(10).then((item) =>
            item.forEach((item) => searchByName(item.name, item.url))
        );
    }
});

navBar.addEventListener('click', (e) => {
    inputSearch.placeholder = `${e.target.innerText}`;
    inputSearch.value = '';
    if (inputSearch.placeholder === 'Todos') {
        mainContainer.textContent = '';
        cardFragment.textContent = '';
        cardContainer.textContent = '';

        getResults(5).then((item) => {
            item.forEach((item) => {
                getUrl(item.url).then((item) => {
                    let type = item.types.map((item) => item.type.name);
                    const clone = templateCardPokemon.cloneNode(true);
                    clone.querySelector('.card h1').innerText =
                        item.name.toUpperCase();
                    clone.querySelector('.card img').src =
                        item.sprites.front_default;
                    clone.querySelector('.card img').alt = item.name;
                    clone.querySelector('.card h4').innerText =
                        type.join(' - ');

                    cardFragment.appendChild(clone);
                    cardContainer.appendChild(cardFragment);
                    mainContainer.appendChild(cardContainer);
                });
            });
        });
    } else {
        mainContainer.textContent = '';
        mainContainer.appendChild(form);
    }
});
