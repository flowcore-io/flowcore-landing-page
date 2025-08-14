

// Theme management
(function() {
    // Initialize theme on page load
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (systemDark ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
        updateLogo(theme);
    }

    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        const themeToggle = document.querySelector('#theme-toggle');
        const themeToggleMobile = document.querySelector('#theme-toggle-mobile');
        
        const iconClass = theme === 'light' ? 'fa-sun' : 'fa-moon';
        
        if (themeToggle) {
            const icon = themeToggle.querySelector('.theme-toggle__icon i');
            if (icon) {
                icon.className = `fas ${iconClass}`;
            }
            themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        }
        
        if (themeToggleMobile) {
            const icon = themeToggleMobile.querySelector('.theme-toggle__icon i');
            if (icon) {
                icon.className = `fas ${iconClass}`;
            }
            themeToggleMobile.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        }
    }

    // Update logo based on theme
    function updateLogo(theme) {
        const logos = document.querySelectorAll('.nav__logo-img, .footer-brand__logo-img');
        
        logos.forEach(logo => {
            const lightSrc = logo.getAttribute('data-light-src');
            const darkSrc = logo.getAttribute('data-dark-src');
            
            if (lightSrc && darkSrc) {
                logo.src = theme === 'light' ? lightSrc : darkSrc;
            }
        });
    }

    // Toggle theme function
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update both theme toggles
        updateThemeIcon(newTheme);
        updateLogo(newTheme);
        
        // Remove any active/pressed/clicked classes from both toggles and update aria state
        const themeToggle = document.querySelector('#theme-toggle');
        const themeToggleMobile = document.querySelector('#theme-toggle-mobile');
        
        if (themeToggle) {
            themeToggle.classList.remove('theme-toggle--active', 'pressed', 'clicked');
            themeToggle.offsetHeight; // Force reflow
            themeToggle.blur();
            themeToggle.setAttribute('aria-pressed', newTheme === 'dark' ? 'true' : 'false');
        }
        
        if (themeToggleMobile) {
            themeToggleMobile.classList.remove('theme-toggle--active', 'pressed', 'clicked');
            themeToggleMobile.offsetHeight; // Force reflow
            themeToggleMobile.blur();
            themeToggleMobile.setAttribute('aria-pressed', newTheme === 'dark' ? 'true' : 'false');
        }
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
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
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
        
        // Add loaded class to policy section for policy pages (same animation as hero)
        const policySection = document.querySelector('.policy-section');
        if (policySection) {
            setTimeout(() => {
                policySection.classList.add('loaded');
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

    // Initialize icon click effects
    function initIconClickEffects() {
        const iconBoxes = document.querySelectorAll('.use-case-block__icon');
        
        iconBoxes.forEach(box => {
            box.addEventListener('click', function() {
                const icon = this.querySelector('i');
                
                if (this.classList.contains('clicked')) {
                    // Removing glow - add fade-out class first
                    icon.classList.add('fade-out');
                    
                    // Remove clicked class after fade-out transition
                    setTimeout(() => {
                        this.classList.remove('clicked');
                        icon.classList.remove('fade-out');
                    }, 600); // Match the CSS transition duration
                } else {
                    // Adding glow - immediate toggle
                    this.classList.add('clicked');
                }
            });
        });
    }

    // Theme toggle functionality
    function initThemeToggle() {
        const themeToggle = document.querySelector('#theme-toggle');
        const themeToggleMobile = document.querySelector('#theme-toggle-mobile');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        if (themeToggleMobile) {
            themeToggleMobile.addEventListener('click', toggleTheme);
        }
    }

    // Ensure page loads at the very top (single consolidated call)
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Single scrollTo at DOM ready
        window.scrollTo(0, 0);
        
        // Reset any existing animations
        resetAnimations();
        
        initializeTheme();
        initSmoothScrolling();
        initContactForm();
        initAdvancedScrollAnimations();
        initPageLoadAnimations();
        initFAQToggle();
        initIconClickEffects(); // Initialize the new function
        initThemeToggle(); // Initialize the new function
        
        // Optionally pause waves on low-power devices or small screens
        try {
            const isMobile = /Mobi|Android/i.test(navigator.userAgent);
            const lowPower = navigator?.connection?.saveData || false;
            if (isMobile || lowPower) {
                const wave = document.querySelector('.wave-container');
                if (wave) wave.setAttribute('data-pause-waves', 'true');
            }
        } catch (_) {}

        // Theme toggle event listener
        // const themeToggle = document.getElementById('theme-toggle'); // This line is now handled by initThemeToggle
        // if (themeToggle) {
        //     themeToggle.addEventListener('click', toggleTheme);
        // }

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

        // Update active nav link on scroll (throttled + cached)
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const navLinks = Array.from(document.querySelectorAll('.nav__link[href^="#"]'));
        let rafPending = false;
        let cachedSections = [];

        const recalcSectionOffsets = () => {
            cachedSections = sections.map(section => ({
                id: section.getAttribute('id'),
                top: section.offsetTop - 120,
                bottom: section.offsetTop - 120 + section.offsetHeight
            }));
        };

        recalcSectionOffsets();
        window.addEventListener('resize', recalcSectionOffsets, { passive: true });

        const updateActiveOnScroll = () => {
            rafPending = false;
            const y = window.scrollY;
            let current = '';
            for (let i = 0; i < cachedSections.length; i++) {
                const s = cachedSections[i];
                if (y >= s.top && y < s.bottom) { current = s.id; break; }
            }
            navLinks.forEach(link => {
                const isActive = link.getAttribute('href') === `#${current}`;
                link.classList.toggle('nav__link--active', isActive);
            });
        };

        window.addEventListener('scroll', () => {
            if (rafPending) return;
            rafPending = true;
            requestAnimationFrame(updateActiveOnScroll);
        }, { passive: true });
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

    // Removed extra load/beforeunload scrolls to reduce jank
})();
