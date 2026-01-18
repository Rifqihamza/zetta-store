# Nexora Store 🌟

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)

A premium digital marketplace built with Next.js, designed to empower creators and developers with high-quality assets. Featuring a modern, responsive design and powered by Sanity CMS for seamless content management.

## ✨ Features

- **Premium Digital Assets**: Curated collection of digital assets for creators and developers
- **Modern UI/UX**: Beautiful, responsive design with smooth animations and interactive components
- **Sanity CMS Integration**: Headless CMS for easy content management and updates
- **TypeScript Support**: Fully typed codebase for better development experience
- **TailwindCSS + DaisyUI**: Utility-first styling with pre-built components
- **Optimized Performance**: Built with Next.js for fast loading and SEO optimization

## 🛠 Tech Stack

- **Framework**: Next.js 16
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
   git clone https://github.com/your-username/nexora-store.git
   cd nexora-store
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
nexora-store/
├── src/
│   ├── app/
│   │   ├── AboutPage/
│   │   ├── AssetsPage/
│   │   │   └── [slug]/
│   │   ├── HomePage/
│   │   ├── StepProcessPage/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── HeroComponents/
│   │   │   └── HeroSection.tsx
│   │   ├── Layouts/
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── SectionComponents/
│   │   │   ├── AboutSection.tsx
│   │   │   └── StepSection.tsx
│   │   └── ui/
│   │       ├── OrbComponent.tsx
│   │       ├── SpotlightCard.tsx
│   │       └── Stepper.tsx
│   ├── lib/
│   │   ├── client.ts
│   │   ├── currencyFormat.ts
│   │   ├── getProduct.ts
│   │   ├── getProductBySlug.ts
│   │   ├── image.ts
│   │   ├── query.ts
│   │   └── sanity.ts
│   ├── nexora-asset-cms/
│   │   ├── schemaTypes/
│   │   │   ├── index.ts
│   │   │   └── schemeProduct.ts
│   │   └── sanity.config.ts
│   └── types/
│       └── product.ts
├── public/
│   ├── favicon/
│   └── img/
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
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

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using Next.js and Sanity
