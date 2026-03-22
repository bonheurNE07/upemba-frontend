import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { Providers } from "@/components/providers";
import "./globals.css";
import { cn } from "@/lib/utils";

// Native Binding of the Oxanium Typography strictly onto Shadcn's font-sans
const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Upemba IoT Dashboard",
  description: "Machine Learning Edge Telemetry Visualizer",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Extract Locale securely asynchronously
  const { locale } = await params;

  // Mathematically validate the routing strings dynamically rejecting invalid paths
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Inject Translation dictionaries natively into the Server Component
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning // Prevents Next-Themes injection flash errors
      className={cn("h-full", "antialiased", "font-sans", oxanium.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <NextIntlClientProvider messages={messages}>
          <Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
