// DOM Elements
const navbar = document.getElementById('navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const scrollToTopBtn = document.getElementById('scrollToTop');
const reservationForm = document.getElementById('reservationForm');
const reservationModal = document.getElementById('reservationModal');
const closeModalBtn = document.querySelector('.close-modal');
const closeBtn = document.querySelector('.close-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');
const prevReviewBtn = document.querySelector('.prev-review');
const nextReviewBtn = document.querySelector('.next-review');
const reviewsSlider = document.querySelector('.reviews-slider');
const reviewCards = document.querySelectorAll('.review-card');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }

    // Animate elements on scroll
    animateOnScroll();
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Animate elements on scroll
function animateOnScroll() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('show');
        }
    });
}

// Initialize animations on page load
window.addEventListener('load', () => {
    animateOnScroll();
});

// Menu filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        menuItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Reviews slider
let currentSlide = 0;
const slidesToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
const slideWidth = 100 / slidesToShow;

function updateSlider() {
    const translateValue = -currentSlide * slideWidth;
    reviewsSlider.style.transform = `translateX(${translateValue}%)`;
}

nextReviewBtn.addEventListener('click', () => {
    if (currentSlide < reviewCards.length - slidesToShow) {
        currentSlide++;
        updateSlider();
    }
});

prevReviewBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
    }
});

// Update slider on window resize
window.addEventListener('resize', () => {
    const newSlidesToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    if (newSlidesToShow !== slidesToShow) {
        currentSlide = 0;
        updateSlider();
    }
});

// Reservation form submission
reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Form validation
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;
    
    if (!name || !phone || !date || !time || !guests) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Show success modal
    reservationModal.classList.add('show');
    
    // Reset form
    reservationForm.reset();
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    reservationModal.classList.remove('show');
});

closeBtn.addEventListener('click', () => {
    reservationModal.classList.remove('show');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === reservationModal) {
        reservationModal.classList.remove('show');
    }
});

// Set minimum date for reservation to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set active filter button
    filterBtns[0].classList.add('active');
    
    // Initialize reviews slider
    updateSlider();
});
