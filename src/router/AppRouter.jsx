import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { TasksRoutes } from "../tasks/routes/tasksRoutes"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { CheckAuth } from '../auth/components/CheckAuth'

export const AppRouter = () => {

  const { status } = useCheckAuth();

  if (status === 'checking') {
    return <CheckAuth/>
  }

  return (
    <Routes>
        {
          (status === 'authenticated')
          ?<Route path="/*" element={<TasksRoutes />} />
          :<Route path="/auth/*" element={<AuthRoutes />} />
        }
    <Route path='/*' element={<Navigate to='/auth/Login' />} />
    </Routes>
  )
}
