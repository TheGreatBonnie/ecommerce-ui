import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
// import AiAssistant from "@/components/ai-assistant";
import { LeafyGreenWrapper } from "@/components/leafygreen-provider";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/cart-context";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopSmart - Modern E-commerce",
  description: "A modern e-commerce platform with AI assistance",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* CopilotKit wrapper provides AI capabilities throughout the app */}
        <CopilotKit
          publicApiKey={process.env.NEXT_PUBLIC_CPK_PUBLIC_API_KEY}
          agent="ecommerce_agent">
          <LeafyGreenWrapper>
            <CartProvider>
              <Navigation />
              <div className="min-h-[calc(100vh-73px)]">{children}</div>

              <Toaster />
            </CartProvider>
          </LeafyGreenWrapper>
        </CopilotKit>
      </body>
    </html>
  );
}
