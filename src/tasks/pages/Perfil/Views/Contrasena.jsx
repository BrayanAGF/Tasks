import { Button, Card, CardBody, Input } from "@nextui-org/react"

export const Contrasena = () => {
    return (
        <Card className="w-full md:w-[600px] animate__animated animate__fadeIn animate__faster">
            <CardBody className="flex flex-col gap-2">
                <Input
                    label="Contraseña nueva"
                    placeholder="Ingresa tu nueva contraseña"
                    type="password"
                />
                <Input
                    label="Contraseña nueva"
                    placeholder="Repite la nueva contraseña"
                    type="password"
                />
                <div className="flex justify-end">
                    <Button className='bg-[#6c5d98] text-white Fuente1'>Guardar</Button>
                </div>
            </CardBody>
        </Card>
    )
}
