import './globals.css'

export const metadata = {
  title: 'Mexicano Loco — Sabor Intenso, Picante e Autêntico',
  description: 'Tacos, burritos e combinações que explodem em sabor a cada mordida.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
