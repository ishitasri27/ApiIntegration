import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, Grid } from '@mui/material';
import './ApiIntegration.css';

const ApiIntegration = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.gyanibooks.com/library/get_dummy_notes')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Notes
      </Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {data.length === 0 ? (
            <Typography align="center">No notes found.</Typography>
          ) : (
            <Grid container spacing={2}>
              {data.map(note => (
                <Grid item xs={12} sm={6} md={4} key={note.id}>
                <Box className="note-box">
                  <Typography className="note-title" variant="h6" gutterBottom>
                    {note.title}
                  </Typography>
                  <Typography className="note-description" variant="body2">
                    {note.description}
                  </Typography>
                </Box>
              </Grid>              
              ))}
            </Grid>
            
          )}
        </>
      )}
    </Container>
  );
};

export default ApiIntegration;
