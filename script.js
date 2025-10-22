// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Theme Mode Functions
const themeMainBtn = document.getElementById('themeMainBtn');
const themeDropdown = document.getElementById('themeDropdown');
const themeOptions = document.querySelectorAll('.theme-option');
const currentThemeIcon = document.getElementById('currentThemeIcon');

// Theme icons mapping
const themeIcons = {
    'dark': '🌙',
    'light': '☀️',
    'device': '💻'
};

// Toggle theme dropdown
if (themeMainBtn && themeDropdown) {
    themeMainBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeMainBtn.contains(e.target) && !themeDropdown.contains(e.target)) {
            themeDropdown.classList.remove('active');
        }
    });
}

// Check for saved theme preference or default to device preference
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    
    // Check device preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light';
}

// Apply theme
function applyTheme(theme) {
    const body = document.body;
    
    // Remove all theme classes
    body.classList.remove('dark-mode', 'light-mode');
    
    // Apply selected theme
    if (theme === 'dark') {
        body.classList.add('dark-mode');
    } else if (theme === 'light') {
        body.classList.add('light-mode');
    }
    
    // Update active button and icon
    updateActiveThemeButton(theme);
    updateCurrentThemeIcon(theme);
    
    // Save preference
    localStorage.setItem('theme', theme);
    
    // Close dropdown
    if (themeDropdown) {
        themeDropdown.classList.remove('active');
    }
}

// Update active button state
function updateActiveThemeButton(theme) {
    themeOptions.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        }
    });
}

// Update current theme icon
function updateCurrentThemeIcon(theme) {
    if (currentThemeIcon) {
        currentThemeIcon.textContent = themeIcons[theme] || themeIcons['device'];
    }
}

// Theme option click handlers
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.dataset.theme;
        
        if (theme === 'device') {
            const deviceTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            applyTheme(deviceTheme);
            localStorage.setItem('theme', 'device');
            updateActiveThemeButton('device');
            updateCurrentThemeIcon('device');
        } else {
            applyTheme(theme);
        }
    });
});

// Listen for system theme changes when in device mode
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'device' || !savedTheme) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'device' || !savedTheme) {
        const deviceTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        applyTheme(deviceTheme);
        updateActiveThemeButton('device');
    } else {
        applyTheme(savedTheme);
    }
});

// Language Toggle
const langToggle = document.getElementById('langToggle');
let currentLang = 'ar';

if (langToggle) {
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        langToggle.textContent = currentLang === 'ar' ? 'EN' : 'AR';
        document.documentElement.setAttribute('lang', currentLang);
        document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    });
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Hero Slider
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const dotsContainer = document.getElementById('sliderDots');
let currentSlide = 0;
let slideInterval;

function createDots() {
    if (!dotsContainer) return;
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function updateSlider() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentSlide) {
            dot.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

if (slides.length > 0) {
    createDots();
    startSlideShow();
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        });
    }
}

// Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');
        
        // Close all accordion items
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// Testimonials Slider
const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');
let currentTestimonial = 0;
let testimonialInterval;

function updateTestimonials() {
    testimonialItems.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentTestimonial) {
            item.classList.add('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
    updateTestimonials();
}

function prevTestimonialFunc() {
    currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
    updateTestimonials();
}

function startTestimonialShow() {
    testimonialInterval = setInterval(nextTestimonial, 6000);
}

function stopTestimonialShow() {
    clearInterval(testimonialInterval);
}

if (testimonialItems.length > 0) {
    startTestimonialShow();
    
    if (testimonialPrev) {
        testimonialPrev.addEventListener('click', () => {
            prevTestimonialFunc();
            stopTestimonialShow();
            startTestimonialShow();
        });
    }
    
    if (testimonialNext) {
        testimonialNext.addEventListener('click', () => {
            nextTestimonial();
            stopTestimonialShow();
            startTestimonialShow();
        });
    }
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert('شكراً لاشتراكك! سنرسل لك آخر العروض على: ' + email);
        newsletterForm.reset();
    });
}

