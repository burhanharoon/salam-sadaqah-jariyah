import { Box, Link } from '@mui/material'
import React, { useState, useEffect } from 'react'
import lehrstellLogo from 'assets/images/logo-transparent.png'
import InputComponent from 'components/Input'
import Button from 'components/Button'
import { toast } from 'react-toastify'
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { API_URL, BACKEND_URL } from 'utils/apiConstants'
import { ROUTES } from 'utils/routes'
import { useDispatch, useSelector } from 'react-redux'
import { handleUserChange } from 'store/reducers/user'
import { user as userFromState } from 'store/reducers/user'
import CustomModal from 'components/CustomModal'
import axios from 'axios'
import { ShowToast } from 'utils/toastMessages'
import { translation } from 'utils/germanTranslation'

const Login = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const loggedInUser = useSelector(userFromState)
  const dispatch = useDispatch()

  const [user, setUser] = useState({
    email: searchParams.get('email') || '',
    password: '',
    resetPasswordEmail: '',
  })
  const [showModal, setShowModal] = useState(
    searchParams.get('verified') === 'true'
  )
  const [loading, setLoading] = useState()
  const [loadingResetPassword, setLoadingResetPassword] = useState(false)

  const loginUser = async () => {
    let response
    try {
      response = await fetch(BACKEND_URL + API_URL.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data = await response.json()
      const { token } = data
      if (token) {
        localStorage.setItem('token', token)
        localStorage.setItem('id', data.user.id)
      }
      return data
    } catch (error) {
      return { error: 'Network Error' }
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    let login = await loginUser()
    setLoading(false)
    const toastType =
      login.error ||
      login.message ===
        'Bitte bestätigen Sie Ihre E-Mail-Adresse, um sich anzumelden'
        ? 'error'
        : 'success'
    const toastMessage =
      login.error || login.message || 'Benutzer hat sich erfolgreich angemeldet'
    ShowToast({ type: toastType, message: toastMessage })
    const userRole = login?.user?.role?.toLowerCase()
    dispatch(handleUserChange({ ...login.user, token: login.token }))
    navigate(
      userRole === 'student'
        ? ROUTES({ userId: login.user.id }).student.options
        : userRole === 'teacher'
        ? ROUTES({ userId: login.user.id }).teacher.classes.all
        : userRole === 'admin'
        ? ROUTES({ userId: login.user.id }).admin.dashboard
        : null
    )
  }

  const handleChange = (newValue, field) =>
    setUser({ ...user, [field]: newValue })

  useEffect(() => {
    if (loggedInUser.id) {
      const userRole = loggedInUser?.role?.toLowerCase()
      navigate(
        userRole === 'student'
          ? ROUTES({ userId: loggedInUser.id }).student.options
          : userRole === 'teacher'
          ? ROUTES({ userId: loggedInUser.id }).teacher.classes.all
          : userRole === 'admin'
          ? ROUTES({ userId: loggedInUser.id }).admin.dashboard
          : null
      )
    }
  }, [loggedInUser, navigate])

  const resetPassword = async (e) => {
    setLoadingResetPassword(true)
    e.preventDefault()
    try {
      const { data } = await axios.post(
        BACKEND_URL + API_URL.resetPassword,
        { email: user.resetPasswordEmail },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      setLoadingResetPassword(false)
      ShowToast({ type: 'success', message: data.message })
      setSearchParams({ 'reset-password': false })
    } catch (error) {
      setLoadingResetPassword(false)
      ShowToast({ message: error })
    }
  }

  return (
    <>
      <Box
        className='p-4 xs:p-8 bg-white rounded-md max-w-[565px] w-full'
        style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.07)' }}
      >
        <div className='pb-6 flex items-center justify-center'>
          <img src={lehrstellLogo} alt='logo' className='w-[10rem]' />
        </div>
        <div className='text-softBlack font-extrabold text-2xl text-center pb-8'>
          Melden Sie sich bei Ihrem Konto an
        </div>
        <form className='flex flex-col gap-6' onSubmit={handleRegister}>
          <InputComponent
            label='Email'
            type='email'
            labelClasses='font-bold text-black'
            value={user.email}
            handleChange={(newValue) => handleChange(newValue, 'email')}
            required
          />
          <div>
            <InputComponent
              label={translation.password}
              type='password'
              labelClasses='font-bold text-black'
              value={user.password}
              handleChange={(newValue) => handleChange(newValue, 'password')}
              required
            />
            <h3
              onClick={() => setSearchParams({ 'reset-password': true })}
              className='text-sm text-blue-500 mt-2 hover:underline cursor-pointer w-fit'
            >
              Passwort zurücksetzen
            </h3>
          </div>
          <Button
            title={translation.signIn}
            titleClasses='uppercase'
            type='submit'
            disabled={loading || user.password.length < 8}
            containerClasses='bg-[#458EFF] text-white w-full rounded-md h-[40px]'
          />
        </form>
        <div className='pt-4 text-center text-sm'>
          Sie haben kein Konto?{' '}
          <Link component={RouterLink} to='/' underline='hover'>
            {translation.signUp}
          </Link>
        </div>
      </Box>

      {/* Reset Password - Email Verification */}
      <CustomModal
        open={searchParams.get('reset-password') === 'true'}
        handleClose={() => setSearchParams({ 'reset-password': false })}
        containerClasses='w-[90%] max-w-[565px]'
      >
        <div className='flex flex-col items-center justify-center gap-4'>
          <div className='text-softBlack font-bold text-lg xs:text-2xl text-center'>
            Geben Sie die E-Mail-Adresse unten ein, um einen Link zu erhalten.
          </div>
          <InputComponent
            label='Email'
            type='email'
            labelClasses='font-bold text-black'
            value={user.resetPasswordEmail}
            handleChange={(newValue) =>
              handleChange(newValue, 'resetPasswordEmail')
            }
            required
          />
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto'>
            <Button
              title={translation.cancel}
              containerClasses='rounded-md w-full sm:w-[120px] h-[40px]'
              backgroundColor='#E9F1FC'
              titleClasses='font-semibold text-[#458EFF]'
              onClick={() => setSearchParams({ 'reset-password': false })}
            />
            <Button
              title={translation.submit}
              containerClasses='bg-[#458EFF] text-white w-full sm:w-[120px] rounded-md h-[40px]'
              disabled={!user.resetPasswordEmail || loadingResetPassword}
              onClick={resetPassword}
              type='button'
            />
          </div>
        </div>
      </CustomModal>

      <CustomModal
        open={showModal}
        handleClose={() => setShowModal(false)}
        containerClasses='w-[90%] max-w-[565px]'
      >
        <div className='flex flex-col items-center justify-center gap-4'>
          <div className='text-softBlack font-bold text-2xl'>
            Erfolgreiche Aktivierung deines Profils!
          </div>
          <div className='text-center text-softBlack'>
            Deine E-Mail-Adresse{' '}
            <span className='text-[#458EFF] font-semibold hover:underline hover:underline-offset-3'>
              {searchParams.get('email')
                ? '(' + searchParams.get('email') + ')'
                : ''}
            </span>{' '}
            wurde bestätigt. Du kannst dich jetzt bei deinem Konto anmelden.
          </div>
          <Button
            title={translation.submit}
            onClick={() => setShowModal(false)}
            type='button'
            containerClasses='bg-[#458EFF] text-white w-full rounded-md h-[40px]'
          />
        </div>
      </CustomModal>
    </>
  )
}

export default Login
