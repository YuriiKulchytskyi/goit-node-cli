const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid')

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  return contactsList.find(item => item.id === contactId) || null;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(item => item.id === contactId);
  if (index === -1) return null;
  const [removedContact] = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return removedContact;
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};