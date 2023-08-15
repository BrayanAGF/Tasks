import { Button } from "@mui/joy"

export const FloatingButton = ({ fn, children }) => {
  return (
        <Button 
            sx={{
                right: 20,
                bottom: 20,
                borderRadius: 100,
                position: 'fixed',
            }}
            onClick={fn}
        >
        {
            children
        }
        </Button>
  )
}
