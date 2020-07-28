import app from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.db = app.database();
  }

  // *** Database API ***

  getNotes = (callback) => {
    this.db.ref().child('notes').on('value', callback);
  };

  createNote = (title, content, color) => {
    const id = this.db.ref().child('notes').push().key;
    return this.db.ref('notes').push({ id, title, content, color });
  };

  deleteNote = (id, callback) => {
    this.db
      .ref('notes')
      .orderByChild('id')
      .equalTo(id)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          this.db.ref('notes').child(childSnapshot.key).remove();
        });
        typeof callback === 'function' && callback();
      });
  };

  updateNote = (id, title, content, color, callback) => {
    this.db
      .ref('notes')
      .orderByChild('id')
      .equalTo(id)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          this.db
            .ref('notes')
            .child(childSnapshot.key)
            .update({ title, content, color });
        });

        typeof callback === 'function' && callback();
      });
  };
}

export default Firebase;
