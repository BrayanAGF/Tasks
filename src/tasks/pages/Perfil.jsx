import { Card, CardBody, Listbox, ListboxItem } from '@nextui-org/react';
import { Contrasena, Notificaciones, TuPerfil } from './Perfil/Views';
import { useState } from 'react';

export const Perfil = () => {

  const [Opcion, setOpcion] = useState('Tu perfil');


  return (
    <div className='grid place-items-center h-5/6'>
     
      <div className='flex items-start gap-2 w-8/12 h-4/6'>

        <Card className='Fuente1'>
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
