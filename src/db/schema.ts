import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  role: text('role').notNull(), // 'STUDENT' | 'VENDOR' | 'NGO' | 'ADMIN'
  avatar: text('avatar'),
  campus: text('campus'),
  ecoPoints: integer('eco_points').default(150),
  walletBalance: real('wallet_balance').default(500.0), // Affordable student wallet
  status: text('status').default('APPROVED'), // 'APPROVED' | 'PENDING' | 'REJECTED'
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const vendors = sqliteTable('vendors', {
  id: integer('id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  cafeteriaName: text('cafeteria_name').notNull(),
  location: text('location').notNull(),
  foodCategory: text('food_category'),
  rating: real('rating').default(4.6),
  totalMealsSaved: integer('total_meals_saved').default(0),
  wastePreventedKg: real('waste_prevented_kg').default(0.0),
  revenueSaved: real('revenue_saved').default(0.0),
  co2ReducedKg: real('co2_reduced_kg').default(0.0),
});

export const meals = sqliteTable('meals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  vendorId: integer('vendor_id').notNull().references(() => vendors.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  image: text('image').notNull(),
  originalPrice: real('original_price').notNull(),
  discountPrice: real('discount_price').notNull(),
  quantity: integer('quantity').notNull(),
  availableQuantity: integer('available_quantity').notNull(),
  expiryTime: integer('expiry_time', { mode: 'timestamp' }).notNull(),
  pickupWindowStart: text('pickup_window_start').notNull(),
  pickupWindowEnd: text('pickup_window_end').notNull(),
  category: text('category').notNull(), // 'VEG' | 'NON_VEG' | 'VEGAN' | 'BAKERY'
  status: text('status').default('ACTIVE'), // 'ACTIVE' | 'SOLD_OUT' | 'DONATION_READY' | 'EXPIRED'
  description: text('description').notNull(),
  isDonation: integer('is_donation', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  studentId: integer('student_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  mealId: integer('meal_id').notNull().references(() => meals.id, { onDelete: 'cascade' }),
  vendorId: integer('vendor_id').notNull().references(() => vendors.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull(),
  totalPrice: real('total_price').notNull(),
  status: text('status').default('RESERVED'), // 'RESERVED' | 'PICKED_UP' | 'CANCELLED'
  qrCode: text('qr_code').notNull(),
  paymentMethod: text('payment_method').default('WALLET'), // 'RAZORPAY' | 'STRIPE' | 'WALLET' | 'PAY_AT_PICKUP'
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  pickedUpAt: integer('picked_up_at', { mode: 'timestamp' }),
});

export const donations = sqliteTable('donations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  mealId: integer('meal_id').notNull().references(() => meals.id, { onDelete: 'cascade' }),
  vendorId: integer('vendor_id').notNull().references(() => vendors.id, { onDelete: 'cascade' }),
  ngoId: integer('ngo_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  foodQuantity: integer('food_quantity').notNull(),
  status: text('status').default('PENDING'), // 'PENDING' | 'ACCEPTED' | 'PICKED_UP'
  qrCode: text('qr_code').notNull(),
  scheduledPickup: text('scheduled_pickup').notNull(),
  impactRecordedKg: real('impact_recorded_kg').notNull(),
  communitiesServed: text('communities_served').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const coupons = sqliteTable('coupons', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  code: text('code').notNull().unique(),
  discountPercent: integer('discount_percent').notNull(),
  pointsRequired: integer('points_required').notNull(),
  minOrderAmount: real('min_order_amount').notNull(),
  description: text('description').notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});

export const aiPredictions = sqliteTable('ai_predictions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  vendorId: integer('vendor_id').notNull().references(() => vendors.id, { onDelete: 'cascade' }),
  date: text('date').notNull(),
  predictedDemand: integer('predicted_demand').notNull(),
  expectedLeftover: integer('expected_leftover').notNull(),
  recommendedQuantity: integer('recommended_quantity').notNull(),
  riskLevel: text('risk_level').notNull(), // 'LOW' | 'MEDIUM' | 'HIGH'
  wastePercentage: real('waste_percentage').notNull(),
  smartAdvice: text('smart_advice').notNull(),
  weather: text('weather').notNull(),
  examSchedule: text('exam_schedule').notNull(),
  festival: text('festival').notNull(),
});

export const supportTickets = sqliteTable('support_tickets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').default('OPEN'), // 'OPEN' | 'RESOLVED'
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const chatMessages = sqliteTable('chat_messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  senderId: integer('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  receiverId: integer('receiver_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  message: text('message').notNull(),
  timestamp: integer('timestamp', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
