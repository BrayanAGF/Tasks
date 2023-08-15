import { Card, Grid } from "@mui/joy"

export const Layout = ({children}) => {
    return (
        <Grid
            container
            flex
            justifyContent='center'
            alignContent='center'
            sx={{ height: '100vh' }}
        >
            <Grid xs={12} md={8}>
                <Card>
                    <Grid
                        container
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent='center'
                    >
                        {children}
                    </Grid>
                </Card>
            </Grid>
        </Grid >
    )
}
