// Exquisite Cars - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('exquisite-theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateDarkModeIcon(savedTheme === 'dark');
    }
    
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('exquisite-theme', newTheme);
        updateDarkModeIcon(newTheme === 'dark');
        
        // Add transition class for smooth theme switching
        body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
    
    function updateDarkModeIcon(isDark) {
        const icon = darkModeToggle.querySelector('i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
    
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
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
        
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
    const animatedElements = document.querySelectorAll('.service-card, .car-card, .testimonial-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Car Collection Hover Effects
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
                const carModel = card.querySelector('.car-model').textContent;
                showCarDetails(carModel);
            });
        }
        
        // Schedule Test Drive Button
        const testDriveBtn = card.querySelector('.car-action');
        if (testDriveBtn) {
            testDriveBtn.addEventListener('click', function() {
                const carModel = card.querySelector('.car-model').textContent;
                scheduleTestDrive(carModel);
            });
        }
    });
    
    // Lifestyle Section Parallax Effect
    const lifestyleItems = document.querySelectorAll('.lifestyle-item');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        lifestyleItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const img = item.querySelector('img');
                if (img) {
                    img.style.transform = `translateY(${parallax * 0.1}px)`;
                }
            }
        });
    });
    
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
        const message = createMessage('Thank you for your inquiry! Our luxury concierge will contact you within 24 hours.', 'success');
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
    
    // Car Details Modal (placeholder function)
    function showCarDetails(carModel) {
        alert(`Detailed information about ${carModel} would be displayed in a luxury modal. This is a demonstration.`);
    }
    
    // Schedule Test Drive (placeholder function)
    function scheduleTestDrive(carModel) {
        alert(`Scheduling a private test drive for ${carModel}. In a real implementation, this would open a booking system.`);
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
        const elements = document.querySelectorAll('.hero-content, .section-title, .car-card, .service-card');
        elements.forEach((el, index) => {
            el.classList.add('loading');
            el.style.animationDelay = `${index * 0.1}s`;
        });
    });
    
    // Service Cards Hover Animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = card.querySelector('.service-icon');
            icon.style.transform = 'scale(1.1) rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = card.querySelector('.service-icon');
            icon.style.transform = 'scale(1) rotateY(0deg)';
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
    
    // Start testimonial rotation
    if (testimonialCards.length > 1) {
        setInterval(rotateTestimonials, 5000);
    }
    
    // Luxury Cursor Effect
    const cursor = document.createElement('div');
    cursor.className = 'luxury-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        background: #D4AF37;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .car-card, .service-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'rgba(212, 175, 55, 0.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = '#D4AF37';
        });
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
            this.style.outline = '2px solid #D4AF37';
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
    
    console.log('Exquisite Cars - Luxury experience initialized');
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
        
        .luxury-cursor {
            display: none !important;
        }
    }
`;

// Inject mobile styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileStyles;
document.head.appendChild(styleSheet);