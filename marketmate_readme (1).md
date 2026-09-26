# MarketMate 🚀

> **Connect. Create. Succeed.**
>
> MarketMate is a modern web platform connecting ambitious students with local businesses seeking fresh marketing talent.

## 🌟 Overview

MarketMate bridges the gap between local enterprises in need of marketing, creative, and digital growth services and students looking for hands-on, real-world portfolio experience.

### Key Features

* **Talent Discovery**: Filter and search through student profiles, skillsets, and portfolios.
* **Project & Job Board**: Local businesses can post listings, campaigns, and short-term marketing gigs.
* **Location-Based Matching**: Discover local opportunities and collaborate within your community.
* **Modern Authentication & Session Management**: Built with Supabase SSR integration for secure user sessions.
* **Responsive UI**: Sleek, mobile-friendly interface styled with Tailwind CSS and Radix UI primitives.

## 🛠 Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router & Turbopack)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Components**: [shadcn/ui](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
* **Backend & Auth**: [Supabase](https://supabase.com/) (`@supabase/ssr`)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Deployment**: [Vercel](https://vercel.com/)

## 📁 Project Structure

```
├── app/                  # Next.js App Router (pages, layouts, routes)
├── components/           # Reusable UI and layout components
│   └── ui/               # Radix / shadcn/ui primitive components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities, Supabase client & server proxies
├── public/               # Static assets (images, icons)
├── styles/               # Global styles and Tailwind configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## 📜 Available Scripts

* `npm run dev`: Starts the local development server with Turbopack.
* `npm run build`: Compiles the production build.
* `npm run start`: Runs the built production application.
* `npm run lint`: Runs ESLint to check for code issues.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.