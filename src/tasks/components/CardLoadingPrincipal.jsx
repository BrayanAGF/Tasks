import { Card, CardBody, Skeleton } from "@nextui-org/react"

export const CardLoadingPrincipal = () => {
  return (
    <div className="grid place-items-center h-[90vh]">
      <div className="w-4/12 flex flex-col gap-2 text-center">
        <Card >
          <CardBody className="flex flex-col gap-2">
            <Skeleton className="rounded-md w-4/6">s</Skeleton>
            <Skeleton className="rounded-md w-2/6">s</Skeleton>
            <Skeleton className="rounded-md w-3/6">s</Skeleton>
            <div className="flex gap-1">
            <Skeleton className="flex rounded-full w-12 h-12"></Skeleton>
            <Skeleton className="flex rounded-full w-12 h-12"></Skeleton>
            <Skeleton className="flex rounded-full w-12 h-12"></Skeleton>
            </div>
          </CardBody>
        </Card>
        <h3 className="text-xl">Cargando información...</h3>
      </div>
      </div>
  )
}
