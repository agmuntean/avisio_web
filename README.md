# Avisio Web

Landing page for Avisio - a platform that automates AEAT (Spanish Tax Agency) notification processing for accounting firms.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, Lenis (smooth scroll)
- **Fonts:** DM Serif Display, IBM Plex Sans

## Features

- Smooth scroll navigation with Lenis
- Light/dark theme with system preference detection
- Animated gradient blob background
- Fixed-reveal footer effect
- Responsive design with mobile navigation
- Contact form integration

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and theme variables
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Home page
├── components/
│   ├── background/      # GradientBlob, BackgroundLayer
│   ├── layout/          # Header, Footer
│   ├── providers/       # LenisProvider, ThemeProvider
│   └── sections/        # Hero, Problem, Solution, etc.
└── lib/
    └── utils.ts         # Utility functions
```

## License

Private - All rights reserved.
