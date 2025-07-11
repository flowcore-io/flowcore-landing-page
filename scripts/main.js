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
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
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
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        }
    }

    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    if (navMenu && navMenu.classList.contains('active')) {
                        toggleMobileNav();
                    }
                    
                    // Update active nav link
                    updateActiveNavLink(this);
                }
            });
        });
    }

    // Update active navigation link
    function updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    // Contact form handling
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const name = this.querySelector('input[type="text"]').value;
                const email = this.querySelector('input[type="email"]').value;
                const message = this.querySelector('textarea').value;
                
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

    // Intersection Observer for scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe only specific elements, excluding all card types
        const animatedElements = document.querySelectorAll('.about-content, .contact-content');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeTheme();
        initSmoothScrolling();
        initContactForm();
        initScrollAnimations();

        // Theme toggle event listener
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileNav);
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            
            if (navMenu && navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                toggleMobileNav();
            }
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
            
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
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
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
})();
