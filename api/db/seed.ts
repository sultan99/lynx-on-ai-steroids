import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID ?? 'donuts-api-sa99' })
const db = getFirestore()

const isEmulator = !!process.env.FIRESTORE_EMULATOR_HOST
const isForced = process.argv.includes('--force')

if (!isEmulator && !isForced) {
  console.error(
    'Refusing to seed live Firestore.\n' +
      'Set FIRESTORE_EMULATOR_HOST for emulator, or pass --force to seed production.',
  )
  process.exit(1)
}

const donuts = [
  {
    brand: 'Krispy Kreme',
    calories: 350,
    categoryId: 'cat_k9pm2n',
    deliveryType: 'Free',
    description:
      'Rich chocolate glaze over a fluffy yeast donut, topped with chocolate sprinkles.',
    id: 'dnt_r2km9x',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop',
    name: 'Chocolate',
    prepTime: 15,
    price: 5,
    rating: 4.8,
  },
  {
    brand: 'Dunkin',
    calories: 420,
    categoryId: 'cat_v3fqrt',
    deliveryType: 'Free',
    description:
      'Soft donut filled with smooth vanilla custard and dusted with powdered sugar.',
    id: 'dnt_f7pln4',
    image:
      'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=200&h=200&fit=crop',
    name: 'Cream Filled',
    prepTime: 20,
    price: 7,
    rating: 4.6,
  },
  {
    brand: 'Krispy Kreme',
    calories: 380,
    categoryId: 'cat_h2dnlp',
    deliveryType: 'Paid',
    description:
      'Velvety cream cheese frosting swirled on a cinnamon-spiced donut.',
    id: 'dnt_j5wqs8',
    image:
      'https://images.unsplash.com/photo-1612240498936-65f5101365d2?w=200&h=200&fit=crop',
    name: 'Careemy',
    prepTime: 18,
    price: 6,
    rating: 4.9,
  },
  {
    brand: 'Dunkin',
    calories: 450,
    categoryId: 'cat_h2dnlp',
    deliveryType: 'Free',
    description:
      'Triple-layered chocolate donut with dark ganache and cocoa nibs.',
    id: 'dnt_t3vbk6',
    image:
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200&h=200&fit=crop',
    name: 'Decadent',
    prepTime: 25,
    price: 8,
    rating: 4.7,
  },
  {
    brand: 'Krispy Kreme',
    calories: 340,
    categoryId: 'cat_k9pm2n',
    deliveryType: 'Free',
    description:
      'Classic donut with a thick chocolate frost coating and rainbow sprinkles.',
    id: 'dnt_y1chr0',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop',
    name: 'Chocolate Frost',
    prepTime: 12,
    price: 4,
    rating: 4.5,
  },
  {
    brand: 'Duck Donuts',
    calories: 390,
    categoryId: 'cat_n5zkwc',
    deliveryType: 'Paid',
    description:
      'Golden donut topped with crushed walnuts, almonds, and a honey drizzle.',
    id: 'dnt_m8gzd5',
    image:
      'https://images.unsplash.com/photo-1612240498936-65f5101365d2?w=200&h=200&fit=crop',
    name: 'Nutty Crunch',
    prepTime: 20,
    price: 6,
    rating: 4.4,
  },
  {
    brand: 'Duck Donuts',
    calories: 310,
    categoryId: 'cat_b7wjys',
    deliveryType: 'Free',
    description:
      'Light donut glazed with mixed berry compote and topped with fresh fruit bits.',
    id: 'dnt_x4nwf9',
    image:
      'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=200&h=200&fit=crop',
    name: 'Berry Bliss',
    prepTime: 15,
    price: 5,
    rating: 4.3,
  },
  {
    brand: 'Krispy Kreme',
    calories: 290,
    categoryId: 'cat_k9pm2n',
    deliveryType: 'Free',
    description:
      'The original classic — light, airy, and coated in a sweet sugar glaze.',
    id: 'dnt_p6jtm2',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop',
    name: 'Classic Glazed',
    prepTime: 10,
    price: 4,
    rating: 4.6,
  },
  {
    brand: 'Dunkin',
    calories: 410,
    categoryId: 'cat_h2dnlp',
    deliveryType: 'Paid',
    description:
      'Caramel-drizzled donut with sea salt flakes and a buttery crumb topping.',
    id: 'dnt_k0hyx7',
    image:
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200&h=200&fit=crop',
    name: 'Salted Caramel',
    prepTime: 22,
    price: 6,
    rating: 4.8,
  },
  {
    brand: 'Duck Donuts',
    calories: 360,
    categoryId: 'cat_b7wjys',
    deliveryType: 'Free',
    description:
      'Strawberry-frosted donut with white chocolate chips and a pink glaze.',
    id: 'dnt_s3bnq1',
    image:
      'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=200&h=200&fit=crop',
    name: 'Strawberry Dream',
    prepTime: 16,
    price: 5,
    rating: 4.5,
  },
  {
    brand: 'Krispy Kreme',
    calories: 330,
    categoryId: 'cat_k9pm2n',
    deliveryType: 'Free',
    description: 'Warm cinnamon sugar coating on a soft, pillowy yeast donut.',
    id: 'dnt_g9rvk4',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop',
    name: 'Cinnamon Sugar',
    prepTime: 10,
    price: 4,
    rating: 4.4,
  },
  {
    brand: 'Dunkin',
    calories: 470,
    categoryId: 'cat_v3fqrt',
    deliveryType: 'Paid',
    description:
      'Boston cream filled donut with rich chocolate ganache on top.',
    id: 'dnt_w5tpd8',
    image:
      'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=200&h=200&fit=crop',
    name: 'Boston Cream',
    prepTime: 22,
    price: 7,
    rating: 4.7,
  },
  {
    brand: 'Duck Donuts',
    calories: 400,
    categoryId: 'cat_n5zkwc',
    deliveryType: 'Free',
    description:
      'Peanut butter glaze with crushed peanuts and a chocolate drizzle.',
    id: 'dnt_l2fjm6',
    image:
      'https://images.unsplash.com/photo-1612240498936-65f5101365d2?w=200&h=200&fit=crop',
    name: 'PB Crunch',
    prepTime: 18,
    price: 6,
    rating: 4.6,
  },
  {
    brand: 'Krispy Kreme',
    calories: 320,
    categoryId: 'cat_b7wjys',
    deliveryType: 'Free',
    description:
      'Tangy lemon curd filling with a light powdered sugar dusting.',
    id: 'dnt_c7nxs0',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop',
    name: 'Lemon Burst',
    prepTime: 14,
    price: 5,
    rating: 4.3,
  },
  {
    brand: 'Dunkin',
    calories: 440,
    categoryId: 'cat_h2dnlp',
    deliveryType: 'Paid',
    description:
      'Red velvet cake donut with cream cheese glaze and red velvet crumbs.',
    id: 'dnt_z4hrw3',
    image:
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200&h=200&fit=crop',
    name: 'Red Velvet',
    prepTime: 20,
    price: 7,
    rating: 4.8,
  },
  {
    brand: 'Duck Donuts',
    calories: 370,
    categoryId: 'cat_v3fqrt',
    deliveryType: 'Free',
    description:
      'Bavarian cream filled donut dusted with cinnamon and powdered sugar.',
    id: 'dnt_q1kbt9',
    image:
      'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=200&h=200&fit=crop',
    name: 'Bavarian Dream',
    prepTime: 20,
    price: 6,
    rating: 4.5,
  },
  {
    brand: 'Krispy Kreme',
    calories: 460,
    categoryId: 'cat_h2dnlp',
    deliveryType: 'Paid',
    description:
      'Maple-glazed donut topped with crispy bacon bits and a brown sugar drizzle.',
    id: 'dnt_d8pyf5',
    image:
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200&h=200&fit=crop',
    name: 'Maple Bacon',
    prepTime: 25,
    price: 8,
    rating: 4.7,
  },
  {
    brand: 'Dunkin',
    calories: 300,
    categoryId: 'cat_b7wjys',
    deliveryType: 'Free',
    description:
      'Tropical coconut glaze with toasted coconut flakes on a light cake donut.',
    id: 'dnt_n6vlr2',
    image:
      'https://images.unsplash.com/photo-1612240498936-65f5101365d2?w=200&h=200&fit=crop',
    name: 'Coconut Bliss',
    prepTime: 12,
    price: 5,
    rating: 4.2,
  },
  {
    brand: 'Duck Donuts',
    calories: 430,
    categoryId: 'cat_n5zkwc',
    deliveryType: 'Paid',
    description:
      'Pistachio cream filling with a rose water glaze and crushed pistachios.',
    id: 'dnt_h3cwn7',
    image:
      'https://images.unsplash.com/photo-1612240498936-65f5101365d2?w=200&h=200&fit=crop',
    name: 'Pistachio Rose',
    prepTime: 22,
    price: 8,
    rating: 4.9,
  },
  {
    brand: 'Krispy Kreme',
    calories: 380,
    categoryId: 'cat_k9pm2n',
    deliveryType: 'Free',
    description:
      'Double-dipped vanilla bean glaze with colorful birthday sprinkles.',
    id: 'dnt_a0gkx4',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop',
    name: 'Birthday Cake',
    prepTime: 14,
    price: 5,
    rating: 4.6,
  },
]

