# Ashish Shukla Portfolio 🚀

> A modern, responsive portfolio website showcasing my work as a Full Stack Developer and Digital Experience Designer.

[![Live Demo](https://img.shields.io/badge/🌐-icy4sh.studio-black?style=for-the-badge)](https://www.icy4sh.studio)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/gpl-3.0)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://github.com/AshishOP)

## 🌟 About

This is my personal portfolio website featuring smooth animations, modern design, and an interactive user experience. Built with vanilla JavaScript featuring Shery.js effects, native scroll, and a horizontal project gallery with swipe navigation.

## ✨ Features

- **Smooth Animations** - CSS-based animations with native scroll
- **Shery.js Effects** - Custom mouse follower, magnetic buttons, and liquid distortion effects (on desktop)
- **Horizontal Scroll Gallery** - Desktop: scroll-based horizontal navigation, Mobile: touch swipe carousel
- **Dark/Light Theme Toggle** - Switch between themes with persistent preference
- **Typewriter Effect** - Fun facts rotator with CLI-style typing animation
- **Responsive Design** - Mobile-first design with hamburger menu
- **Dynamic Content** - Easy to update via `data.js` configuration
- **Skill Progress Bars** - Animated progress bars with visual feedback

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Animations:** CSS3, Shery.js
- **Icons:** Font Awesome
- **Fonts:** Google Fonts (Inter, Syne)
- **Deployment:** Vercel

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # Styling with CSS variables & themes
├── script.js           # Animations & interactivity
├── data.js             # Portfolio content configuration
├── vercel.json         # Vercel deployment config
├── assets/
│   └── images/         # Images and logos
└── libs/
    └── lenis.min.js    # Smooth scroll library (currently disabled)
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/AshishOP/GitPortfolio.git
   cd GitPortfolio
   ```

2. **Customize your portfolio**
   - Edit `data.js` to update your personal information, skills, projects, and education
   - Replace images in `assets/images/` with your own
   - Update social links and contact information

3. **Run locally**
   - Use a local server (required for Shery.js effects):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```
   - Open `http://localhost:8000` in your browser

4. **Deploy**
   - Push to GitHub and connect to Vercel for automatic deployments

## 📝 Customization

### Personal Information
Edit `data.js` to update your information:

```javascript
const portfolioData = {
  name: "Your Name",
  roles: ["Role 1", "Role 2", "Role 3"],
  bio: "Your bio here...",
  
  // Contact
  email: "your.email@example.com",
  
  // Social Links
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    instagram: "https://instagram.com/yourhandle"
  },

skillProgress: [
  { name: "Python", percentage: 55 },
  { name: "HTML & CSS", percentage: 65 },
  { name: "JavaScript", percentage: 60 },
  { name: "TypeScript", percentage: 35 },
  // Add more skills...
];
```

### Adding Projects
```javascript
projects: [
  {
    name: "Project Name",
    description: "Project description",
    image: "assets/images/project-image.png",
    role: "Full Stack Developer",
    number: "01",
    stack: ["React", "Node.js", "PostgreSQL"],
    link: "https://project-demo.com"
    // For unreleased projects, add: comingSoon: true
  }
];
```

### Adding Education
```javascript
education: [
  {
    school: "University Name",
    degree: "Bachelor of Science in Computer Science",
    duration: "2023 — 2026",
    description: "Description of your studies",
    highlights: [
      {
        icon: "code",
        title: "Highlight Title",
        description: "Highlight description here"
      }
    ],
    logo: "assets/images/logo.webp"
  }
];
```

## 🎨 Customizing Styles

Edit CSS variables in `styles.css`:

```css
:root {
  --black: #050505;
  --white: #ffffff;
  --gray: #888888;
  --font-main: 'Inter', sans-serif;
  --font-display: 'Syne', sans-serif;
}
```

For light theme customization, modify the `[data-theme="light"]` section.

## 📱 Sections Included

- ✨ Hero section with roles and CLI-style typewriter effect
- 💼 Philosophy/About section
- 🛠️ Skills with animated progress bars
- 📚 Education with highlights
- 🚀 Featured projects (desktop: horizontal scroll, mobile: swipe carousel)
- 📬 Contact footer

## 🐛 Notes

- **Shery.js effects** require running from a local server (not `file://` protocol)
- **Liquid distortion** only works on desktop (screen width > 768px)
- **Lenis smooth scroll** is currently disabled for better compatibility

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/AshishOP/GitPortfolio/issues).

### How to Contribute

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Keep the code clean and readable
- Test your changes on both desktop and mobile
- Update documentation if needed
- Follow the existing code style

## 📄 License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

**What this means:**
- ✅ You can use this code for personal and commercial projects
- ✅ You can modify and distribute it
- ✅ You must include the original license and copyright notice
- ✅ You must disclose your source code when distributing
- ✅ Any modifications must also be licensed under GPL-3.0

## 👤 Author

**Ashish Shukla**
- GitHub: [@AshishOP](https://github.com/AshishOP)
- LinkedIn: [@ashish-shukla](https://www.linkedin.com/in/ashish-shukla-7b31761b3/)
- Instagram: [@icy4sh](https://www.instagram.com/icy4sh/)
- Website: [icy4sh.studio](https://www.icy4sh.studio)

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you! Feel free to fork and make it your own.

### Forking This Repository

This project is open source and available under GPL-3.0. You're welcome to fork it and customize it for your own portfolio:

1. **Click the Fork button** at the top right of this repository
2. **Clone your fork**: `git clone https://github.com/YOUR_USERNAME/GitPortfolio.git`
3. **Customize** [data.js](data.js) with your information
4. **Replace images** in the `assets/images/` folder with your own
5. **Deploy** to your favorite hosting platform (Vercel, Netlify, GitHub Pages)
6. **Remember** to credit the original source and maintain the GPL-3.0 license

Happy coding! 🚀
