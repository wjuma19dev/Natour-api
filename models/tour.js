class Tour {
	id
	name
	duration
	maxGroupSize
	difficulty
	ratingsAverage
	ratingsQuantity
	price
	summary
	description
	imageCover
	images
	startDates

	constructor(
		id,
		name,
		duration,
		difficulty,
		price,
		maxGroupSize,
		ratingsAverage,
		ratingsQuantity,
		summary,
		description,
		imageCover,
		images,
		startDates,
	) {
		this.id = id
		this.name = name
		this.duration = duration
		this.maxGroupSize = 10
		this.difficulty = difficulty
		this.ratingsAverage = 4.3
		this.ratingsQuantity = 62
		this.price = price
		this.summary =
			'Breathtaking hike through the Canadian Banff National Park'
		this.description =
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		this.imageCover = 'tour-1-cover.jpg'
		this.images = ['tour-1-1.jpg', 'tour-1-2.jpg', 'tour-1-3.jpg']
		this.startDates = [
			'2021-04-25,10:00',
			'2021-07-20,10:00',
			'2021-10-05,10:00',
		]
	}
}

module.exports = Tour
