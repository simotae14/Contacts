import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {
  state = {
    contacts:  [],
    screen: 'create'
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
          {this.state.screen === 'list' &&
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
              />
          }
          {this.state.screen === 'create' &&
            <CreateContact />
          }
        </div>
      )
  }
}

export default App;
