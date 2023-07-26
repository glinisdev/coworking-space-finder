'use client';
import ThemeCustomization from "@/themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Coffice</title>
        <meta name="description" content="Coffice app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeCustomization>
          {children}
        </ThemeCustomization>
      </body>
    </html>
  )
}
