const inputSearch = document.getElementById('inputSearch');
const mainContainer = document.querySelector('.mainContainer');

const templateCardPokemon = document.getElementById('cardPokemon').content;
const cardFragment = document.createDocumentFragment();

const filters = document.querySelector('.typesPokemons');

const cardContainer = document.getElementById('cardContainer');

const form = document.getElementById('form');

const navBar = document.getElementById('navBar');

const getAllPokemons = async (quantity) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${quantity}&offset=0`
    );
    const data = await response.json();
    return data.results;
};

const getPokemonsByUrl = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
};

const parameterUrl = ({ url }) => {
    const clone = templateCardPokemon.cloneNode(true);
    getPokemonsByUrl(url).then((item) => {
        console.log(item);
        let type = item.types.map((item) => item.type.name);
        clone.querySelector('.card h1').innerText = item.name.toUpperCase();
        clone.querySelector('.card img').src = item.sprites.front_default;
        clone.querySelector('.card img').alt = item.name;
        clone.querySelector('.card h4').innerText = type.join(' - ');

        cardFragment.appendChild(clone);
        cardContainer.appendChild(cardFragment);
        mainContainer.appendChild(cardContainer);
    });
};

const filterTypes = ({ url, e }) => {
    const clone = templateCardPokemon.cloneNode(true);
    getPokemonsByUrl(url).then((item) => {
        item.types.filter((filtro) => {
            if (filtro.type.name == e.target.id) {
                clone.querySelector('.card h1').innerText = item.name;
                clone.querySelector('.card img').src =
                    item.sprites.front_default;
                clone.querySelector('.card img').alt = item.name;
                clone.querySelector('.card h4').innerText = filtro.type.name;

                cardFragment.appendChild(clone);
                cardContainer.appendChild(cardFragment);
                mainContainer.appendChild(cardContainer);
            }
        });
    });
};

const searchBy = ({ item, e }) => {
    const { name, url } = item;
    cardFragment.textContent = '';
    cardContainer.textContent = '';
    if (!isNaN(inputSearch.value) && inputSearch.value !== '')
        parameterUrl({ url });
    if (name.startsWith(inputSearch.value) && inputSearch.value !== '')
        parameterUrl({ url });

    if (e.target.checked) filterTypes({ url, e });
    cardFragment.textContent = '';
    cardContainer.textContent = '';
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputSearch.placeholder === 'Buscar por cantidad') {
        getAllPokemons(inputSearch.value).then((item) =>
            item.forEach((item) => searchBy({ item, e }))
        );
    } else if (inputSearch.placeholder === 'Buscar por nombre') {
        getAllPokemons(120).then((item) =>
            item.forEach((item) => searchBy({ item, e }))
        );
    }
});

navBar.querySelectorAll('ul li').forEach((item) =>
    item.addEventListener('click', (e) => {
        inputSearch.placeholder = `${e.target.innerText}`;
        inputSearch.value = '';
        if (inputSearch.placeholder === 'Todos') {
            mainContainer.textContent = '';
            cardFragment.textContent = '';
            cardContainer.textContent = '';

            getAllPokemons(5).then((item) => {
                item.forEach((item) => {
                    getPokemonsByUrl(item.url).then((item) => {
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
        } else if (e.target.id === 'type') {
            mainContainer.innerText = '';
            mainContainer.appendChild(filters);
            filters.style.display = 'flex';
        } else {
            mainContainer.textContent = '';
            mainContainer.appendChild(form);
        }
    })
);

filters.querySelectorAll('div').forEach((item) =>
    item.addEventListener('click', (e) => {
        getAllPokemons(120).then((item) =>
            item.forEach((item) => searchBy({ item, e }))
        );
    })
);
