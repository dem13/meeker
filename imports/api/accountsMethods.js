import {check} from "meteor/check";
import {AccountsCollection} from "../db/AccountsCollection";
import {encrypt} from '../helpers/encryptor';

Meteor.methods({
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
  }
});
