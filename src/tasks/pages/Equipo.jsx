
import { useDispatch, useSelector } from "react-redux"
import { ModalAgregarUsuario, ModalCrearProyecto} from './Equipo/Components'
import { ProyectosEquipoView, IntegrantesEquipoView } from "./Equipo/Views";
import { Avatar, AvatarGroup, Divider, Tab, Tabs, Tooltip } from "@nextui-org/react";
import { useEffect } from "react";
import { startSelectEquipoActive } from "../../store";
import { CardLoadingProjects } from "../components";


export const Equipo = () => {

    const { active } = useSelector(state => state.equipos);
    const { uid } = useSelector(state => state.auth);
    const { Loading  } = useSelector(state => state.proyectos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startSelectEquipoActive(active));
    }, [])


    return (
        <div>

            <div id="HeaderEquipo">
                <h1 className="text-5xl Fuente1">{active.Nombre}</h1>
                <h3 className="text-xl Fuente1">{active.Descripcion}</h3>
                <div className="flex items-center">
                    <AvatarGroup className="flex justify-start mt-2">
                        {
                            active.infoU.map((value, index) => (
                                <Tooltip key={index} content={value.displayName} placement="bottom" showArrow className="z-0">
                                    <Avatar src={value.photoURL} />
                                </Tooltip>
                            ))
                        }
                    </AvatarGroup>
                    {
                        active.Owner === uid && <ModalAgregarUsuario />
                    }
                </div>
                <Divider className="mt-2" />
            </div>

            <div id="BodyEquipo" className="mt-3 Fuente1 ">
                {
                    Loading
                        ?
                        <CardLoadingProjects />
                        :
                        <Tabs aria-label="Dynamic tabs" fullWidth
                            classNames={{
                                tabList: 'bg-content1 rounded-lg text-white',
                                tabContent: 'group-data-[selected=true]:text-content2 text-content3 hover:text-secondary',
                            }}>

                            <Tab key={0} title='Proyectos'>
                                <ProyectosEquipoView />
                            </Tab>

                            <Tab key={1} title='Integrantes'>
                                <IntegrantesEquipoView />
                            </Tab>

                        </Tabs>
                }
            </div>

            {
                active.Owner === uid && <ModalCrearProyecto />
            }

        </div>
    )
}
