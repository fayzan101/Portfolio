document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.main-nav a');
    const contentSections = document.querySelectorAll('.content-section');
    const sectionTitleElement = document.querySelector('.active-section-title');
    const contactBtn = document.querySelector('.contact-btn');
    const contactContainer = document.querySelector('.contact-details-container');

    
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        profilePic.classList.add('floating');
    }

  
    const mainCards = document.querySelectorAll('.profile-card, .content-card');
    mainCards.forEach(card => {
        card.classList.add('glow');
    });

    // Navigation logic with enhanced animations
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Add loading animation to clicked link
            link.classList.add('loading');
            setTimeout(() => link.classList.remove('loading'), 500);

            // Highlight correct nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            
            const newTitle = link.dataset.title;
            if (sectionTitleElement) {
                typeWriter(sectionTitleElement, newTitle);
            }

            
            const targetId = link.getAttribute('href').substring(1);
            contentSections.forEach(section => {
                section.classList.toggle('hidden', section.id !== targetId);
            });

            
            setTimeout(() => {
                const contentCard = document.querySelector('.content-card');
                if (contentCard) {
                    const cardTop = contentCard.offsetTop;
                    const scrollTarget = cardTop - 80; // 80px above the content card
                    
                    window.scrollTo({ 
                        top: scrollTarget, 
                        behavior: 'smooth' 
                    });
                }
            }, 50);
        });
    });

    
    function typeWriter(element, text) {
        element.textContent = '';
        let i = 0;
        const speed = 50; 
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    
    if (contactBtn && contactContainer) {
        contactBtn.addEventListener('click', () => {
            contactContainer.classList.toggle('visible');
            const isVisible = contactContainer.classList.contains('visible');
            contactBtn.textContent = isVisible ? 'Hide Contacts' : 'Show Contacts';
            
            
            contactBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                contactBtn.style.transform = '';
            }, 150);
        });
    }

   
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

    
    const animatedElements = document.querySelectorAll('.service-card, .skill-card, .resume-card, .project-card, .certification-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover sound effect (optional - creates a subtle click sound)
    const clickableElements = document.querySelectorAll('a, button, .skill-card, .service-card, .project-card, .certification-card');
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.cursor = 'pointer';
        });
    });

    // Add parallax effect to background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body::before');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Add smooth reveal animation for sections
    function revealSection(section) {
        const elements = section.querySelectorAll('*');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Sending...';
            
            
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.textContent = 'Message Sent!';
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                }, 2000);
            }, 2000);
        });
    }

    if (document.querySelector('.skills-slider')) {
        const swiper = new Swiper('.skills-slider', {
            loop: false,
            slidesPerView: 4,
            spaceBetween: 20,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                640: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                960: {
                    slidesPerView: 4,
                    spaceBetween: 20
                }
            }
        });
    }

    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          
            if (contactContainer && contactContainer.classList.contains('visible')) {
                contactContainer.classList.remove('visible');
                contactBtn.textContent = 'Show Contacts';
            }
        }
    });

    
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                console.log('Swiped left');
            } else {
               
                console.log('Swiped right');
            }
        }
    }
});
