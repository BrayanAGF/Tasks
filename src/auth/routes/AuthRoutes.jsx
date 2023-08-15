
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route index path="Login" element={<LoginPage />} />
        <Route path="Register" element={<RegisterPage />} />
    </Routes>
  )
}
