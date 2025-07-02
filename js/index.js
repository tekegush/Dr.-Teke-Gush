
        // Global variables
        let isScrolling = false;
        let currentTheme = 'light';
        let publicationsExpanded = false;

        // DOM elements
        const navbar = document.getElementById('navbar');
        const themeToggle = document.getElementById('theme-toggle');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navLinks = document.getElementById('nav-links');
        const typingText = document.querySelector('.typing-text');
        const profileImage = document.getElementById('profile-image');
        const imagePlaceholder = document.getElementById('image-placeholder');
        const loadMoreBtn = document.getElementById('load-more-btn');

        // Typing animation
        const typingPhrases = [
            "Power Systems Engineer",
            "PhD in Electrical Engineering", 
            "Smart Grid Specialist",
            "Renewable Energy Expert",
            "Research Innovator",
            "AI Applications Developer",
            "Patent Holder",
            "Guest Editor"
        ];

        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeText() {
            if (!typingText) return;
            
            const currentPhrase = typingPhrases[currentPhraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % typingPhrases.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeText, typingSpeed);
        }

        // Publications toggle
        function togglePublications() {
            const hiddenPublications = document.querySelectorAll('.publications-hidden');
            
            if (!publicationsExpanded) {
                hiddenPublications.forEach((pub, index) => {
                    setTimeout(() => {
                        pub.classList.remove('publications-hidden');
                        pub.classList.add('publications-visible');
                    }, index * 100);
                });
                loadMoreBtn.innerHTML = '<i class="fas fa-minus"></i> Show Less Publications';
                publicationsExpanded = true;
            } else {
                hiddenPublications.forEach(pub => {
                    pub.classList.add('publications-hidden');
                    pub.classList.remove('publications-visible');
                });
                loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Show More Publications';
                publicationsExpanded = false;
                
                // Scroll to publications section
                document.getElementById('publications').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        // Scroll handler
        function handleScroll() {
            if (!isScrolling) {
                requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    // Update navbar
                    if (navbar) {
                        if (scrollTop > 100) {
                            navbar.classList.add('scrolled');
                        } else {
                            navbar.classList.remove('scrolled');
                        }
                    }
                    
                    // Update scroll progress
                    updateScrollProgress();
                    
                    // Trigger animations
                    checkElementsInView();
                    
                    isScrolling = false;
                });
            }
            isScrolling = true;
        }

        // Theme toggle
        function toggleTheme() {
            const body = document.body;
            const icon = themeToggle?.querySelector('i');
            
            if (!icon) return;
            
            if (currentTheme === 'light') {
                body.setAttribute('data-theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                currentTheme = 'dark';
                localStorage.setItem('theme', 'dark');
            } else {
                body.removeAttribute('data-theme');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                currentTheme = 'light';
                localStorage.setItem('theme', 'light');
            }
        }

        // Mobile menu toggle
        function toggleMobileMenu() {
            if (!mobileMenuToggle || !navLinks) return;
            
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }

        // Smooth scrolling
        function smoothScrollToSection(targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }

        // Scroll progress
        function updateScrollProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
            
            const progressBar = document.querySelector('.scroll-progress');
            if (progressBar) {
                progressBar.style.width = scrollPercent + '%';
            }
        }

        // Intersection Observer for animations
        function checkElementsInView() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible && !element.classList.contains('visible')) {
                    element.classList.add('visible');
                }
            });
        }

        // Counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }

        // Profile image handler
        function handleProfileImage() {
            // Function to handle profile image upload/display
            // You can call this function when you have an image URL
            function setProfileImage(imageUrl) {
                if (profileImage && imagePlaceholder) {
                    profileImage.src = imageUrl;
                    profileImage.style.display = 'block';
                    imagePlaceholder.style.display = 'none';
                    
                    profileImage.onerror = function() {
                        profileImage.style.display = 'none';
                        imagePlaceholder.style.display = 'flex';
                    };
                }
            }
            
            // Example: Uncomment and provide image URL when available
            // setProfileImage('path/to/your/image.jpg');
        }

        // Initialize theme from storage
        function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            const body = document.body;
            const icon = themeToggle?.querySelector('i');
            
            if (!icon) return;
            
            if (savedTheme === 'dark') {
                body.setAttribute('data-theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                currentTheme = 'dark';
            } else {
                body.removeAttribute('data-theme');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                currentTheme = 'light';
            }
        }

        // Add pulse animation to special elements
        function addSpecialAnimations() {
            // Add pulse animation to award cards on hover
            const awardCards = document.querySelectorAll('.award-card');
            awardCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    const icon = card.querySelector('.award-icon');
                    if (icon) icon.classList.add('pulse-animation');
                });
                
                card.addEventListener('mouseleave', () => {
                    const icon = card.querySelector('.award-icon');
                    if (icon) icon.classList.remove('pulse-animation');
                });
            });
            
            // Add special effects to patent and editorial cards
            const specialCards = document.querySelectorAll('.patent-card, .editorial-card');
            specialCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(-5px) scale(1)';
                });
            });
        }

        // Event listeners
        function initEventListeners() {
            // Scroll events
            window.addEventListener('scroll', handleScroll);
            
            // Theme toggle
            if (themeToggle) {
                themeToggle.addEventListener('click', toggleTheme);
            }
            
            // Mobile menu toggle
            if (mobileMenuToggle) {
                mobileMenuToggle.addEventListener('click', toggleMobileMenu);
            }
            
            // Publications toggle
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', togglePublications);
            }
            
            // Navigation links
            document.addEventListener('click', (e) => {
                if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                    e.preventDefault();
                    const targetId = e.target.getAttribute('href').substring(1);
                    smoothScrollToSection(targetId);
                    
                    // Close mobile menu if open
                    if (navLinks?.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                }
            });

            // CV download handler
            const downloadCvBtn = document.getElementById('download-cv');
            if (downloadCvBtn) {
                downloadCvBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Create a download link for the CV
                    const link = document.createElement('a');
                    link.href = 'data:text/plain;charset=utf-8,Dr. Teke Gush CV - Please contact tekegush@gmail.com for the latest version';
                    link.download = 'CV_Teke_Gush_2025.txt';
                    link.click();
                    
                    // Show a message
                    alert('CV download initiated. For the latest PDF version, please contact tekegush@gmail.com');
                });
            }
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navLinks?.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
            
            // Resize handler
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && navLinks?.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        }

        // Initialize everything
        function init() {
            console.log('Initializing Dr. Teke Gush Portfolio...');
            
            initTheme();
            initEventListeners();
            handleProfileImage();
            addSpecialAnimations();
            
            // Start animations with delay
            setTimeout(() => {
                typeText();
                
                // Trigger initial fade-in animations
                const heroElements = document.querySelectorAll('.hero .fade-in');
                heroElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, index * 200);
                });
                
                // Animate counters when they come into view
                const statsSection = document.getElementById('about');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateCounters();
                            observer.unobserve(entry.target);
                        }
                    });
                });
                
                if (statsSection) {
                    observer.observe(statsSection);
                }
                
            }, 500);
            
            console.log('Portfolio initialization complete!');
        }

        // Start when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        // Additional initialization after window load
        window.addEventListener('load', () => {
            checkElementsInView();
            updateScrollProgress();
        });
// Enhance mobile menu toggle functionality
    document.addEventListener('DOMContentLoaded', () => {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navLinks = document.getElementById('nav-links');

        if (mobileMenuToggle && navLinks) {
            mobileMenuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
            });
        }
    });