const categories = [
  { iconGlyph: 'donut-classic', id: 'cat_k9pm2n', name: 'Classic' },
  { iconGlyph: 'donut-filled', id: 'cat_v3fqrt', name: 'Filled' },
  { iconGlyph: 'donut-fruity', id: 'cat_b7wjys', name: 'Fruity' },
  { iconGlyph: 'donut-decadent', id: 'cat_h2dnlp', name: 'Decadent' },
  { iconGlyph: 'donut-nutty', id: 'cat_n5zkwc', name: 'Nutty' },
]

const orders = [
  {
    courier: {
      avatar:
        'https://plus.unsplash.com/premium_photo-1670588775983-666b23590ffc?w=128&h=128&fit=crop&crop=faces',
      id: 'crr_vm4hls',
      name: 'Anna Bright',
      phone: '+1 234 567 890',
    },
    deliveryAddress: 'Awesome Street',
    deliveryTime: '4:30pm',
    estimatedTime: 3,
    id: 'ord_xn7krp',
    status: 'in-transit',
  },
]

const reviews = [
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=12',
    authorName: 'John Doe',
    date: '2 weeks ago',
    donutId: 'dnt_r2km9x',
    id: 'r1',
    rating: 4,
    text: 'Rich chocolate glaze with the perfect amount of sprinkles. Absolutely loved it!',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=25',
    authorName: 'Sarah Miller',
    date: '1 month ago',
    donutId: 'dnt_r2km9x',
    id: 'r2',
    rating: 5,
    text: 'Best chocolate donut I have ever had. The glaze is heavenly and the donut itself is so fluffy.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=7',
    authorName: 'Kevin Hart',
    date: '3 days ago',
    donutId: 'dnt_r2km9x',
    id: 'r1a',
    rating: 5,
    text: 'Ordered a dozen for my office and they were gone in minutes. The chocolate glaze is perfection.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=9',
    authorName: 'Olivia Brown',
    date: '5 days ago',
    donutId: 'dnt_r2km9x',
    id: 'r1b',
    rating: 4,
    text: 'Really solid donut. The sprinkles add a nice crunch to the smooth chocolate coating.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=11',
    authorName: 'Daniel Lee',
    date: '1 week ago',
    donutId: 'dnt_r2km9x',
    id: 'r1c',
    rating: 5,
    text: 'This is my go-to donut every Saturday morning. Never disappoints!',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=14',
    authorName: 'Emma Watson',
    date: '2 weeks ago',
    donutId: 'dnt_r2km9x',
    id: 'r1d',
    rating: 3,
    text: 'Good but a bit too sweet for my taste. The chocolate is high quality though.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=17',
    authorName: 'Marcus Johnson',
    date: '3 weeks ago',
    donutId: 'dnt_r2km9x',
    id: 'r1e',
    rating: 5,
    text: 'Hands down the best donut in town. Crispy outside, soft inside, perfect glaze.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=20',
    authorName: 'Priya Patel',
    date: '1 month ago',
    donutId: 'dnt_r2km9x',
    id: 'r1f',
    rating: 4,
    text: 'Great texture and flavor. My kids absolutely love these chocolate donuts.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=23',
    authorName: 'Carlos Rivera',
    date: '1 month ago',
    donutId: 'dnt_r2km9x',
    id: 'r1g',
    rating: 5,
    text: 'Fresh and delicious every single time. The chocolate is rich without being overwhelming.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=33',
    authorName: 'Mike Chen',
    date: '3 days ago',
    donutId: 'dnt_f7pln4',
    id: 'r3',
    rating: 4,
    text: 'Cream filling was smooth and not too sweet. Great balance of flavors.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=47',
    authorName: 'Emily Rose',
    date: '1 week ago',
    donutId: 'dnt_f7pln4',
    id: 'r4',
    rating: 5,
    text: 'The custard filling is incredible. Tastes like it was made fresh this morning.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=15',
    authorName: 'Alex Kim',
    date: '5 days ago',
    donutId: 'dnt_j5wqs8',
    id: 'r5',
    rating: 5,
    text: 'The cream cheese frosting is to die for. Perfectly paired with the cinnamon spice.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=52',
    authorName: 'Lisa Park',
    date: '2 weeks ago',
    donutId: 'dnt_j5wqs8',
    id: 'r6',
    rating: 4,
    text: 'Loved the cinnamon flavor combination. Would definitely order again.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=60',
    authorName: 'James Wilson',
    date: '4 days ago',
    donutId: 'dnt_t3vbk6',
    id: 'r7',
    rating: 5,
    text: 'Triple chocolate heaven! The dark ganache is rich and the cocoa nibs add great texture.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=22',
    authorName: 'Anna Lee',
    date: '1 week ago',
    donutId: 'dnt_t3vbk6',
    id: 'r8',
    rating: 4,
    text: 'Decadent is the perfect name for this donut. So rich and satisfying.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=35',
    authorName: 'Tom Brown',
    date: '3 weeks ago',
    donutId: 'dnt_y1chr0',
    id: 'r9',
    rating: 4,
    text: 'Ring donut, Chocolate frosted topped with fondant and biscuit crush.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=41',
    authorName: 'Rachel Green',
    date: '2 days ago',
    donutId: 'dnt_y1chr0',
    id: 'r10',
    rating: 5,
    text: 'The rainbow sprinkles make it so fun! Great classic donut with a twist.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=18',
    authorName: 'David Kim',
    date: '1 week ago',
    donutId: 'dnt_m8gzd5',
    id: 'r11',
    rating: 4,
    text: 'The honey drizzle with crushed nuts is amazing. Perfect balance of sweet and nutty.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=28',
    authorName: 'Sophie Turner',
    date: '5 days ago',
    donutId: 'dnt_x4nwf9',
    id: 'r12',
    rating: 4,
    text: 'Love the fresh berry flavor! Light and refreshing compared to heavy chocolate donuts.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=44',
    authorName: 'Chris Evans',
    date: '3 days ago',
    donutId: 'dnt_p6jtm2',
    id: 'r13',
    rating: 5,
    text: 'You cannot go wrong with the classic glazed. Simple perfection.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=50',
    authorName: 'Mia Johnson',
    date: '1 month ago',
    donutId: 'dnt_k0hyx7',
    id: 'r14',
    rating: 5,
    text: 'The sea salt with caramel is a genius combination. Absolutely divine!',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=55',
    authorName: 'Ryan Scott',
    date: '2 weeks ago',
    donutId: 'dnt_s3bnq1',
    id: 'r15',
    rating: 4,
    text: 'Pretty in pink and delicious too! The white chocolate chips are a nice touch.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=3',
    authorName: 'Nate Rogers',
    date: '4 days ago',
    donutId: 'dnt_g9rvk4',
    id: 'r16',
    rating: 4,
    text: 'Simple but perfect. The cinnamon sugar ratio is spot on.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=5',
    authorName: 'Helen Park',
    date: '1 week ago',
    donutId: 'dnt_g9rvk4',
    id: 'r17',
    rating: 5,
    text: 'Reminds me of the ones my grandma used to make. Warm and comforting.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=8',
    authorName: 'Jake Thompson',
    date: '3 days ago',
    donutId: 'dnt_w5tpd8',
    id: 'r18',
    rating: 5,
    text: 'The Boston cream filling is so rich. Best version I have tried anywhere.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=10',
    authorName: 'Lana Cruz',
    date: '1 week ago',
    donutId: 'dnt_w5tpd8',
    id: 'r19',
    rating: 4,
    text: 'Chocolate on top was thick and glossy. Filling could be a bit more generous.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=13',
    authorName: 'Omar Diaz',
    date: '5 days ago',
    donutId: 'dnt_l2fjm6',
    id: 'r20',
    rating: 5,
    text: 'PB lovers rejoice! Crunchy peanuts with that chocolate drizzle is heavenly.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=16',
    authorName: 'Grace Liu',
    date: '2 days ago',
    donutId: 'dnt_c7nxs0',
    id: 'r21',
    rating: 4,
    text: 'Such a refreshing flavor. The lemon curd is tangy without being sour.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=19',
    authorName: 'Sam Wright',
    date: '1 week ago',
    donutId: 'dnt_c7nxs0',
    id: 'r22',
    rating: 3,
    text: 'Good but I wish the lemon flavor was stronger. A bit too subtle for me.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=21',
    authorName: 'Zoe Adams',
    date: '3 days ago',
    donutId: 'dnt_z4hrw3',
    id: 'r23',
    rating: 5,
    text: 'Red velvet with cream cheese glaze? Yes please! Tastes like a cupcake in donut form.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=24',
    authorName: 'Tyler Reed',
    date: '6 days ago',
    donutId: 'dnt_z4hrw3',
    id: 'r24',
    rating: 5,
    text: 'The red velvet crumbs on top add such a nice texture. Incredible donut.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=26',
    authorName: 'Megan Fox',
    date: '4 days ago',
    donutId: 'dnt_q1kbt9',
    id: 'r25',
    rating: 4,
    text: 'Bavarian cream is silky smooth. The cinnamon dusting is a great touch.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=29',
    authorName: 'Leo Chen',
    date: '1 week ago',
    donutId: 'dnt_d8pyf5',
    id: 'r26',
    rating: 5,
    text: 'Maple and bacon is an unbeatable combo. Sweet, salty, crispy perfection.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=31',
    authorName: 'Ava Martinez',
    date: '2 days ago',
    donutId: 'dnt_d8pyf5',
    id: 'r27',
    rating: 4,
    text: 'I was skeptical about bacon on a donut but this totally works.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=34',
    authorName: 'Noah Kim',
    date: '5 days ago',
    donutId: 'dnt_n6vlr2',
    id: 'r28',
    rating: 4,
    text: 'Light and tropical. The toasted coconut gives it a nice crunch.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=36',
    authorName: 'Isla Cooper',
    date: '3 days ago',
    donutId: 'dnt_h3cwn7',
    id: 'r29',
    rating: 5,
    text: 'Pistachio rose is the most unique donut I have ever had. Absolutely gorgeous and delicious.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=38',
    authorName: 'Ethan Brooks',
    date: '1 week ago',
    donutId: 'dnt_h3cwn7',
    id: 'r30',
    rating: 5,
    text: 'This tastes like a fancy dessert from a Michelin star restaurant. Worth every penny.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=40',
    authorName: 'Chloe Yang',
    date: '4 days ago',
    donutId: 'dnt_a0gkx4',
    id: 'r31',
    rating: 4,
    text: 'Fun birthday vibes! The double vanilla glaze is sweet and the sprinkles are festive.',
  },
  {
    authorAvatar: 'https://i.pravatar.cc/48?img=42',
    authorName: 'Ben Harris',
    date: '2 weeks ago',
    donutId: 'dnt_a0gkx4',
    id: 'r32',
    rating: 5,
    text: 'Bought these for my daughters birthday party. Every kid went crazy for them.',
  },
]

