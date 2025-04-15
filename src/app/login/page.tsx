"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth/service";

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const { success, error } = await login(username, password);
    
    try {
      const result = await login(username, password);
      if (result.success) {
        localStorage.setItem("token", result.token);
        router.push("/dashboard"); // Redirect to dashboard on success
      } else {
        setError(result.error || "Login failed");
      }
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Upper Part: Logo */}
      <header className="bg-gray-100 border-b p-6 flex flex-col">
        <a href="/" title="Ana Sayfa"><img src="/ogmer.png" alt="Logo" width={100} height={50} /></a>
        {/* Navigation Bar */}
        <nav className="bg-blue mt-4 flex space-x-8 text-sm">
          <Link href="/" className="text-gray-700 hover:text-red-600">Ana Sayfa</Link>
        </nav>
      </header>
      
      {/* Login Form */}
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Log in</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
                    
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Kullanıcı Adı" 
              className="w-full p-3 border rounded-md mb-3" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Şifre" 
              className="w-full p-3 border rounded-md mb-3" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          <Link href="#" className="text-sm text-red-500 hover:underline">
            Forgot your username or password?
          </Link>
          <button 
              type="submit"
              className={`w-full bg-red-600 text-white p-3 rounded-md mt-4 hover:bg-red-700 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Giriş Yapılıyor..." : "Log in"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
