// Enhanced Portfolio Website JavaScript
// Author: Chaitanya
// AI-powered interactive portfolio with improved animations and responsive design

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
        this.initializeTestimonials();
        
        // Hide loading screen after animations
        setTimeout(() => this.hideLoadingScreen(), 2000);
    }

    // Enhanced Cursor with Faster, More Natural Movement
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
        
        // Increased responsiveness for more natural movement
        const easing = 0.25; // Increased from 0.12 for faster response
        const trailCreationRate = 0.92; // Adjusted for better trail generation

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
            'dropout(0.5)'
        ];

        let currentCalc = 0;

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
            // Faster easing for more responsive movement
            targetX += (mouseX - targetX) * easing;
            targetY += (mouseY - targetY) * easing;
            
            cursor.style.left = targetX + 'px';
            cursor.style.top = targetY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Update calculation display
        const calcDisplay = cursor.querySelector('.cursor-calculation');
        if (calcDisplay) {
            calcDisplay.textContent = calculations[currentCalc];
        }

        // Enhanced cursor interactions with more elements
        const interactiveElements = document.querySelectorAll(`
            a, button, .nav-link, .cta-button, .project-card, .work-card, 
            .skill-badge, .timeline-item, .achievement-card, .testimonial-card,
            .certification-card, .contact-method, .social-link, .nav-dropdown,
            .dropdown-menu, .stat-item, .status-item
        `);
        
        interactiveElements.forEach((element, index) => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                currentCalc = (currentCalc + 1) % calculations.length;
                if (calcDisplay) {
                    calcDisplay.textContent = calculations[currentCalc];
                    calcDisplay.style.opacity = '1';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                if (calcDisplay) {
                    calcDisplay.style.opacity = '0';
                }
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
            '→', '←', '↑', '↓', '⟨', '⟩', '∀', '∃'
        ];
        trail.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        // Add random colors for variety
        const colors = ['var(--accent-cyan)', 'var(--accent-lime)', 'var(--accent-orange)', 'var(--accent-pink)'];
        trail.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(trail);
        
        // Remove trail after animation
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 1000);
    }

    // Neural Network Animation for Intro Section
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

    // Testimonials Carousel
    initializeTestimonials() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const navDots = document.querySelectorAll('.nav-dot');
        let currentSlide = 0;
        
        if (!testimonialCards.length) return;

        const showSlide = (index) => {
            testimonialCards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });
            
            navDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        // Navigation dots
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto-rotate testimonials
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        }, 5000);

        // Initialize first slide
        showSlide(0);
    }

    // Enhanced Navigation with Responsive Dropdown
    initializeNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const dropdownToggle = document.getElementById('dropdown-toggle');
        const dropdownMenu = document.getElementById('dropdown-menu');

        // Hamburger menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Dropdown menu for desktop
        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                dropdownMenu.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                    dropdownMenu.classList.remove('active');
                }
            });
        }

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                if (targetId && targetId.startsWith('#') && targetId !== '#') {
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        // Close mobile menu
                        if (navMenu) navMenu.classList.remove('active');
                        if (hamburger) hamburger.classList.remove('active');
                        if (dropdownMenu) dropdownMenu.classList.remove('active');
                        document.body.style.overflow = '';
                        
                        // Smooth scroll to section
                        this.smoothScrollTo(targetSection);
                        
                        // Update active nav link
                        this.updateActiveNavLink(link);
                    }
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', this.throttle(() => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 16));

        // Update active nav link on scroll
        this.setupScrollSpyNavigation();
    }

    // Scroll spy navigation
    setupScrollSpyNavigation() {
        const sections = document.querySelectorAll('.section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        const observerOptions = {
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                    if (targetLink) {
                        this.updateActiveNavLink(targetLink);
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => navObserver.observe(section));
    }

    updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    // Smooth scroll implementation
    smoothScrollTo(target) {
        const targetOffset = target.offsetTop - 80; // Account for navbar height
        const startPosition = window.pageYOffset;
        const distance = targetOffset - startPosition;
        const duration = 800;
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Initialize Animations
    initializeAnimations() {
        this.createKeyframeAnimations();
        this.initializeScrollAnimations();
        this.initializeHoverAnimations();
    }

    createKeyframeAnimations() {
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
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.add('animate-on-scroll');
        });
    }

    initializeHoverAnimations() {
        const cards = document.querySelectorAll('.work-card, .project-card, .stat-item, .achievement-card, .certification-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.320, 1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Loading Screen Management
    initializeLoading() {
        const loadingText = document.getElementById('loading-text');
        const progressText = document.querySelector('.progress-text');
        const progressBar = document.querySelector('.progress-bar');
        
        const messages = [
            'Initializing AI systems...',
            'Loading neural networks...',
            'Compiling machine learning models...',
            'Optimizing tensor computations...',
            'Connecting to deep learning framework...',
            'Calibrating matrix operations...',
            'AI systems online!'
        ];
        
        let messageIndex = 0;
        let progress = 0;
        
        const updateProgress = () => {
            progress += Math.random() * 12 + 8;
            if (progress > 100) progress = 100;
            
            if (progressText) {
                progressText.textContent = `${Math.floor(progress)}%`;
            }
            
            if (progressBar) {
                progressBar.style.setProperty('--progress', `${progress}%`);
            }
            
            if (messageIndex < messages.length && Math.random() > 0.4) {
                if (loadingText) {
                    loadingText.textContent = messages[messageIndex];
                    messageIndex++;
                }
            }
            
            if (progress < 100) {
                setTimeout(updateProgress, 150 + Math.random() * 200);
            }
        };
        
        updateProgress();
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            this.isLoading = false;
            this.startMainAnimations();
        }
    }

    startMainAnimations() {
        // Initialize AOS (Animate On Scroll) equivalent
        this.initializeAOS();
        
        // Start particle animations
        this.animateParticles();
        
        // Start background math equations
        this.animateBackgroundMath();
    }

    // Terminal Typing Animation
    initializeTypingAnimation() {
        const typedText = document.getElementById('typed-text');
        if (!typedText) return;

        const commands = [
            'import tensorflow as tf',
            'import numpy as np',
            'model = tf.keras.Sequential()',
            'model.add(tf.keras.layers.Dense(128))',
            'model.compile(optimizer="adam")',
            'model.fit(X_train, y_train)',
            'predictions = model.predict(X_test)',
            'print("Model accuracy: 97.3%")',
            'model.save("ai_model.h5")',
            'print("Hello, I\'m Chaitanya!")',
            'ai_status = "Online and Ready"',
            'deploy_portfolio()'
        ];

        let currentCommand = 0;
        let currentChar = 0;
        let isTyping = true;

        const typeCommand = () => {
            if (currentCommand >= commands.length) {
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
                typedText.textContent = command.slice(0, currentChar + 1);
                currentChar++;
                setTimeout(typeCommand, Math.random() * 80 + 40);
            } else if (isTyping) {
                isTyping = false;
                setTimeout(typeCommand, 1500);
            } else if (currentChar > 0) {
                typedText.textContent = command.slice(0, currentChar - 1);
                currentChar--;
                setTimeout(typeCommand, 25);
            } else {
                isTyping = true;
                currentCommand++;
                setTimeout(typeCommand, 500);
            }
        };

        setTimeout(() => typeCommand(), 2500);
    }

    // Event Listeners
    setupEventListeners() {
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        document.addEventListener('mousemove', this.throttle(this.handleMouseMove.bind(this), 16));
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleScroll() {
        this.scrollProgress = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
        this.updateScrollProgress();
    }

    handleResize() {
        if (this.matrixCanvas) {
            this.matrixCanvas.width = this.matrixCanvas.offsetWidth;
            this.matrixCanvas.height = this.matrixCanvas.offsetHeight;
        }
    }

    handleMouseMove(e) {
        this.mousePosition.x = e.clientX;
        this.mousePosition.y = e.clientY;
        this.updateParallaxElements();
    }

    handleKeyDown(e) {
        // Keyboard navigation
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            const dropdownMenu = document.getElementById('dropdown-menu');
            
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            if (dropdownMenu) dropdownMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Statistics Animation
    initializeStats() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        
        const animateNumber = (element) => {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000;
            const startTime = performance.now();
            
            const updateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOutQuart * target);
                
                element.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                }
            };
            
            requestAnimationFrame(updateNumber);
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => statsObserver.observe(stat));
    }

    // Projects Initialization
    initializeProjects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Add stagger animation
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-12px) rotateX(5deg)';
                card.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0)';
                card.style.boxShadow = '';
            });
        });
    }

    // Testimonials Slider
    initializeTestimonials() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const navDots = document.querySelectorAll('.nav-dot');
        let currentTestimonial = 0;

        const showTestimonial = (index) => {
            testimonialCards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });
            
            navDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
        });

        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Parallax Effects
    initializeParallax() {
        const parallaxElements = document.querySelectorAll('.floating-equation, .geometric-shape, .particle');
        
        parallaxElements.forEach(element => {
            const speed = Math.random() * 0.5 + 0.1;
            element.setAttribute('data-speed', speed);
        });
    }

    updateParallaxElements() {
        const parallaxElements = document.querySelectorAll('[data-speed]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed'));
            const x = (this.mousePosition.x - window.innerWidth / 2) * speed * 0.1;
            const y = (this.mousePosition.y - window.innerHeight / 2) * speed * 0.1;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // AOS (Animate On Scroll) Implementation
    initializeAOS() {
        const aosElements = document.querySelectorAll('[data-aos]');
        
        const aosObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                } else {
                    entry.target.classList.remove('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        });

        aosElements.forEach(element => {
            aosObserver.observe(element);
        });
    }

    setupIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.1 });

        const observeElements = document.querySelectorAll('.section, .work-card, .project-card');
        observeElements.forEach(el => this.intersectionObserver.observe(el));
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                const sections = document.querySelectorAll('.section[id]');
                let currentSection = 0;
                
                sections.forEach((section, index) => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 100) currentSection = index;
                });

                if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
                    e.preventDefault();
                    this.smoothScrollTo(sections[currentSection + 1]);
                } else if (e.key === 'ArrowUp' && currentSection > 0) {
                    e.preventDefault();
                    this.smoothScrollTo(sections[currentSection - 1]);
                }
            }
        });
    }

    updateScrollProgress() {
        const progressElement = document.querySelector('.scroll-progress');
        if (progressElement) {
            progressElement.style.width = `${this.scrollProgress * 100}%`;
        }
    }

    animateParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            particle.style.animationDelay = `${index * 2}s`;
        });
    }

    animateBackgroundMath() {
        const equations = document.querySelectorAll('.floating-equation');
        equations.forEach((eq, index) => {
            eq.style.animationDelay = `${index * 3}s`;
        });
    }

    // Utility functions
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
}

// Initialize the portfolio app
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Performance optimization
window.addEventListener('load', () => {
    // Add loaded class for additional animations
    document.body.classList.add('loaded');
    
    // Preload critical resources
    const preloadLinks = document.querySelectorAll('link[rel="preload"]');
    preloadLinks.forEach(link => {
        const resource = document.createElement(link.as || 'link');
        resource.href = link.href;
        if (link.as === 'font') resource.crossOrigin = 'anonymous';
    });
});

// Handle browser back/forward
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.section) {
        const section = document.getElementById(e.state.section);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add CSS for improved cursor trail
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .cursor-code-trail {
        animation: codeTrailFade 1s ease-out forwards;
        font-weight: bold;
        text-shadow: 0 0 5px currentColor;
    }
    
    .dropdown-menu.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .progress-bar {
        background: linear-gradient(90deg, var(--accent-orange), var(--accent-cyan));
        width: var(--progress, 0%);
        transition: width 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .nav-dropdown .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            border: none;
            background: transparent;
            margin-top: 0.5rem;
        }
    }
`;
document.head.appendChild(additionalStyles);
