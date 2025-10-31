// Modal functionality for the carousel
// Modal - 5-item stage implementation
(function(){
    const carousel = document.getElementById('carousel');

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.setAttribute('role','dialog');
    modalContainer.setAttribute('aria-modal','true');
    modalContainer.setAttribute('aria-hidden','true');
    modalContainer.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">×</button>
            <div class="modal-stage" role="list"></div>
            <div class="modal-controls">
                <button class="modal-prev" aria-label="Previous image">❮</button>
                <button class="modal-next" aria-label="Next image">❯</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalContainer);

    const stage = modalContainer.querySelector('.modal-stage');
    const modalClose = modalContainer.querySelector('.modal-close');
    const modalPrev = modalContainer.querySelector('.modal-prev');
    const modalNext = modalContainer.querySelector('.modal-next');
    const modalOverlay = modalContainer.querySelector('.modal-overlay');

    let currentIndex = 0;

    function renderStage(centerIndex){
        const cards = Array.from(carousel.querySelectorAll('.card'));
        const total = cards.length;
        stage.innerHTML = '';
        for(let offset = -2; offset <= 2; offset++){
            const idx = (centerIndex + offset + total) % total;
            const item = document.createElement('div');
            item.className = `modal-item pos${offset}`;
            const src = cards[idx].querySelector('img').src;
            const alt = cards[idx].querySelector('img').alt || `Image ${idx+1}`;
            const img = document.createElement('img'); img.src = src; img.alt = alt;
            item.appendChild(img);
            stage.appendChild(item);
        }
    }

    function openModal(atIndex){
        currentIndex = atIndex;
        renderStage(currentIndex);
        modalContainer.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(){
        modalContainer.setAttribute('aria-hidden','true');
        document.body.style.overflow = '';
    }

    function showPrev(){
        const total = carousel.querySelectorAll('.card').length;
        currentIndex = (currentIndex - 1 + total) % total;
        renderStage(currentIndex);
    }

    function showNext(){
        const total = carousel.querySelectorAll('.card').length;
        currentIndex = (currentIndex + 1) % total;
        renderStage(currentIndex);
    }

    // Open modal when clicking a card
    carousel.addEventListener('click',(e)=>{
        const card = e.target.closest('.card');
        if(!card) return;
        const index = Array.from(carousel.children).indexOf(card);
        openModal(index);
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', showPrev);
    modalNext.addEventListener('click', showNext);

    // keyboard
    document.addEventListener('keydown',(e)=>{
        if(modalContainer.getAttribute('aria-hidden') === 'true') return;
        if(e.key === 'Escape') closeModal();
        if(e.key === 'ArrowLeft') showPrev();
        if(e.key === 'ArrowRight') showNext();
    });

    // touch swipe on stage
    let touchStartX = 0;
    stage.addEventListener('touchstart', (e)=>{ touchStartX = e.touches[0].clientX; });
    stage.addEventListener('touchend', (e)=>{ const touchEndX = e.changedTouches[0].clientX; const diff = touchStartX - touchEndX; if(Math.abs(diff) > 40){ if(diff > 0) showNext(); else showPrev(); } });

})();