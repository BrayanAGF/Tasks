
import './LoginPage.css'
import { Layout } from "../Layout/Layout"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { startGoogleSingIn, startLoginWithEmailAndPassword } from "../../store/auth/thunks"
import { useForm } from "../../hooks/useForm"
import { useEffect, useState } from "react"
import { Button, Card, CardBody, Image, Input, Tab, Tabs } from "@nextui-org/react"
import { EyeSlashFilledIcon } from '../../tasks/components/Icons/EyeSlashFilledIcon'
import { EyeFilledIcon } from '../../tasks/components/Icons/EyeFilledIcon'


const formData = {
  correo: '',
  contraseña: ''
}


export const LoginPage = () => {

  const dispatch = useDispatch();
  const [passVisible, setPassVisible] = useState(false);
  const { correo, contraseña, onInputChange } = useForm(formData);
  const { errorMessage } = useSelector(state => state.auth);

  const onGoogleSignIn = () => {
    dispatch(startGoogleSingIn());
  }

  const onLoginWithEmailAndPassword = () => {
    dispatch(startLoginWithEmailAndPassword(correo, contraseña))
  }

  return (
    <form className="flex flex-col gap-4">
      <Input
        isRequired
        label="Correo electrónico"
        placeholder="Ingresa tu correo electrónico"
        type="email"
        name='correo'
        value={correo}
        onChange={onInputChange}
      />
      <Input
        isRequired
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
        name='contraseña'
        value={contraseña}
        onChange={onInputChange}
      />

      <div className="flex flex-col gap-2 justify-end">
        <Button fullWidth color="primary" onClick={onLoginWithEmailAndPassword}>
          Ingresar
        </Button>
        <Button variant='flat' color='primary' onClick={onGoogleSignIn}>
          <i className="bi bi-google" />
          Ingresar con Google
        </Button>
      </div>
    </form>
  )
}

