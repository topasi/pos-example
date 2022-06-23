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
	{
		id: 1005,
		name: 'Side Dishes',
	},
]

export const menu = [
	{
		id: 2001,
		name: 'Bagnet',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora recusandae earum itaque harum nihil, quod vero quaerat tenetur dolore veniam sapiente fuga mollitia nostrum eum placeat similique rem doloribus. Commodi.',
		image: '',
		price: 530.0,
		stocks: 2,
		categories: [1002, 1004, 1005],
		sizes: ['regular'],
		sideDishes: [],
	},
	{
		id: 2002,
		name: 'Binagoongan',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora recusandae earum itaque harum nihil, quod vero quaerat tenetur dolore veniam sapiente fuga mollitia nostrum eum placeat similique rem doloribus. Commodi.',
		image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
		price: 495.0,
		stocks: 5,
		categories: [1004],
		sizes: ['regular'],
		sideDishes: [],
	},
	{
		id: 2003,
		name: 'Burger',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora recusandae earum itaque harum nihil, quod vero quaerat tenetur dolore veniam sapiente fuga mollitia nostrum eum placeat similique rem doloribus. Commodi.',
		image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
		price: 100.0,
		stocks: 20,
		categories: [1003],
		sizes: ['small', 'regular', 'upsize'],
		sideDishes: [2004, 2005],
	},
	{
		id: 2004,
		name: 'Fries',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora recusandae earum itaque harum nihil, quod vero quaerat tenetur dolore veniam sapiente fuga mollitia nostrum eum placeat similique rem doloribus. Commodi.',
		image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
		price: 50.0,
		stocks: 20,
		categories: [1003],
		sizes: ['regular', 'upsize'],
		sideDishes: [],
	},
	{
		id: 2005,
		name: 'Pepsi Cola',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora recusandae earum itaque harum nihil, quod vero quaerat tenetur dolore veniam sapiente fuga mollitia nostrum eum placeat similique rem doloribus. Commodi.',
		image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
		price: 25.0,
		stocks: 500,
		categories: [1003],
		sizes: ['small', 'regular', 'upsize'],
		sideDishes: [],
	},
]

export const discounts = [
	{
		id: 3001,
		name: 'Senior Citizen Discount',
		percentage: 20,
		isTaxExempted: true,
	},
	{
		id: 3002,
		name: 'All Day Disounts',
		percentage: 10,
		isTaxExempted: false,
	},
]
