import { EquiposView, ProyectosView, TareasView } from "./Principal/Views";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadApp } from "../../store/Principal/thunks";
import { CardLoadingPrincipal } from "../components";
import { Tab, Tabs } from "@nextui-org/react";



export const Principal = () => {

  const dispatch = useDispatch();
  const { Loading } = useSelector(state => state.principal)

  useEffect(() => {
    dispatch(startLoadApp());
  }, [])


  return (
    <div className="w-full h-full Fuente1 ">

      <div>
        <Tabs aria-label="Dynamic tabs" fullWidth
          classNames={{
            tabList: 'bg-content1 rounded-lg text-white',
            tabContent: 'group-data-[selected=true]:text-content2 text-content3 hover:text-secondary',
            panel: 'principalPanel'
          }}>
          <Tab key={0} title='Equipos'>
            {
              Loading
                ? <CardLoadingPrincipal />
                : <EquiposView />
            }
          </Tab>
          <Tab key={1} title='Proyectos'>
            {
              Loading
                ? <CardLoadingPrincipal />
                : <ProyectosView />
            }
          </Tab>
          <Tab key={2} title='Tareas'>
            {
              Loading
                ? <CardLoadingPrincipal />
                : <TareasView />
            }
          </Tab>
        </Tabs>
      </div>

    </div>

  )
}
