const router = require('express').Router();
const Show = require('../models/show.model');

// Get all shows
router.route('/').get((req, res) => {
  Show.find()
    .then((shows) => res.json(shows))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Add new show
router.route('/add').post((req, res) => {
  const {
    name,
    image,
    priceRegular,
    priceVIP,
    description,
    cast,
    videoUrl,
    startTime,
    endTime,
    venue,
    numberOfTickets
  } = req.body;

  const newShow = new Show({
    name,
    image,
    priceRegular,
    priceVIP,
    description,
    cast,
    videoUrl,
    startTime,
    endTime,
    venue,
    numberOfTickets
  });

  newShow
    .save()
    .then(() => res.json('Show added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
