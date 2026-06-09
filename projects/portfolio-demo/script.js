// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Navigation active state on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Reveal animations on scroll
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealElements);
    // Run once on page load
    revealElements();

    // Button hover effect for mobile
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.classList.add('hover-effect');
        });
        btn.addEventListener('touchend', function() {
            this.classList.remove('hover-effect');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form animation and validation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Check for value on load (in case of browser autofill)
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }
        
        // Check for value on change
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate form
            let isValid = true;
            const formInputs = contactForm.querySelectorAll('input, textarea');
            
            formInputs.forEach(input => {
                if (input.value.trim() === '') {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Remove error class after animation
                    setTimeout(() => {
                        input.classList.remove('error');
                    }, 500);
                }
            });
            
            if (!isValid) return;
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
            
            // Simulate API call delay
            setTimeout(() => {
                // Show success message
                const formElements = contactForm.querySelectorAll('input, textarea, button, .form-group');
                formElements.forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    el.style.transition = 'all 0.3s ease';
                });
                
                setTimeout(() => {
                    contactForm.innerHTML = `
                        <div class="success-message">
                            <i class="bx bx-check-circle"></i>
                            <h3>Message Sent Successfully!</h3>
                            <p>Thank you for your message. I'll get back to you soon.</p>
                        </div>
                    `;
                    
                    // Show success animation
                    const successMessage = contactForm.querySelector('.success-message');
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        successMessage.style.opacity = '1';
                        successMessage.style.transform = 'translateY(0)';
                    }, 100);
                }, 300);
            }, 1500);
        });
    }

    // Parallax effect for background shapes
    window.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.section-bg-shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach(shape => {
            const shiftValue = 20; // Maximum shift in pixels
            shape.style.transform = `translate(${x * shiftValue}px, ${y * shiftValue}px)`;
        });
    });

    // Add particles to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'hero-particle';
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            heroSection.appendChild(particle);
        }
    }

    // Project cards hover effect
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            workItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.6';
                    otherItem.style.transform = 'scale(0.98)';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            workItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
                otherItem.style.transform = 'none';
            });
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="bx bx-chevron-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.visibility = 'hidden';
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 