import { useSelector } from "react-redux";
import { CardProyectos } from "../../../components";


export const ProyectosEquipoView = () => {

    const { Proyectos } = useSelector(state => state.proyectos);
    

    return (
        <div className="flex flex-col gap-2">
            {
                Proyectos.length > 0
                    ?
                    Proyectos.map((value, index) => (
                        <CardProyectos key={index} Data={value} />
                    ))
                    :
                    <div className="grid place-items-center h-4/5">
                        <div className="flex flex-col items-center">
                            <img src="./assets/images/Team.svg" width='402px' height='300px' />
                            <p className="font-bold Fuente1 text-2xl relative">Parece que no tienes proyectos, prueba creando uno nuevo </p>
                        </div>
                    </div>
            }

        </div>
    )
}
