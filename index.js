const contacts = require('./contacts');
const { program } = require('commander');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      try {
        const allContacts = await contacts.listContacts();
        return console.table(allContacts);
      } catch (error) {
        console.log(error.message);
      }

    case 'get':
      try {
        const oneContact = await contacts.getContactById(id);
        return console.log(oneContact);
      } catch (error) {
        console.log(error.message);
      }
    case 'remove':
      try {
        const deleteContact = await contacts.removeContact(id);
        return console.log(deleteContact);
      } catch (error) {
        console.log(error.message);
      }
    case 'add':
      try {
        const newContact = await contacts.addContact({ name, email, phone });
        return console.log(newContact);
      } catch (error) {
        console.log(error.message);
      }
    case 'updateById':
      try {
        const updateContact = await contacts.updateContact(id, {
          name,
          email,
          phone,
        });
        return console.table(updateContact);
      } catch (error) {
        console.log(error.message);
      }
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
