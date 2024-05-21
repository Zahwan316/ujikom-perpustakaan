import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"

const BookComponent = (props) => {
  const openmodal = () => {
    props.handlemodal && props.handlemodal(props.id)
    props.redirect && props.redirect(props.slug)
  }
  return(
    <>
      <Card className="w-56 h-98 drop-shadow-md" sx={{borderRadius:"6px",backgroundColor:"#FCFBFB"}}>
        <CardActionArea onClick={openmodal}>
          <CardMedia 
            component="img"
            className="h-72 px-6 py-2"
            image={props.img || "./assets/images/noimage.jpg"}
            alt={props.alt}
            sx={{objectFit:'fill'}}
          />
          <CardContent className="h-32  ">
            <Typography variant="h6" noWrap>
              {props.title}
            </Typography>
            <Typography variant="subtitle2">
              {props.rating} 
            </Typography>
            <Typography variant="body1">
              {props.penulis}
            </Typography>
            <Typography variant="body2">
              {props.perpus}
            </Typography>
            <Typography variant='body2'>
              {props.remaining}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default BookComponent