# Indian Divorce Coach — Website

India's first and #1 online divorce coaching platform for Indians and NRIs worldwide.

---

## Tech Stack

| Layer       | Technology               |
|-------------|--------------------------|
| Framework   | React 18 + Vite 5        |
| Styling     | Tailwind CSS 3           |
| Animations  | Framer Motion 11         |
| Icons       | Lucide React             |
| Scrolling   | react-scroll + CSS       |
| Deployment  | GitHub Pages via gh-pages|

---

## Project Structure

```
indiandivorcecoach/
├── public/
│   ├── favicon.svg              # SVG favicon (brand monogram)
│   ├── favicon-16x16.png        # Add manually via favicon generator
│   ├── favicon-32x32.png        # Add manually via favicon generator
│   ├── apple-touch-icon.png     # Add manually (180x180)
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── og-image.jpg             # Open Graph image (1200x630) — add manually
│   └── site.webmanifest
├── src/
│   ├── assets/                  # Images, SVGs used in components
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── PainPointsSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── ProcessSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   ├── FAQSection.jsx
│   │   ├── BookingSection.jsx
│   │   └── FooterSection.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
├── .gitignore
└── README.md
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (opens http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Deploying to GitHub Pages

### One-time setup

1. **Create a GitHub repository** named `indiandivorcecoach` (or your chosen name).

2. **Set the `base` in `vite.config.js`** to match your repository name:
   ```js
   base: '/indiandivorcecoach/',
   ```
   If you use a **custom domain** (e.g. `indiandivorcecoach.com`), set `base: '/'` instead.

3. **Initialise git and push** your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/indiandivorcecoach.git
   git push -u origin main
   ```

### Deploy

```bash
npm run deploy
```

This runs `vite build` then pushes the `dist/` folder to the `gh-pages` branch via the `gh-pages` npm package.

### Configure GitHub Pages

In your repository on GitHub:
**Settings → Pages → Source → Deploy from branch → `gh-pages` / `/ (root)`**

Your site will be live at:
`https://YOUR_USERNAME.github.io/indiandivorcecoach/`

---

### Custom Domain (optional)

1. Add a `CNAME` file inside `public/` containing your domain:
   ```
   www.indiandivorcecoach.com
   ```
2. Point your domain's DNS to GitHub Pages (follow GitHub's docs).
3. Set `base: '/'` in `vite.config.js`.
4. Enable "Enforce HTTPS" in GitHub Pages settings.

---

## Favicon Generation

Use [realfavicongenerator.net](https://realfavicongenerator.net) to generate all favicon sizes from `public/favicon.svg`, then place the output files into `/public/`.

---

## Environment Variables

Create `.env.local` for any secrets (never commit this file):

```env
VITE_CALENDLY_URL=https://calendly.com/YOUR_USERNAME/discovery-call
VITE_GA_ID=G-XXXXXXXXXX
```

Access in components via `import.meta.env.VITE_CALENDLY_URL`.

---

## Brand Colors

| Name      | Hex       | Usage                         |
|-----------|-----------|-------------------------------|
| Navy      | `#0A1628` | Backgrounds, text, navbar     |
| Gold      | `#D4A853` | Accents, borders, headings    |
| Coral     | `#E8734A` | CTAs, highlights              |
| White     | `#FFFFFF` | Card backgrounds, text        |
| Off-white | `#F5F5F5` | Section alternating bg        |

## Fonts

- **Display / Headings:** Playfair Display (Google Fonts)
- **Body / UI:** DM Sans (Google Fonts)