// Scroll Animations (AOS-like)
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Header Scroll Effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav) {
                    nav.classList.remove('active');
                }
            }
        }
    });
});

// Product Filter (for products page)
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            }, 100);
        } else {
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });
}

// Price Range Filter
function filterByPrice(minPrice, maxPrice) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const priceText = product.querySelector('.product-price').textContent;
        const price = parseInt(priceText.replace(/[^\d]/g, ''));
        
        if (price >= minPrice && price <= maxPrice) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Sort Products
function sortProducts(sortBy) {
    const productsContainer = document.querySelector('.products-grid');
    if (!productsContainer) return;
    
    const products = Array.from(productsContainer.querySelectorAll('.product-card'));
    
    products.sort((a, b) => {
        if (sortBy === 'price-low') {
            const priceA = parseInt(a.querySelector('.product-price').textContent.replace(/[^\d]/g, ''));
            const priceB = parseInt(b.querySelector('.product-price').textContent.replace(/[^\d]/g, ''));
            return priceA - priceB;
        } else if (sortBy === 'price-high') {
            const priceA = parseInt(a.querySelector('.product-price').textContent.replace(/[^\d]/g, ''));
            const priceB = parseInt(b.querySelector('.product-price').textContent.replace(/[^\d]/g, ''));
            return priceB - priceA;
        } else if (sortBy === 'name') {
            const nameA = a.querySelector('.product-name').textContent;
            const nameB = b.querySelector('.product-name').textContent;
            return nameA.localeCompare(nameB);
        }
        return 0;
    });
    
    products.forEach(product => productsContainer.appendChild(product));
}

// Product Image Gallery (for product details page)
function changeProductImage(imageSrc) {
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.style.backgroundImage = `url('${imageSrc}')`;
            mainImage.style.opacity = '1';
        }, 300);
    }
}

// Quantity Controls
const quantityMinus = document.querySelector('.quantity-minus');
const quantityPlus = document.querySelector('.quantity-plus');
const quantityInput = document.querySelector('.quantity-input');

if (quantityMinus && quantityPlus && quantityInput) {
    quantityMinus.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    quantityPlus.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });
}

// Add to Cart Animation
function addToCart(productName) {
    // Create notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #D4AF37, #B8960F);
        color: #000;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(212, 175, 55, 0.5);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.5s ease;
    `;
    notification.textContent = `تمت إضافة ${productName} إلى السلة`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;
        
        if (name && email && message) {
            alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت.');
            contactForm.reset();
        } else {
            alert('الرجاء ملء جميع الحقول المطلوبة.');
        }
    });
}

// Login/Register Form Toggle
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

if (showRegister && loginForm && registerForm) {
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });
}

if (showLogin && loginForm && registerForm) {
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
}

// Form Submissions
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('تم تسجيل الدخول بنجاح!');
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = registerForm.querySelector('input[name="password"]').value;
        const confirmPassword = registerForm.querySelector('input[name="confirm-password"]').value;
        
        if (password !== confirmPassword) {
            alert('كلمات المرور غير متطابقة!');
            return;
        }
        
        alert('تم إنشاء الحساب بنجاح!');
    });
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSlider = document.querySelector('.hero-slider');
    
    if (heroSlider) {
        heroSlider.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Product Quick View (Modal)
function showQuickView(productId) {
    // This would typically fetch product data and show in a modal
    console.log('Quick view for product:', productId);
}

// Wishlist Toggle
function toggleWishlist(productId) {
    const wishlistBtn = event.target;
    wishlistBtn.classList.toggle('active');
    
    if (wishlistBtn.classList.contains('active')) {
        wishlistBtn.textContent = '❤️';
        showNotification('تمت الإضافة إلى المفضلة');
    } else {
        wishlistBtn.textContent = '🤍';
        showNotification('تمت الإزالة من المفضلة');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #000;
        color: #fff;
        padding: 15px 30px;
        border-radius: 50px;
        z-index: 10000;
        animation: fadeInUp 0.5s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            transform: translate(-50%, 20px);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
