import { CircularProgress, Grid } from "@mui/joy"


export const CheckAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', minWidth: '100vw' }}
    >
      <Grid>
        <CircularProgress color="neutral" thickness={1} />
      </Grid>
    </Grid>
  )
}
