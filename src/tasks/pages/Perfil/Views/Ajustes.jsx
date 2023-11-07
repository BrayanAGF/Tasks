import { Card, CardBody, Switch } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setViewMode } from "../../../../store/Tareas/tareasSlice";
import {useTheme} from "next-themes";

export const Ajustes = () => {

  const { setTheme } = useTheme();
  const { ViewMode } = useSelector(state => state.tareas);
  const [vmCheck, setvmCheck] = useState(false);
  const [mOscuro, setmOscuro] = useState(false);
  const dispatch = useDispatch();

  const cambiarViewMode = ({ target }) => {
    const { checked } = target;
    setvmCheck(checked);
    dispatch(setViewMode(checked ? "Tarjetas" : "Normal"));
    localStorage.setItem('ViewMode', checked ? "Tarjetas" : "Normal");
  }

  const cambiarModoOscuro = ({target}) => {
    const { checked } = target;
    checked ? setTheme('dark') : setTheme('light');
    localStorage.setItem('OscureMode', checked ? "dark" : "light");
    setmOscuro(checked);
  }

  useEffect(() => {
    ViewMode !== "Normal" ? setvmCheck(true) : setvmCheck(false);
    const ModoOscuro = localStorage.getItem('OscureMode');
    ModoOscuro === "dark" ? setmOscuro(true) : setmOscuro(false);
  }, [])



  return (
    <Card className="w-full md:w-[600px] animate__animated animate__fadeIn animate__faster Fuente1">
      <CardBody className="">

        <h3>Tema</h3>
        <div className="flex gap-2 mt-2">
          <Switch isSelected={mOscuro} onChange={cambiarModoOscuro}>
            Activar modo oscuro
          </Switch>
        </div>

        <h3 className="mt-4">Vista</h3>
        <div className="flex gap-2 mt-2">
          <Switch isSelected={vmCheck} onChange={cambiarViewMode}>
            Activar vista de tareas en tarjetas
          </Switch>
        </div>

      </CardBody>
    </Card>
  )
}
