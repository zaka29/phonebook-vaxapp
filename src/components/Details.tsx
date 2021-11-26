import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PhoneIcon from '@mui/icons-material/Phone';
import IconButton from "@mui/material/IconButton";
import { grey } from "@mui/material/colors";

const useStyles = makeStyles({
  backButton: {
    marginBottom: 0,
    position: 'absolute',
    left: '80px',
    top: '80px',
  },
  phoneIcon: {
    color: grey.A400,
    marginBottom: '-3px',
  },
});

interface Contact {
  name: string,
  lastName: string,
  phoneNumber: string,
  avatar: string,
}

interface Props {
  contact?: Contact
}

const ContactDetails: React.FC<Props> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const { state } = location;
  const {name, lastName, phoneNumber} = state;

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
    >
      <div className={classes.backButton}>
        <IconButton onClick={() => navigate('/')} aria-label="delete">
          <KeyboardBackspaceIcon fontSize="large" />
        </IconButton>
      </div>
      <Typography variant="h3">
        {name} {lastName}
      </Typography>
      <Typography color={grey.A700} variant="h5">
        <PhoneIcon className={classes.phoneIcon} /> {phoneNumber}
      </Typography>

    </Stack>
  )
}

export default ContactDetails
