import CursorLight from "@/components/CursorLight";
import { ThemeProvider } from "@/hooks/theme-provider";
import { TokenProvider } from "@/hooks/token-context";
import { WindowSizeProvider } from "@/hooks/window-context";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Gael RICHARD - Développeur Web Fullstack",
  description:
    "Développeur Web Fullstack, je suis passionné par le développement web. Je suis spécialisé dans la création de sites web avec pour but de satisfaires les besoins de mes clients.",

  openGraph: {
    title: "Gael RICHARD - Développeur Web Fullstack",
    description:
      "Développeur Web Fullstack, je suis passionné par le développement web. Je suis spécialisé dans la création de sites web avec pour but de satisfaires les besoins de mes clients.",
    type: "website",
    url: "https://https://gael-dev.fr",
    images: [
      {
        type: "image/jpeg",
        width: 1200,
        height: 630,
        url: "https://res.cloudinary.com/dbmjyltpp/image/upload/v1716816576/IMG_1883_o6atab.jpg",
      },
    ],
    site_name: "Gael RICHARD - Développeur Web Fullstack",
    locale: "fr_FR",
  },
  twitter: {
    handle: "@gaelprodev",
    site: "@gaelprodev",
    cardType: "summary_large_image",
    title: "Gael RICHARD - Développeur Web Fullstack",
    description:
      "Développeur Web Fullstack, je suis passionné par le développement web. Je suis spécialisé dans la création de sites web avec pour but de satisfaires les besoins de mes clients.",
    type: "website",
    url: "https://https://gael-dev.fr",
    images: [
      "https://res.cloudinary.com/dbmjyltpp/image/upload/v1716816576/IMG_1883_o6atab.jpg",
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TokenProvider>
      <html lang="fr" suppressHydrationWarning>
        <body className={`${poppins.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <WindowSizeProvider>
              <CursorLight>
                {children}
                {/* <ScrollToTop /> */}
              </CursorLight>
            </WindowSizeProvider>
          </ThemeProvider>
        </body>
      </html>
    </TokenProvider>
  );
}
