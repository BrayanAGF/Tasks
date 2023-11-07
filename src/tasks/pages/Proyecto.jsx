import { TareasView, ArchivosView, ActividadView } from "./Proyecto/Views";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { startLoadProyecto } from "../../store";
import { getDiasDiff } from "../helpers";
import { Progress, Tab, Tabs } from "@nextui-org/react";

export const Proyecto = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadProyecto());
  }, [])
  
  const { Active, ActiveProgreso, ActiveNT, ActiveNTR } = useSelector(state => state.proyectos);
  const { Nombre, FechaTermino, Descripcion } = Active;
  const dias = getDiasDiff(new Date(), FechaTermino);
  

  return (
    <div>

      <div id="HeaderProyecto" className="Fuente1">
        <h1 className="text-5xl" aria-label="Nombre">{Nombre}</h1>
        <h5 className="text-lg" aria-label="Descripcion">{Descripcion}</h5>
        <Progress size="sm" value={ActiveProgreso} classNames={{indicator: "bg-content2"}}/>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 mt-1">
            <img src="./assets/svg/lista.svg" alt="lista" height="25px" width="25px" />
            <p aria-label="tareas hechas y tareas pendientes">{ActiveNTR} / {ActiveNT}</p>
          </div>
          <p aria-label="dias restantes">{dias} Días restantes</p>
        </div>
      </div>

      <div className="Fuente1">
        <Tabs aria-label="Dynamic tabs" fullWidth
          classNames={{
            tabList: 'bg-content1 rounded-lg text-white',
            tabContent: 'group-data-[selected=true]:text-content2 text-content3 hover:text-secondary',
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

