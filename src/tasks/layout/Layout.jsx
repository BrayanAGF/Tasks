
import { Navbar, NavbarMobile } from "../components"

export const Layout = ({ children }) => {

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <NavbarMobile />
      <div className="md:ml-[18.5%] md:w-[80%] p-2 h-screen py-3 ">
        {children}
      </div>
    </div>
  )
}
