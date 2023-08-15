import { Avatar, Box, Grid, IconButton } from '@mui/joy'
import { Layout } from '../layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react';
import { startUpdatePhoto } from '../../store/auth/thunks';

export const Perfil = () => {

  const { photoURL } = useSelector(state => state.auth);
  const fileInputRef = useRef();
  const dispatch = useDispatch();

  const onFileInputChange = ({ target }) => {
    dispatch(startUpdatePhoto(target.files[0]));
  }


  return (
    <Layout>
      <Grid container sx={{ display: 'grid', placeItems: 'center' }} height='94vh'>
        <Box>
          <Avatar sx={{ height: '128px', width: '128px', border: 3, borderColor: 'white' }} src={photoURL}></Avatar>
          <IconButton
            sx={{
              bgcolor: 'white',
              color: 'black',
              borderRadius: '100px',
              position: 'relative',
              bottom: 30,
              left: 80
            }}
            onClick={() => fileInputRef.current.click()}
            >
            <i className="bi bi-image"></i>
          </IconButton>
          <input
            type='file'
            accept="image/png, image/gif, image/jpeg" 
            ref={fileInputRef}
            onChange={onFileInputChange}
            style={{display: 'none'}}
          />
        </Box>
      </Grid>
    </Layout>
  )
}
