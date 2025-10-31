// Modal functionality for the carousel
(function(){
    // Create modal elements
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.setAttribute('role', 'dialog');
    modalContainer.setAttribute('aria-modal', 'true');
    modalContainer.setAttribute('aria-hidden', 'true');
    modalContainer.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">×</button>
            <button class="modal-prev" aria-label="Previous image">❮</button>
            <button class="modal-next" aria-label="Next image">❯</button>
            <div class="modal-image-container">
                <img src="" alt="" class="modal-image">
            </div>
            <div class="modal-caption"></div>
        </div>
    `;
    document.body.appendChild(modalContainer);

    // Get DOM elements
    const carousel = document.getElementById('carousel');
    const modalImage = modalContainer.querySelector('.modal-image');
    const modalCaption = modalContainer.querySelector('.modal-caption');
    const modalClose = modalContainer.querySelector('.modal-close');
    const modalPrev = modalContainer.querySelector('.modal-prev');
    const modalNext = modalContainer.querySelector('.modal-next');
    const modalOverlay = modalContainer.querySelector('.modal-overlay');

    let currentModalIndex = 0;
    let cards = Array.from(carousel.querySelectorAll('.card'));

    // Update modal content
    function updateModalContent(index) {
        const card = cards[index];
        const img = card.querySelector('img');
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalCaption.textContent = card.dataset.caption;
        currentModalIndex = index;
    }

    // Event Handlers
    function openModal(index) {
        updateModalContent(index);
        modalContainer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalContainer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        currentModalIndex = (currentModalIndex - 1 + cards.length) % cards.length;
        updateModalContent(currentModalIndex);
    }

    function showNextImage() {
        currentModalIndex = (currentModalIndex + 1) % cards.length;
        updateModalContent(currentModalIndex);
    }

    // Event Listeners
    carousel.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (!card) return;
        
        const index = Array.from(carousel.children).indexOf(card);
        openModal(index);
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', showPrevImage);
    modalNext.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modalContainer.getAttribute('aria-hidden') === 'true') return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // Touch events for modal
    let touchStartX = 0;
    modalContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    modalContainer.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) { // minimum swipe distance
            if (diff > 0) showNextImage();
            else showPrevImage();
        }
    });
})();