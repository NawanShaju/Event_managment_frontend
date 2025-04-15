import { useState } from 'react'
import { api } from '../../services/api'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', { email, password })
      dispatch(setCredentials({ user: res.data.user, token: res.data.access_token }))
      localStorage.setItem('user', JSON.stringify(res.data.user))
      localStorage.setItem('token', res.data.access_token)
      navigate('/events')
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
      <input
        type="password"
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
        Login
      </button>
      <button
        type="button"
        onClick={() => navigate('/register')}
        className="w-full mt-3 text-blue-600 hover:underline"
        >
        Don't have an account? Register
      </button>
    </form>
  )
}
