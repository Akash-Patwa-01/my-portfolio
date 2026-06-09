// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Page loading animation with enhanced visual feedback
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.add('loaded');
            // Add fade-in animation for main content
            document.querySelector('main') && document.querySelector('main').classList.add('fade-in');
        }, 800);
    });

    // Resume download functionality with improved feedback
    const downloadButtons = document.querySelectorAll('a[download]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Prevent the default behavior to show custom animation
            if (!button.classList.contains('downloading')) {
                e.preventDefault();
                e.stopPropagation();

                // Add downloading class and update text/icon
                button.classList.add('downloading');
                const originalText = button.innerHTML;
                button.innerHTML = 'Downloading... <i class="bx bx-loader-alt bx-spin"></i>';

                // Simulate download progress
                setTimeout(() => {
                    button.innerHTML = 'Downloaded! <i class="bx bx-check"></i>';

                    // Reset button after showing success
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.classList.remove('downloading');

                        // Actually trigger the download
                        const link = document.createElement('a');
                        link.href = button.href;
                        link.download = button.getAttribute('download');
                        link.click();
                    }, 1500);
                }, 1800);
            }
        });
    });

    // Get all DOM elements we'll need
    const header = document.querySelector('.header');
    const body = document.body;

    // Create mobile menu icon if it doesn't exist
    if (!document.getElementById('menu-icon')) {
        const menuIcon = document.createElement('div');
        menuIcon.innerHTML = '<i class="bx bx-menu" id="menu-icon"></i>';
        header.insertBefore(menuIcon, document.querySelector('.navbar'));
    }

    // Create theme toggle button
    const themeToggle = document.createElement('div');
    themeToggle.id = 'theme-toggle';
    themeToggle.classList.add('theme-toggle');
    themeToggle.innerHTML = '<i class="bx bx-moon"></i>';

    // Append to header at the end
    header.appendChild(themeToggle);

    // Add styles for theme toggle
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            margin-left: 20px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            position: relative;
        }
        
        .theme-toggle:hover {
            background: var(--main-color);
            transform: translateY(-3px);
        }
        
        .theme-toggle i {
            font-size: 1.5rem;
            color: var(--text-color);
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover i {
            color: var(--bg-color);
        }
        
        /* Ensure theme toggle is on right side */
        @media (max-width: 768px) {
            .theme-toggle {
                position: absolute;
                right: 80px;
                top: 50%;
                transform: translateY(-50%);
                margin-left: 0;
            }
            
            .theme-toggle:hover {
                transform: translateY(-50%) translateY(-3px);
            }
        }
        
        body.light-mode {
            --bg-color: #f8fafc;
            --second-bg-color: #e2e8f0;
            --text-color: #1e293b;
            --main-color: #0284c7;
        }
        
        body.light-mode .header.sticky {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .error-message {
            color: #ff3860;
            font-size: 0.85rem;
            margin-top: 0.5rem;
            display: block;
            text-align: left;
        }
        
        .success-message {
            background: rgba(16, 185, 129, 0.1);
            color: var(--text-color);
            padding: 2rem;
            border-radius: var(--border-radius-md);
            text-align: center;
            animation: fadeIn 0.5s forwards;
            border: 2px solid rgba(16, 185, 129, 0.2);
        }
        
        .success-message i {
            font-size: 4rem;
            color: #10b981;
            margin-bottom: 1rem;
        }
        
        .success-message p {
            margin: 0.5rem 0;
        }
        
        .scroll-top-btn {
            position: fixed;
            right: 2rem;
            bottom: 2rem;
            width: 45px;
            height: 45px;
            background: var(--gradient-primary);
            color: var(--text-color);
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        .scroll-top-btn.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-top-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        .hero-particle {
            position: absolute;
            background: var(--main-color);
            border-radius: 50%;
            opacity: 0.3;
            pointer-events: none;
            animation: float-particle 15s infinite linear;
        }
        
        @keyframes float-particle {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(100px, 50px);
            }
            50% {
                transform: translate(50px, 100px);
            }
            75% {
                transform: translate(-50px, 50px);
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.1);
                opacity: 0.8;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in {
            animation: fadeIn 1s forwards;
        }
        
        .bounce {
            animation: bounce 0.8s cubic-bezier(0.28, 0.84, 0.42, 1);
        }
        
        @keyframes bounce {
            0% {
                transform: scale(1);
            }
            25% {
                transform: scale(1.2);
            }
            50% {
                transform: scale(0.9);
            }
            75% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Theme toggle functionality
    const themeIcon = document.querySelector('#theme-toggle i');

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.replace('bx-moon', 'bx-sun');
    }

    // Toggle theme
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        body.classList.toggle('light-mode');

        // Update the icon
        const themeIcon = document.querySelector('#theme-toggle i');
        if (body.classList.contains('light-mode')) {
            themeIcon.classList.replace('bx-moon', 'bx-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('bx-sun', 'bx-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');
    const revealElements = document.querySelectorAll('.hide');

    // Mobile menu toggle with improved animation
    document.getElementById('menu-icon').addEventListener('click', () => {
        navbar.classList.toggle('active');
        document.getElementById('menu-icon').classList.toggle('bx-menu');
        document.getElementById('menu-icon').classList.toggle('bx-x');

        // Add staggered animation to nav links
        if (navbar.classList.contains('active')) {
            navLinks.forEach((link, index) => {
                link.style.animation = `slideTop 0.5s ease forwards ${0.2 + index * 0.1}s`;
                link.style.opacity = '0';
                setTimeout(() => {
                    link.style.opacity = '1';
                }, 200 + index * 100);
            });
        } else {
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && e.target.id !== 'menu-icon' && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            document.getElementById('menu-icon').classList.remove('bx-x');
            document.getElementById('menu-icon').classList.add('bx-menu');

            // Reset animations
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });

    // Sticky navbar on scroll with enhanced effects
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        header.classList.toggle('sticky', scrollPos > 100);

        // Progressive transparency effect
        if (scrollPos <= 100) {
            header.style.background = `rgba(30, 41, 59, ${scrollPos / 100 * 0.8})`;
            header.style.backdropFilter = `blur(${scrollPos / 100 * 10}px)`;
        } else {
            header.style.background = 'var(--second-bg-color)';
            header.style.backdropFilter = 'blur(10px)';
        }

        // Scroll-to-top button management
        manageScrollTopButton(scrollPos);
    });

    // Manage scroll-to-top button
    function manageScrollTopButton(scrollPos) {
        let scrollTopBtn = document.querySelector('.scroll-top-btn');

        if (scrollPos > 500) {
            if (!scrollTopBtn) {
                scrollTopBtn = document.createElement('button');
                scrollTopBtn.classList.add('scroll-top-btn');
                scrollTopBtn.innerHTML = '<i class="bx bx-chevron-up"></i>';
                document.body.appendChild(scrollTopBtn);

                // Add click event
                scrollTopBtn.addEventListener('click', () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });

                // Show with animation
                setTimeout(() => {
                    scrollTopBtn.classList.add('show');
                }, 100);
            }
        } else if (scrollTopBtn) {
            scrollTopBtn.classList.remove('show');

            // Remove after transition completes
            setTimeout(() => {
                if (scrollTopBtn.parentNode) {
                    scrollTopBtn.parentNode.removeChild(scrollTopBtn);
                }
            }, 300);
        }
    }

    // Active nav link based on scroll position with smooth transition
    function activeLink() {
        let position = window.scrollY + 200;

        sections.forEach(section => {
            if (!section.hasAttribute('id')) return;

            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (position >= top && position < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', activeLink);

    // Add IDs to sections for navigation if missing
    const sectionIds = ['home', 'about', 'skills', 'portfolio', 'contact'];
    sections.forEach((section, index) => {
        if (index < sectionIds.length && !section.hasAttribute('id')) {
            section.id = sectionIds[index];
        }
    });

    // Fix navbar links to point to section IDs
    navLinks.forEach((link, index) => {
        if (index < sectionIds.length) {
            link.setAttribute('href', `#${sectionIds[index]}`);
        }
    });

    // Enhanced scroll reveal animation with staggered effect
    function scrollReveal() {
        revealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                // Add staggered delay based on element position
                element.style.transitionDelay = `${index % 5 * 0.1}s`;
                element.classList.add('show');
            } else {
                element.style.transitionDelay = '0s';
                // Only hide elements when far out of viewport
                if (elementTop > windowHeight + 300) {
                    element.classList.remove('show');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollReveal);

    // Trigger initial scroll reveal
    setTimeout(scrollReveal, 200);

    // Typing animation for skills with smoother transitions
    const roleElement = document.querySelector('.home-content h3 .typing-text');
    if (roleElement) {
        const roles = ['Frontend Developer', 'UI/UX Designer', 'Web Developer', 'Creative Coder'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 200;
        let erasingSpeed = 100;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                roleElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = erasingSpeed;
            } else {
                roleElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 200;
            }

            // Add cursor blink effect
            roleElement.classList.toggle('blink');

            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at end of word
                isDeleting = true;
                typingSpeed = 1500; // Wait before deleting
                roleElement.classList.remove('blink');
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Wait before typing next word
                roleElement.classList.remove('blink');
            }

            setTimeout(typeEffect, typingSpeed);
        }

        // Start typing effect
        setTimeout(typeEffect, 1000);

        // Add style for blinking cursor
        const cursorStyle = document.createElement('style');
        cursorStyle.textContent = `
            .home-content h3 .typing-text.blink::after {
                content: '|';
                animation: blink 1s infinite;
                margin-left: 2px;
            }
            
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(cursorStyle);
    }

    
    // Contact form validation + Formspree connection
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formElements = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            formElements.forEach(element => {
                // Remove old error messages
                const nextElement = element.nextElementSibling;
                if (
                    nextElement &&
                    nextElement.classList &&
                    nextElement.classList.contains('error-message')
                ) {
                    nextElement.remove();
                }

                element.classList.remove('error');

                // Required validation
                if (element.value.trim() === '') {
                    element.classList.add('error');
                    addErrorMessage(
                        element,
                        'This field is required'
                    );
                    isValid = false;
                } else {

                    // Email validation
                    if (element.type === 'email') {
                        const emailPattern =
                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                        if (!emailPattern.test(element.value)) {
                            element.classList.add('error');
                            addErrorMessage(
                                element,
                                'Please enter a valid email address'
                            );
                            isValid = false;
                        }
                    }

                    // Phone validation
                    if (element.type === 'tel') {
                        const phonePattern =
                            /^[+]?[\d\s()-]{10,20}$/;

                        if (!phonePattern.test(element.value)) {
                            element.classList.add('error');
                            addErrorMessage(
                                element,
                                'Please enter a valid phone number'
                            );
                            isValid = false;
                        }
                    }
                }
            });

            // If form is valid send to Formspree
            if (isValid) {
                const submitBtn = contactForm.querySelector('.btn');
                submitBtn.innerHTML =
                    'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
                submitBtn.disabled = true;

                const formData = new FormData(contactForm);

                fetch(contactForm.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                })

                    .then(response => {
                        if (response.ok) {
                            // Same old success message
                            const successMessage =
                                document.createElement('div');
                            successMessage.classList.add(
                                'success-message'
                            );

                            successMessage.innerHTML = `
                        <i class="bx bx-check-circle"></i>
                        <p>Message sent successfully!</p>
                        <p>
                        Thank you for contacting me.
                        I'll get back to you soon.
                        </p>
                    `;

                            contactForm.style.opacity = '0';
                            contactForm.style.transform =
                                'translateY(20px)';
                            contactForm.style.transition =
                                'all 0.3s ease';

                            setTimeout(() => {
                                const parentElement =
                                    contactForm.parentNode;
                                parentElement.replaceChild(
                                    successMessage,
                                    contactForm
                                );

                            }, 300);

                        } else {
                            throw new Error();
                        }

                    })
                    .catch(() => {
                        alert(
                            "Something went wrong. Please try again."
                        );

                        submitBtn.innerHTML =
                            'Send Message';
                        submitBtn.disabled = false;
                    });

            }

        });

        // Error message function
        function addErrorMessage(element, message) {
            const errorMessage =
                document.createElement('span');

            errorMessage.classList.add(
                'error-message'
            );

            errorMessage.textContent = message;
            element.parentNode.insertBefore(
                errorMessage,
                element.nextSibling
            );

            // Shake animation
            element.animate([

                { transform: 'translateX(-5px)' },
                { transform: 'translateX(5px)' },
                { transform: 'translateX(-5px)' },
                { transform: 'translateX(5px)' },
                { transform: 'translateX(0)' }

            ], {

                duration: 400,
                easing: 'ease-in-out'

            });

        }

        // Remove error while typing
        contactForm
            .querySelectorAll('input, textarea')
            .forEach(element => {

                element.addEventListener('input', () => {

                    element.classList.remove('error');
                    const nextElement =
                        element.nextElementSibling;

                    if (
                        nextElement &&
                        nextElement.classList &&
                        nextElement.classList.contains('error-message')
                    ) {


                        nextElement.remove();


                    }

                });

            });

    }

    // Update year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for anchor links with offset adjustment
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                document.getElementById('menu-icon').classList.remove('bx-x');
                document.getElementById('menu-icon').classList.add('bx-menu');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Get header height for offset
                const headerHeight = header.offsetHeight;

                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20, // Additional offset for spacing
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced lazy loading for images with fade effect
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;

                    // Add loading animation
                    img.style.opacity = '0';
                    img.style.transform = 'scale(0.9)';
                    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

                    img.onload = () => {
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                        img.classList.add('loaded');
                    };

                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '0px 0px 200px 0px' // Load images earlier
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add hover effects to portfolio and skill boxes
    const portfolioBoxes = document.querySelectorAll('.portfolio-box');
    portfolioBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            const icon = box.querySelector('i');
            if (icon) icon.classList.add('bounce');

            // Remove class after animation completes
            setTimeout(() => {
                if (icon) icon.classList.remove('bounce');
            }, 1000);
        });
    });

    const skillBoxes = document.querySelectorAll('.skills-box');
    skillBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            const skills = box.querySelectorAll('.skill-list span');
            skills.forEach((skill, index) => {
                skill.style.transition = `transform 0.3s ease ${index * 0.05}s, background 0.3s ease`;
                skill.style.transform = 'translateY(-5px)';
            });
        });

        box.addEventListener('mouseleave', () => {
            const skills = box.querySelectorAll('.skill-list span');
            skills.forEach(skill => {
                skill.style.transform = 'translateY(0)';
            });
        });
    });

    // Create particles in hero section
    function createParticles() {
        const homeSection = document.querySelector('.home');
        if (!homeSection) return;

        // Reduce the number of particles
        const particleCount = 10;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');

            // Position particles mainly on the right side of the hero section
            // to avoid overlapping with text content
            particle.style.left = `${Math.random() * 35 + 65}%`;
            particle.style.top = `${Math.random() * 100}%`;

            // Smaller particles
            const size = Math.random() * 4 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Lower opacity
            particle.style.opacity = Math.random() * 0.3 + 0.1;

            // Slower animation
            const duration = Math.random() * 25 + 15;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${Math.random() * 10}s`;

            homeSection.appendChild(particle);
        }
    }

    // Create particles on load
    createParticles();
});
