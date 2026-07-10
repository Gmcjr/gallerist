const express = require('express');

const userArtRouter = express.Router();

const { UserArt } = require('../db/index');

userArtRouter.post('/db/drawings', (req, res) => {
  const { name, googleId } = req.user.doc;
  const { art } = req.body;

  UserArt.create({
    ...art,
    userGallery: { name, googleId },
    artist: name,
    culture: 'User Art',
  })
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error('Failed to create user created art document: ', err);
      res.sendStatus(500);
    });
});

userArtRouter.get('/db/drawings', (req, res) => {
  const { googleId } = req.user.doc;

  UserArt.find({ 'userGallery.googleId': googleId })
    .then((art) => res.status(200).json(art))
    .catch((err) => {
      console.error('Failed to fetch user created art: ', err);
      res.sendStatus(500);
    });
});

userArtRouter.put('/db/drawings/:id', (req, res) => {
  const { googleId } = req.user.doc;
  const { art } = req.body;

  UserArt.findById(req.params.id)
    .then((doc) => {
      if (!doc) return res.sendStatus(404);
      if (doc.userGallery.googleId !== googleId) return res.sendStatus(403);
      if (doc.isForSale) return res.sendStatus(409);

      Object.assign(doc, art);
      return doc.save()
        .then(() => res.sendStatus(204));
    })
    .catch((err) => {
      console.error('Failed to update user created art document: ', err);
      res.sendStatus(500);
    });
});

userArtRouter.get('/db/drawings/:id', (req, res) => {
  const { googleId } = req.user.doc;

  UserArt.findById(req.params.id)
    .then((doc) => {
      if (!doc) return res.sendStatus(404);
      if (doc.userGallery.googleId !== googleId) return res.sendStatus(403);
      return res.status(200).json(doc);
    })
    .catch((err) => {
      console.error('Failed to fetch user created art document: ', err);
      res.sendStatus(500);
    });
});
