// Portfolio Website JavaScript
// Author: Chaitanya
// AI-powered interactive portfolio with animations and modern UX

class PortfolioApp {
    constructor() {
        this.isLoading = true;
        this.scrollProgress = 0;
        this.currentProjectFilter = 'all';
        this.testimonialIndex = 0;
        this.intersectionObserver = null;
        this.mousePosition = { x: 0, y: 0 };
        
        this.init();
    }

    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    start() {
        this.initializeLoading();
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupIntersectionObserver();
        this.initializeNavigation();
        this.initializeProjects();
        this.initializeStats();
        this.initializeParallax();
        this.setupKeyboardNavigation();
        this.initializeCursor();
        this.initializeTypingAnimation();
        
        // Hide loading screen after animations
        setTimeout(() => this.hideLoadingScreen(), 2000);
    }

    // Initialize Animations
    initializeAnimations() {
        // Initialize keyframe animations for CSS
        this.createKeyframeAnimations();
        
        // Initialize scroll-triggered animations
        this.initializeScrollAnimations();
        
        // Initialize hover animations
        this.initializeHoverAnimations();
    }

    createKeyframeAnimations() {
        // This method ensures all CSS animations are ready
        const style = document.createElement('style');
        style.textContent = `
            @keyframes aiIndicator {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.5; transform: scale(1.2); }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
            }
            
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes slideInLeft {
                from { opacity: 0; transform: translateX(-50px); }
                to { opacity: 1; transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }

    initializeScrollAnimations() {
        // Additional scroll-based animation setup
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.add('animate-on-scroll');
        });
    }

    initializeHoverAnimations() {
        // Setup interactive hover effects
        const cards = document.querySelectorAll('.work-card, .project-card, .stat-item');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Mathematical/Code Cursor
    initializeCursor() {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        cursor.innerHTML = `
            <div class="cursor-main"></div>
            <div class="cursor-calculation"></div>
        `;
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let trailTimeout;

        // Math calculations and code snippets for hover states
        const calculations = [
            '∂L/∂θ = ∇J(θ)',
            'π = 3.14159...',
            'e^(iπ) + 1 = 0',
            'φ = (1+√5)/2',
            'σ(x) = 1/(1+e⁻ˣ)',
            'loss ↓ 0.001',
            'accuracy ↑ 97.3%',
            'matrix_multiply()',
            'neural_forward()',
            'backprop_complete'
        ];

        let currentCalc = 0;

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Create trailing code elements
            this.createCodeTrail(e.clientX, e.clientY);
        });

        // Animate cursor with smooth following
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.12;
            cursorY += (mouseY - cursorY) * 0.12;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Update calculation display
        const calcDisplay = cursor.querySelector('.cursor-calculation');
        if (calcDisplay) {
            calcDisplay.textContent = calculations[currentCalc];
        }

        // Add cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .nav-link, .cta-button, .project-card, .work-card, .skill-badge, .timeline-item');
        
        interactiveElements.forEach((element, index) => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                currentCalc = (currentCalc + 1) % calculations.length;
                if (calcDisplay) {
                    calcDisplay.textContent = calculations[currentCalc];
                }
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });

            element.addEventListener('mousedown', () => {
                cursor.classList.add('cursor-click');
            });

            element.addEventListener('mouseup', () => {
                cursor.classList.remove('cursor-click');
            });
        });

        // Hide default cursor
        document.body.style.cursor = 'none';
        document.querySelectorAll('*').forEach(el => {
            el.style.cursor = 'none';
        });
    }

    // Create trailing code elements
    createCodeTrail(x, y) {
        if (Math.random() > 0.85) { // Only create trails occasionally
            const trail = document.createElement('div');
            trail.classList.add('cursor-code-trail');
            trail.style.left = x + 'px';
            trail.style.top = y + 'px';
            
            const codeSnippets = ['0', '1', '{', '}', 'π', '∞', 'λ', 'Σ', '∇', '∂'];
            trail.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            
            document.body.appendChild(trail);
            
            // Remove trail after animation
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            }, 1000);
        }
    }

    // Teen Engineering + AI Loading Screen Management
    initializeLoading() {
        const loadingText = document.getElementById('loading-text');
        const progressText = document.querySelector('.progress-text');
        
        // AI Loading Messages
        const messages = [
            'Initializing AI systems...',
            'Loading neural networks...',
            'Compiling machine learning models...',
            'Optimizing tensor computations...',
            'Connecting to deep learning framework...',
            'AI systems online!'
        ];
        
        let messageIndex = 0;
        let progress = 0;
        
        const updateProgress = () => {
            progress += Math.random() * 15 + 5;
            if (progress > 100) progress = 100;
            
            if (progressText) {
                progressText.textContent = `${Math.floor(progress)}%`;
            }
            
            if (messageIndex < messages.length && Math.random() > 0.3) {
                if (loadingText) {
                    loadingText.textContent = messages[messageIndex];
                    messageIndex++;
                }
            }
            
            if (progress < 100) {
                setTimeout(updateProgress, 200 + Math.random() * 300);
            }
        };
        
        updateProgress();
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            this.isLoading = false;
            
            // Start main animations
            this.startMainAnimations();
        }
    }

    // Terminal Typing Animation
    initializeTypingAnimation() {
        const typedText = document.getElementById('typed-text');
        if (!typedText) return;

        const commands = [
            'import neural_network as nn',
            'model = nn.create_ai_model()',
            'model.load_intelligence()',
            'print("Hello, I\'m Chaitanya!")',
            'ai_status = "Online"',
            'deploy_portfolio()'
        ];

        let currentCommand = 0;
        let currentChar = 0;
        let isTyping = true;

        const typeCommand = () => {
            if (currentCommand >= commands.length) {
                // Restart after a pause
                setTimeout(() => {
                    currentCommand = 0;
                    currentChar = 0;
                    typedText.textContent = '';
                    typeCommand();
                }, 3000);
                return;
            }

            const command = commands[currentCommand];

            if (isTyping && currentChar < command.length) {
                // Typing effect
                typedText.textContent = command.slice(0, currentChar + 1);
                currentChar++;
                setTimeout(typeCommand, Math.random() * 100 + 50); // Variable typing speed
            } else if (isTyping) {
                // Finished typing, pause before deleting
                isTyping = false;
                setTimeout(typeCommand, 1500);
            } else if (currentChar > 0) {
                // Deleting effect
                typedText.textContent = command.slice(0, currentChar - 1);
                currentChar--;
                setTimeout(typeCommand, 30);
            } else {
                // Finished deleting, move to next command
                isTyping = true;
                currentCommand++;
                setTimeout(typeCommand, 500);
            }
        };

        // Start typing after loading screen
        setTimeout(() => typeCommand(), 2500);
    }

    // Event Listeners
    setupEventListeners() {
        // Scroll events
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        
        // Resize events
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        
        // Mouse events for parallax
        document.addEventListener('mousemove', this.throttle(this.handleMouseMove.bind(this), 16));
        
        // Keyboard events
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        
        // Touch events for mobile
        document.addEventListener('touchstart', this.handleTouchStart.bind(this));
        document.addEventListener('touchmove', this.handleTouchMove.bind(this));
    }

    // Navigation
    initializeNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Hamburger menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu
                    if (navMenu) navMenu.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
                    
                    // Smooth scroll to section
                    this.smoothScrollTo(targetSection);
                    
                    // Update active link
                    this.updateActiveNavLink(link);
                }
            });
        });

        // Update navbar on scroll
        window.addEventListener('scroll', () => {
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }

            // Update active navigation based on scroll position
            this.updateActiveNavOnScroll();
        });
    }

    smoothScrollTo(element) {
        const offsetTop = element.offsetTop - 80; // Account for navbar height
        const startPosition = window.pageYOffset;
        const distance = offsetTop - startPosition;
        const duration = 1000;
        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            
            // Easing function (easeInOutCubic)
            const ease = percentage < 0.5 
                ? 4 * percentage * percentage * percentage 
                : (percentage - 1) * (2 * percentage - 2) * (2 * percentage - 2) + 1;
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('.section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    this.updateActiveNavLink(activeLink);
                }
            }
        });
    }

    // Scroll-based Animations
    setupIntersectionObserver() {
        const options = {
            threshold: [0.1, 0.3, 0.6, 1.0],
            rootMargin: '-50px'
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation classes
                    entry.target.classList.add('animate-in');
                    
                    // Handle specific animations
                    this.handleElementAnimation(entry.target);
                }
            });
        }, options);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll('[data-aos]');
        animatableElements.forEach(el => {
            this.intersectionObserver.observe(el);
        });
    }

    handleElementAnimation(element) {
        // Animate statistics counters
        if (element.querySelector('.stat-number')) {
            this.animateStats(element);
        }

        // Animate skill badges
        if (element.querySelector('.skill-badge')) {
            this.animateSkills(element);
        }

        // Animate project cards
        if (element.classList.contains('project-card')) {
            this.animateProjectCard(element);
        }
    }

    // Statistics Animation
    initializeStats() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 20);
        });
    }

    animateStats(container) {
        const statNumbers = container.querySelectorAll('.stat-number[data-count]');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(target * easeOutCubic);
                
                stat.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    stat.textContent = target;
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    // Skills Animation
    animateSkills(container) {
        const skillBadges = container.querySelectorAll('.skill-badge');
        
        skillBadges.forEach((badge, index) => {
            setTimeout(() => {
                badge.style.transform = 'translateY(0) scale(1)';
                badge.style.opacity = '1';
            }, index * 100);
        });
    }

    // Project Filtering
    initializeProjects() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    filterProjects(filter) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    animateProjectCard(card) {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
    }

    // Parallax Effects
    initializeParallax() {
        const parallaxElements = document.querySelectorAll('.geometric-shape, .floating-equation');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.2 + (index * 0.1);
                element.style.transform = `translateY(${parallax * speed}px)`;
            });
        });
    }

    handleMouseMove(e) {
        this.mousePosition.x = e.clientX / window.innerWidth;
        this.mousePosition.y = e.clientY / window.innerHeight;
        
        // Update AI particles based on mouse position
        this.updateParticlePositions();
        
        // Update floating elements
        this.updateFloatingElements();
    }

    updateParticlePositions() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const x = this.mousePosition.x * 20 - 10;
            const y = this.mousePosition.y * 20 - 10;
            const delay = index * 0.1;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.transitionDelay = `${delay}s`;
        });
    }

    updateFloatingElements() {
        const equations = document.querySelectorAll('.floating-equation');
        
        equations.forEach((equation, index) => {
            const x = (this.mousePosition.x - 0.5) * 30;
            const y = (this.mousePosition.y - 0.5) * 30;
            const multiplier = (index + 1) * 0.5;
            
            equation.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;
        });
    }

    // Scroll Progress and Scroll-to-Top
    handleScroll() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.scrollProgress = scrollTop / docHeight;
        
        // Update scroll-to-top button
        this.updateScrollToTop();
        
        // Update any scroll-based animations
        this.updateScrollAnimations();
    }

    updateScrollToTop() {
        const scrollBtn = document.getElementById('scrollToTop');
        if (scrollBtn) {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        }
    }

    updateScrollAnimations() {
        // Animate elements based on scroll position
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;
            
            if (scrollTop > elementTop - windowHeight + elementHeight / 4) {
                element.classList.add('animated');
            }
        });
    }

    // Initialize scroll-to-top functionality
    startMainAnimations() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Accessibility and Keyboard Navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape key closes mobile menu
            if (e.key === 'Escape') {
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
            
            // Arrow keys for navigation
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateWithKeyboard(e.key === 'ArrowDown' ? 'next' : 'prev');
            }
        });
    }

    navigateWithKeyboard(direction) {
        const sections = document.querySelectorAll('.section[id]');
        const currentScroll = window.scrollY + window.innerHeight / 2;
        let targetSection = null;
        
        if (direction === 'next') {
            for (let section of sections) {
                if (section.offsetTop > currentScroll) {
                    targetSection = section;
                    break;
                }
            }
        } else {
            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i].offsetTop < currentScroll - 100) {
                    targetSection = sections[i];
                    break;
                }
            }
        }
        
        if (targetSection) {
            this.smoothScrollTo(targetSection);
        }
    }

    // Touch Events for Mobile
    handleTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        if (!this.touchStartY) return;
        
        const touchY = e.touches[0].clientY;
        const diffY = this.touchStartY - touchY;
        
        // Handle touch-based interactions
        if (Math.abs(diffY) > 50) {
            // Trigger animations or effects based on swipe
            this.handleSwipeGesture(diffY > 0 ? 'up' : 'down');
            this.touchStartY = null;
        }
    }

    handleSwipeGesture(direction) {
        // Add swipe-based functionality if needed
        console.log(`Swiped ${direction}`);
    }

    // Utility Functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, delay) {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        };
    }

    handleResize() {
        // Handle responsive updates
        this.updateParticlePositions();
        this.updateFloatingElements();
    }

    handleKeyDown(e) {
        // Additional keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'k':
                    e.preventDefault();
                    // Focus search or navigation
                    document.querySelector('.nav-link')?.focus();
                    break;
            }
        }
    }

    // Advanced Animations
    createFloatingParticles() {
        const particleContainer = document.querySelector('.ai-particles');
        if (!particleContainer) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            particleContainer.appendChild(particle);
        }
    }

    // Initialize Testimonial Slider
    initializeTestimonials() {
        const testimonialTrack = document.querySelector('.testimonial-track');
        if (!testimonialTrack) return;

        // Clone testimonials for infinite scroll
        const testimonials = testimonialTrack.children;
        const testimonialArray = Array.from(testimonials);
        
        testimonialArray.forEach(testimonial => {
            const clone = testimonial.cloneNode(true);
            testimonialTrack.appendChild(clone);
        });
    }

    // Performance optimization
    optimizePerformance() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize everything
    initializeAll() {
        this.createFloatingParticles();
        this.initializeTestimonials();
        this.optimizePerformance();
    }
}

// Initialize the portfolio app when DOM is ready
const portfolioApp = new PortfolioApp();

// Additional utility functions for enhanced interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.work-card, .project-card, .achievement-card, .skill-category');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .filter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Initialize advanced features
    portfolioApp.initializeAll();
});

// Add CSS for ripple effect dynamically
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    pointer-events: none;
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(20px);
    }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Add intersection observer for better performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}
