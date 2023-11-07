import { Card } from "@nextui-org/react"

export const AlertPositive = ({svg, texto, display, type}) => {
    return (
        <Card className={`absolute bottom-5 right-5 ${type ? 'bg-slate-800' : 'bg-red-400'} text-white p-2 Fuente1 animate__animated animate__fadeIn animate__faster ${display ? 'inline' : 'hidden'}`}>
            <div className='flex items-center gap-2'>
                {svg}
                <p>{texto}</p>
            </div>
        </Card>
    )
}
