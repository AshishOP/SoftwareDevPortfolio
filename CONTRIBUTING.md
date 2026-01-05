# Contributing to Portfolio

First off, thank you for considering contributing to this portfolio template! 🎉

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** - Include screenshots if relevant
- **Describe the behavior you observed** and what you expected
- **Include your environment details** (OS, browser, screen size)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **Include mockups or examples** if applicable

### Pull Requests

1. **Fork the repo** and create your branch from `master`
2. **Make your changes** - Keep them focused and atomic
3. **Test thoroughly** - Check both desktop and mobile views
4. **Update documentation** if you're changing functionality
5. **Write clear commit messages**
6. **Submit your PR** with a clear description

### Code Style

- Use clear, descriptive variable names
- Comment complex logic
- Keep functions small and focused
- Follow the existing code structure
- Test on multiple browsers and devices

### What to Work On?

Check out the [Issues](https://github.com/AshishOP/GitPortfolio/issues) page for:
- Issues labeled `good first issue` - Great for beginners
- Issues labeled `help wanted` - We need help on these
- Issues labeled `enhancement` - New feature ideas

## Development Setup

1. Clone the repository
   ```bash
   git clone https://github.com/AshishOP/GitPortfolio.git
   cd GitPortfolio
   ```

2. Run a local server
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. Open `http://localhost:8000` in your browser

4. Make your changes and test thoroughly

## Project Structure

```
├── index.html          # Main HTML structure
├── styles.css          # All styling with CSS variables
├── script.js           # JavaScript functionality
├── data.js             # Portfolio content configuration
├── assets/images/      # Image assets
└── libs/               # Third-party libraries
```

## Key Technologies

- **Vanilla JavaScript** - No frameworks
- **CSS3** - Custom properties and modern CSS
- **Shery.js** - Mouse effects and visual enhancements
- **Three.js** - Used by Shery.js for effects

## Testing Checklist

Before submitting a PR, please verify:

- [ ] Code works on Chrome, Firefox, Safari
- [ ] Mobile responsive (test on actual device if possible)
- [ ] Dark/Light theme both work correctly
- [ ] No console errors
- [ ] All animations work smoothly
- [ ] Touch gestures work on mobile (swipe, tap, etc.)
- [ ] Images load correctly
- [ ] Links work as expected

## Questions?

Feel free to open an issue with the label `question` or reach out to the maintainers.

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions.

---

Thank you for contributing! 🚀
