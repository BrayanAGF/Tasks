import { Avatar, AvatarGroup, Card, Grid, Skeleton, Typography } from "@mui/joy"

export const CardLoading = () => {
    return (
        <Grid
            container
            height='80vh'
            sx={{ display: 'grid', placeItems: 'center' }}
        >
            <Grid width={350}>
                <Card variant="outlined">
                    <Typography>
                        <Skeleton loading>
                            Lorem ipsum is 
                            placeholder text commonlydsds used in the graphic, print, and
                            publishing industries.
                        </Skeleton>
                    </Typography>
                    <AvatarGroup>
                        <Avatar><Skeleton loading /></Avatar>
                        <Avatar><Skeleton loading /></Avatar>
                        <Avatar><Skeleton loading /></Avatar>
                    </AvatarGroup>
                </Card>
            </Grid>
        </Grid>
    )
}
