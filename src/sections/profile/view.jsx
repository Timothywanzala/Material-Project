import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import AppCurrentVisits from '../overview/app-member';
import AppWebsiteVisits from '../overview/app-website-visits';
import AppWidgetSummary from '../overview/app-widget-summary';


const ProfileView = () => 
      <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, you&apos;re welcome 👋
          </Typography>
    
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total Participants"
                total={0}
                color="success"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
              />
            </Grid>
    
            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="New Participants"
                total={0}
                color="info"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
              />
            </Grid>
    
            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Engagements"
                total={0}
                color="warning"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
              />
            </Grid>
    
            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Retatained Participants"
                total={0}
                color="error"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
              />
            </Grid>
    
            <Grid xs={12} md={6} lg={8}>
              <AppWebsiteVisits
                title="Event Participation"
               
                chart={{
                  labels: [
                    '01/01/2003',
                    '02/01/2003',
                    '03/01/2003',
                    '04/01/2003',
                    '05/01/2003',
                    '06/01/2003',
                    '07/01/2003',
                    '08/01/2003',
                    '09/01/2003',
                    '10/01/2003',
                    '11/01/2003',
                  ],
                  series: [
                    {
                      name: 'Participation Rates',
                      type: 'column',
                      fill: 'solid',
                      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                    },
                    {
                      name: 'Frequency Of Particpatio',
                      type: 'area',
                      fill: 'gradient',
                      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                    },
                  ],
                }}
              />
            </Grid>
    
            <Grid>
            <Grid xs={12} md={6} lg={4}>
               <AppCurrentVisits
                title="Members And Non-Members"
                chart={{
                  series: [
                    { label: 'Non-Member', value: 4344 },
                    { label: 'Member', value: 5435 }
                  ]
                }} /> 
              </Grid>
            </Grid>
            </Grid>

        </Container>



export default ProfileView
