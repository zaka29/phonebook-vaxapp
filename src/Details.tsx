import React, {useState} from 'react';
import { red } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

interface Contact {
  name: string,
  lastName: string,
  phoneNumber: string,
  avatar: string,
}

interface Props {
  contact: Contact
}

const ContactDetails: React.FC<Props> = ({ contact }) => {

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {contact.name.charAt(0)}
            </Avatar>
          }
          title={`${contact.name} ${contact.lastName}`}
          subheader={`${contact.phoneNumber}`}
        />
      </Card>
    </>
  )
}

export default ContactDetails
