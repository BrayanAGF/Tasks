import { Card, CardBody } from "@nextui-org/react"

export const Notificaciones = () => {
  return (
    <Card className="w-[600px] animate__animated animate__fadeIn animate__faster">
        <CardBody className="grid place-items-center">
            <div className="flex flex-col items-center">
                <img src="./assets/images/WIP.svg" height="350px" width="350px" />
                <h5 className="text-lg Fuente1 font-bold relative bottom-12">Estamos trabajando en esta opción...</h5>
            </div>
        </CardBody>
    </Card>
  )
}
