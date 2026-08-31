// Flower Studio Live Data Config & Sector Helpers

export const categories = [
  { id: 'all', name: 'All Collection', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=300' },
  { id: 'flower', name: 'Fresh Flowers', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=300' },
  { id: 'hamper', name: 'Gift Hampers', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=300' },
  { id: 'cake', name: 'Delicious Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=300' },
  { id: 'plants', name: 'Gift Plants', image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=300' },
  { id: 'pooja', name: 'Pooja Items', image: 'https://images.unsplash.com/photo-1534009502677-4e5080efa8c6?auto=format&fit=crop&q=80&w=300' }
];

// All static demo product cards removed! Products are fetched live from API via TanStack Query.
export const products = [];

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
