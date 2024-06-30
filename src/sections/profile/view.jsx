import React from "react";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import EditIcon from "@mui/icons-material/Edit";

const styles = {
  card: {
    padding: "20px",
    width: "100%", /* Occupy full width of container */
    maxWidth: "600px", /* Set maximum width to prevent stretching too much */
    margin: "auto",
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.2)" /* Subtle shadow effect */
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px"
  },
  avatar: {
    width: "70px",
    height: "70px",
    marginRight: "20px"
  },
  editButton: {
    marginLeft: "auto"
  },
  section: {
    marginBottom: "20px"
  },
  label: {
    color: "#899499",
    marginBottom: "5px"
  },
  value: {
    fontWeight: "bold"
  }
}   

const ProfileView = (props) => 
    <Card style={styles.card}>
      <Grid container spacing={2} style={styles.header}>
        <Grid item>
          <Avatar
            src="https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png"
            style={styles.avatar}
          />
        </Grid>
        <Grid item>
          <Typography variant="h6">Thomas Smith</Typography>
          <Typography color="textSecondary">CEO & Co-Founder</Typography>
        </Grid>
        <Grid item>
          <IconButton style={styles.editButton}>
            {/* <EditIcon /> */}
          </IconButton>
        </Grid>
      </Grid>

      <div style={styles.section}>
        <Typography variant="subtitle1" color="textPrimary">
          Personal Information
        </Typography>
      </div>

      <Grid container spacing={2} style={styles.section}>
        <Grid item xs={6}>
          <Typography style={styles.label}>First Name</Typography>
          <Typography style={styles.value}>Thomas</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography style={styles.label}>Last Name</Typography>
          <Typography style={styles.value}>Smith</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography style={styles.label}>Email</Typography>
          <Typography style={styles.value}>thomas.smith@akrobat.com</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography style={styles.label}>Phone</Typography>
          <Typography style={styles.value}>+1 817 718 8273</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography style={styles.label}>Bio</Typography>
          <Typography style={styles.value}>
            CEO and Co-Founder of Akrobat Design Studio
          </Typography>
        </Grid>
      </Grid>
    </Card>
 
export default ProfileView;
