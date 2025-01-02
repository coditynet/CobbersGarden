# Cobbers Garden Website

A modern, responsive website developed by Codity for Cobbers Garden, a professional gardening and lawn care service based in Germany.

## 🌿 Overview

This website serves as the digital presence for Cobbers Garden, featuring:

- Modern, responsive design
- Service booking system
- Team showcase
- Customer testimonials
- Contact information
- Multi-language support (German/French)

## 🚀 Technologies

- Next.js 15
- TypeScript
- Tailwind CSS
- Radix UI Components
- PostHog Analytics
- Sentry Error Tracking
- React Email for transactional emails

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file based on `.env.example`
4. Run the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the result.

## 📦 Project Structure

```
src/
├── app/                # Next.js app router
├── components/         # React components
│   ├── emails/        # Email templates
│   ├── global/        # Global components
│   ├── landing/       # Landing page components
│   └── ui/            # UI components
├── lib/               # Utility functions
└── providers/         # React context providers
```

## 🔒 Environment Variables

Required environment variables:

- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `RESEND_API_KEY`
- `SENTRY_DSN`

## 🤝 Contributing

We welcome contributions to improve Cobbers Garden Website! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to our code style guidelines.

## ⚖️ License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License - see the [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) for details.

This means you are free to:
- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material

Under the following terms:
- Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made
- NonCommercial — You may not use the material for

## 👥 Credits

Developed with ❤️ by Codity
- Design & Development: [Elias](https://github.com/eliasnau) & [Timothee](https://github.com/belsetbut)
