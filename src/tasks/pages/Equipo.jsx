
import { useSelector } from "react-redux"
import { ModalAgregarUsuario, ModalCrearProyecto, MenuChicoProyectos } from './Equipo/Components'
import { ProyectosEquipoView, IntegrantesEquipoView } from "./Equipo/Views";
import { Avatar, AvatarGroup, Divider, Tab, Tabs, Tooltip } from "@nextui-org/react";


export const Equipo = () => {
    
    const { active } = useSelector(state => state.equipos);
    const { uid } = useSelector(state => state.auth);


    return (
        <div>

            <div id="HeaderEquipo">
                <h1 className="text-5xl Fuente1">{active.Nombre}</h1>
                <h3 className="text-xl Fuente1">{active.Descripcion}</h3>
                <div className="flex items-center">
                    <AvatarGroup className="flex justify-start mt-2">
                        {
                            active.infoU.map((value, index) => (
                                <Tooltip content={value.displayName} placement="bottom" showArrow className="z-0">
                                    <Avatar key={index} src={value.photoURL} />
                                </Tooltip>
                            ))
                        }
                    </AvatarGroup>
                    {
                        active.Owner === uid && <ModalAgregarUsuario/>
                    }
                </div>
                <Divider className="mt-2" />
            </div>

            <div id="BodyEquipo" className="mt-3 Fuente1 ">
                <Tabs aria-label="Dynamic tabs" fullWidth
                    classNames={{
                        tabList: 'bg-[#E9ECEF] rounded-lg text-white',
                        tabContent: 'group-data-[selected=true]:text-[#516BEB] text-[#85898C] hover:text-[#516BEB] ',
                    }}>

                    <Tab key={0} title='Proyectos'>
                        <ProyectosEquipoView/>
                    </Tab>

                    <Tab key={1} title='Integrantes'>
                        <IntegrantesEquipoView />
                    </Tab>

                </Tabs>
            </div>

            <ModalCrearProyecto  />            
        </div>
    )
}
