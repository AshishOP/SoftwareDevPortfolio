// ==================================================
// 1. SMOOTH SCROLL (DISABLED - Using native scroll for better compatibility)
// ==================================================
// Lenis was causing trackpad scrolling issues, so we're using native scroll.
// Native scroll works perfectly with GSAP ScrollTrigger.
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
// 3. GSAP ANIMATIONS
// ==================================================
gsap.registerPlugin(ScrollTrigger);

// A. Hero Text Reveal Animation
const tl = gsap.timeline();

// Animate from invisible state rather than sitting in invisible state
tl.from(".reveal", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    stagger: 0.15,
    delay: 0.2,
    clearProps: "all" // Clear properties after animation to prevent layout issues
});

tl.to(".hero-label, .hero-image-container, .liquid-text-overlay, .scroll-down", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
}, "-=0.5");

// A2. Hero Image Horizontal Scroll (Right to Left as you scroll)
gsap.to([".hero-image-container", ".liquid-text-overlay"], {
    x: () => -(window.innerWidth - 100), // Move from right to left
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
    }
});


// B. Horizontal Scroll (Desktop: gradual, Mobile: snap-based via vertical scroll)
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
    let hasScrolledMobile = false;

    // Get card width including gap for mobile snap calculation
    const getCardWidth = () => {
        if (cards.length === 0) return 0;
        const cardRect = cards[0].getBoundingClientRect();
        return cardRect.width + 32; // 2rem gap = 32px
    };

    // Update the horizontal position based on scroll
    const updateHorizontalScroll = () => {
        const rect = workSection.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height - window.innerHeight;

        if (isMobile()) {
            // MOBILE: Snap to projects based on scroll progress
            if (sectionTop <= 0 && sectionTop >= -sectionHeight) {
                // Calculate which project should be visible
                const progress = Math.abs(sectionTop) / sectionHeight;
                // Divide into segments for each card
                const segmentSize = 1 / totalCards;
                const newIndex = Math.min(Math.floor(progress / segmentSize), totalCards - 1);

                // Snap to the card position
                const cardWidth = getCardWidth();
                const translateX = newIndex * cardWidth;
                projectsContainer.style.transform = `translateX(${-translateX}px)`;
                projectsContainer.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

                // Update dots
                if (newIndex !== currentMobileIndex) {
                    currentMobileIndex = newIndex;
                    dots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === newIndex);
                    });
                }

                // Hide scroll helper after first scroll movement
                if (!hasScrolledMobile && scrollHelper && progress > 0.05) {
                    hasScrolledMobile = true;
                    scrollHelper.style.opacity = '0';
                    scrollHelper.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        scrollHelper.style.display = 'none';
                    }, 500);
                }
            } else if (sectionTop > 0) {
                // Before section - show first card
                projectsContainer.style.transform = `translateX(0px)`;
                projectsContainer.style.transition = 'transform 0.4s ease';
                currentMobileIndex = 0;
                dots.forEach((dot, i) => dot.classList.toggle('active', i === 0));
            } else {
                // After section - show last card
                const cardWidth = getCardWidth();
                const translateX = (totalCards - 1) * cardWidth;
                projectsContainer.style.transform = `translateX(${-translateX}px)`;
                currentMobileIndex = totalCards - 1;
                dots.forEach((dot, i) => dot.classList.toggle('active', i === totalCards - 1));
            }
        } else {
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

    // Use requestAnimationFrame for smooth performance
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
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
    window.addEventListener("resize", updateHorizontalScroll);

    // Allow clicking dots to scroll page to show that project
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            if (!isMobile()) return;
            const index = parseInt(dot.dataset.index, 10);
            const sectionRect = workSection.getBoundingClientRect();
            const sectionHeight = sectionRect.height - window.innerHeight;
            const segmentSize = sectionHeight / totalCards;
            const targetScroll = window.scrollY + sectionRect.top + (index * segmentSize) + 10;
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        });
    });
}


