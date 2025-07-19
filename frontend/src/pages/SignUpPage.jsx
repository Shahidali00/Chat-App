import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { toast } from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const { isSignup, SignUp } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (inputs.fullName.trim().length < 3) {
      toast.error('Full name must be at least 3 characters long')
      return
    }

    if (!inputs.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email address')
      return
    }

    if (inputs.password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    try {
      await SignUp({
        fullName: inputs.fullName.trim(),
        email: inputs.email.toLowerCase(),
        password: inputs.password
      })
      toast.success('Signup successful! Redirecting to login...')
      navigate('/login')
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong'
      if (errorMessage.includes('duplicate')) {
        toast.error('This email is already registered')
      } else {
        toast.error(errorMessage)
      }
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title text-2xl font-bold mb-4'>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text'>Full Name</span>
              </label>
              <input
                type='text'
                placeholder='John Doe'
                className='input input-bordered w-full'
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                required
              />
            </div>

            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                placeholder='john@example.com'
                className='input input-bordered w-full'
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                required
              />
            </div>

            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  className='input input-bordered w-full pr-10'
                  value={inputs.password}
                  onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/70 hover:text-base-content transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPassword(!showPassword)
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              className='btn btn-primary w-full mt-4'
              type='submit'
              disabled={isSignup}
            >
              {isSignup ? <span className='loading loading-spinner'></span> : 'Sign Up'}
            </button>
          </form>

          <p className='text-center mt-4'>
            Already have an account?{' '}
            <Link to='/login' className='link link-primary'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage