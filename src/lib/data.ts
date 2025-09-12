import type {
  BlogPost,
  Product,
  Testimonial,
  Plant,
  Category,
  Feature,
} from './types';

export const testimonials: Testimonial[] = [
  {
    name: 'Alex Johnson',
    title: 'Rooftop Gardener',
    quote:
      'UrbanEos AI transformed my barren rooftop into a lush vegetable garden. The AI recommendations were spot on for my location!',
    imageId: 'testimonial-1',
  },
  {
    name: 'Maria Garcia',
    title: 'Apartment Dweller',
    quote:
      "I never thought I could garden in my small apartment. The blog posts gave me amazing ideas for vertical gardening. I'm so proud of my herb wall!",
    imageId: 'testimonial-2',
  },
  {
    name: 'Sam Chen',
    title: 'Beginner Gardener',
    quote:
      'As a total beginner, the health tracker is a lifesaver. It reminds me when to water and I can actually see my plants growing. Highly recommend!',
    imageId: 'testimonial-3',
  },
];

export const userPlants: Plant[] = [
  {
    id: 'plant-1',
    name: 'Sunny',
    species: 'Sansevieria trifasciata',
    lastWatered: '5 days ago',
    imageId: 'user-plant-1',
  },
  {
    id: 'plant-2',
    name: 'Figaro',
    species: 'Ficus lyrata',
    lastWatered: '2 days ago',
    imageId: 'user-plant-2',
  },
  {
    id: 'plant-3',
    name: 'The Gang',
    species: 'Mixed Succulents',
    lastWatered: '12 days ago',
    imageId: 'user-plant-3',
  },
];

export const categories: Omit<Category, 'id'>[] = [
  {
    name: 'Seeds',
    description: 'Heirloom & organic varieties',
    icon: 'Sprout',
  },
  {
    name: 'Tools',
    description: 'Modern gardening equipment',
    icon: 'Wrench',
  },
  { name: 'Kits', description: 'Complete growing solutions', icon: 'Package' },
  { name: 'Soil & Care', description: 'Nutrients & fertilizers', icon: 'Sprout' },
  {
    name: 'Containers',
    description: 'Pots and planters',
    icon: 'Container',
  },
];

export const features: Feature[] = [
  {
    name: '100% Organic',
    description: 'Certified organic products for healthy growing',
    icon: 'Leaf',
  },
  {
    name: 'Fast Shipping',
    description: 'Free shipping on orders over $50',
    icon: 'Ship',
  },
  {
    name: 'Expert Curated',
    description: 'Selected by urban gardening professionals',
    icon: 'Star',
  },
];

export const blogPosts: Omit<BlogPost, 'slug' | 'date'>[] = [
  {
    title: '5 Tips for Successful Balcony Gardening',
    excerpt:
      'Turn your balcony into a green oasis with these five essential tips for container gardening in small spaces.',
    content: `
<p>Having a balcony is a gateway to the world of gardening, even in the heart of a bustling city. Here are five tips to ensure your balcony garden thrives:</p>
<ol>
  <li><strong>Choose the Right Containers:</strong> Make sure your pots have drainage holes. The size matters—bigger pots hold more soil and water, which means less frequent watering for you.</li>
  <li><strong>Know Your Sunlight:</strong> Observe your balcony throughout the day. Does it get scorching afternoon sun or gentle morning light? Choose plants that will thrive in your specific light conditions.</li>
  <li><strong>Wind is a Factor:</strong> Balconies can be windy. Protect delicate plants by placing them near a wall or grouping them with larger, sturdier plants.</li>
  <li><strong>Water Wisely:</strong> Container gardens dry out faster than in-ground gardens. Check the soil moisture regularly, especially on hot or windy days.</li>
  <li><strong>Start Small:</strong> It's exciting to want to grow everything, but starting with a few easy-to-care-for plants like herbs or lettuce will build your confidence and set you up for success.</li>
</ol>
<p>Happy gardening!</p>
`,
    author: 'Jane Doe',
    imageId: 'blog-post-1',
    category: 'Beginner Tips',
  },
  {
    title: "Potting Soils 101: What's the Difference?",
    excerpt:
      'Not all soils are created equal. Learn the difference between potting mix, garden soil, and topsoil to give your plants the best start.',
    content: `
<p>Walking into a garden center can be overwhelming with all the different bags of "dirt." Here's a quick guide:</p>
<ul>
  <li><strong>Potting Mix:</strong> This is what you want for containers. It's a soilless blend of ingredients like peat moss, perlite, and vermiculite, designed to be lightweight, sterile, and provide good drainage and aeration.</li>
  <li><strong>Garden Soil:</strong> This is meant to be mixed with your existing native soil in garden beds. It's denser than potting mix and can compact in containers, choking out roots.</li>
  <li><strong>Topsoil:</strong> This is the upper layer of native soil, used for filling in low spots in a lawn or large areas. It lacks the nutrients and proper texture for container gardening.</li>
</ul>
<p>Using the right medium is the foundation of a healthy plant. For your urban garden, always reach for a quality potting mix.</p>
`,
    author: 'John Smith',
    imageId: 'blog-post-2',
    category: 'Plant Care',
  },
  {
    title: 'The Magic of Composting in the City',
    excerpt:
      'Reduce waste and create "black gold" for your plants. Urban composting is easier than you think!',
    content: `
<p>Composting isn't just for those with large backyards. City dwellers have several options to turn kitchen scraps into nutrient-rich compost:</p>
<dl>
  <dt><strong>Worm Bins (Vermicomposting):</strong></dt>
  <dd>Perfect for apartments, a worm bin is a compact system where red wiggler worms process your food scraps into amazing compost and "worm tea" fertilizer.</dd>
  <dt><strong>Bokashi Bins:</strong></dt>
  <dd>This Japanese method uses fermentation to pickle your kitchen waste in an airtight container. It's fast, odorless, and can handle items traditional composting can't, like meat and dairy.</dd>
  <dt><strong>Community Gardens:</strong></dt>
  <dd>Many cities have community gardens with composting programs where you can drop off your scraps.</dd>
</dl>
<p>By composting, you're not only creating a free, high-quality amendment for your soil but also significantly reducing the amount of waste you send to the landfill.</p>
`,
    author: 'Emily White',
    imageId: 'blog-post-3',
    category: 'Sustainability',
  },
];

export const products: Omit<Product, 'id'>[] = [
  {
    name: 'Organic Tomato Seeds Variety Pack',
    price: 12.95,
    description: 'Premium heirloom tomato seeds perfect for container gardening.',
    imageId: 'product-seeds',
    category: 'Seeds',
    tags: ['Organic'],
    rating: 4.8,
  },
  {
    name: 'Smart Plant Moisture Sensor',
    price: 29.95,
    description:
      'WiFi-enabled soil moisture sensor that sends alerts to your phone when your plants need water.',
    imageId: 'product-tools',
    category: 'Tools',
    rating: 4.5,
  },
  {
    name: 'Organic Herb Garden Kit',
    price: 34.95,
    description:
      'Complete starter kit with basil, cilantro, parsley, and chives. Includes everything you need.',
    imageId: 'product-kit',
    category: 'Kits',
    tags: ['Organic'],
    rating: 4.8,
  },
  {
    name: 'Organic Potting Mix',
    price: 15.0,
    description:
      'A 10L bag of nutrient-rich, organic potting soil ideal for a wide range of plants.',
    imageId: 'product-soil',
    category: 'Soil & Care',
    rating: 4.7,
  },
];
