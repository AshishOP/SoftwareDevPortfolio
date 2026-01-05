# Project Management Guide

> Complete guide for managing your open-source portfolio project

## 📚 Table of Contents

1. [Version Management](#version-management)
2. [Git Workflow](#git-workflow)
3. [Release Process](#release-process)
4. [Branch Strategy](#branch-strategy)
5. [Issue Management](#issue-management)
6. [Pull Request Management](#pull-request-management)
7. [Community Management](#community-management)
8. [Maintenance Tasks](#maintenance-tasks)

---

## 🔢 Version Management

### Semantic Versioning (SemVer)

This project follows [Semantic Versioning 2.0.0](https://semver.org/):

**Format: MAJOR.MINOR.PATCH** (e.g., 1.2.3)

- **MAJOR** (1.x.x) - Breaking changes that require user action
  - Example: Removing features, changing data.js structure, renaming files
  
- **MINOR** (x.1.x) - New features that are backward compatible
  - Example: Adding new sections, new animations, theme options
  
- **PATCH** (x.x.1) - Bug fixes and small improvements
  - Example: Fixing mobile layout, color adjustments, typos

### Version Examples

```
1.0.0 → Initial release
1.0.1 → Fixed mobile swipe bug
1.1.0 → Added blog section
1.1.1 → Fixed dark mode color contrast
2.0.0 → Restructured data.js format (breaking change)
```

### Where to Update Version

Update version number in these files:

1. **package.json**
   ```json
   {
     "version": "1.0.1"
   }
   ```

2. **CHANGELOG.md** (add new entry at top)
   ```markdown
   ## [1.0.1] - 2026-01-15
   ### Fixed
   - Mobile swipe navigation issue
   ```

3. **Create GitHub Release** (explained below)

---

## 🌿 Git Workflow

### Daily Development

```bash
# 1. Check current status
git status

# 2. Pull latest changes (if working with collaborators)
git pull origin master

# 3. Make your changes to files
# ... edit code ...

# 4. Check what changed
git diff

# 5. Stage changes
git add .                    # Add all changes
git add file.js              # Add specific file

# 6. Commit with clear message
git commit -m "Fix: mobile menu not closing on link click"

# 7. Push to GitHub
git push origin master
```

### Commit Message Conventions

Use clear, descriptive commit messages:

```
Format: Type: Brief description

Types:
- Feat: New feature (e.g., "Feat: add contact form")
- Fix: Bug fix (e.g., "Fix: navbar z-index issue")
- Docs: Documentation (e.g., "Docs: update README with new feature")
- Style: Code style/formatting (e.g., "Style: format CSS with consistent spacing")
- Refactor: Code restructuring (e.g., "Refactor: simplify skill loading function")
- Chore: Maintenance (e.g., "Chore: update gitignore")
```

Examples:
```bash
git commit -m "Feat: add testimonials section"
git commit -m "Fix: skill bars not animating on mobile"
git commit -m "Docs: add deployment guide to README"
git commit -m "Style: improve button hover effects"
git commit -m "Refactor: extract common animation logic"
```

---

## 🚀 Release Process

### Step-by-Step Release

#### 1. Prepare Release

```bash
# Ensure you're on master and up to date
git checkout master
git pull origin master

# Run final tests
# - Test on Chrome, Firefox, Safari
# - Test on mobile device
# - Check all links work
# - Verify dark/light themes
```

#### 2. Update Version & Changelog

**Update package.json:**
```json
{
  "version": "1.1.0"  // Bump version
}
```

**Update CHANGELOG.md** (add at the top):
```markdown
## [1.1.0] - 2026-01-20

### Added
- Contact form with email integration
- Smooth scroll to section on nav click

### Fixed
- Mobile menu not closing after navigation
- Image loading performance on slow connections

### Changed
- Updated project card hover animation
- Improved accessibility with ARIA labels
```

#### 3. Commit & Tag

```bash
# Commit version changes
git add package.json CHANGELOG.md
git commit -m "Release: version 1.1.0"

# Create git tag
git tag -a v1.1.0 -m "Release version 1.1.0 - Contact form & bug fixes"

# Push commits and tags
git push origin master
git push origin v1.1.0
```

#### 4. Create GitHub Release

1. Go to your GitHub repository
2. Click "Releases" (right sidebar)
3. Click "Create a new release"
4. Fill in:
   - **Tag**: Select `v1.1.0` (the tag you just pushed)
   - **Release title**: `v1.1.0 - Contact Form & Bug Fixes`
   - **Description**: Copy from CHANGELOG.md
   ```markdown
   ### Added
   - Contact form with email integration
   - Smooth scroll to section on nav click
   
   ### Fixed
   - Mobile menu not closing after navigation
   - Image loading performance
   
   Full Changelog: https://github.com/AshishOP/GitPortfolio/compare/v1.0.0...v1.1.0
   ```
5. Click "Publish release"

#### 5. Announce (Optional)

- Tweet about the release
- Post on LinkedIn
- Update your live site

---

## 🌳 Branch Strategy

### Master Branch (Main)

- Always production-ready
- All changes go through Pull Requests (when working with others)
- Protected branch (recommended settings)

### Feature Branches

When adding new features:

```bash
# Create feature branch
git checkout -b feature/contact-form

# Work on feature
# ... make changes ...
git add .
git commit -m "Feat: add contact form"

# Push feature branch
git push origin feature/contact-form

# Create Pull Request on GitHub
# Merge after review
# Delete branch after merge
git branch -d feature/contact-form
```

### Hotfix Branches

For urgent bug fixes:

```bash
# Create hotfix branch
git checkout -b hotfix/mobile-menu-bug

# Fix the bug
git add .
git commit -m "Fix: mobile menu not closing"

# Push and create PR
git push origin hotfix/mobile-menu-bug
```

### Branch Naming Convention

```
feature/description    - New features
fix/description       - Bug fixes
docs/description      - Documentation
refactor/description  - Code refactoring
```

---

## 🐛 Issue Management

### Triage New Issues

When someone reports an issue:

1. **Label it** appropriately:
   - `bug` - Something isn't working
   - `enhancement` - New feature request
   - `documentation` - Docs improvement
   - `good first issue` - Easy for beginners
   - `help wanted` - Need community help
   - `question` - User question
   - `duplicate` - Already reported
   - `wontfix` - Won't be implemented

2. **Reproduce** the issue (if bug)

3. **Respond** within 48 hours:
   ```markdown
   Thanks for reporting this! I can reproduce the issue on mobile Chrome.
   This is related to the touch event handler. I'll work on a fix.
   ```

4. **Close** or **assign** to yourself

### GitHub Labels Setup

Create these labels in your repository:

```
Type labels (color: blue):
- bug
- enhancement
- documentation

Priority (color: red):
- priority: high
- priority: medium
- priority: low

Status (color: yellow):
- status: in-progress
- status: review-needed

Community (color: green):
- good first issue
- help wanted
```

---

## 🔀 Pull Request Management

### Reviewing PRs

When someone submits a Pull Request:

1. **Review the code**
   - Does it solve the problem?
   - Is code clean and readable?
   - Does it follow project style?
   - Are there any bugs?

2. **Test locally**
   ```bash
   # Fetch PR
   git fetch origin pull/ID/head:pr-ID
   git checkout pr-ID
   
   # Test it
   python -m http.server 8000
   ```

3. **Provide feedback**
   - Be kind and constructive
   - Point out what's good
   - Suggest improvements
   
   Example:
   ```markdown
   Great work on the contact form! The validation logic is solid.
   
   A few suggestions:
   - Can you add error handling for the API call?
   - The submit button could use a loading state
   - Let's add a success message after submission
   
   Also, please update the README to document the new feature.
   ```

4. **Approve or Request Changes**

5. **Merge** using "Squash and merge" (cleaner history)

6. **Thank the contributor!**
   ```markdown
   Merged! Thanks for your contribution @username 🎉
   ```

---

## 👥 Community Management

### Respond to Questions

- Answer within 24-48 hours
- Be friendly and encouraging
- Point to relevant documentation
- If unsure, say so honestly

### Encourage Contributors

- Thank people for issues/PRs
- Highlight great contributions
- Add contributors to README
- Create "good first issue" labels

### Handle Disagreements

- Stay professional and kind
- Focus on facts, not emotions
- Explain your reasoning
- Be open to changing your mind

### Code of Conduct Enforcement

If someone violates the Code of Conduct:

1. **First offense**: Private warning
2. **Second offense**: Temporary ban
3. **Serious/repeated**: Permanent ban

Document all incidents privately.

---

## 🔧 Maintenance Tasks

### Weekly Tasks

- [ ] Check and respond to new issues
- [ ] Review open pull requests
- [ ] Test site on different browsers/devices
- [ ] Update dependencies (if any added)

### Monthly Tasks

- [ ] Review analytics (if deployed)
- [ ] Update CHANGELOG with any patches
- [ ] Backup important data
- [ ] Check for broken links
- [ ] Review and close stale issues

### Quarterly Tasks

- [ ] Plan next major/minor release
- [ ] Update documentation
- [ ] Review project roadmap
- [ ] Community feedback survey
- [ ] Performance audit

### Yearly Tasks

- [ ] Review and renew license
- [ ] Update copyright year
- [ ] Major version planning
- [ ] Security audit

---

## 📊 Project Health Metrics

Track these to understand your project:

### GitHub Insights

- **Stars** - Project popularity
- **Forks** - People using your code
- **Issues closed** - Responsiveness
- **PR merge rate** - Collaboration health
- **Contributors** - Community growth

### Website Analytics (if deployed)

- Page views
- Bounce rate
- Mobile vs desktop usage
- Geographic distribution

---

## 🎯 Long-term Roadmap

### Version Planning

**v1.x (Current) - Foundation**
- Core portfolio features
- Responsive design
- Basic animations

**v2.0 (Future) - Enhancements**
- Blog integration
- Contact form
- CMS support
- Multi-language

**v3.0 (Future) - Advanced**
- Dark mode improvements
- Accessibility features
- Performance optimizations

### When to Release Major Versions

Only when there are **breaking changes**:
- Changing data.js structure
- Removing features
- Renaming files that users reference
- Changing required dependencies

---

## 🆘 Getting Help

If you need help managing the project:

1. **GitHub Discussions** - Enable on your repo
2. **Discord/Slack** - Create a community server (if it grows)
3. **Stack Overflow** - Tag questions appropriately
4. **Reddit** - r/webdev, r/opensource

---

## ✅ Quick Reference Checklist

### Before Each Release

- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Version bumped in package.json
- [ ] Git tag created
- [ ] GitHub release created
- [ ] Live site updated (if different from GitHub)

### For Each PR

- [ ] Code reviewed
- [ ] Tested locally
- [ ] Feedback provided
- [ ] Approved/merged
- [ ] Contributor thanked

### Monthly Review

- [ ] Issues triaged
- [ ] PRs reviewed
- [ ] Documentation current
- [ ] Roadmap updated
- [ ] Community engaged

---

## 📚 Resources

- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Open Source Guides](https://opensource.guide/)
- [First Timers Only](https://www.firsttimersonly.com/)

---

**Remember:** Managing an open-source project is a marathon, not a sprint. Start small, be consistent, and enjoy the journey! 🚀

---

*Last updated: January 6, 2026*
