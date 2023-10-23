
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'
import { Layout } from '../Layout/Layout'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route index path="Login" element={<Layout />} />
    </Routes>
  )
}
