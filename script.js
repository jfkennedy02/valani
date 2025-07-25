// Constants
const CONTRACT_ADDRESS = "Cgvri61b9sDwKNUjhgeo7LumS43tRZqCwVf9kfYs6zzD";
const SLOGANS = [
    'HODL. BUY. REPEAT.',
    'DIAMOND HANDS ONLY.',
    'TO THE MOON! 🚀',
    'BUY. HOLD. WIN.'
];

// Global variables
let currentSloganIndex = 0;
let contractRevealing = false;
let toastTimeout = null;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeMobileNav();
    initializeSloganRotation();
    initializeContractReveal();
    initializeLucideIcons();
    initializeIntersectionObserver();
});

// Particle System
function initializeParticles() {
    const particlesContainer = document.getElementById('floating-particles');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (8 + Math.random() * 4) + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 12000);
    }
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createParticle(), i * 500);
    }
    
    // Continue creating particles
    setInterval(createParticle, 800);
}

// Mobile Navigation
function initializeMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Slogan Rotation
function initializeSloganRotation() {
    const sloganElement = document.getElementById('animated-slogan');
    
    function updateSlogan() {
        sloganElement.textContent = SLOGANS[currentSloganIndex];
        currentSloganIndex = (currentSloganIndex + 1) % SLOGANS.length;
    }
    
    // Set initial slogan
    updateSlogan();
    
    // Rotate every 3 seconds
    setInterval(updateSlogan, 3000);
}

// Contract Address Revealing Animation
function initializeContractReveal() {
    const contractAddress = document.getElementById('contract-address');
    const contractTitle = contractAddress.querySelector('.contract-title');
    const contractContent = contractAddress.querySelector('.contract-content');
    const contractLabel = contractAddress.querySelector('.contract-label');
    const contractText = contractAddress.querySelector('.contract-text');
    const copyButton = contractAddress.querySelector('.copy-button');
    
    function revealContract() {
        contractRevealing = true;
        
        // Main container reveal
        contractAddress.classList.add('revealing');
        
        // Staggered reveals
        setTimeout(() => contractTitle.classList.add('revealing'), 100);
        setTimeout(() => contractContent.classList.add('revealing'), 300);
        setTimeout(() => contractLabel.classList.add('revealing'), 500);
        setTimeout(() => contractText.classList.add('revealing'), 700);
        setTimeout(() => copyButton.classList.add('revealing'), 1000);
        
        // Hide after 5 seconds
        setTimeout(() => {
            contractAddress.classList.remove('revealing');
            contractTitle.classList.remove('revealing');
            contractContent.classList.remove('revealing');
            contractLabel.classList.remove('revealing');
            contractText.classList.remove('revealing');
            copyButton.classList.remove('revealing');
            contractRevealing = false;
        }, 5000);
    }
    
    // Initial reveal
    setTimeout(revealContract, 1000);
    
    // Repeat every 9 seconds
    setInterval(revealContract, 9000);
}

// Initialize Lucide Icons
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Intersection Observer for animations
function initializeIntersectionObserver() {
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
    
    // Observe sections for fade-in effect
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Utility Functions
function openLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for mobile nav
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function copyContract() {
    const copyButton = document.querySelector('.copy-button');
    const buttonIcon = copyButton.querySelector('i');
    const buttonText = copyButton.querySelector('span');
    
    // Copy to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(CONTRACT_ADDRESS).then(() => {
            showCopySuccess(copyButton, buttonIcon, buttonText);
        }).catch(() => {
            fallbackCopy(CONTRACT_ADDRESS);
            showCopySuccess(copyButton, buttonIcon, buttonText);
        });
    } else {
        fallbackCopy(CONTRACT_ADDRESS);
        showCopySuccess(copyButton, buttonIcon, buttonText);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess(button, icon, text) {
    // Update button appearance
    button.classList.add('copied');
    
    // Change icon and text
    if (icon) {
        icon.setAttribute('data-lucide', 'check');
    }
    if (text) {
        text.textContent = 'Copied';
    }
    
    // Reinitialize lucide icons to show the new icon
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Show toast
    showToast('Contract address copied to clipboard!', 'success');
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.classList.remove('copied');
        if (icon) {
            icon.setAttribute('data-lucide', 'copy');
        }
        if (text) {
            text.textContent = 'Copy';
        }
        // Reinitialize lucide icons again
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 2000);
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    // Clear any existing timeout
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }
    
    // Set message and type
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 3 seconds
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function showComingSoon() {
    showToast('Raydium integration coming soon!', 'info');
}

// Animate stats counters when they come into view
function animateStats() {
    const stats = [
        { id: 'holders-count', target: 2547 },
        { id: 'telegram-members', target: 8432 },
        { id: 'twitter-followers', target: 12856 }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            animateCounter(element, stat.target);
        }
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 20);
}

// Initialize counter animation when community section is visible
const communityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            communityObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe community section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const communitySection = document.getElementById('community');
    if (communitySection) {
        communityObserver.observe(communitySection);
    }
});

// Smooth scroll for internal links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Add some responsive touch interactions for mobile
if ('ontouchstart' in window) {
    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('.btn, .cta-button, .copy-button, .join-btn');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Add touch feedback for buy buttons
    const buyButtons = document.querySelectorAll('.buy-button, .community-buy-button');
    
    buyButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Add loading state management
window.addEventListener('load', function() {
    // Remove any loading states
    document.body.classList.add('loaded');
    
    // Trigger any final animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 100);
});

// Handle window resize for mobile navigation
window.addEventListener('resize', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Close mobile menu on desktop resize
    if (window.innerWidth >= 768) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
let ticking = false;

function updateScrollEffects() {
    // Add any scroll-based effects here
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Error handling for external resources
window.addEventListener('error', function(e) {
    console.warn('Resource failed to load:', e.target.src || e.target.href);
    
    // Handle missing images gracefully
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load, hiding element');
    }
});

// Add fallback for clipboard API
if (!navigator.clipboard) {
    console.warn('Clipboard API not available, using fallback');
}

// Console welcome message
console.log(`
🚀 BUY Token Website
💎 Built with diamond hands
🌙 To the moon!

Contract: ${CONTRACT_ADDRESS}
`);

// Export functions for potential external use
window.BuyToken = {
    openLink,
    scrollToSection,
    copyContract,
    showToast,
    CONTRACT_ADDRESS
};