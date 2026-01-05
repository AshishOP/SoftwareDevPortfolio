// ==================================================
// ASHISH SHUKLA PORTFOLIO - MAIN JAVASCRIPT
// ==================================================
// This file handles all interactivity and animations
// Dynamic content is loaded from data.js
// Uses native JavaScript with Shery.js for visual effects
// No external animation libraries (GSAP removed)
// ==================================================

// ==================================================
// 0. LOAD PROJECTS FROM DATA.JS
// ==================================================
(function loadProjects() {
    const projectsContainer = document.querySelector('.projects-container');
    const dotsContainer = document.querySelector('.carousel-dots');
    if (!projectsContainer || !portfolioData || !portfolioData.projects) return;

    // Generate project cards
    portfolioData.projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        // Build stack tags HTML
        const stackHTML = project.stack.map(tech => `<span>${tech}</span>`).join('');

        // Build link HTML
        let linkHTML;
        if (project.comingSoon) {
            linkHTML = '<span class="project-link" style="opacity: 0.5; cursor: default;">Coming Soon</span>';
        } else if (project.link) {
            linkHTML = `<a href="${project.link}" target="_blank" class="project-link">View Project →</a>`;
        } else {
            linkHTML = '';
        }

        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.name}">
            </div>
            <div class="project-info">
                <span class="project-number">${project.number}</span>
                <h3 class="project-title">${project.name}</h3>
                <p class="project-role">${project.role}</p>
                <div class="project-stack">
                    ${stackHTML}
                </div>
                <p class="project-desc">${project.description}</p>
                ${linkHTML}
            </div>
        `;

        projectsContainer.appendChild(projectCard);

        // Generate corresponding dot
        if (dotsContainer) {
            const dot = document.createElement('span');
            dot.className = index === 0 ? 'carousel-dot active' : 'carousel-dot';
            dot.setAttribute('data-index', index);
            dotsContainer.appendChild(dot);
        }
    });

    console.log(`Loaded ${portfolioData.projects.length} projects from data.js`);
})();

// ==================================================
// 0.1 LOAD HERO SECTION FROM DATA.JS
// ==================================================
(function loadHero() {
    if (!portfolioData) return;
    
    // Update hero labels (roles)
    const heroLabel = document.querySelector('.hero-label');
    if (heroLabel && portfolioData.roles && portfolioData.roles.length >= 2) {
        heroLabel.innerHTML = `
            <span class="anim-text">${portfolioData.roles[0]}</span>
            <span class="dash">—</span>
            <span class="anim-text">${portfolioData.roles[1]}</span>
        `;
    }
    
    // Update CLI prompt username
    const cliPrompt = document.querySelector('.cli-prompt');
    if (cliPrompt && portfolioData.name) {
        const username = portfolioData.name.toLowerCase().split(' ')[0];
        cliPrompt.textContent = `${username}@portfolio:~$ run fact.exe --liquid`;
    }
    
    // Update page title
    if (portfolioData.name && portfolioData.roles && portfolioData.roles[0]) {
        document.title = `${portfolioData.name} | ${portfolioData.roles[0]}`;
    }
    
    // Update navbar logo
    const logo = document.querySelector('.logo');
    if (logo && portfolioData.name) {
        const firstName = portfolioData.name.split(' ')[0];
        logo.innerHTML = `${firstName}<span class="dot">.</span>`;
    }
    
    console.log('Loaded hero section from data.js');
})();

// ==================================================
// 0.2 LOAD ABOUT/PHILOSOPHY SECTION FROM DATA.JS
// ==================================================
(function loadAbout() {
    if (!portfolioData) return;
    
    // Update philosophy text
    const bigText = document.querySelector('.philosophy .big-text');
    if (bigText && portfolioData.bio) {
        bigText.innerHTML = portfolioData.bio;
    }
    
    console.log('Loaded about section from data.js');
})();

// ==================================================
// 0.3 LOAD SKILLS SECTION FROM DATA.JS
// ==================================================
(function loadSkills() {
    if (!portfolioData || !portfolioData.skillProgress) return;
    
    const skillsGrid = document.querySelector('.skills-section .skills-grid');
    if (!skillsGrid) return;
    
    skillsGrid.innerHTML = '';
    
    portfolioData.skillProgress.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        // Determine proficiency label based on percentage
        let proficiencyLabel = 'Beginner';
        if (skill.percentage >= 90) proficiencyLabel = 'Expert';
        else if (skill.percentage >= 80) proficiencyLabel = 'Daily Driver';
        else if (skill.percentage >= 70) proficiencyLabel = 'Proficient';
        else if (skill.percentage >= 50) proficiencyLabel = 'Intermediate';
        
        skillItem.innerHTML = `
            <span class="skill-name">${skill.name}</span>
            <div class="skill-level">
                <div class="skill-level-track">
                    <div class="level-bar" data-width="${skill.percentage}%"></div>
                </div>
                <span>${proficiencyLabel}</span>
            </div>
        `;
        
        skillsGrid.appendChild(skillItem);
    });
    
    console.log(`Loaded ${portfolioData.skillProgress.length} skills from data.js`);
})();

// ==================================================
// 0.4 LOAD EDUCATION SECTION FROM DATA.JS
// ==================================================
(function loadEducation() {
    if (!portfolioData || !portfolioData.education) return;
    
    const educationRight = document.querySelector('.education-right');
    if (!educationRight) return;
    
    educationRight.innerHTML = '';
    
    portfolioData.education.forEach(edu => {
        const eduCard = document.createElement('div');
        eduCard.className = 'education-card';
        
        let highlightsHTML = '';
        if (edu.highlights && edu.highlights.length > 0) {
            highlightsHTML = edu.highlights.map(highlight => `
                <div class="highlight-item">
                    <i class="fas fa-${highlight.icon || 'star'}"></i>
                    <div class="highlight-content">
                        <h4>${highlight.title}</h4>
                        <p>${highlight.description}</p>
                    </div>
                </div>
            `).join('');
        }
        
        eduCard.innerHTML = `
            <div class="education-header">
                <div class="education-degree">
                    <h3>${edu.degree}</h3>
                    <span class="education-institution">${edu.school}</span>
                </div>
                <span class="education-year">${edu.duration}</span>
            </div>
            ${highlightsHTML ? `<div class="education-highlights">${highlightsHTML}</div>` : ''}
        `;
        
        educationRight.appendChild(eduCard);
    });
    
    console.log(`Loaded ${portfolioData.education.length} education entries from data.js`);
})();

// ==================================================
// 0.5 LOAD FOOTER CONTENT FROM DATA.JS
// ==================================================
(function loadFooter() {
    if (!portfolioData) return;
    
    // Update copyright
    const copyright = document.querySelector('.footer-copyright');
    if (copyright && portfolioData.name) {
        const year = new Date().getFullYear();
        copyright.textContent = `© ${year} ${portfolioData.name}. All Rights Reserved.`;
    }
    
    console.log('Loaded footer from data.js');
})();

// ==================================================
// 1. SMOOTH SCROLL (DISABLED - Using native scroll for better compatibility)
// ==================================================
// Lenis was causing trackpad scrolling issues, so we're using native scroll.
// Native scroll works perfectly with modern CSS animations.
let lenis = null;
console.log("Using native scrolling (Lenis disabled for compatibility)");

// ==================================================
// 2. SHERY.JS EFFECTS (The "Elite" Visuals)
// ==================================================
// Only initialize if screen is wide enough (performance on mobile)
// Wrapped in try-catch because Shery.js requires WebGL and local server
if (window.innerWidth > 768 && typeof Shery !== 'undefined') {
    try {
        // A. The Custom Mouse Follower
        Shery.mouseFollower({
            skew: true,
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            duration: 1,
        });

        // B. Magnetic Buttons & Links
        Shery.makeMagnet(".magnet", {
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            duration: 1,
        });
    } catch (e) {
        console.warn("Shery.js basic effects failed:", e.message);
    }
}

// C. Liquid Distortion Effect for Hero Image
// Wrapped in window.onload to ensure image is fully loaded for WebGL texture
window.addEventListener('load', function () {
    console.log("Window loaded - checking Shery conditions...");
    console.log("Screen width:", window.innerWidth);
    console.log("Shery defined:", typeof Shery !== 'undefined');
    console.log("Protocol:", window.location.protocol);

    if (window.innerWidth > 768 && typeof Shery !== 'undefined' && window.location.protocol !== 'file:') {
        // Wait a bit for everything to settle
        setTimeout(() => {
            try {
                // Target the container that holds the image
                const container = document.querySelector(".hero-image-container");
                const img = document.querySelector(".hero-img");

                console.log("Container found:", !!container);
                console.log("Image found:", !!img);
                console.log("Image complete:", img?.complete);
                console.log("Image natural width:", img?.naturalWidth);

                if (container && img && img.complete && img.naturalWidth > 0) {
                    Shery.imageEffect(".hero-image-container", {
                        style: 5, // Style 5 is the "liquid" fluid look
                        config: {
                            "a": { "value": 2, "range": [0, 30] },
                            "b": { "value": 0.75, "range": [-1, 1] },
                            "zindex": { "value": 10, "range": [-9999999, 9999999] },
                            "aspect": { "value": 0.8 },
                            "ignoreShapeAspect": { "value": true },
                            "shapePosition": { "value": { "x": 0, "y": 0 } },
                            "shapeScale": { "value": { "x": 0.5, "y": 0.5 } },
                            "scrollType": { "value": 0 },
                            "geoVertex": { "range": [1, 64], "value": 1 },
                            "noEffectGooey": { "value": false },
                            "onMouse": { "value": 1 },
                            "noise_speed": { "value": 0.5, "range": [0, 10] },
                            "metaball": { "value": 0.4, "range": [0, 2] },
                            "discard_threshold": { "value": 0.5, "range": [0, 1] },
                            "antialias_threshold": { "value": 0.002, "range": [0, 0.1] },
                            "noise_height": { "value": 0.5, "range": [0, 2] },
                            "noise_scale": { "value": 10, "range": [0, 100] }
                        },
                        gooey: true // Enables the liquid effect
                    });
                    console.log("Liquid effect initialized successfully");
                    console.log("Canvas count after init:", document.querySelectorAll('canvas').length);
                } else {
                    console.warn("Image not ready for liquid effect");
                }
            } catch (e) {
                console.error("Shery.js liquid effect failed:", e);
            }
        }, 1000); // Increased timeout to 1 second
    } else {
        console.log("Liquid effect disabled - conditions not met");
    }
});


// ==================================================
// 3. NATIVE SCROLL ANIMATIONS (CSS-Based)
// ==================================================

// A. Simple visibility on load for hero text
setTimeout(() => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el, i) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, i * 150);
    });
    
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-label, .hero-image-container, .liquid-text-overlay, .scroll-down');
        heroElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 500);
}, 200);


// B. Horizontal Scroll (Desktop: gradual, Mobile: touch swipe)
const projectsContainer = document.querySelector(".projects-container");
const workSection = document.querySelector(".work-section");

// Check if we're on mobile (768px breakpoint matches CSS)
const isMobile = () => window.innerWidth <= 768;

if (projectsContainer && workSection) {
    const cards = projectsContainer.querySelectorAll('.project-card');
    const totalCards = cards.length;
    const dots = document.querySelectorAll('.carousel-dot');
    const scrollHelper = document.querySelector('.mobile-scroll-helper');
    let currentMobileIndex = 0;
    let hasSwipedMobile = false;

    // Touch swipe variables
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    let startTransform = 0;

    // Get card width including gap for mobile snap calculation
    const getCardWidth = () => {
        if (cards.length === 0) return 0;
        const cardRect = cards[0].getBoundingClientRect();
        return cardRect.width + 32; // 2rem gap = 32px
    };

    // Navigate to specific project index
    const goToProject = (index) => {
        currentMobileIndex = Math.max(0, Math.min(index, totalCards - 1));
        const cardWidth = getCardWidth();
        const translateX = currentMobileIndex * cardWidth;
        projectsContainer.style.transform = `translateX(${-translateX}px)`;
        projectsContainer.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentMobileIndex);
        });
        
        // Hide swipe helper after first swipe
        if (!hasSwipedMobile && scrollHelper) {
            hasSwipedMobile = true;
            scrollHelper.style.opacity = '0';
            scrollHelper.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                scrollHelper.style.display = 'none';
            }, 500);
        }
    };

    // Touch event handlers for mobile swipe on work section
    let touchStartY = 0;
    let isHorizontalSwipe = false;

    workSection.addEventListener('touchstart', (e) => {
        if (!isMobile()) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isDragging = false;
        isHorizontalSwipe = false;
        const currentTransform = projectsContainer.style.transform;
        const match = currentTransform.match(/translateX\((.+)px\)/);
        startTransform = match ? parseFloat(match[1]) : 0;
        projectsContainer.style.transition = 'none';
    }, { passive: false });

    workSection.addEventListener('touchmove', (e) => {
        if (!isMobile()) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = Math.abs(currentX - touchStartX);
        const diffY = Math.abs(currentY - touchStartY);
        
        // Determine swipe direction on first move
        if (!isDragging && (diffX > 10 || diffY > 10)) {
            isHorizontalSwipe = diffX > diffY;
            isDragging = true;
        }
        
        // If horizontal swipe, prevent default scroll and move projects
        if (isDragging && isHorizontalSwipe) {
            e.preventDefault();
            const diff = currentX - touchStartX;
            const cardWidth = getCardWidth();
            const maxTransform = -(totalCards - 1) * cardWidth;
            
            // Add resistance at boundaries
            let newTransform = startTransform + diff;
            if (newTransform > 0) {
                newTransform = newTransform * 0.3; // Resistance at start
            } else if (newTransform < maxTransform) {
                newTransform = maxTransform + (newTransform - maxTransform) * 0.3; // Resistance at end
            }
            
            projectsContainer.style.transform = `translateX(${newTransform}px)`;
        }
    }, { passive: false });

    workSection.addEventListener('touchend', (e) => {
        if (!isMobile() || !isDragging) return;
        
        if (isHorizontalSwipe) {
            isDragging = false;
            touchEndX = e.changedTouches[0].clientX;
            const swipeDistance = touchEndX - touchStartX;
            const threshold = 50; // Minimum swipe distance

            if (Math.abs(swipeDistance) > threshold) {
                if (swipeDistance > 0) {
                    // Swiped right - go to previous
                    goToProject(currentMobileIndex - 1);
                } else {
                    // Swiped left - go to next
                    goToProject(currentMobileIndex + 1);
                }
            } else {
                // Snap back to current position
                goToProject(currentMobileIndex);
            }
        }
        
        isDragging = false;
        isHorizontalSwipe = false;
    }, { passive: false });

    workSection.addEventListener('touchcancel', () => {
        if (!isMobile()) return;
        isDragging = false;
        isHorizontalSwipe = false;
        goToProject(currentMobileIndex);
    }, { passive: false });

    // Update the horizontal position based on scroll (desktop only)
    const updateHorizontalScroll = () => {
        const rect = workSection.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height - window.innerHeight;

        if (!isMobile()) {
            // DESKTOP: Gradual smooth scroll
            projectsContainer.style.transition = 'none';
            if (sectionTop <= 0 && sectionTop >= -sectionHeight) {
                const rawProgress = Math.abs(sectionTop) / sectionHeight;
                const progress = Math.min(rawProgress / 0.7, 1);
                const maxScroll = projectsContainer.scrollWidth - window.innerWidth + 100;
                projectsContainer.style.transform = `translateX(${-progress * maxScroll}px)`;
            } else if (sectionTop > 0) {
                projectsContainer.style.transform = `translateX(0px)`;
            } else {
                const maxScroll = projectsContainer.scrollWidth - window.innerWidth + 100;
                projectsContainer.style.transform = `translateX(${-maxScroll}px)`;
            }
        }
    };

    // Use requestAnimationFrame for smooth performance (desktop only)
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!isMobile() && !ticking) {
            window.requestAnimationFrame(() => {
                updateHorizontalScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial call
    updateHorizontalScroll();

    // Recalculate on resize
    window.addEventListener("resize", () => {
        updateHorizontalScroll();
        if (isMobile()) {
            goToProject(currentMobileIndex); // Reposition on resize
        }
    });

    // Allow clicking dots to navigate (mobile)
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            if (!isMobile()) return;
            const index = parseInt(dot.dataset.index, 10);
            goToProject(index);
        });
    });
}


// C. Skills Hover Interaction
// Change background color or show image on hover
const skillRows = document.querySelectorAll(".skill-row");
skillRows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
        row.style.transition = 'all 0.3s ease';
        row.style.paddingLeft = "30px";
        row.style.backgroundColor = "#1a1a1a";
    });
    row.addEventListener("mouseleave", () => {
        row.style.transition = 'all 0.3s ease';
        row.style.paddingLeft = "0px";
        row.style.backgroundColor = "transparent";
    });
});


// ==================================================
// 4. UTILITIES (Time, etc.)
// ==================================================
function updateTime() {
    const timeElement = document.getElementById("time");
    const now = new Date();
    // Format: 10:30 PM
    const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}
setInterval(updateTime, 1000);
updateTime(); // Run immediately

// Mobile Menu Toggle - Enhanced with animations
const menuToggle = document.querySelector('.menu-toggle');
const navRight = document.querySelector('.nav-right');
const navLinks = document.querySelectorAll('.nav-right .nav-link');

if (menuToggle && navRight) {
    // Toggle menu open/close
    const toggleMenu = () => {
        const isOpen = navRight.classList.contains('active');

        if (isOpen) {
            // Close menu
            navRight.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scroll
        } else {
            // Open menu
            navRight.classList.add('active');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
    };

    // Toggle on hamburger click
    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navRight.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking the contact button
    const btnContact = navRight.querySelector('.btn-contact');
    if (btnContact) {
        btnContact.addEventListener('click', () => {
            navRight.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navRight.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// ==================================================
// 5. THEME TOGGLE (Light/Dark Mode)
// ==================================================
(function initializeThemeToggle() {
    console.log("Theme toggle script initializing...");

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    console.log("Theme toggle element found:", !!themeToggle);
    console.log("Theme icon element found:", !!themeIcon);

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    function setTheme(theme) {
        console.log("Setting theme to:", theme);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        console.log("Toggling theme from", currentTheme, "to", newTheme);
        setTheme(newTheme);
    }

    // Initialize theme on script load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    console.log("Saved theme preference:", savedTheme);
    setTheme(savedTheme);

    // Attach click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        console.log("Theme toggle click listener attached successfully");
    } else {
        console.warn("Theme toggle button not found!");
    }
})();

// ==================================================
// 0. Hero Fun Fact Rotator (CLI Typewriter)
// ==================================================
const funFacts = [
    "THE FIRST COMPUTER BUG WAS A REAL MOTH",
    "AI DREAMS IN VECTORS",
    "PYTHON IS NAMED AFTER MONTY PYTHON",
    "404: REALITY NOT FOUND",
    "CODE IS POETRY",
    "RETICULATING SPLINES",
    "DOWNLOADING MORE RAM...",
    "CENTERING A DIV IS HARDER THAN AI",
    "EXITING VIM IS IMPOSSIBLE",
    "THERE IS NO CLOUD, JUST LINUX SERVERS",
    "I AM NOT A ROBOT (PROBABLY)",
    "JAVASCRIPT WAS BUILT IN 10 DAYS",
    "COMPILING LIFE DECISIONS...",
    "CTRL+C CTRL+V",
    "IT'S NOT A BUG, IT'S A FEATURE",
    "TEACHING SAND TO THINK",
    "HELLO WORLD, HELLO UNIVERSE",
    "QUANTUM FLUX STABILIZED"
];

let factIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const factElement = document.getElementById("fun-fact-text");
    if (!factElement) return;

    const currentFact = funFacts[factIndex];

    if (isDeleting) {
        // Deleting
        factElement.textContent = currentFact.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 30; // Faster delete
    } else {
        // Typing
        factElement.textContent = currentFact.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80 + Math.random() * 50; // Human varied typing
    }

    if (!isDeleting && charIndex === currentFact.length) {
        // Finished typing, wait before delete
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next
        isDeleting = false;
        factIndex = (factIndex + 1) % funFacts.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typing
setTimeout(typeWriter, 1000);


// ==================================================
// 0. Hero Fun Fact Rotator (CLI Typewriter)
// ==================================================
// ... (Previous code)

// ==================================================
// 0.1 LIQUID DISTORTION (Removed as per user request to remove image)
// ==================================================
// Shery.imageEffect( ... ) disabled.

// ==================================================
// 6. SKILL PROGRESS BAR ANIMATION (Intersection Observer)
// ==================================================
const skillItems = document.querySelectorAll(".skill-item");

const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -15% 0px"
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target.querySelector(".level-bar");
            const targetWidth = bar.getAttribute("data-width");
            
            // Add animation class and set width
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
            
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

skillItems.forEach(item => {
    skillObserver.observe(item);
});

// ==================================================
// 7. MARQUEE ANIMATION
// ==================================================
const marqueeInner = document.querySelector('.marquee-inner');
if (marqueeInner) {
    // Create clone for seamless loop
    const marqueeContent = marqueeInner.innerHTML;
    marqueeInner.innerHTML = marqueeContent + marqueeContent;
}

// ==================================================
// 8. TOUCH DRAG FOR MOBILE (Footer CTA) - Bubble Effect
// ==================================================
const touchDragElements = document.querySelectorAll('.touch-drag');
touchDragElements.forEach(el => {
    let startX, startY;
    let currentX = 0, currentY = 0;

    const DAMPING = 0.08;
    const MAX_MOVE = 15;

    el.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    el.addEventListener('touchmove', (e) => {
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;

        currentX = Math.max(-MAX_MOVE, Math.min(MAX_MOVE, deltaX * DAMPING));
        currentY = Math.max(-MAX_MOVE, Math.min(MAX_MOVE, deltaY * DAMPING));

        el.style.transform = `translate(${currentX}px, ${currentY}px)`;
    });

    el.addEventListener('touchend', () => {
        el.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        el.style.transform = 'translate(0, 0)';
        
        setTimeout(() => {
            el.style.transition = '';
        }, 800);
    });

    el.addEventListener('touchcancel', () => {
        el.style.transition = 'transform 0.5s ease-out';
        el.style.transform = 'translate(0, 0)';
        
        setTimeout(() => {
            el.style.transition = '';
        }, 500);
    });
});