import { CircularProgress } from "@nextui-org/react"


export const CheckAuth = () => {
  return (
    <div className="grid place-items-center h-screen">
      <CircularProgress size="sm" aria-label="Loading..." />
    </div>
  )
}
