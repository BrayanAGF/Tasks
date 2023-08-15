import { Alert, Box, Button, FormControl, FormLabel, Grid, Input } from "@mui/joy"
import './LoginPage.css'
import { Layout } from "../Layout/Layout"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { startGoogleSingIn, startLoginWithEmailAndPassword } from "../../store/auth/thunks"
import { useForm } from "../../hooks/useForm"
import { useEffect, useState } from "react"

const formData = {
  correo: '',
  contraseña: ''
}


export const LoginPage = () => {

  const dispatch = useDispatch();
  const [inputTypePass, setInputTypePass] = useState('password');
  const [passVisible, setPassVisible] = useState(false);
  const { correo, contraseña, onInputChange } = useForm(formData);
  const { errorMessage } = useSelector(state => state.auth);

  const onGoogleSignIn = () => {
    dispatch(startGoogleSingIn());
  }

  const onLoginWithEmailAndPassword = () => {
    dispatch(startLoginWithEmailAndPassword(correo, contraseña))
  }


  useEffect(() => {
    passVisible ? setInputTypePass('text') : setInputTypePass('password');
  }, [passVisible])
  

  return (
    <Layout>
      <Grid xs={12} md={7} className='imgPortada' />

      <Grid
        xs={12} md={5}
        padding={4}
        textAlign='center'
      >
        <h1><i className="bi bi-exclude" /> Tasks</h1>
        <h3>¡Bienvenido!</h3>

        <form>
          <FormControl>
            <FormLabel>Correo</FormLabel>
            <Input
              placeholder="Ingresa tu correo"
              type="email"
              name="correo"
              value={correo}
              onChange={onInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Contraseña</FormLabel>
            <Input
              placeholder="Ingresa tu contraseña"
              type={inputTypePass}
              name="contraseña"
              value={contraseña}
              onChange={onInputChange}
              endDecorator={
                <Box onClick={() => setPassVisible(!passVisible)} sx={{cursor: 'pointer'}}>
                  {passVisible ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                </Box>}
            />
          </FormControl>

          {
            !!errorMessage && <Grid mt={1}>
              <Alert color="danger">{errorMessage}</Alert>
            </Grid>
          }

          <Grid
            container
            direction='column'
            justifyContent='space-evenly'
            marginTop={2}
          >
            <Grid marginBottom={1}><Button variant="soft" onClick={onLoginWithEmailAndPassword}>Ingresar</Button></Grid>
            <Grid><Button variant="soft" onClick={onGoogleSignIn}><i className="bi bi-google" /><Grid marginLeft={1}>Ingresar con Google</Grid></Button></Grid>
            <p>¿No tienes una cuenta? ingresa <Link to='/auth/Register'>aquí</Link></p>
          </Grid>
        </form>
      </Grid>
    </Layout>
  )
}
