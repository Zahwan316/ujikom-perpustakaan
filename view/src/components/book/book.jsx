import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { Box } from "@mui/system"
import SvgColor from 'src/components/svg-color';


const icon = (name) => (
    <SvgColor src={`./assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
  );

  
const BookComponent = (props) => {
  const openmodal = () => {
    props.handlemodal && props.handlemodal(props.id)
    props.redirect && props.redirect(props.slug)
  }
  return(
    <>
      <Card className="w-52 h-96 border border-gray-300" sx={{borderRadius:"6px"}}>
        <CardActionArea onClick={openmodal}>
          <CardMedia 
            component="img"
            className="h-72"
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