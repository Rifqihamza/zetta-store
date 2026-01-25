# Zetta — Build Less, Create More 🌟

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)

Premium digital assets and templates for modern builders. Featuring a modern, responsive design and powered by Sanity CMS for seamless content management.

## ✨ Features

- **Premium Digital Assets**: Curated collection of digital assets for creators and developers
- **Modern UI/UX**: Beautiful, responsive design with smooth animations and interactive components
- **Sanity CMS Integration**: Headless CMS for easy content management and updates
- **TypeScript Support**: Fully typed codebase for better development experience
- **TailwindCSS + DaisyUI**: Utility-first styling with pre-built components
- **Optimized Performance**: Built with Next.js for fast loading and SEO optimization

## 🛠 Tech Stack

- **Framework**: Next.js 16.1.3
- **Language**: TypeScript
- **Styling**: TailwindCSS, DaisyUI
- **CMS**: Sanity
- **Icons**: Lucide React
- **Graphics**: OGL (WebGL utilities)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/zetta-store.git
   cd zetta-store
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Sanity credentials:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   NEXT_PUBLIC_SANITY_USE_CDN=true
   SANITY_API_TOKEN=your_api_token
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

```
zetta-store/
├── .gitignore
├── README.md
├── SECURITY.md
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public/
│ ├── favicon/
│ │ ├── icon192.png
│ │ ├── icon512.png
│ │ └── zettaIcon.png
│ └── img/
├── src/
│ ├── app/
│ │ ├── AboutPage/
│ │ │ └── page.tsx
│ │ ├── AssetsPage/
│ │ │ ├── [slug]/
│ │ │ │ └── page.tsx
│ │ │ └── page.tsx
│ │ ├── HomePage/
│ │ │ └── page.tsx
│ │ ├── StepProcessPage/
│ │ │ └── page.tsx
│ │ ├── api/
│ │ │ └── products/
│ │ │ └── route.ts
│ │ ├── error.tsx
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── license/
│ │ │ └── page.tsx
│ │ ├── not-found.tsx
│ │ ├── page.tsx
│ │ ├── privacy/
│ │ │ └── page.tsx
│ │ └── terms/
│ │ └── page.tsx
│ ├── components/
│ │ ├── Layouts/
│ │ │ ├── Footer.tsx
│ │ │ └── Navbar.tsx
│ │ ├── SectionComponents/
│ │ │ ├── AboutSection.tsx
│ │ │ ├── AssetsGrid.tsx
│ │ │ ├── HeroSection.tsx
│ │ │ └── StepSection.tsx
│ │ └── ui/
│ │ ├── Carousel.tsx
│ │ ├── EmptyState.tsx
│ │ ├── LoadingSpinner.tsx
│ │ ├── OrbComponent.tsx
│ │ ├── ProductCard.tsx
│ │ ├── SpotlightCard.tsx
│ │ ├── Stepper.tsx
│ │ ├── ToastAlert.tsx
│ │ ├── ToastProvider.tsx
│ │ └── button/
│ │ ├── CheckoutButton.tsx
│ │ ├── CopyLinkButton.tsx
│ │ ├── GoBackButton.tsx
│ │ ├── ShareButton.tsx
│ │ └── ViewAllAssetsButton.tsx
│ ├── config/
│ │ └── brand.ts
│ ├── constants/
│ │ ├── product-content.ts
│ │ └── product-intro.ts
│ ├── hooks/
│ │ ├── index.ts
│ │ ├── useAssetActions.ts
│ │ ├── useAssetNavigation.ts
│ │ └── useProduct.ts
│ ├── lib/
│ │ ├── currencyFormat.ts
│ │ ├── image.ts
│ │ ├── init.ts
│ │ └── sanity/
│ │ ├── client.ts
│ │ ├── env.ts
│ │ ├── errors.ts
│ │ ├── index.ts
│ │ ├── queries.ts
│ │ ├── services/
│ │ │ └── productService.ts
│ │ └── utils.ts
│ ├── middleware.ts
│ ├── types/
│ │ └── product.ts
│ └── utils/
│ └── generateProductIntro.ts
└── tsconfig.json

```

## 🎯 Usage

- **Home Page**: Introduction and hero section with call-to-action buttons
- **About Page**: Information about the platform and its mission
- **Assets Page**: Browse and explore available digital assets
- **Asset Details**: Individual asset pages with detailed information
- **Step Process**: Guide on how to use the platform

## 🏗 Building for Production

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## 🧪 Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 🔒 Security Best Practices

This application implements several security measures. See [SECURITY.md](SECURITY.md) for detailed security policies.

### Quick Security Checklist

Before deployment:

- [ ] Run `npm audit` regularly to check for vulnerabilities
- [ ] Ensure all environment variables are set in production
- [ ] Verify HTTPS is enabled on your hosting platform
- [ ] Test that sensitive routes are properly protected
- [ ] Confirm security headers are working (use browser dev tools)

### Environment Variables

Create a `.env.local` file and configure:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SANITY_USE_CDN=true
```

### Vercel Deployment Security

For Vercel deployments, ensure:

1. **Environment Variables**: Set all required variables in Vercel dashboard
2. **Domain Configuration**: Use custom domain with HTTPS
3. **Headers**: Security headers are automatically applied via `next.config.ts`
4. **Analytics**: Consider enabling Vercel Analytics for monitoring

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [license page](license/) for details.

---
