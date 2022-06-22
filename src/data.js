export const categories = [
	{
		id: 1001,
		name: 'Breakfast',
	},
	{
		id: 1002,
		name: 'Lunch',
	},
	{
		id: 1003,
		name: 'Snack',
	},
	{
		id: 1004,
		name: 'Dinner',
	},
]

export const menu = [
	{
		id: 2001,
		categories: '1002, 1004',
		name: 'Bagnet',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora recusandae earum itaque harum nihil, quod vero quaerat tenetur dolore veniam sapiente fuga mollitia nostrum eum placeat similique rem doloribus. Commodi.',
		image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
		price: 530.0,
		stocks: 10,
	},
	{
		id: 2002,
		categories: '1001, 1004',
		name: 'Binagoongan',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora recusandae earum itaque harum nihil, quod vero quaerat tenetur dolore veniam sapiente fuga mollitia nostrum eum placeat similique rem doloribus. Commodi.',
		image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
		price: 495.0,
		stocks: 5,
	},
]

export const discounts = [
	{
		id: 3001,
		name: 'Senior Citizen Discount',
		percentage: 20,
	},
]
