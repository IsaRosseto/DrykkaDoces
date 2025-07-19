document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if(mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.style.display === 'none' || mobileMenu.style.display === '';
            mobileMenu.style.display = isHidden ? 'block' : 'none';
        });

        // Close mobile menu when a link is clicked
        mobileMenu.addEventListener('click', (e) => {
            if(e.target.tagName === 'A'){
                mobileMenu.style.display = 'none';
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if(question && answer) {
            question.addEventListener('click', () => {
                const isOpen = question.classList.contains('open');
                
                // Close all other open answers
                faqItems.forEach(i => {
                    i.querySelector('.faq-question').classList.remove('open');
                    i.querySelector('.faq-answer').style.display = 'none';
                });
                
                // If it wasn't open, open it now
                if (!isOpen) {
                    question.classList.add('open');
                    answer.style.display = 'block';
                }
            });
        }
    });

    // Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Image Gallery Modal
// --- NEW Image Gallery Modal Logic ---
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
const closeModalButton = document.getElementById('modal-close');
const prevButton = document.getElementById('modal-prev');
const nextButton = document.getElementById('modal-next');

let currentGallery = [];
let currentIndex = 0;

function updateModalImage() {
    if (currentGallery.length > 0) {
        // Fade out
        modalImage.style.opacity = 0;
        
        setTimeout(() => {
            modalImage.src = currentGallery[currentIndex];
            // Fade in
            modalImage.style.opacity = 1;
        }, 150); // Match half of the transition duration
    }
    // Show/hide nav buttons
    if (currentGallery.length > 1) {
        prevButton.style.display = 'flex';
        nextButton.style.display = 'flex';
    } else {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
    }
}

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const imagesAttr = item.dataset.images;
        const caption = item.dataset.caption;

        if (imagesAttr) {
            currentGallery = JSON.parse(imagesAttr);
            currentIndex = 0;
            modalCaption.textContent = caption;
            updateModalImage();
            modal.style.display = 'flex';
        }
    });
});

function showNextImage() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateModalImage();
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateModalImage();
}

function closeModal() {
    modal.style.display = 'none';
    currentGallery = [];
    currentIndex = 0;
}

if (modal) {
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
    closeModalButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        // Close if clicking on the background overlay
        if (e.target === modal) {
            closeModal();
        }
    });
}
    
    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
