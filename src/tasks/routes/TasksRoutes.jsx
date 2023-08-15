import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Equipo, Perfil, Principal, Proyecto, Tarea } from '../pages'
import { useSelector } from 'react-redux'

export const TasksRoutes = () => {

  const { active } = useSelector(state => state.equipos)
  const { Active } = useSelector(state => state.proyectos)
  const { Tactive } = useSelector(state => state.tareas)
  
  return (
    <Routes>
        <Route path='/*' element={<Principal />} />
        <Route path='/Perfil' element={<Perfil />}/>       
        {
          active !== null && <Route path='/Equipo' element={<Equipo />}/>
        }
        {
          Active !== null && <Route path='/Proyecto' element={<Proyecto />}/>
        }
        {
          Tactive !== null && <Route path='/Tarea' element={<Tarea />}/>
        }
        
    </Routes>
  )
}
