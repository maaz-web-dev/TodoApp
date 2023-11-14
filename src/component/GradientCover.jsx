import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

export default function GradientCover() {
  const fields = {
    title: "Playsam Streamliner",
    file: {
      fileName: "quwowooybuqbl6ntboz3.jpg",
      contentType: "image/jpg",
      details: {
        image: {
          width: 600,
          height: 446
        },
        size: 27187
      },
      url: "//images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg"
    }
  };
  const imageSource = 'https:' + fields.file.url; // Update image source from the object

  return (
    <Card sx={{ margin: '20px', minHeight: '280px', width: 320 }}>
      <CardCover>
        <img
          src={imageSource} // Set the image source from the object's 'url' field
          alt={fields.title} // Set alt text to the title from the object
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          {fields.title} {/* Set title from the object */}
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          California, USA {/* You can hardcode this or set it dynamically */}
        </Typography>
      </CardContent>
    </Card>
  );
}
