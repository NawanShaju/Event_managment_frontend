import { useState } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function RegisterForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/auth/register', { username, email, password, role })
      alert('Registered successfully')
      navigate('/events')
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed')
    }
  }

  const navigateToLogin = () => {
    navigate('/')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto my-auto mt-10 bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        className="w-full mb-3 p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full mb-3 p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="w-full mb-3 p-2 border border-gray-300 rounded"
      />

      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Register
      </button>

      <button
        type="button"
        onClick={navigateToLogin}
        className="w-full mt-3 text-blue-600 hover:underline"
      >
        Already have an account? Login here
      </button>
    </form>
  )
}
