import { podcasts, genres } from "./data.js";

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('data-container');
    const modalOverlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    const modalCover = document.getElementById('modal-cover');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalGenres = document.getElementById('modal-genres');
    const modalUpdated = document.getElementById('modal-updated');
    const modalSeasonList = document.getElementById('modal-season-list');

    /**
     * Displays the modal popup with details of a selected podcast.
     * This function populates the modal with podcast data such as title, description,
     * cover image, genres, update date, and season information, then makes it visible.
     * 
     * @param {Object} item - The podcast object containing details like title, image, description, genres, seasons, and updated date.
     * @returns {void}
     * @sideeffect Updates the DOM by setting the modal content and displaying the modal overlay and modal.
     * @example
     * showModal(podcasts[0]); // Displays the first podcast's details in the modal
     */
    function showModal(item) {
        modalCover.src = item.image || 'placeholder.jpg';
        modalCover.alt = `${item.title} Cover`;
        modalTitle.textContent = item.title;
        modalDescription.textContent = item.description || 'No description available';
        modalUpdated.textContent = `Last updated: ${new Date(item.updated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}`;

        modalGenres.innerHTML = '';
        const genreButtons = item.genres
            .map(id => genres.find(g => g.id === id)?.title || "Unknown")
            .map(genre => `<button class="genre-button">${genre}</button>`)
            .join('');
        modalGenres.innerHTML = genreButtons;

        modalSeasonList.innerHTML = '';
        for (let i = 1; i <= item.seasons; i++) {
            const seasonDiv = document.createElement('div');
            seasonDiv.className = 'season-item';
            seasonDiv.innerHTML = `
                Season ${i}: Getting Started ${i}
                <span>${12 * i} episodes</span>
            `;
            modalSeasonList.appendChild(seasonDiv);
        }

        modalOverlay.style.display = 'block';
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
    }

    /**
     * Hides the modal popup and restores the page's scroll behavior.
     * This function conceals the modal overlay and modal, ensuring the body
     * can scroll again after the modal is closed.
     * 
     * @returns {void}
     * @sideeffect Updates the DOM by hiding the modal overlay and modal, and removes the modal-open class from the body.
     * @example
     * hideModal(); // Closes the currently open modal
     */
    function hideModal() {
        modalOverlay.style.display = 'none';
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    modalClose.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) hideModal();
    });

    podcasts.forEach(item => {
        const dataDiv = document.createElement('div');
        dataDiv.className = 'data-content';
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
            <small>${new Date(item.updated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</small>
        `;

        dataDiv.addEventListener('click', () => showModal(item));
        container.appendChild(dataDiv);
    });
});