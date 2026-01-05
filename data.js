// ============================================
// YOUR PERSONAL DATA - Edit this file only!
// ============================================
// This is the ONLY file you need to edit to customize your portfolio.
// Replace all the information below with your own details.
// Images should be placed in assets/images/ folder.

const portfolioData = {
  // Personal Info
  name: "Ashish Shukla", // Your full name
  roles: ["Full Stack Developer", "React Specialist", "AI Enthusiast"], // Your roles/titles (used in hero section)
  bio: "A passionate Full Stack Software Developer 🚀 with experience building Web and Mobile applications using JavaScript, React.js, Node.js, Python, and AI tools.", // Your bio (used in About section)
  
  // Contact
  email: "ashishshuklacr@gmail.com",
  
  // Social Links
  social: {
    github: "https://github.com/AshishOP",
    linkedin: "https://www.linkedin.com/in/ashish-shukla-7b31761b3/",
    instagram: "https://www.instagram.com/icy4sh/",
  },
  
  // Skill Progress (for skills section with progress bars)
  skillProgress: [
    { name: "Python", percentage: 55 },
    { name: "HTML & CSS", percentage: 65 },
    { name: "JavaScript", percentage: 60 },
    { name: "TypeScript", percentage: 35 },
    { name: "GitHub & Actions", percentage: 70 },
    { name: "GitHub Copilot", percentage: 90 },
    { name: "Figma", percentage: 65 },
  ],
  
  // Education
  education: [
    {
      school: "MIT ACSC",
      degree: "Bachelor of Science in Computer Science",
      duration: "2023 — 2026",
      description: "Pursuing Computer Science with focus on Full Stack Development and AI technologies.",
      highlights: [
        {
          icon: "code",
          title: "Hackathon Participant",
          description: "Actively participated in multiple hackathons, gaining experience in rapid prototyping and team collaboration under pressure."
        },
        {
          icon: "trophy",
          title: "Coding Competitions",
          description: "Competed in various college-level programming contests, sharpening problem-solving skills and algorithmic thinking."
        },
        {
          icon: "rocket",
          title: "Self-Driven Projects",
          description: "Built real-world applications beyond curriculum, including full-stack e-commerce platforms and portfolio websites."
        }
      ],
      logo: "assets/images/MITlogo.webp"
    }
  ],
  
  // Featured Projects
  projects: [
    {
      name: "Ragebait Clothing",
      description: "A full-stack e-commerce platform for a clothing brand with inventory management and payment processing.",
      image: "assets/images/ragebaithome.png",
      role: "Tech Lead & Founder",
      number: "01",
      stack: ["Typescript", "Python", "PostgreSQL", "Cashfree"],
      link: "https://test.ragebaitclothing.in"
    },
    {
      name: "Ragebait Waitlist",
      description: "Waitlist page configured with automated thank-you emails and SMTP admin notifications.",
      image: "assets/images/ragebaitwaitlist.png",
      role: "Full Stack Developer",
      number: "02",
      stack: ["Python", "HTML", "CSS", "PostgreSQL"],
      link: "https://ragebaitclothing.in"
    },
    {
      name: "StrayHope",
      description: "Adoption platform for strays featuring an admin dashboard for managing registrations and emergency services.",
      image: "assets/images/strayhope.png",
      role: "Full Stack Developer",
      number: "03",
      stack: ["React", "SQLite", "Cloudflare D1 R2", "Next.js"],
      link: "https://strayhope-mono.pages.dev"
    }
  ]
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
}
