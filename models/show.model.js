const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const showSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  priceRegular: { type: Number, required: true },
  priceVIP: { type: Number, required: true },
  priceCouple: { type: Number, required: true },
  priceGroupOf5: { type: Number, required: true },
  priceAdvance: { type: Number, required: true },
  description: { type: String, required: true },
  cast: { type: [String], required: true },
  videoUrl: { type: String, required: true },
  occurrences: [{
    dayOfWeek: { type: String, required: true }, // e.g., "Monday", "Tuesday", etc.
    timings: [{
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true }
    }]
  }],
  venue: { type: String, required: true },
  numberOfTickets: { type: Number, required: true },
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
