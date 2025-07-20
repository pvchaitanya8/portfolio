// Enhanced Portfolio Website JavaScript - FIXED VERSION
// Author: Chaitanya
// AI-powered interactive portfolio with FIXED testimonial carousel, project hover effects, and navbar issues

class PortfolioApp {
    constructor() {
        this.isLoading = true;
        this.scrollProgress = 0;
        this.currentProjectFilter = 'all';
        this.testimonialIndex = 0;
        this.intersectionObserver = null;
        this.mousePosition = { x: 0, y: 0 };
        this.cursorPosition = { x: 0, y: 0 };
        this.matrixCanvas = null;
        this.matrixCtx = null;
        this.matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        this.matrixColumns = [];
        this.matrixDrops = [];
        this.testimonialInterval = null;
        this.totalTestimonials = 0;
        this.isMobileMenuOpen = false;
        this.isDropdownOpen = false;
        this.lastScrollY = 0;
        this.isScrolling = false;
        
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
        this.initializeEnhancedCursor();
        this.initializeTypingAnimation();
        this.initializeMatrixRain();
        this.initializeTestimonials(); // FIXED: Proper testimonial initialization
        
        // Hide loading screen after animations
        setTimeout(() => this.hideLoadingScreen(), 2000);
    }

    // FIXED: Enhanced Cursor with Faster, More Natural Movement
    initializeEnhancedCursor() {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        cursor.innerHTML = `
            <div class="cursor-main"></div>
            <div class="cursor-calculation"></div>
        `;
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        
        // Enhanced responsiveness for natural movement
        const easing = 0.25;
        const trailCreationRate = 0.90;

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
            'backprop_complete',
            'gradient_descent()',
            'optimization_step()',
            'model.train()',
            'tensor.reshape()',
            'np.dot(X, W)',
            'ReLU(x) = max(0,x)',
            'MSE = Σ(y-ŷ)²/n',
            'Adam optimizer',
            'batch_norm()',
            'dropout(0.5)',
            '∇f = ∂f/∂x î + ∂f/∂y ĵ',
            '∫ e^x dx = e^x + C',
            'lim(x→∞) (1 + 1/x)^x = e',
            'Σ(i=1 to n) i = n(n+1)/2',
            'P(A|B) = P(B|A)P(A)/P(B)',
            'f(x) = Σ(aₙ cos(nωx))',
            'det(A) = Σ sgn(σ)∏aᵢ,σ(ᵢ)',
            'χ² = Σ(Oᵢ-Eᵢ)²/Eᵢ'
        ];

        let currentCalc = 0;
        let isHovering = false;
        let hoverTimeout = null;

