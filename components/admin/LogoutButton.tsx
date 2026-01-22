"use client"

import { useRouter } from "next/navigation"
import { logout } from "@/actions/auth"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="text-gray-300 hover:text-white transition-colors text-sm"
    >
      Logout
    </button>
  )
}
