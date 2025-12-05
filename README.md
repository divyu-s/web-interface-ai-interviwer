# AI Interview - Landing Page

A modern, responsive landing page for an AI-powered interview platform built with Next.js and Tailwind CSS from Figma design specifications.

## 🎨 Design

This landing page was implemented from a Figma design file featuring:

- Modern UI/UX with smooth animations
- Fully responsive layout using Tailwind CSS
- Clean typography using system fonts
- Professional color scheme with green primary color (#02563d)

## 🚀 Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first CSS framework
- **React 19** - UI library
- **Modern Architecture** - Server and Client Components

## 📁 Project Structure

```
web-interface-ai-interviwer/
├── src/
│   └── app/
│       ├── page.tsx          # Main landing page component
│       ├── layout.tsx         # Root layout
│       ├── globals.css        # Global styles & Tailwind config
│       └── favicon.ico        # Favicon
├── public/                    # Static assets
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## ✨ Features Implemented

### Navigation

- ✅ Sticky header with backdrop blur
- ✅ Logo with icon
- ✅ Navigation links (Features, How it Works, Pricing, etc.)
- ✅ CTA buttons (Free Trial, Sign In)
- ✅ Responsive mobile menu ready

### Hero Section

- ✅ AI-Powered badge with icon
- ✅ Gradient headline text
- ✅ Dual CTA buttons
- ✅ Hero image placeholder with overlay
- ✅ Floating statistics badge (10,000+ Interviews)
- ✅ 4-column statistics grid

### Core Features

- ✅ **Multi-Modal Section** - Text, Voice, Video interview options
- ✅ **Core Capabilities** - 6 feature cards with hover effects
- ✅ **24/7 Availability** - Global statistics grid
- ✅ **How It Works** - 4-step process visualization
- ✅ **Why Choose Us** - 6 competitive advantages
- ✅ **Pricing** - 3 pricing tiers (Starter, Professional, Enterprise)
- ✅ **CTA Section** - Gradient background with prominent buttons
- ✅ **Footer** - 4-column layout with links

## 🎨 Design System

### Colors

```css
Primary Green: #02563d
Primary Dark: #034d35
Secondary: #f5f5f5
Text Primary: #0a0a0a
Text Secondary: #404040
Text Tertiary: #737373
```

### Typography

- System fonts with fallbacks
- Responsive text sizing
- Professional font weights

## 📱 Responsive Design

Fully responsive with Tailwind breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

## 🚦 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run development server:**

   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 🛠️ Development

### Key Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Architecture Notes

- **App Router**: Using Next.js 15 App Router (`src/app/`)
- **Client Components**: Page uses `"use client"` directive for interactivity
- **Tailwind CSS**: All styling done with utility classes
- **TypeScript**: Full type safety throughout
- **No External Images**: All icons inline as SVG

## 🎯 Key Sections

### 1. Navigation Header

- Fixed position sticky header
- Glassmorphism effect with backdrop blur
- Responsive navigation

### 2. Hero Section

- Eye-catching gradient headline
- Statistics showcase
- Clear call-to-action buttons

### 3. Features Sections

- Multi-modal interview options
- Core capabilities grid
- 24/7 availability stats
- Process steps
- Competitive advantages

### 4. Pricing

- Three-tier pricing model
- Feature comparison
- "Most Popular" badge on Professional plan

### 5. Footer

- Organized link sections
- Brand information
- Copyright notice

## 🎨 Customization

### Colors

Edit Tailwind config or use inline colors:

```tsx
className = "bg-[#02563d]"; // Custom color
className = "text-gray-900"; // Tailwind color
```

### Content

Edit `src/app/page.tsx` - all sections are clearly labeled with comments.

### Styling

Modify `src/app/globals.css` for global styles and animations.

## 🌟 Performance Features

- ✅ Server-side rendering with Next.js
- ✅ Optimized bundle size
- ✅ Tailwind CSS purging
- ✅ Modern React 19 features
- ✅ TypeScript for type safety

## 📄 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

Deploy to Vercel (recommended for Next.js):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or deploy to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean

## 📝 Notes

- All images are currently placeholders (gradient backgrounds)
- Replace with actual images from Figma or your assets
- SVG icons are inline for performance
- Fully accessible with semantic HTML

## 🔧 Future Enhancements

- [ ] Add actual images from Figma CDN or local assets
- [ ] Implement smooth scroll animations
- [ ] Add form validation for contact forms
- [ ] Integrate with CMS for dynamic content
- [ ] Add internationalization (i18n)
- [ ] Implement dark mode toggle
- [ ] Add analytics tracking

---

**Built with ❤️ from Figma design specifications using Next.js 15 and Tailwind CSS**

## Architecture Diagram

```
┌─────────────────────────────────────┐
│         Next.js App Router          │
├─────────────────────────────────────┤
│  src/app/                           │
│  ├── layout.tsx (Root Layout)       │
│  ├── page.tsx (Landing Page) ✨     │
│  └── globals.css (Tailwind)         │
├─────────────────────────────────────┤
│         Tailwind CSS v4             │
│  - Utility-first styling            │
│  - Custom colors & spacing          │
│  - Responsive breakpoints           │
├─────────────────────────────────────┤
│         TypeScript                  │
│  - Type-safe components             │
│  - IntelliSense support             │
└─────────────────────────────────────┘
```
