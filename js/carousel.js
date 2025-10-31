// Carousel with stacked cards
(function(){
  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  
  // Image data with captions
  const images = [
    { src: 'launch1.jpg', caption: 'Corporate Event Lighting Setup', alt: 'Elegant corporate event lighting display' },
    { src: 'launch2.jpg', caption: 'Wedding Reception Sound System', alt: 'Premium sound system at an elegant wedding' },
    { src: 'launch3.jpg', caption: 'Festival Stage Production', alt: 'Large-scale festival stage with lighting effects' },
    { src: 'launch4.jpg', caption: 'Concert Lighting Design', alt: 'Dynamic concert lighting arrangement' },
    { src: 'launch5.jpg', caption: 'Private Party Setup', alt: 'Intimate private party lighting and sound' },
    { src: 'launch6.jpg', caption: 'Gala Event Production', alt: 'Sophisticated gala event production setup' },
    { src: 'launch7.jpg', caption: 'Outdoor Event Lighting', alt: 'Stunning outdoor event lighting design' },
    { src: 'launch8.jpg', caption: 'Club Sound Installation', alt: 'Professional club sound system setup' },
    { src: 'launch9.jpg', caption: 'Special Effects Display', alt: 'Impressive special effects and lighting show' }
  ];

  // Create cards
  images.forEach((image, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-index', index);
    card.setAttribute('data-caption', image.caption);
    card.setAttribute('role', 'img');
    card.setAttribute('aria-label', image.alt);
    
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.loading = 'lazy';
    
    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.innerHTML = `<h3>${image.caption}</h3>`;
    
    card.appendChild(img);
    card.appendChild(caption);
    carousel.appendChild(card);
  });

  let activeIndex = 0;
  const totalCards = images.length;

  function updateCards() {
    const cards = [...carousel.children];
    
    cards.forEach((card, index) => {
      const position = (index - activeIndex + totalCards) % totalCards;
      
      let status;
      if (position === 0) status = 'active';
      else if (position === 1) status = 'after';
      else if (position === totalCards - 1) status = 'before';
      else if (position < totalCards - 1) status = 'ahead';
      else status = 'behind';
      
      card.dataset.status = status;
    });
  }

  function moveNext() {
    activeIndex = (activeIndex + 1) % totalCards;
    updateCards();
  }

  function movePrev() {
    activeIndex = (activeIndex - 1 + totalCards) % totalCards;
    updateCards();
  }

  // Event listeners
  nextBtn.addEventListener('click', moveNext);
  prevBtn.addEventListener('click', movePrev);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') movePrev();
    if (e.key === 'ArrowRight') moveNext();
  });

  // Touch events
  let touchStartX = 0;
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) { // minimum swipe distance
      if (diff > 0) moveNext();
      else movePrev();
    }
  });

  // Initial setup
  updateCards();
})();