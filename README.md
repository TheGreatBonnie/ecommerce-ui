# E-commerce Frontend

A modern e-commerce frontend application built with Next.js, React, and Tailwind CSS. This project features product listings, product details, cart functionality, and an AI assistant integration using CopilotKit.

## Features

- Responsive product catalog
- Product filtering
- Shopping cart functionality
- Product detail pages
- AI assistant integration
- Mobile-responsive design

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [CopilotKit](https://github.com/CopilotKit/CopilotKit) - AI assistant integration
- [shadcn/ui](https://ui.shadcn.com/) - UI component library

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/TheGreatBonnie/ecommerce-ui.git
cd ecommerce-ui
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory based on the existing `.env` file. The key environment variable is:

```
NEXT_PUBLIC_CPK_PUBLIC_API_KEY=your_copilot_api_key
```

4. Start the development server

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
app/                  # Next.js app directory
  page.tsx            # Homepage
  cart/               # Cart page
  products/           # Products page and product details
components/           # React components
  ui/                 # UI components from shadcn/ui
context/              # React context providers
  cart-context.tsx    # Shopping cart context
hooks/                # Custom React hooks
lib/                  # Utility functions and data
public/               # Static assets
styles/               # Global styles
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CopilotKit Documentation](https://docs.copilotkit.ai)

## License

[MIT](LICENSE)
