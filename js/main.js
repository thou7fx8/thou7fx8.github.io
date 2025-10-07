// Smooth Page Transitions on Scroll
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.classList.add('page-section');
    });
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 10, 26, 0.95)';
    } else {
        navbar.style.background = 'rgba(26, 10, 26, 0.9)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .screenshot-item, .stat-item, .faq-item'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
});

// Add loading class animation trigger
const loadObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => {
        loadObserver.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                const suffix = text.replace(/[\d,]/g, '');
                
                let current = 0;
                const increment = number / 60; // 60 frames for 1 second at 60fps
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = number.toLocaleString() + suffix;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current).toLocaleString() + suffix;
                    }
                }, 16); // ~60fps
                
                statsObserver.unobserve(target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Initialize stats animation
document.addEventListener('DOMContentLoaded', animateStats);

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.btn, .feature-card, .screenshot-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform + ' scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.02)', '');
        });
    });
});

// Preload images for better performance
document.addEventListener('DOMContentLoaded', function() {
    const images = [
        'assets/screenshots/main-menu.webp',
        'assets/screenshots/clickgui.webp',
        'assets/screenshots/hud.webp',
        'assets/screenshots/xray.webp'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Add loading indicator
function showLoadingIndicator() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);
    
    window.addEventListener('load', function() {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    });
}

// Add CSS for loader
const loaderCSS = `
.loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0a0a0a;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    transition: opacity 0.3s ease;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(0, 180, 216, 0.3);
    border-top: 3px solid #00b4d8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

// Add loader CSS to document
const style = document.createElement('style');
style.textContent = loaderCSS;
document.head.appendChild(style);

// Initialize loading indicator
showLoadingIndicator();

// Add keyboard navigation support
document.addEventListener('DOMContentLoaded', function() {
    // FAQ keyboard navigation
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add tabindex for keyboard navigation
    faqQuestions.forEach(question => {
        question.setAttribute('tabindex', '0');
    });
});

// Add error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Add search functionality (for future enhancement)
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            // Future: Implement search functionality
            console.log('Search query:', query);
        });
    }
}

// Call search initialization
document.addEventListener('DOMContentLoaded', initializeSearch);

// Add theme toggle functionality (for future enhancement)
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }
}

// Call theme initialization
document.addEventListener('DOMContentLoaded', initializeThemeToggle);

// Discord Reviews Integration
class DiscordReviews {
    constructor() {
        this.serverId = '1424944847604678668';
        this.channelId = '1424944848187953174';
        this.reviews = [];
        this.apiUrl = 'http://localhost:3000/api/reviews';
        this.currentOffset = 0;
        this.hasMore = true;
        this.isLoading = false;
    }

    async fetchReviews(loadMore = false) {
        if (this.isLoading) return;
        
        try {
            this.isLoading = true;
            this.showLoadingState(loadMore);
            
            const offset = loadMore ? this.currentOffset : 0;
            const limit = loadMore ? 12 : 6; // Load 6 initially, then 12 more
            
            const response = await fetch(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Fetched reviews from Discord:', data);
            
            // Handle both old and new API response formats
            const reviews = data.reviews || data; // Support both formats
            const hasMore = data.hasMore !== undefined ? data.hasMore : false;
            
            if (loadMore) {
                this.reviews = [...this.reviews, ...reviews];
            } else {
                this.reviews = reviews;
                this.currentOffset = 0;
            }
            
            this.currentOffset += reviews.length;
            this.hasMore = hasMore;
            
            console.log(`Updated state - currentOffset: ${this.currentOffset}, hasMore: ${this.hasMore}, total reviews: ${this.reviews.length}`);
            
            this.displayReviews();
        } catch (error) {
            console.error('Failed to fetch reviews from Discord:', error);
            console.error('Error details:', error.message);
            
            // More specific error messages
            if (error.message.includes('fetch')) {
                this.showError('Cannot connect to server. Make sure the backend server is running on port 3000.');
            } else if (error.message.includes('HTTP error')) {
                this.showError(`Server error: ${error.message}. Check the server console for details.`);
            } else {
                this.showError('Failed to load reviews from Discord. Make sure the backend server is running on port 3000.');
            }
        } finally {
            this.isLoading = false;
            // Ensure button is updated after loading completes
            setTimeout(() => this.updateViewMoreButton(), 100);
        }
    }

    displayReviews() {
        const reviewsGrid = document.getElementById('reviews-grid');
        
        if (!this.reviews.length) {
            reviewsGrid.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to review!</p>';
            return;
        }

        const reviewsHTML = this.reviews.map(review => {
            const date = new Date(review.timestamp);
            const timeAgo = this.getTimeAgo(date);
            const initials = review.author.username.substring(0, 2).toUpperCase();
            const rating = review.rating !== undefined ? review.rating : 5; // Default to 5 if no rating
            
            // Generate stars based on rating (0-5 stars)
            const stars = '★'.repeat(Math.max(0, rating)) + '☆'.repeat(Math.max(0, 5 - rating));
            
            // Use avatar if available, otherwise use initials
            const avatar = review.author.avatar ? 
                `<img src="${review.author.avatar}" alt="${review.author.username}" class="avatar-img">` :
                `<div class="avatar-initials">${initials}</div>`;
            
            return `
                <div class="review-card" data-rating="${rating}">
                    <div class="review-header">
                        <div class="review-avatar">${avatar}</div>
                        <div class="review-info">
                            <h4>${this.escapeHtml(review.author.username)}</h4>
                            <div class="review-date">${timeAgo}</div>
                        </div>
                    </div>
                    <div class="review-content">
                        ${this.escapeHtml(review.content)}
                    </div>
                    <div class="review-rating">
                        <span class="stars">${stars}</span>
                        <span class="rating-text">${rating}/5</span>
                    </div>
                </div>
            `;
        }).join('');

        reviewsGrid.innerHTML = reviewsHTML;
        
        // Add or update View More button
        this.updateViewMoreButton();
    }

    updateViewMoreButton() {
        let viewMoreContainer = document.getElementById('view-more-container');
        
        if (!viewMoreContainer) {
            viewMoreContainer = document.createElement('div');
            viewMoreContainer.id = 'view-more-container';
            viewMoreContainer.className = 'view-more-container';
            document.getElementById('reviews-grid').parentNode.appendChild(viewMoreContainer);
        }
        
        console.log(`Updating View More button - hasMore: ${this.hasMore}, isLoading: ${this.isLoading}, reviews: ${this.reviews.length}`);
        
        if (this.hasMore && !this.isLoading) {
            viewMoreContainer.innerHTML = `
                <button class="btn view-more-btn" onclick="discordReviews.loadMoreReviews()">
                    Show More Reviews
                </button>
            `;
        } else if (this.isLoading) {
            viewMoreContainer.innerHTML = `
                <div class="loading-more">
                    <div class="loading-spinner"></div>
                    <p>Loading more reviews...</p>
                </div>
            `;
        } else if (!this.hasMore && this.reviews.length > 6) {
            viewMoreContainer.innerHTML = `
                <p style="color: #cccccc; text-align: center; margin-top: 2rem;">
                    All reviews loaded (${this.reviews.length} total)
                </p>
            `;
        } else {
            viewMoreContainer.innerHTML = '';
        }
    }
    
    showLoadingState(isLoadingMore = false) {
        if (!isLoadingMore) {
            // Initial loading - show loading in reviews grid
            const reviewsGrid = document.getElementById('reviews-grid');
            reviewsGrid.innerHTML = `
                <div class="review-loading">
                    <div class="loading-spinner"></div>
                    <p>Loading reviews...</p>
                </div>
            `;
        } else {
            // Loading more - update the View More button
            this.updateViewMoreButton();
        }
    }
    
    async loadMoreReviews() {
        console.log('Load More Reviews button clicked');
        
        if (this.isLoading) {
            console.log('Already loading, ignoring click');
            return;
        }
        
        await this.fetchReviews(true);
    }

    showError(message = 'Unable to load reviews at the moment. Please try again later.') {
        const reviewsGrid = document.getElementById('reviews-grid');
        reviewsGrid.innerHTML = `
            <div class="review-error">
                <p>${message}</p>
            </div>
        `;
        
        // Hide View More button on error
        const viewMoreContainer = document.getElementById('view-more-container');
        if (viewMoreContainer) {
            viewMoreContainer.innerHTML = '';
        }
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        
        return date.toLocaleDateString();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize Discord Reviews - make it global for View More button
let discordReviews;

// Test that JavaScript is loading
console.log('main.js file loaded successfully!');

// Dynamic button colors based on scroll position
function updateButtonColorsOnScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollPercentage = Math.min(scrollPosition / documentHeight, 1);
    
    // Remove all scroll classes
    document.body.classList.remove('scroll-25', 'scroll-50', 'scroll-75', 'scroll-100');
    
    // Add appropriate class based on scroll percentage
    if (scrollPercentage >= 0.8) {
        document.body.classList.add('scroll-100');
    } else if (scrollPercentage >= 0.6) {
        document.body.classList.add('scroll-75');
    } else if (scrollPercentage >= 0.4) {
        document.body.classList.add('scroll-50');
    } else if (scrollPercentage >= 0.2) {
        document.body.classList.add('scroll-25');
    }
}

// Listen for scroll events
window.addEventListener('scroll', updateButtonColorsOnScroll);

// Initialize on page load
document.addEventListener('DOMContentLoaded', updateButtonColorsOnScroll);

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Starting Discord Reviews...');
    
    try {
        discordReviews = new DiscordReviews();
        console.log('DiscordReviews class instantiated successfully');
        
        // Test API connection first
        console.log('Testing API connection...');
        fetch('http://localhost:3000/health')
            .then(response => {
                console.log('Health check response:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Health check data:', data);
                
                // Load reviews immediately on page load
                console.log('Page loaded, fetching reviews immediately...');
                discordReviews.fetchReviews();
            })
            .catch(error => {
                console.error('API connection test failed:', error);
                document.getElementById('reviews-grid').innerHTML = `
                    <div class="review-error">
                        <p>Cannot connect to Discord reviews server. Make sure it's running on port 3000.</p>
                        <p>Error: ${error.message}</p>
                    </div>
                `;
            });
    } catch (error) {
        console.error('Error initializing Discord Reviews:', error);
    }
    
    // Also set up intersection observer as backup
    const reviewsSection = document.querySelector('.reviews');
    if (reviewsSection) {
        const reviewsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && discordReviews.reviews.length === 0) {
                    console.log('Reviews section visible, loading reviews...');
                    discordReviews.fetchReviews();
                    reviewsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        reviewsObserver.observe(reviewsSection);
    } else {
        console.error('Reviews section not found!');
    }
});