        // Enhanced mouse tracking with immediate response
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Create trailing code elements with better timing
            if (Math.random() > trailCreationRate) {
                this.createEnhancedCodeTrail(e.clientX, e.clientY);
            }
        });

        // Faster cursor animation with immediate position updates
        const animateCursor = () => {
            targetX += (mouseX - targetX) * easing;
            targetY += (mouseY - targetY) * easing;
            
            cursor.style.left = targetX + 'px';
            cursor.style.top = targetY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        const calcDisplay = cursor.querySelector('.cursor-calculation');

        // Enhanced cursor interactions with proper timing
        const interactiveElements = document.querySelectorAll(`
            a, button, .nav-link, .cta-button, .project-card, .work-card, 
            .skill-badge, .timeline-item, .achievement-card, .testimonial-card,
            .certification-card, .contact-method, .social-link, .nav-dropdown,
            .dropdown-menu, .stat-item, .status-item, .carousel-btn, .nav-dot,
            .education-card, .volunteer-card
        `);
        
        interactiveElements.forEach((element, index) => {
            element.addEventListener('mouseenter', () => {
                isHovering = true;
                cursor.classList.add('cursor-hover');
                
                // Clear any existing timeout
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                }
                
                // Show new calculation immediately
                currentCalc = (currentCalc + 1) % calculations.length;
                if (calcDisplay) {
                    calcDisplay.textContent = calculations[currentCalc];
                    calcDisplay.style.opacity = '1';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                isHovering = false;
                cursor.classList.remove('cursor-hover');
                
                // FIXED: Equation disappears after a short delay
                hoverTimeout = setTimeout(() => {
                    if (!isHovering && calcDisplay) {
                        calcDisplay.style.opacity = '0';
                    }
                }, 300); // Short delay before hiding
            });

            element.addEventListener('mousedown', () => {
                cursor.classList.add('cursor-click');
            });

            element.addEventListener('mouseup', () => {
                cursor.classList.remove('cursor-click');
            });
        });

        // Hide default cursor on all elements
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                cursor: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced code trail creation
    createEnhancedCodeTrail(x, y) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-code-trail');
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        
        const codeSnippets = [
            '0', '1', '{', '}', '[', ']', '(', ')', 
            'π', '∞', 'λ', 'Σ', '∇', '∂', 'α', 'β', 
            'θ', 'φ', 'ω', 'μ', 'σ', 'τ', '≈', '∈',
            '→', '←', '↑', '↓', '⟨', '⟩', '∀', '∃',
            '⊕', '⊗', '⊙', '⊚', '∴', '∵', '∝', '≡',
            '≠', '≤', '≥', '∪', '∩', '⊂', '⊃', '∅'
        ];
        trail.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        // Add random colors for variety
        const colors = ['var(--accent-primary)', 'var(--accent-tertiary)', 'var(--accent-orange)', 'var(--accent-secondary)'];
        trail.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(trail);
        
        // Remove trail after animation
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 1200);
    }

    initializeMatrixRain() {
        this.neuralCanvas = document.getElementById('neural-canvas');
        if (!this.neuralCanvas) return;

        this.neuralCtx = this.neuralCanvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        
        // Set canvas size
        const resizeCanvas = () => {
            this.neuralCanvas.width = this.neuralCanvas.offsetWidth;
            this.neuralCanvas.height = this.neuralCanvas.offsetHeight;
            this.initializeNetwork();
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize neural network
        this.initializeNetwork();
        this.animateNetwork();
    }

    initializeNetwork() {
        this.nodes = [];
        this.connections = [];
        
        const layers = [4, 6, 4, 2]; // Input, hidden1, hidden2, output
        const layerSpacing = this.neuralCanvas.width / (layers.length + 1);
        
        // Create nodes
        layers.forEach((nodeCount, layerIndex) => {
            const nodeSpacing = this.neuralCanvas.height / (nodeCount + 1);
            
            for (let i = 0; i < nodeCount; i++) {
                this.nodes.push({
                    x: layerSpacing * (layerIndex + 1),
                    y: nodeSpacing * (i + 1),
                    layer: layerIndex,
                    activation: Math.random(),
                    targetActivation: Math.random()
                });
            }
        });
        
        // Create connections
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = 0; j < this.nodes.length; j++) {
                if (this.nodes[j].layer === this.nodes[i].layer + 1) {
                    this.connections.push({
                        from: i,
                        to: j,
                        weight: (Math.random() - 0.5) * 2,
                        activity: 0
                    });
                }
            }
        }
    }

    animateNetwork() {
        const animate = () => {
            // Clear canvas
            this.neuralCtx.clearRect(0, 0, this.neuralCanvas.width, this.neuralCanvas.height);
            
            // Update node activations
            this.nodes.forEach(node => {
                if (Math.random() < 0.02) {
                    node.targetActivation = Math.random();
                }
                node.activation += (node.targetActivation - node.activation) * 0.05;
            });
            
            // Draw connections
            this.connections.forEach(conn => {
                const fromNode = this.nodes[conn.from];
                const toNode = this.nodes[conn.to];
                
                // Animate signal propagation
                conn.activity += 0.03;
                if (conn.activity > 1) conn.activity = 0;
                
                const gradient = this.neuralCtx.createLinearGradient(
                    fromNode.x, fromNode.y, toNode.x, toNode.y
                );
                
                const alpha = fromNode.activation * 0.6;
                gradient.addColorStop(0, `rgba(0, 255, 255, ${alpha})`);
                gradient.addColorStop(conn.activity, `rgba(0, 255, 65, ${alpha * 1.5})`);
                gradient.addColorStop(1, `rgba(0, 255, 255, ${alpha * 0.3})`);
                
                this.neuralCtx.strokeStyle = gradient;
                this.neuralCtx.lineWidth = Math.abs(conn.weight) * 2;
                this.neuralCtx.beginPath();
                this.neuralCtx.moveTo(fromNode.x, fromNode.y);
                this.neuralCtx.lineTo(toNode.x, toNode.y);
                this.neuralCtx.stroke();
            });
            
            // Draw nodes
            this.nodes.forEach(node => {
                const radius = 8 + node.activation * 6;
                const alpha = 0.4 + node.activation * 0.6;
                
                this.neuralCtx.beginPath();
                this.neuralCtx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                this.neuralCtx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
                this.neuralCtx.fill();
                
                // Inner glow
                this.neuralCtx.beginPath();
                this.neuralCtx.arc(node.x, node.y, radius * 0.6, 0, Math.PI * 2);
                this.neuralCtx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
                this.neuralCtx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    // FIXED: Testimonials Carousel - Complete Implementation
    initializeTestimonials() {
        const testimonialTrack = document.getElementById('testimonial-track');
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const navDots = document.querySelectorAll('.nav-dot');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (!testimonialTrack || !testimonialCards.length) return;
        
        this.totalTestimonials = testimonialCards.length;
        this.currentSlide = 0;
        
        // Initialize first testimonial as active
        this.showTestimonial(0);
        
        // Navigation dots functionality
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToTestimonial(index);
            });
        });
        
        // Previous button functionality
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.previousTestimonial();
            });
        }
        
        // Next button functionality
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextTestimonial();
            });
        }
        
        // Auto-rotation every 5 seconds
        this.startTestimonialAutoRotation();
        
        // Pause auto-rotation on hover
        const testimonialContainer = document.querySelector('.testimonials-carousel');
        if (testimonialContainer) {
            testimonialContainer.addEventListener('mouseenter', () => {
                this.stopTestimonialAutoRotation();
            });
            
            testimonialContainer.addEventListener('mouseleave', () => {
                this.startTestimonialAutoRotation();
            });
        }
        
        // Keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.testimonials-section')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.previousTestimonial();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.nextTestimonial();
                }
            }
        });
    }
    
    showTestimonial(index) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const navDots = document.querySelectorAll('.nav-dot');
        const testimonialTrack = document.getElementById('testimonial-track');
        
        if (!testimonialTrack || !testimonialCards.length) return;
        
        // Ensure index is within bounds
        index = ((index % this.totalTestimonials) + this.totalTestimonials) % this.totalTestimonials;
        this.currentSlide = index;
        
        // Move the track to show the current testimonial
        const translateX = -index * (100 / this.totalTestimonials);
        testimonialTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update active states
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Update button states
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) {
            prevBtn.disabled = false; // Enable cycling
        }
        
        if (nextBtn) {
            nextBtn.disabled = false; // Enable cycling
        }
    }
    
    goToTestimonial(index) {
        this.stopTestimonialAutoRotation();
        this.showTestimonial(index);
        this.startTestimonialAutoRotation();
    }
    
    nextTestimonial() {
        const nextIndex = (this.currentSlide + 1) % this.totalTestimonials;
        this.showTestimonial(nextIndex);
    }
    
    previousTestimonial() {
        const prevIndex = (this.currentSlide - 1 + this.totalTestimonials) % this.totalTestimonials;
        this.showTestimonial(prevIndex);
    }
    
    startTestimonialAutoRotation() {
        this.stopTestimonialAutoRotation(); // Clear any existing interval
        this.testimonialInterval = setInterval(() => {
            this.nextTestimonial();
        }, 5000); // Change every 5 seconds
    }
    
    stopTestimonialAutoRotation() {
        if (this.testimonialInterval) {
            clearInterval(this.testimonialInterval);
            this.testimonialInterval = null;
        }
    }

    // FIXED: Enhanced Navigation with Stable Responsive Dropdown
    initializeNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const dropdownToggle = document.getElementById('dropdown-toggle');
        const dropdownMenu = document.getElementById('dropdown-menu');
        
        // FIXED: Stable scroll behavior
        let lastScrollY = window.scrollY;
        let scrollTimeout;
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class for navbar styling
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
            
            // Clear timeout to prevent excessive calculations
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            scrollTimeout = setTimeout(() => {
                this.updateActiveNavLink();
            }, 100);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // FIXED: Mobile menu toggle without animations causing jumps
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
        }
        
        // Close mobile menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Dropdown functionality for desktop
        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.innerWidth <= 768) {
                    // Mobile behavior - toggle dropdown
                    const isVisible = dropdownMenu.style.display === 'block';
                    dropdownMenu.style.display = isVisible ? 'none' : 'block';
                }
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (dropdownMenu && !e.target.closest('.nav-dropdown')) {
                if (window.innerWidth <= 768) {
                    dropdownMenu.style.display = 'none';
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
                if (dropdownMenu) {
                    dropdownMenu.style.display = '';
                }
            }
        });
    }


    // Enhanced project cards initialization (already stable, but ensuring no issues)
    initializeProjects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Ensure proper hover state management
            card.addEventListener('mouseenter', () => {
                card.style.willChange = 'transform, box-shadow';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.willChange = 'auto';
            });
        });
    }

    // Stats counter animation
    initializeStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element) => {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000;
            const start = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOutQuart * target);
                
                element.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };
            
            requestAnimationFrame(updateCounter);
        };
        
        // Observe stats and animate when in view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    animateCounter(statNumber);
                    statsObserver.unobserve(statNumber);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Intersection Observer for animations
    setupIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements with data-aos attributes
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            this.intersectionObserver.observe(el);
        });
    }

    // Enhanced event listeners
    setupEventListeners() {
        // Scroll progress indicator
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            this.scrollProgress = (scrollTop / docHeight) * 100;
        }, { passive: true });

        // Smooth resize handling
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 150);
        });
    }

    handleResize() {
        // Handle responsive adjustments
        if (this.neuralCanvas) {
            this.neuralCanvas.width = this.neuralCanvas.offsetWidth;
            this.neuralCanvas.height = this.neuralCanvas.offsetHeight;
            this.initializeNetwork();
        }
    }

    // Enhanced typing animation
    initializeTypingAnimation() {
        const typedTextElement = document.getElementById('typed-text');
        if (!typedTextElement) return;

        const texts = [
            'Initializing neural networks...',
            'Loading AI models...',
            'Optimizing algorithms...',
            'Ready to innovate!'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const typeText = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before typing next text
            }

            setTimeout(typeText, typingSpeed);
        };

        // Start typing animation after a short delay
        setTimeout(typeText, 1000);
    }

    // Enhanced loading screen with progress simulation
    initializeLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressText = document.querySelector('.progress-text');
        const loadingText = document.getElementById('loading-text');
        
        if (!loadingScreen) return;

        const loadingMessages = [
            'Initializing AI systems...',
            'Loading neural networks...',
            'Optimizing algorithms...',
            'Preparing interface...',
            'Almost ready...'
        ];

        let messageIndex = 0;
        let progress = 0;

        const updateProgress = () => {
            progress += Math.random() * 15 + 5;
            if (progress > 100) progress = 100;

            if (progressText) {
                progressText.textContent = Math.floor(progress) + '%';
            }

            if (loadingText && messageIndex < loadingMessages.length) {
                loadingText.textContent = loadingMessages[messageIndex];
                messageIndex++;
            }

            if (progress < 100) {
                setTimeout(updateProgress, 300 + Math.random() * 200);
            }
        };

        updateProgress();
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 800);
        }
    }

    // Initialize animations
    initializeAnimations() {
        // Add entrance animations to key elements
        const animateOnScroll = (elements, animationClass) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(animationClass);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            elements.forEach(el => observer.observe(el));
        };

        // Apply animations to various elements
        const fadeUpElements = document.querySelectorAll('.work-card, .skill-category, .project-card');
        animateOnScroll(fadeUpElements, 'animate-fade-up');
    }

    // Parallax effects
    initializeParallax() {
        const parallaxElements = document.querySelectorAll('.floating-equation, .geometric-shape');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.05);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }, { passive: true });
    }

    // Keyboard navigation support
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Add keyboard shortcuts for navigation
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
                        break;
                    case '2':
                        e.preventDefault();
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                        break;
                    case '3':
                        e.preventDefault();
                        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                        break;
                    case '4':
                        e.preventDefault();
                        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                        break;
                }
            }
        });
    }
}

// Initialize the portfolio app when DOM is ready
const portfolioApp = new PortfolioApp();

// Add some additional utility functions for enhanced functionality
class PortfolioUtils {
    static smoothScrollTo(element, offset = 80) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    static throttle(func, limit) {
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

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, PortfolioUtils };
}
