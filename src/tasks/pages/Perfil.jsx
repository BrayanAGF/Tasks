import { Card, CardBody, Listbox, ListboxItem } from '@nextui-org/react';
import { Ajustes, Contrasena,  TuPerfil } from './Perfil/Views';
import { useState } from 'react';
import { useSelector } from 'react-redux';


export const Perfil = () => {

  const [Opcion, setOpcion] = useState('Tu perfil');
  const { providerId } = useSelector(state => state.auth);


  return (
    <div className='md:grid md:place-items-center h-full md:h-5/6'>

      <div className='flex flex-col md:flex-row items-start gap-2 md:w-8/12 h-full md:h-4/6'>

        <Card className='Fuente1 w-full md:w-6/12 lg:3/12'>
          <CardBody>
            <Listbox
              aria-label="Actions"
              onAction={(key) => setOpcion(key)}
            >
              <ListboxItem
                key="Tu perfil"
                startContent={<img src='./assets/svg/user.svg' height="30px" width="30px" />}
              >
                Tu perfil
              </ListboxItem>
              {
                providerId !== 'google.com' && <ListboxItem key="Contrasena" startContent={<img src='./assets/svg/password.svg' height="30px" width="30px" />}>Contraseña</ListboxItem>
              }
              <ListboxItem 
              key="Ajustes"
              startContent={<img src='./assets/svg/ajustes.svg' height="30px" width="30px" />}
              >
                Ajustes de la aplicación
              </ListboxItem>

            </Listbox>
          </CardBody>
        </Card>

        {
          Opcion === 'Tu perfil' && <TuPerfil />
        }
        {
          Opcion === 'Contrasena' && <Contrasena />
        }
        {
          Opcion === 'Ajustes' && <Ajustes />
        }

      </div>

    </div>
  )
}
