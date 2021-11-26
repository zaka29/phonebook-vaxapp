import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import Stack from '@mui/material/Stack';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { getContacts, Contact } from "./data";

const availableFields = [
  {name: 'name', label: 'First name'},
  {name: 'lastName', label: 'Last name'},
  {name: 'phoneNumber', label: 'Phone number'}
];

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

const ContactsList: React.FC = () => {
  const  classes = useStyles();
  const navigate = useNavigate();
  const dirty = useRef(false);

  const [searchCriteria, setSearchCriteria] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactsToRender, setContactsTorender] = useState<Contact[]>([]);
  const [open, setOpen] = useState(false);
  const [dialogFields, setDialogFields] = useState<DialogFields>({});
  const [errors, setErrors] = useState<string[]>([]);

  const toggleDialog = () => {
    setOpen((prevState) => {
      // start clean fields on each dialog opens
      if(!prevState) {
        dirty.current = false;
        setErrors([]);
      }
      return !prevState
    })
  }

  const handleContactClick = (contact: Contact) => {
    navigate('/details', {state: contact})
  }

  const onSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setSearchCriteria(value);
  }

  const handleDialogFieldChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setDialogFields({...dialogFields, [name]: value });
  }

  const validateFields = (fields: DialogFields): string[] => {
    let errors = [];
    for (const field of availableFields) {
      if(!fields[field.name]) {
        errors.push(field.name);
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
    localStorage.setItem('contacts', JSON.stringify([...contacts, {name, lastName, phoneNumber}]));
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

  const sortContacts = (items: Contact[]): Contact[] => {
    return items.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
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
  }, [dialogFields]);

  useEffect(() => {
    if (searchCriteria.trim().length) {
      const searchResult = searchContact(searchCriteria);
      setContactsTorender(sortContacts(searchResult));
    } else {
      setContactsTorender(sortContacts(contacts));
    }
  }, [searchCriteria]);

  useEffect(() => {
    if(contacts.length) {
      setContactsTorender(sortContacts(contacts));
    }
  }, [contacts])

  useEffect(() => {
    const persistent = localStorage.getItem('contacts');
    if(persistent === null) {
      localStorage.setItem('contacts', JSON.stringify(getContacts()))
      setContacts(getContacts())
    } else {
      setContacts(JSON.parse(persistent))
    }

  },[]);

  return (
    <>
      <Stack
        className={classes.stack}
        direction="row"
        spacing={1}
        justifyContent="space-between"
      >
        <TextField
          size="small"
          onChange={onSearchChange}
          fullWidth
          label="Search"
          variant="outlined"
        />
        <div>
          <IconButton onClick={toggleDialog} aria-label="delete">
            <AddIcon />
          </IconButton>
        </div>
      </Stack>

      <div>
        {contactsToRender.length
          ? (
            <List>
              {contactsToRender.map((contact, i) => {
                return (
                  <ListItem key={i} disablePadding>
                    <ListItemButton
                      onClick={() => handleContactClick(contact)}
                    >
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
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={toggleDialog}
      >
        <DialogTitle>Add new contact</DialogTitle>
        <DialogContent>
          {availableFields.map(field => {
            return (
              <TextField
                key={field.name}
                margin="normal"
                error={errors.includes(field.name)}
                name={field.name}
                label={field.label}
                type="text"
                fullWidth
                variant="outlined"
                size="small"
                value={dialogFields[field.name] || ''}
                onChange={handleDialogFieldChange}
              />
            )
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>Cancel</Button>
          <Button onClick={handleAddContact}>Add Contact</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ContactsList
