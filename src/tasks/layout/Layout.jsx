
import { Navbar, NavbarMobile } from "../components"

export const Layout = ({ children }) => {

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="ml-[320px] w-9/12 h-screen py-3 ">
        {children}
      </div>
      {/* <NavbarMobile /> */}
    </div>
  )
}
