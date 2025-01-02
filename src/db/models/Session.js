import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

import { handleSaveError, setUpdateOptions } from './hooks.js';

const sessionsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

sessionsSchema.post('save', handleSaveError);

sessionsSchema.pre('findOneAndUpdate', setUpdateOptions);

sessionsSchema.post('findOneAndUpdate', handleSaveError);

const SessionsCollection = models.sessions || model('sessions', sessionsSchema);

export default SessionsCollection;
