import { Avatar } from "@nextui-org/react";
import { useSelector } from "react-redux";

export const IntegrantesEquipoView = () => {

    const { active } = useSelector(state => state.equipos);

    return (
        <div className="w-full justify-around flex">
            {
                active.infoU.map((usuario, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Avatar  
                        classNames={{
                            base: 'h-20 w-20'
                        }} 
                        src={usuario.photoURL}></Avatar>
                        <div >
                            <p className="text-xl">{usuario.displayName}</p>
                            <p className="text-lg text-[#85898C]">{usuario.rol}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
