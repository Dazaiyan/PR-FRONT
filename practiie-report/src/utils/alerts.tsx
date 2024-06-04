import React from 'react';
import { Alert as MuiAlert, AlertProps } from '@mui/material';

const Alert: React.FC<AlertProps> = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default Alert;
