import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

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
  render() {
      return (
        <div>
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />
        </div>
      )
  }
}

export default App;
