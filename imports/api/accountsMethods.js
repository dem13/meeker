import {check} from "meteor/check";
import {AccountsCollection} from "../db/AccountsCollection";

Meteor.methods({
  'accounts.insert'(accountData) {
    check(accountData, {
      title: String,
      password: String,
      secret: String,
    });

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    /**
     * @todo Encrypt password
     *
     * @type {string}
     */
    accountData.password = "encrypted"

    delete accountData.secret;

    AccountsCollection.insert({
      ...accountData,
      createdAt: new Date,
      userId: this.userId,
    });
  }
});
