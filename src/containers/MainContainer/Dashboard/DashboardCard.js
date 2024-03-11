import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classes from './Dashboard.module.css'

export default function DashboarCard({card}) {
    
  return (
    
    <Card  sx={{ maxWidth: 450 }} className={classes.cardpage} style={{ backgroundColor: card.background,backgroundImage:card.backgroundimage,boxShadow:card.boxshadow }}>
   
    
      <img src={card.icon} alt='dv' className={classes.iconboxicon} />

      <div className={classes.boxtitle}>
          {card.title}
          </div>


          <div className={classes.boxdesc}>
        {card.value}
        </div>
        
    
    
    </Card>
  );
}