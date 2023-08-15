import { Grid } from "@mui/joy"
import { Navbar } from "../components"

export const Layout = ({children}) => {
  return (
    <Grid container>
      <Navbar />
      <Grid width={{xs: '100vw', md: 'calc(100vw - 190px)'}}
      padding={1}
      marginLeft={{xs: 0, md: '15vw'}} marginTop={{xs: 7,sm: 7, md: 0}} /* sx={{overflowX: 'hidden'}} */>
        {children}
      </Grid>
    </Grid>
  )
}
