import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function ErrorMessage({ message, title }) {
  return (
    <Alert severity="error">
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  );
}

export default ErrorMessage;
