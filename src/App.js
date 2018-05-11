import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    contacts:  []
  }
  // recupero i dati
  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState({
          contacts
        })
      });
  }
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id;
      })
    }))

    // rimuovo il contatto anche dal DB remoto
    ContactsAPI.remove(contact);
  }
  // method for create a contact
  createContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact) => {
        this.setState((currentState) => {
          contacts: currentState.contacts.concat([contact])
        })
      })
  }
  render() {
      return (
        <div>
          <Route exact path='/' render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
            />
          )} />
          <Route path='/create' render={({ history } ) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.createContact(contact);
                // redirect to the home
                history.push('/');
              }}
            />
          )}
          />
        </div>
      )
  }
}

export default App;
