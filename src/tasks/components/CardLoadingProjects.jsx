import { Card, CardBody, Skeleton } from "@nextui-org/react"

export const CardLoadingProjects = () => {

    return (
        <div className="grid place-items-center h-[70vh]" >
            <div className="w-4/12 text-center">
                <Card>
                    <CardBody className="flex flex-col gap-1">
                        <Skeleton className="rounded-md w-full">s</Skeleton>
                        <Skeleton className="rounded-md w-2/6">s</Skeleton>
                        <Skeleton className="rounded-md w-3/6">s</Skeleton>
                    </CardBody>
                </Card>
                <h3 className="text-xl">Cargando información...</h3>
            </div>
        </div>
        )
}

    