

// Theme management
(function() {
    // Initialize theme on page load
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (systemDark ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    }

    // Update theme toggle icon
    function updateThemeIcon(theme) {
        const themeIcon = document.querySelector('.theme-toggle__icon i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // Toggle theme function
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }

    // Mobile navigation toggle
    function toggleMobileNav() {
        const navMenu = document.querySelector('.nav__menu');
        const navToggle = document.querySelector('.nav__toggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.toggle('nav__menu--active');
            navToggle.classList.toggle('nav__toggle--active');
        }
    }

    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav__link[href^="#"], .nav__logo-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                
                // Special handling for home link - scroll to very top
                if (targetId === '#home') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav__menu');
                if (navMenu && navMenu.classList.contains('nav__menu--active')) {
                    toggleMobileNav();
                }
                
                // Update active nav link
                updateActiveNavLink(this);
            });
        });
    }

    // Update active navigation link
    function updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => link.classList.remove('nav__link--active'));
        
        // Only add active class if it's a navigation link, not the logo
        if (activeLink.classList.contains('nav__link')) {
            activeLink.classList.add('nav__link--active');
        }
    }

    // Contact form handling (currently no contact form in HTML)
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const name = this.querySelector('input[type="text"]')?.value;
                const email = this.querySelector('input[type="email"]')?.value;
                const message = this.querySelector('textarea')?.value;
                
                // Simple validation
                if (!name || !email || !message) {
                    alert('Please fill in all fields.');
                    return;
                }
                
                // Simulate form submission
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    alert('Thank you for your message! We\'ll get back to you soon.');
                    this.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1500);
            });
        }
    }

    // Enhanced scroll animations
    function initAdvancedScrollAnimations() {
        // Initialize interactive elements for use case visuals
        initInteractiveElements();
        
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a small delay to ensure smooth animation
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, 50);
                } else {
                    // Optional: Remove animation class when element leaves viewport
                    // This can be useful for repeated animations
                    // entry.target.classList.remove('animate-in');
                }
            });
        }, observerOptions);

        // Observe all animated elements with proper error handling
        const animatedElements = document.querySelectorAll(
            '.animate-on-scroll, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in'
        );
        
        animatedElements.forEach(el => {
            // Ensure element is properly set up for animation
            if (!el.classList.contains('animate-in')) {
                observer.observe(el);
            }
        });

        // Handle staggered animations separately
        const staggeredElements = document.querySelectorAll('[class*="stagger-delay-"]');
        staggeredElements.forEach(el => {
            if (!el.classList.contains('animate-in')) {
                observer.observe(el);
            }
        });
    }

    // Initialize page load animations
    function initPageLoadAnimations() {
        // Add loaded class to hero section after a short delay
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            setTimeout(() => {
                heroSection.classList.add('loaded');
            }, 300); // Small delay to ensure smooth transition
            
            // Animate hero stats with stagger effect
            const heroStats = document.querySelectorAll('.hero__stat');
            heroStats.forEach((stat, index) => {
                setTimeout(() => {
                    stat.classList.add('animate-in');
                }, 800 + (index * 200)); // Start after hero loads, then stagger by 200ms each
            });
        }
        
        // Add loaded class to terms section for policy pages (same animation as hero)
        const termsSection = document.querySelector('.terms-section');
        if (termsSection) {
            setTimeout(() => {
                termsSection.classList.add('loaded');
            }, 300); // Same delay as hero for consistency
        }
    }

    // Reset animations on page reload
    function resetAnimations() {
        const animatedElements = document.querySelectorAll('.animate-in');
        animatedElements.forEach(el => {
            el.classList.remove('animate-in');
        });
        
        const loadedElements = document.querySelectorAll('.loaded');
        loadedElements.forEach(el => {
            el.classList.remove('loaded');
        });
    }

    // FAQ Section Toggle
    function initFAQToggle() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-item__question');
            header.addEventListener('click', () => {
                // Toggle active class on current FAQ item
                item.classList.toggle('active');
                
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    }

    // Interactive Elements
    function initInteractiveElements() {
        // Initialize use case icon activation
        initUseCaseIconActivation();
        
        // Define all interactive element selectors
        const interactiveSelectors = [
            // AI Training Visual
            '.data-box',
            '.output-box',
            '.model-training',
            '.replay-feature',
            
            // Analytics Visual
            '.metrics-count',
            '.flow-stage',
            '.pulse-dot',
            
            // Microservices Visual
            '.service-node',
            '.event-bus-simple',
            
            // Sync Visual
            '.env-item',
            '.platform-item',
            '.sync-status'
        ];
        
        // Add click handlers to all interactive elements
        interactiveSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            
            elements.forEach(element => {
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Toggle clicked state
                    this.classList.toggle('clicked');
                    
                    // Optional: Add a subtle animation effect
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
                
                // Add keyboard support for accessibility
                element.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
                
                // Make elements focusable for keyboard navigation
                if (!element.hasAttribute('tabindex')) {
                    element.setAttribute('tabindex', '0');
                }
            });
        });
        
        // Optional: Add a "Reset All" function
        window.resetInteractiveElements = function() {
            interactiveSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    element.classList.remove('clicked');
                });
            });
        };
        
        // Optional: Add double-click to reset individual elements
        interactiveSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            
            elements.forEach(element => {
                element.addEventListener('dblclick', function(e) {
                    e.preventDefault();
                    this.classList.remove('clicked');
                    
                    // Add a subtle "reset" animation
                    this.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
            });
        });
    }

    // Use Case Icon Activation - Click to toggle active state
    function initUseCaseIconActivation() {
        // Find all use case icons
        const useCaseIcons = document.querySelectorAll('.use-case-icon i');
        
        useCaseIcons.forEach(icon => {
            // Add click event listener
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle active class
                this.classList.toggle('active');
                
                // Optional: Add a subtle click feedback
                const originalTransform = this.style.transform;
                this.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    this.style.transform = originalTransform;
                }, 100);
                
                // Optional: Console log for debugging (can be removed)
                console.log('Use case icon toggled:', this.classList.contains('active') ? 'activated' : 'deactivated');
            });
            
            // Add keyboard support for accessibility
            icon.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
            
            // Make icons focusable for keyboard navigation
            if (!icon.hasAttribute('tabindex')) {
                icon.setAttribute('tabindex', '0');
            }
            
            // Add proper cursor pointer
            icon.style.cursor = 'pointer';
            
            // Optional: Add aria-label for screen readers
            if (!icon.hasAttribute('aria-label')) {
                icon.setAttribute('aria-label', 'Toggle use case activation');
            }
        });
        
        // Optional: Add a function to reset all use case icons
        window.resetUseCaseIcons = function() {
            useCaseIcons.forEach(icon => {
                icon.classList.remove('active');
            });
            console.log('All use case icons reset');
        };
        
        // Optional: Add a function to get currently active icons
        window.getActiveUseCaseIcons = function() {
            return Array.from(useCaseIcons).filter(icon => icon.classList.contains('active'));
        };
    }

    // Terminal typing animation for getting started section
    function initTerminalAnimation() {
        const typingElement = document.querySelector('.command.typing');
        if (!typingElement) return;
        
        const fullText = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < fullText.length) {
                typingElement.textContent += fullText.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    }

    // Ensure page loads at the very top - multiple attempts
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }

    // Immediate scroll to top
    window.scrollTo(0, 0);

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Ensure page loads scrolled to the top
        window.scrollTo(0, 0);
        
        // Reset any existing animations
        resetAnimations();
        
        initializeTheme();
        initSmoothScrolling();
        initContactForm();
        initAdvancedScrollAnimations();
        initPageLoadAnimations();
        initFAQToggle();
        
        // Additional scroll to top after everything is initialized
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);

        // Theme toggle event listener
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav__toggle');
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileNav);
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            const navMenu = document.querySelector('.nav__menu');
            const navToggle = document.querySelector('.nav__toggle');
            
            if (navMenu && navMenu.classList.contains('nav__menu--active') && 
                !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                toggleMobileNav();
            }
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && 
                    window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('nav__link--active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('nav__link--active');
                }
            });
        });
    });

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                const theme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', theme);
                updateThemeIcon(theme);
            }
        });
    }

    // Additional scroll to top when page is fully loaded
    window.addEventListener('load', function() {
        window.scrollTo(0, 0);
    });

    // Prevent scroll restoration on page refresh
    window.addEventListener('beforeunload', function() {
        window.scrollTo(0, 0);
    });
})();
