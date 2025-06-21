document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.main-nav a');
    const contentSections = document.querySelectorAll('.content-section');
    const sectionTitleElement = document.querySelector('.active-section-title');
    const contactBtn = document.querySelector('.contact-btn');
    const contactContainer = document.querySelector('.contact-details-container');

    // Handle navigation and content switching
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Set active link
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            // Update section title
            const newTitle = link.dataset.title;
            if (sectionTitleElement) sectionTitleElement.textContent = newTitle;

            // Show target section, hide others
            const targetId = link.getAttribute('href').substring(1);
            contentSections.forEach(section => {
                section.classList.toggle('hidden', section.id !== targetId);
            });
        });
    });

    // Toggle contact details visibility
    if (contactBtn && contactContainer) {
        contactBtn.addEventListener('click', () => {
            contactContainer.classList.toggle('visible');
            contactBtn.textContent = contactContainer.classList.contains('visible') 
                ? 'Hide Contacts' 
                : 'Show Contacts';
        });
    }

    // Initialize Swiper if element exists
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
});
