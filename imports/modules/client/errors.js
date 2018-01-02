import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Errors = new Mongo.Collection(null);

Errors.attachSchema(new SimpleSchema({
  message: {
    type: String,
  },
}));

export const throwError = (message) => {
  Errors.insert({ message });
};
