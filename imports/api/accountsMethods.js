import {check} from "meteor/check";
import {AccountsCollection} from "../db/AccountsCollection";
import {decrypt, encrypt} from '../helpers/encryptor';

Meteor.methods({
  async 'accounts.decrypt'({_id, secret}) {
    check(_id, String);
    check(secret, String);

    const account = AccountsCollection.findOne({_id, userId: Meteor.userId()})

    try {
      const password = await decrypt(account.password, secret);

      return Buffer.from(password).toString('base64');
    } catch (err) {
      throw new Meteor.Error('accounts.decrypt.bad_decrypt');
    }
  },

  async 'accounts.insert'(accountData) {
    check(accountData, {
      title: String,
      password: String,
      secret: String,
    });

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    accountData.password = await encrypt(accountData.password, accountData.secret);

    delete accountData.secret;

    AccountsCollection.insert({
      ...accountData,
      createdAt: new Date,
      userId: this.userId,
    });
  },

  async 'accounts.remove' (_id) {
    check(_id, String);

    return AccountsCollection.remove({_id, userId: Meteor.userId()});
  }
});
