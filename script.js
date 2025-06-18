import { podcasts } from "./data.js";
import { genres  } from "./data.js";


document.addEventListener('DOMContentLoaded', () => {
    // Creating a container div for storing data from data.js
    const container = document.createElement('div');
    container.className = 'data-container';

    // Creating an element to show the stored data
    podcasts.forEach(item => {
        const dataDiv = document.createElement('div');
        dataDiv.className = 'data-content';
        dataDiv.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.seasons}</p>
        <span>${item.genres}</span>
        <small>${item.updated}</small>
        `;
        container.appendChild(dataDiv);
    });


    // Place continer in body
    document.body.appendChild(container);
})
