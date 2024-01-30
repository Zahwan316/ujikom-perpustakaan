import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { Box } from "@mui/system"
import SvgColor from 'src/components/svg-color';


const icon = (name) => (
    <SvgColor src={`./assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
  );

const BookComponent = (props) => {
  return(
    <>
      <Card className="w-64 h-96 border border-gray-200 ">
        <CardActionArea>
          <CardMedia 
            component="img"
            className="h-64"
            image={props.img || "./assets/images/noimage.jpg"}
            alt={props.alt}
          />
          <CardContent className="h-32">
            <Typography variant="h6">
              {props.title}
            </Typography>
            <Typography variant="subtitle2">
              {props.rating} 
            </Typography>
            <Typography variant="body1">
              {props.penulis}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default BookComponent