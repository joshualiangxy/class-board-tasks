import emailToUidCollectionRef from './firestore/emailToUid';
import userCollectionRef from './firestore/users';
import groupCollectionRef from './firestore/groups';

export const collection = jest.fn(collectionName => {
  switch (collectionName) {
    case 'users':
      return userCollectionRef;
    case 'emailToUid':
      return emailToUidCollectionRef;
    case 'groups':
      return groupCollectionRef;
  }
});

export const FieldValue = { delete: jest.fn() };

const firestore = jest.fn(() => ({ collection }));
firestore.FieldValue = FieldValue;

export default firestore;
