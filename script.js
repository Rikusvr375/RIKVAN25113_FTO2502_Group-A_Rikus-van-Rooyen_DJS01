import { podcasts, genres } from "./data.js";



document.addEventListener('DOMContentLoaded', () => {
    // Creating a container div for storing data from data.js
    const container = document.createElement('div');
    container.className = 'data-container';

    // Creating an element to show the stored data
    podcasts.forEach(item => {
        const dataDiv = document.createElement('div');
        dataDiv.className = 'data-content';
    //Linking ID's to genres
        const genreSpes = item.genres
            .map(id => genres.find(genre => genre.id === id)?.title || "Unknown")
            .join(" ");

        const genreButtons = item.genres
            .map(id => genres.find(genre => genre.id === id)?.title || "Unknown")
            .map(genre => `<button class="genre-button">${genre}</button>`)
            .join("");

        dataDiv.innerHTML = `
        <img src="${item.image}" alt="${item.title}"/>
        <h3>${item.title}</h3>
        <p><img src="icons/calender-icon.svg" alt="calender-icon"/>${item.seasons} seasons</p>
        <span>${genreButtons}</span>
        <small>${item.updated}</small>
        `;
        container.appendChild(dataDiv);
    });


    // Place continer in body
    document.body.appendChild(container);
})