const users = [
  {
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces',
    id: 'user-1',
    location: 'York Ave. Brooklyn',
    name: 'John',
  },
]

const bakeries = [
  {
    deliveryTime: 45,
    id: 'bkr_lm4xpn',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/Dunkin%27_Donuts_logo.svg/200px-Dunkin%27_Donuts_logo.svg.png',
    name: "Dunkin' Donuts",
    orderLink: 'https://www.dunkindonuts.com',
    promoImage:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=200&fit=crop',
    promoText: "Something Fresh is Always Brewin' Here",
    rating: 4.9,
  },
  {
    deliveryTime: 30,
    id: 'bkr_rf8qyt',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/200px-Burger_King_logo_%281999%29.svg.png',
    name: 'Burger King',
    orderLink: 'https://www.bk.com',
    promoImage:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=200&fit=crop',
    promoText: 'Have It Your Way, Every Day',
    rating: 4.5,
  },
  {
    deliveryTime: 35,
    id: 'bkr_jk2wsv',
    logo: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=200&h=200&fit=crop',
    name: 'Krispy Kreme',
    orderLink: 'https://www.krispykreme.com',
    promoImage:
      'https://images.unsplash.com/photo-1556913396-662e8e7e57d6?w=400&h=200&fit=crop',
    promoText: 'Hot Now. Fresh Always.',
    rating: 4.8,
  },
  {
    deliveryTime: 40,
    id: 'bkr_dh6nbc',
    logo: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=200&h=200&fit=crop',
    name: 'Duck Donuts',
    orderLink: 'https://www.duckdonuts.com',
    promoImage:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=200&fit=crop',
    promoText: 'Warm. Delicious. Made to Order.',
    rating: 4.7,
  },
  {
    deliveryTime: 50,
    id: 'bkr_wz9pkr',
    logo: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=200&h=200&fit=crop',
    name: 'Voodoo Doughnut',
    orderLink: 'https://www.voodoodoughnut.com',
    promoImage:
      'https://images.unsplash.com/photo-1587241321027-5765299aed85?w=400&h=200&fit=crop',
    promoText: 'The Magic is in the Hole',
    rating: 4.6,
  },
  {
    deliveryTime: 25,
    id: 'bkr_gt3fmd',
    logo: 'https://images.unsplash.com/photo-1509365390695-33aee754301f?w=200&h=200&fit=crop',
    name: 'Sidecar Doughnuts',
    orderLink: 'https://www.sidecardoughnuts.com',
    promoImage:
      'https://images.unsplash.com/photo-1533910534207-90f31029a78e?w=400&h=200&fit=crop',
    promoText: 'Handcrafted. Small Batch. Daily.',
    rating: 4.9,
  },
]

const favorites = [
  {
    donutIds: ['dnt_r2km9x', 'dnt_t3vbk6', 'dnt_x4nwf9'],
    userId: 'user-1',
  },
]

const collections = [
  { docs: donuts, name: 'donuts' },
  { docs: categories, name: 'categories' },
  { docs: orders, name: 'orders' },
  { docs: reviews, name: 'reviews' },
  { docs: users, name: 'users' },
  { docs: bakeries, name: 'bakeries' },
]

const seedCollection = async ({ docs, name }: (typeof collections)[number]) => {
  await Promise.all(docs.map((doc) => db.collection(name).doc(doc.id).set(doc)))
  console.log(`  ${name}: ${docs.length} docs`)
}

const seedFavorites = async () => {
  await Promise.all(
    favorites.map((fav) =>
      db.collection('favorites').doc(fav.userId).set(fav),
    ),
  )
  console.log(`  favorites: ${favorites.length} docs`)
}

const seed = async () => {
  console.log('Seeding Firestore...\n')
  await Promise.all(collections.map(seedCollection))
  await seedFavorites()
  console.log('\nDone!')
}

seed().catch(console.error)
