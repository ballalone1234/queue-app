"use client"

import { useEffect, useState } from "react"
import { API_ENDPOINTS ,API_URL} from "@/endpoint/api"
import  {User} from "@/interface"
import axios from "axios"
import { getStoredUser, saveUserToStorage } from "@/util/store"

export function AuthModalContainer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null as User | null)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      console.log("User found in storage:", storedUser)
      setUser(storedUser)
      setIsAuthenticated(true)
    }
  }, [])


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const usename = (document.getElementById("username") as HTMLInputElement).value
    const password = (document.getElementById("password") as HTMLInputElement).value
    let dataLogin = {
      username: usename,
      password,
    }
    const response = await axios.post(API_ENDPOINTS.login, dataLogin)
    if (response.status === 200) {
      console.log("Login successful", response.data)
      setIsAuthenticated(true)
      setUser(response.data)
      saveUserToStorage(response.data)
    }
    closeModal()
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const username = (document.getElementById("username") as HTMLInputElement).value
    const password = (document.getElementById("password") as HTMLInputElement).value
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value
    let dataRegister = {
      username,
      password,
      confirmPassword,
    }
    const response = await axios.post(API_ENDPOINTS.register, dataRegister)
    if (response.status === 200) {
      console.log("Registration successful", response.data)
      setIsAuthenticated(true)
      setUser(response.data)
      saveUserToStorage(response.data)
    }

    console.log("Registration form submitted", dataRegister)
    closeModal()
  }

  return (
    <>{!isAuthenticated ? (
      <div className="absolute top-4 left-4 z-40">
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          Login
        </button>
      </div>
    ) : (
      <div className="absolute top-4 left-4 z-40">
        {user && (
          <div className="text-gray-800 mb-2">
            <span className="font-semibold">Welcome, {user.username}</span>
          </div>
        )}
        <button
          onClick={() => {
            setIsAuthenticated(false)
            saveUserToStorage(null)
            window.location.href = "/"
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        >
        Logout
        </button>
      </div>
    )}


      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{isLogin ? "Login" : "Register"}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-xl">
                ×
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  username
                </label>
                <input
                  type="username"
                  id="username"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              <button
                type="submit"
                onClick={isLogin ? handleLogin : handleRegister}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 hover:text-blue-600 text-sm">
                {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
              </button>
            </div> 
          </div>
        </div>
      )}
    </>
  )
}
