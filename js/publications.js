// Publication data array for dynamic content
const publications = [
    {
        title: "Robust Local Coordination Control of PV Smart Inverters with SVC and OLTC in Active Distribution Networks",
        authors: "Gush T, Kim CH",
        journal: "IEEE Transactions on Power Delivery (2024)",
        abstract: "This paper proposes a novel approach for coordinating PV smart inverters with Static VAR Compensators (SVC) and On-Load Tap Changers (OLTC) in active distribution networks, improving overall system performance and stability through robust local coordination control.",
        tags: ["Smart Inverters", "Power Delivery", "IEEE"]
    },
    {
        title: "Optimal Smart Inverter Control for PV and BESS to Improve PV Hosting Capacity of Distribution Networks Using Slime Mould Algorithm",
        authors: "Gush T, Kim CH, Admasie S, Kim JS, Song JS",
        journal: "IEEE Access (2021)",
        abstract: "This paper presents an innovative optimization approach using the Slime Mould Algorithm to control smart inverters for photovoltaic systems and battery energy storage systems, significantly enhancing the hosting capacity of distribution networks.",
        tags: ["Smart Inverters", "Optimization", "BESS"]
    },
    {
        title: "Intelligent Fault Classification and Location Identification Method for Microgrids",
        authors: "Gush T, Bukhari SB, Mehmood KK, Admasie S, Kim JS, Kim CH",
        journal: "Energies (2019)",
        abstract: "This research introduces an intelligent method for fault classification and location identification in microgrids using Discrete Orthonormal Stockwell Transform-Based Optimized Multi-Kernel Extreme Learning Machine, offering improved accuracy and performance.",
        tags: ["Microgrids", "Machine Learning", "Fault Detection"]
    },
    {
        title: "Fault detection and location in a microgrid using mathematical morphology and recursive least square methods",
        authors: "Gush T, Bukhari SB, Haider R, Admasie S, Oh YS, Cho GJ, Kim CH",
        journal: "International Journal of Electrical Power & Energy Systems (2018)",
        abstract: "This paper presents a novel approach for detecting and locating faults in microgrids by combining mathematical morphology and recursive least square methods, providing reliable protection for modern distributed energy systems.",
        tags: ["Microgrids", "Protection", "Fault Location"]
    },
    {
        title: "Maximum Hosting Capacity Assessment of Distribution Systems With Multitype DERs Using Analytical OPF Method",
        authors: "Hassan SJU, Gush T, Kim CH",
        journal: "IEEE Access (2022)",
        abstract: "This research presents an analytical optimal power flow method for assessing the maximum hosting capacity of distribution systems with multiple types of distributed energy resources, providing efficient solutions for grid planning.",
        tags: ["Hosting Capacity", "DER Integration", "Optimization"]
    },
    {
        title: "Intelligent Islanding Detection of Multi-distributed Generation Using Artificial Neural Network",
        authors: "Admasie S, Bukhari SB, Gush T, Haider R, Kim CH",
        journal: "Journal of Modern Power Systems and Clean Energy (2020)",
        abstract: "This paper proposes an intelligent islanding detection method for multi-distributed generation systems using artificial neural networks based on intrinsic mode function features, enhancing grid protection capabilities.",
        tags: ["Islanding Detection", "Neural Networks", "DG Systems"]
    }
];

// Publication Carousel functionality
function initPublicationCarousel() {
    const carousel = document.getElementById('publication-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (!carousel || !prevBtn || !nextBtn || indicators.length === 0) return;
    
    let currentIndex = 0;
    let slideWidth;
    
    function updateSlideWidth() {
        const firstSlide = carousel.querySelector('.publication-card');
        if (firstSlide) {
            slideWidth = firstSlide.offsetWidth + 30; // width + margin
        }
    }
    
    function moveToSlide(index) {
        updateSlideWidth();
        currentIndex = index;
        carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Initialize carousel
    updateSlideWidth();
    moveToSlide(0);
    
    // Button handlers
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? indicators.length - 1 : currentIndex - 1;
        moveToSlide(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === indicators.length - 1) ? 0 : currentIndex + 1;
        moveToSlide(currentIndex);
    });
    
    // Indicator handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            moveToSlide(index);
        });
    });
    
    // Auto-advance carousel
    setInterval(() => {
        currentIndex = (currentIndex === indicators.length - 1) ? 0 : currentIndex + 1;
        moveToSlide(currentIndex);
    }, 10000);
    
    // Resize handler
    window.addEventListener('resize', () => {
        moveToSlide(currentIndex);
    });
}

// Enhanced hover effects for publication cards
function initPublicationEffects() {
    const publicationCards = document.querySelectorAll('.publication-card');
    publicationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
}

// Initialize publication functionality
document.addEventListener('DOMContentLoaded', () => {
    initPublicationCarousel();
    initPublicationEffects();
});

// Export for use in other files
window.publicationsModule = {
    publications,
    initPublicationCarousel,
    initPublicationEffects
};