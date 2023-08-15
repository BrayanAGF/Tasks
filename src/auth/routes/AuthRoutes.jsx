
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="Login" element={<LoginPage />} />
        <Route path="Register" element={<RegisterPage />} />

        {/* <Route path="/*" element={<Navigate to="/auth/Login"/>}/> */}
    </Routes>
  )
}
