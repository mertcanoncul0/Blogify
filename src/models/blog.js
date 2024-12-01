'use strict'

const { Schema, model, SchemaTypes } = require('mongoose')

const blogSchema = new Schema(
  {
    banner: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    reaction: {
      type: Number,
      default: 0,
    },
    readingTime: {
      type: Number,
      default: 0,
    },
    totalBookmark: {
      type: Number,
      default: 0,
    },
    totalVisit: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Blog', blogSchema)
