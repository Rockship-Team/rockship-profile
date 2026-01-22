import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | Rockship AI Admin",
  description: "Admin login",
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