// C. Skills Hover Interaction
// Change background color or show image on hover
const skillRows = document.querySelectorAll(".skill-row");
skillRows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
        gsap.to(row, { paddingLeft: "30px", backgroundColor: "#1a1a1a", duration: 0.3 });
    });
    row.addEventListener("mouseleave", () => {
        gsap.to(row, { paddingLeft: "0px", backgroundColor: "transparent", duration: 0.3 });
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

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navRight = document.querySelector('.nav-right');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        // Simple toggle for mobile menu visibility
        // Ideally, you'd add a class to slide it in
        if (navRight.style.display === 'flex') {
            navRight.style.display = 'none';
        } else {
            navRight.style.display = 'flex';
            navRight.style.flexDirection = 'column';
            navRight.style.position = 'absolute';
            navRight.style.top = '80px';
            navRight.style.right = '20px';
            navRight.style.background = 'var(--bg-secondary)';
            navRight.style.padding = '20px';
            navRight.style.border = '1px solid var(--border-color)';
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

// A. Parallax effect on hero image
gsap.to(".hero-image-container", {
    y: 100,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});

// B. Philosophy section text reveal
gsap.from(".big-text", {
    opacity: 0,
    y: 80,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".philosophy",
        start: "top 70%",
        toggleActions: "play none none reverse"
    }
});

// C. Highlight text blur reveal (human experiences)
ScrollTrigger.create({
    trigger: ".highlight",
    start: "top 80%",
    end: "top 40%",
    onEnter: () => document.querySelector(".highlight")?.classList.add("in-view"),
    onLeaveBack: () => document.querySelector(".highlight")?.classList.remove("in-view")
});

// D. Gallery items staggered reveal
gsap.from(".gallery-item", {
    opacity: 0,
    y: 60,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".work-section",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// E. Skills section reveal
const skillItems = document.querySelectorAll(".skill-item");

skillItems.forEach((item) => {
    // Animate item appearing
    gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });

    // Animate progress bar filling
    const bar = item.querySelector(".level-bar");
    const targetWidth = bar.getAttribute("data-width");

    ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        onEnter: () => {
            bar.style.width = targetWidth;
        },
        onLeaveBack: () => {
            bar.style.width = "0%";
        }
    });
});

// F. Footer CTA animation
gsap.from(".footer-cta", {
    opacity: 0,
    scale: 0.9,
    y: 50,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".footer",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// G. Section heading animations
gsap.utils.toArray(".section-heading").forEach(heading => {
    gsap.from(heading, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
});

// H. Marquee speed increase on scroll
gsap.to(".marquee-inner", {
    xPercent: -50,
    ease: "none",
    duration: 15,
    repeat: -1
});

// Speed up marquee when scrolling through it
ScrollTrigger.create({
    trigger: ".marquee-section",
    start: "top bottom",
    end: "bottom top",
    onUpdate: self => {
        const speed = 1 + Math.abs(self.getVelocity()) / 1000;
        gsap.to(".marquee-inner", { duration: 0.5, timeScale: speed });
    }
});

// ==================================================
// 7. FINAL LAYOUT REFRESH
// ==================================================
// Ensure ScrollTrigger recalculates positions after all images and effects are loaded
window.addEventListener("load", () => {
    // Small delay to ensure Shery/Canvas is ready
    setTimeout(() => {
        ScrollTrigger.refresh();
        console.log("Global ScrollTrigger refresh triggered");
    }, 500);
});

// ==================================================
// 8. TOUCH DRAG FOR MOBILE (Footer CTA) - Bubble Effect
// ==================================================
const touchDragElements = document.querySelectorAll('.touch-drag');
touchDragElements.forEach(el => {
    let startX, startY;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let isAnimating = false;

    // Damping factor - lower = more subtle movement (0.1 = 10% of finger movement)
    const DAMPING = 0.08;
    // Max movement in pixels
    const MAX_MOVE = 15;
    // Smoothing duration
    const SMOOTH_DURATION = 0.6;

    // Smooth animation loop using GSAP
    const animateToTarget = () => {
        gsap.to(el, {
            x: targetX,
            y: targetY,
            duration: SMOOTH_DURATION,
            ease: "power2.out",
            overwrite: true
        });
    };

    el.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isAnimating = true;
    });

    el.addEventListener('touchmove', (e) => {
        if (!isAnimating) return;

        // Calculate finger movement from start
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;

        // Apply heavy damping - element moves only a fraction of finger movement
        targetX = deltaX * DAMPING;
        targetY = deltaY * DAMPING;

        // Limit movement range for subtle bubble effect
        targetX = Math.max(-MAX_MOVE, Math.min(MAX_MOVE, targetX));
        targetY = Math.max(-MAX_MOVE, Math.min(MAX_MOVE, targetY));

        // Smooth animate to target position
        animateToTarget();
    });

    el.addEventListener('touchend', () => {
        isAnimating = false;
        targetX = 0;
        targetY = 0;

        // Gentle elastic spring back - like a bubble settling
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.4)",
            overwrite: true
        });
    });

    el.addEventListener('touchcancel', () => {
        isAnimating = false;
        targetX = 0;
        targetY = 0;
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            overwrite: true
        });
    });
});