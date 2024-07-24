document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = 'http://localhost:3000/monsters';
    let page = 1;
    const limit = 50;

    const monsterList = document.querySelector('.monster-list');
    const monsterForm = document.querySelector('.monster-form');
    const loadMoreButton = document.getElementById('load-more');

    const fetchMonsters = async (page) => {
        const response = await fetch(`${apiUrl}?_limit=${limit}&_page=${page}`);
        const monsters = await response.json();
        monsters.forEach(monster => addMonsterToDOM(monster));
    };

    const addMonsterToDOM = (monster) => {
        const monsterItem = document.createElement('li');
        monsterItem.classList.add('monster-item');
        monsterItem.innerHTML = `
            <h3>${monster.name}</h3>
            <p>Age: ${monster.age}</p>
            <p>${monster.description}</p>
        `;
        monsterList.appendChild(monsterItem);
    };

    const createMonster = async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const description = document.getElementById('description').value;

        const newMonster = { name, age, description };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newMonster)
        });

        const monster = await response.json();
        addMonsterToDOM(monster);

        // Reset form
        monsterForm.reset();
    };

    monsterForm.addEventListener('submit', createMonster);

    loadMoreButton.addEventListener('click', () => {
        page++;
        fetchMonsters(page);
    });

    // Initial fetch
    fetchMonsters(page);
});
