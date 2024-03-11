import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classes from './Dashboard.module.css'

export default function DashboardMiddleCard({card}) {
    
  return (
    
    <Card  sx={{ maxWidth: 450 }} className={classes.cardpagemiddle} style={{ backgroundColor: card.background,backgroundImage:card.backgroundimage,boxShadow:card.boxshadow }}>
   
    <div className={classes.middlecardtop}>

      <img src={card.icon} alt='dv' className={classes.iconboxiconmiddle} />
      <div className={classes.cardtop}>{card.top}</div>
    </div>

      <div className={classes.boxtitlemiddle}>
          {card.title}
          </div>


          <div className={classes.boxdescmiddle}>
        {card.value}
        </div>
          <div className={classes.cardstatusmiddle}>
        {card.status}
        </div>
        
    
    
    </Card>
  );
}