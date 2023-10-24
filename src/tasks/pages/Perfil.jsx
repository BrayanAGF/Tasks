import { Card, CardBody, Listbox, ListboxItem } from '@nextui-org/react';
import { Contrasena, Notificaciones, TuPerfil } from './Perfil/Views';
import { useState } from 'react';

export const Perfil = () => {

  const [Opcion, setOpcion] = useState('Tu perfil');


  return (
    <div className='md:grid md:place-items-center h-full md:h-5/6'>
     
      <div className='flex flex-col md:flex-row items-start gap-2 md:w-8/12 h-full md:h-4/6'>

        <Card className='Fuente1 w-full md:w-6/12 lg:3/12'>
          <CardBody>
            <Listbox
              aria-label="Actions"
              onAction={(key) => setOpcion(key)}
            >
              <ListboxItem key="Tu perfil">Tu perfil</ListboxItem>
              <ListboxItem key="Contrasena">Contraseña</ListboxItem>
              <ListboxItem key="Notificaciones">Notificaciones</ListboxItem>
             
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
          Opcion === 'Notificaciones' && <Notificaciones />
        }

        

      </div>
    </div>
  )
}
