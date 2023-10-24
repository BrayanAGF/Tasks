import { TareasView, ArchivosView, ActividadView } from "./Proyecto/Views";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startLoadProyecto } from "../../store";
import { getDiasDiff } from "../helpers";
import { CircularLoading } from "../components/CircularLoading";

import { Progress, Tab, Tabs } from "@nextui-org/react";

export const Proyecto = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadProyecto());
  }, [])

  const { Active, ActiveProgreso, ActiveNT, ActiveNTR, Loading } = useSelector(state => state.proyectos);
  const { Nombre, FechaTermino, Descripcion, Dias } = Active;
  const dias = getDiasDiff(new Date(), FechaTermino);



  return (
    <div>

      <div id="HeaderProyecto" className="Fuente1">
        <h1 className="text-5xl">{Nombre}</h1>
        <h5 className="text-lg">{Descripcion}</h5>
        <Progress size="sm" value={ActiveProgreso} color="success" />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-task" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z" />
              <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
              <path fillRule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z" />
            </svg>
            <p>{ActiveNTR} / {ActiveNT}</p>
          </div>
          <p>{Dias} Días restantes</p>
        </div>
      </div>

      <div className="Fuente1">
        <Tabs aria-label="Dynamic tabs" fullWidth
          classNames={{
            tabList: 'bg-[#E9ECEF] rounded-lg text-white',
            tabContent: 'group-data-[selected=true]:text-[#837bb6] text-[#85898C] hover:text-[#516BEB] ',
          }}>
          <Tab key={0} title='Tareas'>
            <TareasView />
          </Tab>
          <Tab key={1} title='Archivos'>
            <ArchivosView />
          </Tab>
          <Tab key={2} title='Actividad'>
            <ActividadView />
          </Tab>
        </Tabs>
      </div>

    </div>
  )
}

