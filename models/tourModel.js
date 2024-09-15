const { Schema, model } = require('mongoose')

const tourSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			require: [true, 'Name is required'],
		},
		duration: Number,
		maxGroupSize: {
			type: Number,
			require: [true, 'Tour must have a max group size'],
		},
		difficulty: { type: String, enum: ['easy', 'medium', 'difficult'] },
		ratingAverage: { type: Number, default: 0 },
		ratingQuantity: { type: Number, default: 0 },
		price: { type: Number, require: [true, 'Tour must have a price'] },
		summary: { type: String, require: [true, 'Tour must have a summary'] },
		description: {
			type: String,
			require: [true, 'Tour must have a description'],
		},
		imageCover: {
			type: String,
			require: [true, 'Tour must have a cover image'],
		},
		images: [String],
		startDates: [Date],
	},
	{
		timestamps: true,
	}
)

const Tour = model('Tour', tourSchema)

module.exports = Tour
