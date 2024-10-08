import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{  
  console.error('putDb not implemented');

const contactDb = await openDB('contact', 1);

const tx = contactDb.transaction('contact', 'readWrite');

const store = tx.objectStore('contact');

const result = await request;
console.log('its saved to db', result);

};;

const request = store.add({ content });

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {    
  console.error('getDb not implemented');

  const contactDb = await openDB('contact', 1);

  const tx = contactDb.transaction('contact', 'readonly');

  const store = tx.objectStore('contact');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
};


initdb();
