'use strict';

import {Document, Schema, model} from 'mongoose';

export interface IPerson extends Document {
  name: string;
  story: string;
}

export interface IPost extends Document {
  title: string;
  topics: Array<IPerson>;
}

export const PersonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
},
  {
    timestamps: true,
    strict: false
  });

export const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: { type: Schema.Types.ObjectId, ref: 'Person' }
},
  {
    timestamps: true
  });

export const Person = model<IPerson>('Person', PersonSchema);
export const Post = model<IPost>('Post', PostSchema);
