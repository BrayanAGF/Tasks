import { CircularProgress, Grid } from "@mui/joy"


export const CircularLoading = () => {
    return (
        <Grid container sx={{display: 'grid', placeItems: 'center', height: '100vh'}}>
            <CircularProgress color="neutral" thickness={1} />
        </Grid>
    )
}
