import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startCreateUserWithEmailAndPassword } from '../../store/auth/thunks'
import { Button, Input } from '@nextui-org/react'
import { EyeSlashFilledIcon } from '../../tasks/components/Icons/EyeSlashFilledIcon'
import { EyeFilledIcon } from '../../tasks/components/Icons/EyeFilledIcon'

const formData = {
  Correo: '',
  Contraseña: '',
  Nombre: '',
  Rol: '',
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const { Correo, Contraseña, Nombre, Rol, formState, onInputChange } = useForm(formData);
  const [passVisible, setPassVisible] = useState(false);
  const { errorMessage } = useSelector(state => state.auth);

  const onRegister = () => {
    dispatch(startCreateUserWithEmailAndPassword(formState));
  }

  return (

    <form className="flex flex-col gap-4 h-[300px]">
      <Input
        isRequired
        autoComplete="off"
        label="Nombre"
        name="Nombre"
        value={Nombre}
        onChange={onInputChange}
        placeholder="Ingresa tu nombre"
      />
      <Input
        isRequired
        autoComplete="off"
        label="Rol"
        name="Rol"
        value={Rol}
        onChange={onInputChange}
        placeholder="Ingresa tu rol"
      />
      <Input
        isRequired
        autoComplete="off"
        label="Correo electrónico"
        placeholder="Ingresa tu correo electrónico"
        type="email"
        name='Correo'
        value={Correo}
        onChange={onInputChange}
      />
      <Input
        isRequired
        autoComplete="off"
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        type={passVisible ? "text" : "password"}
        endContent={
          <button className="focus:outline-none" type="button" onClick={() => setPassVisible(!passVisible)}>
            {passVisible ? (
              <EyeSlashFilledIcon />
            ) : (
              <EyeFilledIcon />
            )}
          </button>
        }
        name='Contraseña'
        value={Contraseña}
        onChange={onInputChange}
      />


      <div className="flex gap-2 justify-end">
        <Button fullWidth className='bg-secondary text-white' onClick={onRegister}>
          Registrarme
        </Button>
      </div>
    </form>

  )
}
