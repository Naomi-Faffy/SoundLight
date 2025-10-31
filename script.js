// Sound Light - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    

    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Keep navbar transparent - no background changes
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.glass-card, .car-card, .partner-glass-card, .testimonial-glass-card, .contact-info-glass, .contact-form-glass');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Event Cards Hover Effects
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach(card => {
        const overlay = card.querySelector('.car-overlay');
        const button = card.querySelector('.view-details');
        
        card.addEventListener('mouseenter', function() {
            overlay.style.opacity = '1';
            button.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            overlay.style.opacity = '0';
            button.style.transform = 'scale(1)';
        });
        
        // View Details Button Click
        if (button) {
            button.addEventListener('click', function() {
                const eventName = card.querySelector('.car-model').textContent;
                showEventDetails(eventName);
            });
        }
        
        // Book Event Button
        const bookEventBtn = card.querySelector('.car-action');
        if (bookEventBtn) {
            bookEventBtn.addEventListener('click', function() {
                const eventName = card.querySelector('.car-model').textContent;
                bookEvent(eventName);
            });
        }
    });
    

    
    // Glass Card CTA Button
    const glassCTA = document.querySelector('.glass-cta');
    if (glassCTA) {
        glassCTA.addEventListener('click', function() {
            document.getElementById('collection').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (validateForm(data)) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showSuccessMessage();
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
    
    // Form Validation
    function validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.interest) {
            errors.push('Please select your service interest');
        }
        
        if (errors.length > 0) {
            showErrorMessage(errors);
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Success and Error Messages
    function showSuccessMessage() {
        const message = createMessage('Thank you for your event request! Our team will contact you within 24 hours to discuss your elegant event experience.', 'success');
        showMessage(message);
    }
    
    function showErrorMessage(errors) {
        const message = createMessage(`Please correct the following errors:\n• ${errors.join('\n• ')}`, 'error');
        showMessage(message);
    }
    
    function createMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${type === 'success' ? '#D4AF37' : '#dc3545'};
            color: ${type === 'success' ? '#0A0A0A' : '#fff'};
            padding: 20px 30px;
            border-radius: 0;
            z-index: 1001;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s ease;
            max-width: 350px;
            white-space: pre-line;
            font-family: 'Montserrat', sans-serif;
            font-weight: 500;
            letter-spacing: 0.5px;
        `;
        messageDiv.textContent = text;
        return messageDiv;
    }
    
    function showMessage(messageDiv) {
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(0)';
            messageDiv.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(400px)';
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 4000);
    }
    
    // Event Details Modal (placeholder function)
    function showEventDetails(eventName) {
        alert(`Detailed information about ${eventName} would be displayed in an elegant modal. This is a demonstration.`);
    }
    
    // Book Event (placeholder function)
    function bookEvent(eventName) {
        alert(`Booking ${eventName}. In a real implementation, this would open our event booking system.`);
    }
    
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }
        
        // Add loading class to elements for staggered animations
        const elements = document.querySelectorAll('.hero-content, .section-title, .car-card, .glass-card, .partner-glass-card, .testimonial-glass-card, .contact-info-glass, .contact-form-glass');
        elements.forEach((el, index) => {
            el.classList.add('loading');
            el.style.animationDelay = `${index * 0.1}s`;
        });
    });
    
    // Glass Cards Hover Animation
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 35px 70px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Partner Glass Cards Setup
    const partnerGlassCards = document.querySelectorAll('.partner-glass-card');
    partnerGlassCards.forEach((card, index) => {
        card.style.animationDelay = `${(index * 0.15) + 0.8}s`;
        card.style.animation = 'glassCardAppear 1s ease-out forwards';
        card.style.opacity = '0';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Testimonial Glass Cards Setup
    const testimonialGlassCards = document.querySelectorAll('.testimonial-glass-card');
    testimonialGlassCards.forEach((card, index) => {
        card.style.animationDelay = `${(index * 0.2) + 1.3}s`;
        card.style.animation = 'glassCardAppear 1.2s ease-out forwards';
        card.style.opacity = '0';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 35px 70px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Testimonial Cards Rotation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function rotateTestimonials() {
        testimonialCards.forEach((card, index) => {
            card.style.opacity = index === currentTestimonial ? '1' : '0.7';
            card.style.transform = index === currentTestimonial ? 'scale(1.02)' : 'scale(1)';
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }
    
    // Testimonial Glass Cards Subtle Animation
    function rotateTestimonialsGlass() {
        testimonialGlassCards.forEach((card, index) => {
            if (index === currentTestimonial) {
                card.style.transform = 'translateY(-5px) scale(1.01)';
                card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.35)';
            } else {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
            }
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialGlassCards.length;
    }
    
    // Start testimonial glass cards rotation
    if (testimonialGlassCards.length > 1) {
        setInterval(rotateTestimonialsGlass, 5000);
        setTimeout(rotateTestimonialsGlass, 2000); // Initial call after animations
    }
    
    // Contact Glass Cards Setup
    const contactGlassCards = document.querySelectorAll('.contact-info-glass, .contact-form-glass');
    contactGlassCards.forEach((card, index) => {
        card.style.animationDelay = `${(index * 0.3) + 2.0}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Glass Form Input Focus Effects
    const glassInputs = document.querySelectorAll('.form-group-glass input, .form-group-glass select, .form-group-glass textarea');
    glassInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('.input-icon').style.color = '#1E90FF';
            this.parentElement.querySelector('.input-icon').style.transform = 'scale(1.1)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.querySelector('.input-icon').style.color = '#0047AB';
            this.parentElement.querySelector('.input-icon').style.transform = 'scale(1)';
        });
    });
    
    // Social Glass Links Animation
    const socialGlassLinks = document.querySelectorAll('.social-glass-link');
    socialGlassLinks.forEach((link, index) => {
        link.style.animationDelay = `${2.5 + (index * 0.1)}s`;
        link.style.animation = 'glassCardAppear 0.8s ease-out forwards';
        link.style.opacity = '0';
    });
    

    
    // Performance Optimization
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                // Perform scroll-based updates here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll);
    
    // Accessibility Enhancements
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.click();
        }
        
        // Enter key activates buttons
        if (e.key === 'Enter' && e.target.classList.contains('car-action')) {
            e.target.click();
        }
    });
    
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.style.outline = '2px solid #1E90FF';
            this.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Initialize loading animations
    setTimeout(() => {
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
    
    console.log('Sound Light - Elegant event experience initialized');

    // Gallery Carousel Functionality
    class GalleryCarousel {
        constructor() {
            this.carousel = document.querySelector('.carousel');
            this.slides = document.querySelectorAll('.carousel-slide');
            this.prevBtn = document.querySelector('.nav-arrow.prev');
            this.nextBtn = document.querySelector('.nav-arrow.next');
            this.pills = document.querySelectorAll('.pill:not(.view-more)');
            this.currentIndex = 0;
            this.totalSlides = this.slides.length;

            this.init();
        }

        init() {
            if (!this.carousel || !this.slides.length) return;

            // Set up event listeners
            this.prevBtn?.addEventListener('click', () => this.prevSlide());
            this.nextBtn?.addEventListener('click', () => this.nextSlide());

            // Pill filter functionality
            this.pills.forEach((pill, index) => {
                pill.addEventListener('click', () => this.goToSlide(index));
            });

            // Touch/swipe support
            this.setupTouchEvents();

            // Keyboard navigation
            document.addEventListener('keydown', (e) => this.handleKeyPress(e));

            // Pause auto-play on hover
            this.carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
            this.carousel.addEventListener('mouseleave', () => this.resumeAutoPlay());

            // Auto-play (optional)
            this.startAutoPlay();

            // Initial setup
            this.updateCarousel();
        }

        updateCarousel() {
            // Remove all positioning classes
            this.slides.forEach(slide => {
                slide.className = 'carousel-slide';
            });

            // Apply positioning classes based on current index
            const totalSlides = this.totalSlides;
            this.slides.forEach((slide, index) => {
                const relativeIndex = (index - this.currentIndex + totalSlides) % totalSlides;

                if (relativeIndex === 0) {
                    slide.classList.add('active');
                } else if (relativeIndex === 1) {
                    slide.classList.add('right');
                } else if (relativeIndex === totalSlides - 1) {
                    slide.classList.add('left');
                } else if (relativeIndex === 2) {
                    slide.classList.add('far-right');
                } else if (relativeIndex === totalSlides - 2) {
                    slide.classList.add('far-left');
                }
            });

            // Update active pill
            this.pills.forEach((pill, index) => {
                pill.classList.toggle('active', index === this.currentIndex);
            });

            // Update accessibility
            this.updateAriaLabels();
        }

        goToSlide(index) {
            this.currentIndex = Math.max(0, Math.min(index, this.totalSlides - 1));
            this.updateCarousel();
            this.resetAutoPlay();
        }

        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
            this.updateCarousel();
            this.resetAutoPlay();
        }

        prevSlide() {
            this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
            this.updateCarousel();
            this.resetAutoPlay();
        }

        setupTouchEvents() {
            let startX = 0;
            let endX = 0;

            this.carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            this.carousel.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                this.handleSwipe(startX, endX);
            });
        }

        handleSwipe(startX, endX) {
            const diff = startX - endX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        }

        handleKeyPress(e) {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        }

        handleKeyPress(e) {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        }

        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, 5000); // Change slide every 5 seconds
        }

        resetAutoPlay() {
            clearInterval(this.autoPlayInterval);
            this.startAutoPlay();
        }

        pauseAutoPlay() {
            clearInterval(this.autoPlayInterval);
        }

        resumeAutoPlay() {
            this.startAutoPlay();
        }

        updateAriaLabels() {
            this.slides.forEach((slide, index) => {
                const isActive = index === this.currentIndex;
                slide.setAttribute('aria-hidden', !isActive);

                const card = slide.querySelector('.gallery-card');
                if (card) {
                    card.setAttribute('aria-current', isActive ? 'true' : 'false');
                }
            });
        }
    }

    // Initialize carousel when DOM is loaded
    const galleryCarousel = new GalleryCarousel();
});

// Additional Mobile Navigation Styles
const mobileStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 80px;
            flex-direction: column;
            background-color: rgba(10, 10, 10, 0.98);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            backdrop-filter: blur(20px);
            padding: 40px 0;
            gap: 30px !important;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 0;
        }
        
        .nav-menu a {
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 2px;
        }
        

    }
`;

// Inject mobile styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileStyles;
document.head.appendChild(styleSheet);