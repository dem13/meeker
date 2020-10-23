import {Meteor} from "meteor/meteor";
import {AccountsCollection} from "../db/AccountsCollection";

Meteor.publish('accounts', () => AccountsCollection.find({userId: Meteor.userId()}))
