import { CircularProgress, Grid } from "@mui/joy"


export const CircularLoading = ({height = '100vh'}) => {
    return (
        <Grid container sx={{display: 'grid', placeItems: 'center', height: height}}>
            <CircularProgress color="neutral" thickness={1} />
        </Grid>
    )
}
