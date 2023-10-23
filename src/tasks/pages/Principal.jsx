
import { Layout } from "../layout/Layout"
import { EquiposView, ProyectosView, TareasView } from "./Principal/Views";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadApp } from "../../store/Principal/thunks";
import { CardLoading } from "../components";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";


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
              tabList: 'bg-[#E9ECEF] rounded-lg text-white',
              tabContent: 'group-data-[selected=true]:text-[#837bb6] text-[#85898C] hover:text-[#516BEB] ',
              panel: 'principalPanel'
            }}>
            <Tab key={0} title='Equipos'>
              {
                Loading
                  ? <CardLoading />
                  : <EquiposView />
              }
            </Tab>
            <Tab key={1} title='Proyectos'>
              {
                Loading
                  ? <CardLoading />
                  : <ProyectosView />
              }
            </Tab>
            <Tab key={2} title='Tareas'>
              {
                Loading
                  ? <CardLoading />
                  : <TareasView />
              }
            </Tab>
          </Tabs>
        </div>

      </div>

  )
}
