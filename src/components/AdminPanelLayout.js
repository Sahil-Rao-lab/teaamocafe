import React from 'react';
import { Container, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AdminPanelLayout = ({ children }) => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* Sidebar */}
          <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            {/* Sidebar content */}
          </nav>
        </Grid>
        <Grid item xs={12}>
          {/* Main content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminPanelLayout;
