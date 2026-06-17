// Flower Studio Mock Data

export const categories = [
  { id: 'all', name: 'All Collection', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=150' },
  { id: 'flowers', name: 'Fresh Flowers', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=150' },
  { id: 'bouquets', name: 'Bouquets', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=150' },
  { id: 'hampers', name: 'Gift Hampers', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=150' },
  { id: 'cakes', name: 'Delicious Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=150' },
  { id: 'plants', name: 'Gift Plants', image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=150' },
  { id: 'pooja', name: 'Pooja Items', image: 'https://images.unsplash.com/photo-1534009502677-4e5080efa8c6?auto=format&fit=crop&q=80&w=150' }
];

export const products = [
  // Fresh Flowers & Bouquets
  {
    id: 'f1',
    name: 'Artificial Red Flowers',
    category: 'bouquets',
    price: 399,
    rating: 4.8,
    reviewsCount: 42,
    image: '/art_red_flower.jpg',
    images: [
      '/art_red_flower.jpg'
    ],
    description: 'Artificial red flowers for home decoration.',
    features: ['Artificial Red Flowers', 'Premium artificial flowers', 'Eco-friendly wrapping paper', 'Free message card included'],
    inStock: true
  },
  {
    id: 'f2',
    name: 'Artificial Pink Roses',
    category: 'bouquets',
    price: 499,
    rating: 4.7,
    reviewsCount: 28,
    image: '/art_pink_rose.png',
    images: [
      '/art_pink_rose.png'
    ],
    description: 'Artificial pink roses for home decoration.',
    features: ['Artificial Pink Roses', 'Premium artificial flowers', 'Eco-friendly wrapping paper', 'Free message card included'],
    inStock: true
  },
  {
    id: 'f3',
    name: 'Artificial Light Pink Roses',
    category: 'flowers',
    price: 499,
    rating: 4.6,
    reviewsCount: 19,
    image: 'art_lite_pink_rose_1.jpg',
    images: [
      '/art_lite_pink_rose_1.jpg',
      '/art_lite_pink_rose_2.jpg'
    ],
    description: 'Artificial light pink roses for home decoration.',
    features: ['Artificial Light Pink Roses', 'Premium artificial flowers', 'Eco-friendly wrapping paper', 'Free message card included'],
    inStock: true
  },
  {
    id: 'f4',
    name: 'Classic Red Roses Bouquet',
    category: 'flowers',
    price: 1199,
    rating: 4.9,
    reviewsCount: 33,
    image: 'classic_red_roses_bouquet.png',
    images: [
      'classic_red_roses_bouquet.png'
    ],
    description: 'A gorgeous arrangement of 12 handpicked premium red roses wrapped in elegant craft paper. Perfect for expressing love and gratitude.',
    features: ['12 Premium Red Roses', 'Gypsophila Fillers', 'Eco-friendly wrapping paper', 'Free message card included'],
    inStock: true
  },
  
  // Hampers
  {
    id: 'h1',
    name: 'Luxury Celebration Gift Hamper',
    category: 'hampers',
    price: 2499,
    rating: 4.9,
    reviewsCount: 15,
    image: '/ham_blue_bear.jpg',
    images: [
      '/ham_blue_bear.jpg'
    ],
    description: 'The ultimate gifting combo consisting of fresh carnations, premium chocolates, a jar of mixed nuts, and a cute teddy bear.',
    features: ['Carnation bouquet', 'Premium Ferrero Rocher Box (16 Pcs)', 'Salted Almonds & Cashews (200g each)', 'Fluffy 6-inch Teddy Bear', 'Handwoven wicker basket'],
    inStock: true
  },
  {
    id: 'h2',
    name: 'Fruit & Flower Wellness Basket',
    category: 'hampers',
    price: 1599,
    rating: 4.7,
    reviewsCount: 22,
    image: '/ham_pink_smbear_1.jpg',
    images: [
      '/ham_pink_smbear_1.jpg',
      '/ham_pink_smbear_2.jpg'
    ],
    description: 'Send healing thoughts and warm wishes with a basket loaded with seasonal fresh fruits and fragrant marigolds and roses.',
    features: ['3kg fresh premium fruits (Apples, Grapes, Pears, Oranges)', 'Orange Gerbera & Rose borders', 'Sturdy wooden crate', 'Get Well Soon card'],
    inStock: true
  },
  
      {
    id: 'h3',
    name: 'Fruit & Flower Wellness Basket',
    category: 'hampers',
    price: 1599,
    rating: 4.7,
    reviewsCount: 22,
    image: '/ham_pink_flbear.jpg',
    images: [
      '/ham_pink_flbear.jpg'
    ],
    description: 'Send healing thoughts and warm wishes with a basket loaded with seasonal fresh fruits and fragrant marigolds and roses.',
    features: ['3kg fresh premium fruits (Apples, Grapes, Pears, Oranges)', 'Orange Gerbera & Rose borders', 'Sturdy wooden crate', 'Get Well Soon card'],
    inStock: true
  },

      {
    id: 'h4',
    name: 'Fruit & Flower Wellness Basket',
    category: 'hampers',
    price: 1599,
    rating: 4.7,
    reviewsCount: 22,
    image: '/ham_kitkat.jpg',
    images: [
      '/ham_kitkat.jpg'
    ],
    description: 'Send healing thoughts and warm wishes with a basket loaded with seasonal fresh fruits and fragrant marigolds and roses.',
    features: ['3kg fresh premium fruits (Apples, Grapes, Pears, Oranges)', 'Orange Gerbera & Rose borders', 'Sturdy wooden crate', 'Get Well Soon card'],
    inStock: true
  },

  
  // Plants
  {
    id: 'p1',
    name: 'Peace Lily Air-Purifying Plant',
    category: 'plants',
    price: 449,
    rating: 4.5,
    reviewsCount: 51,
    image: '/pl_sm_1.jpg',
    images: [
      '/pl_sm_1.jpg',
      '/pl_sm_2.jpg'
    ],
    description: 'Breathe clean air with the beautiful Peace Lily plant in a designer white ceramic pot. Known for its gorgeous white spade blooms.',
    features: ['Live Peace Lily Plant', 'Self-watering plastic inner pot', 'White Ceramic outer pot', 'Low-maintenance & air-filtering'],
    inStock: true
  },
  {
    id: 'p2',
    name: 'Grafted Bonsai Ficus Plant',
    category: 'plants',
    price: 1299,
    rating: 4.8,
    reviewsCount: 14,
    image: '/pl_lg_1.jpg',
    images: [
      '/pl_lg_1.jpg',
      '/pl_lg_2.jpg'
    ],
    description: 'An elegant Ficus microcarpa Bonsai with thick twisted trunks and lush green leaves. Represents good fortune and peace.',
    features: ['5-year-old Bonsai Plant', 'Traditional clay pot', 'Detailed care instruction booklet', 'Excellent corporate gift choice'],
    inStock: true
  },

    {
    id: 'p3',
    name: 'Grafted Bonsai Ficus Plant',
    category: 'plants',
    price: 1299,
    rating: 4.8,
    reviewsCount: 14,
    image: '/pl_sm_dec_1.jpg',
    images: [
      '/pl_sm_dec_1.jpg',
      '/pl_sm_dec_2.jpg'
    ],
    description: 'An elegant Ficus microcarpa Bonsai with thick twisted trunks and lush green leaves. Represents good fortune and peace.',
    features: ['5-year-old Bonsai Plant', 'Traditional clay pot', 'Detailed care instruction booklet', 'Excellent corporate gift choice'],
    inStock: true
  },
  
      {
    id: 'p4',
    name: 'Grafted Bonsai Ficus Plant',
    category: 'plants',
    price: 1299,
    rating: 4.8,
    reviewsCount: 14,
    image: '/pl_money_1.jpg',
    images: [
      '/pl_money_1.jpg',
      '/pl_money_2.jpg'
    ],
    description: 'An elegant Ficus microcarpa Bonsai with thick twisted trunks and lush green leaves. Represents good fortune and peace.',
    features: ['5-year-old Bonsai Plant', 'Traditional clay pot', 'Detailed care instruction booklet', 'Excellent corporate gift choice'],
    inStock: true
  },
  // Pooja Items
  
];

export const initialTestimonials = [
  {
    id: 't1',
    name: 'Ramanjeet Singh',
    location: 'Sector 35, Chandigarh',
    rating: 5,
    comment: 'Ordered the Red Roses bouquet and Chocolate Cake for my wife\'s birthday. Delivery was prompt, right on time, and the flowers were incredibly fresh! The cake was delicious and soft. Strongly recommend Flower Studio!',
    date: 'June 10, 2026'
  },
  {
    id: 't2',
    name: 'Priya Sharma',
    location: 'Sector 15, Chandigarh',
    rating: 5,
    comment: 'For Diwali, I ordered their Marigold Garlands and Lotus flowers for pooja. Outstanding quality! The flowers were freshly picked and stayed fresh for two whole days. The customer support on WhatsApp was extremely helpful.',
    date: 'May 24, 2026'
  },
  {
    id: 't3',
    name: 'Aditya Gupta',
    location: 'Sector 22, Chandigarh',
    rating: 4,
    comment: 'Excellent selection of corporate hampers. Sent Ficus Bonsai plants to our clients in Sector 17. The packing was premium and clients loved the plants. Solid 2-day delivery as promised.',
    date: 'April 15, 2026'
  }
];

// Chandigarh sector database for validating pincodes
export const chandigarhSectors = {
  '160001': 'Sector 1',
  '160002': 'Sector 2, 3, 4 & Industrial Area Phase I',
  '160005': 'Sector 5 & 6',
  '160008': 'Sector 7 & 8',
  '160009': 'Sector 9',
  '160010': 'Sector 10 & 11',
  '160012': 'Sector 12 (PGIMER)',
  '160014': 'Sector 14 (Panjab University)',
  '160015': 'Sector 15',
  '160017': 'Sector 17 (City Center)',
  '160018': 'Sector 18',
  '160019': 'Sector 19 & 26',
  '160020': 'Sector 20',
  '160021': 'Sector 21',
  '160022': 'Sector 22',
  '160023': 'Sector 23 & 24',
  '160025': 'Sector 25',
  '160029': 'Sector 29, 30 & 29B (Flower Studio Locality)',
  '160030': 'Sector 31 & Industrial Area Phase II',
  '160031': 'Sector 31',
  '160032': 'Sector 32 (GMCH)',
  '160033': 'Sector 33',
  '160034': 'Sector 34',
  '160035': 'Sector 35 & 36',
  '160036': 'Sector 36',
  '160038': 'Sector 37 & 38',
  '160047': 'Sector 47 & 48',
  '160101': 'Mani Majra & Modern Housing Complex',
  '160102': 'Mauli Jagran & Daria'
};

export const validatePincode = (pincode) => {
  const cleanPin = pincode.trim();
  if (!/^\d{6}$/.test(cleanPin)) {
    return {
      valid: false,
      message: 'Please enter a valid 6-digit postal code.'
    };
  }
  
  if (cleanPin.startsWith('160')) {
    const sector = chandigarhSectors[cleanPin] || 'Chandigarh Region';
    return {
      valid: true,
      sector,
      message: `Verified! Flower Studio delivers to ${sector} in 2-3 days.`
    };
  }
  
  return {
    valid: false,
    message: 'We currently deliver exclusively to Chandigarh region pin codes (starting with 160).'
  };
};
