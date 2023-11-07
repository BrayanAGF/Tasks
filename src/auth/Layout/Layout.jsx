import { Card, Tab, Tabs } from "@nextui-org/react"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"

export const Layout = () => {
    return (
        <div className="grid place-items-center h-screen bg-background Fuente1">

            <Card className="h-screen w-screen md:h-5/6 md:w-10/12 flex-col md:flex-row items-center rounded-none md:rounded-lg ">
                <div className='h-1/3 md:h-full w-full'>
                    <img src="./assets/images/portada2.jpg" className="h-full w-full object-cover rounded-b-xl md:rounded-b-none" />
                </div>

                <div className="flex flex-col w-2/3 items-center mt-3 md:mt-0 p-4">

                    <div className="w-[350px] h-[480px]">
                        <h1 className="text-4xl my-2 text-center"><i className="bi bi-exclude" /> Tasks</h1>
                        <Tabs fullWidth size="md">
                            <Tab key="login" title="Ingresar">
                                <LoginPage />
                            </Tab>
                            <Tab key="sign-up" title="Registrarse">
                                <RegisterPage />
                            </Tab>
                        </Tabs>
                    </div>

                </div>
            </Card>


        </div>
    )
}
