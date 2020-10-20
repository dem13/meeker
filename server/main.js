import { Meteor } from 'meteor/meteor';
import { AccountCollection } from '/imports/api/AccountCollection';

function insertAccount({ title }) {
  AccountCollection.insert({title, createdAt: new Date()});
}

Meteor.startup(() => {
  if (AccountCollection.find().count() === 0) {
    [
      'Blockchain',
      'Telegram',
      'Gmail',
      'Medium',
      'Amazon',
      'Microsoft'
    ].forEach(title => insertAccount({title}))
  }
});
