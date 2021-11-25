import React, {useEffect, useState, useRef} from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import './App.css';

const useStyles = makeStyles({
  stack: {
    marginTop: '5rem',
    marginBottom: '3rem',
  },
  listContainer: {
    marginTop: '1rem',
  }
});

interface DialogFields {
  [key: string]: string
}

interface Contact {
  name: string,
  lastName: string,
  phoneNumber: string,
  avatar?: string,
}

interface Props {
  contacts: Contact[],
  searchResult: Contact[],
  onSearchChange: (evt: React.ChangeEvent<HTMLInputElement>) => void

}

const ContactsList: React.FC<Props> = ({ contacts, onSearchChange, searchResult }) => {
  if(contacts.length === 0){
    return (
      <Alert severity="info">Click Add contact to start</Alert>
    )
  }

  return (
    <>
      <div>
        <TextField
          onChange={onSearchChange}
          fullWidth
          label="Search"
          variant="outlined"
        />
      </div>

      <div>
        {searchResult.length
          ? (
            <List>
              {searchResult.map(contact => {
                return (
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary={`${contact.name} ${contact.lastName}`} />
                    </ListItemButton>
                  </ListItem>
                )})}
            </List>
          )
          : (
            <Alert severity="info">Such empty</Alert>
          )
        }

      </div>
    </>
  )
}

function App() {
  const  classes = useStyles();
  const dirty = useRef(false);

  const [searchCriteria, setSearchCriteria] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactsToRender, setContactsTorender] = useState<Contact[]>([]);
  const [open, setOpen] = useState(false);
  const [dialogFields, setDialogFields] = useState<DialogFields>({});
  const [errors, setErrors] = useState<string[]>([]);

  const toggleDialog = () => {
    setOpen((prevState) => {
      if(!prevState) {
        dirty.current = false;
      }
      return !prevState
    })
  }

  const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setSearchCriteria(value);
  }

  const handleDialogFieldChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setDialogFields({...dialogFields, [name]: value });
  }

  const validateFields = (fields: DialogFields): string[] => {
    const required = ['name', 'lastName', 'phoneNumber'];
    let errors = [];
    for (const field of required) {
      if(!fields[field]) {
        errors.push(field);
      }
    }
    return errors;
  }

  const handleAddContact = () => {
    if (!dirty.current) {
      dirty.current = true;
    }

    const errs = validateFields(dialogFields);
    if(errs.length) {
      setErrors(errs);
      return
    }

    const {name, lastName, phoneNumber} = dialogFields;

    setContacts([...contacts, {name, lastName, phoneNumber}])
    // clean fields
    setDialogFields({});
    toggleDialog()
  }

  const searchContact = (criteria: string): Contact[] => {
    let res;
    res = contacts.filter(contact => {
      if (contact.phoneNumber.includes(criteria)) {
        return true;
      } else if (contact.name.includes(criteria)) {
        return true;
      } else return contact.lastName.includes(criteria);
    })
    return res;
  }

  useEffect(() => {
    if(dirty.current && Object.keys(dialogFields).length) {
      const errs = validateFields(dialogFields);

      if(errs.length) {
        setErrors(errs);
      } else {
        setErrors([]);
      }
    }
  }, [dialogFields])

  useEffect(() => {
    if(contacts.length) {
      const sortedContacts = [...contacts];
      sortedContacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      setContactsTorender(sortedContacts);
    }
  }, [contacts])

  useEffect(() => {
    if (searchCriteria.trim().length) {
      const searchResult = searchContact(searchCriteria)
        .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      setContactsTorender(searchResult);
    } else {
      const sorted = contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      setContactsTorender(sorted);
    }
  }, [searchCriteria]);

  return (
    <div className="App">
      <Box
        component="form"
        sx={{
          width: 500,
          maxWidth: '100%',
          mx: 'auto',
        }}
        noValidate
        autoComplete="off"
      >
        <Stack
          className={classes.stack}
          direction="row"
          spacing={1}
          justifyContent="space-between"
        >
          <Typography variant="h4" gutterBottom component="div">
            ☎️ Phonebook
          </Typography>
          <div>
            <IconButton onClick={toggleDialog} aria-label="delete">
              <AddIcon />
            </IconButton>
          </div>
        </Stack>

        <ContactsList
          onSearchChange={handleSearchChange}
          contacts={contacts}
          searchResult={contactsToRender}
        />
      </Box >
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={toggleDialog}
      >
        <DialogTitle>Add new contact</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            error={errors.includes('name')}
            name="name"
            label="First name"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            value={dialogFields['name'] || ''}
            onChange={handleDialogFieldChange}
          />
          <TextField
            margin="normal"
            error={errors.includes('lastName')}
            name="lastName"
            label="Last name"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            value={dialogFields['lastName'] || ''}
            onChange={handleDialogFieldChange}
          />
          <TextField
            margin="normal"
            error={errors.includes('phoneNumber')}
            name="phoneNumber"
            label="Phone number"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            value={dialogFields['phoneNumber'] || ''}
            onChange={handleDialogFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>Cancel</Button>
          <Button onClick={handleAddContact}>Add Contact</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
