import React, { useEffect, useState } from 'react'
import { Layout } from '../Layout/Layout'
import { Alert, Box, Button, FormControl, FormLabel, Grid, Input, LinearProgress, Stack, Typography } from '@mui/joy'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startCreateUserWithEmailAndPassword } from '../../store/auth/thunks'

const formData = {
  Correo: '',
  Contraseña: '',
  Nombre: '',
  Rol: '',
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const { Correo, Contraseña, Nombre, Rol, formState,  onInputChange } = useForm(formData);
  const [inputTypePass, setInputTypePass] = useState('password');
  const [passVisible, setPassVisible] = useState(false);
  const { errorMessage } = useSelector(state => state.auth);
  

  useEffect(() => {
    passVisible ? setInputTypePass('text') : setInputTypePass('password');
  }, [passVisible])
  

  const onRegister = () => {
    dispatch(startCreateUserWithEmailAndPassword(formState));
  }

  return (
    <Layout>
      <Grid md={7}>
        <h1>Ingresa los datos correspondientes</h1>
        <form>
          <FormControl>
            <FormLabel>Nombre de usuario</FormLabel>
            <Input
              placeholder="Ingresa tu nombre de usuario"
              name='Nombre'
              value={Nombre}
              onChange={onInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Rol</FormLabel>
            <Input
              placeholder="Ingresa tu rol"
              name='Rol'
              value={Rol}
              onChange={onInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Correo</FormLabel>
            <Input
              placeholder="Ingresa tu correo"
              name='Correo'
              value={Correo}
              onChange={onInputChange}
            />
          </FormControl>
          <FormControl>
            <Stack
              spacing={0.5}
              sx={{
                '--hue': Math.min(Contraseña.length * 10, 120),
              }}
            >
              <FormLabel>Contraseña</FormLabel>
              <Input
                type={inputTypePass}
                placeholder="Escribe una contraseña"
                name='Contraseña'
                value={Contraseña}
                onChange={onInputChange}
                startDecorator={<i className="bi bi-key-fill" />}
                endDecorator={
                  <Box onClick={() => setPassVisible(!passVisible)} sx={{cursor: 'pointer'}}>
                    {passVisible ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                  </Box>} 
              />
              <LinearProgress
                determinate
                size="sm"
                value={Math.min((Contraseña.length * 100) / 12, 100)}
                sx={{
                  bgcolor: 'background.level3',
                  color: 'hsl(var(--hue) 80% 40%)',
                }}
              />
              <Typography
                level="body3"
                sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
              >
                {Contraseña.length < 3 && 'Very weak'}
                {Contraseña.length >= 3 && Contraseña.length < 6 && 'Weak'}
                {Contraseña.length >= 6 && Contraseña.length < 10 && 'Strong'}
                {Contraseña.length >= 10 && 'Very strong'}
              </Typography>
            </Stack>
          </FormControl>
          {
            !!errorMessage && <Grid mt={1}>
              <Alert color="danger">{errorMessage}</Alert>
            </Grid>
          }
          <Grid
            container
            flex
            justifyContent='space-evenly'
            marginTop={2}
          >
            <Button variant="soft" onClick={onRegister}> Registrarme </Button>
          </Grid>
        </form>
      </Grid>
    </Layout>
  )
}
