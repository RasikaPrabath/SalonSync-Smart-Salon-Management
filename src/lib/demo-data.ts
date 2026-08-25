import type { Appointment, Customer, DashboardMetrics, Expense, Product, Sale, Salon, Staff } from '@/types'

// ===================================================================
// DEMO DATA — Kumara's Barber Shop
// Simulates 30 days of realistic Sri Lankan barbershop data
// ===================================================================

export const DEMO_SALON: Salon = {
  id: 'salon-1',
  name: "Kumara's Barber Shop",
  ownerId: 'user-1',
  phone: '0771234567',
  address: '45 Galle Road, Dehiwala, Colombo',
  createdAt: new Date('2026-01-15'),
}

export const DEMO_STAFF: Staff[] = [
  {
    id: 'staff-1',
    salonId: 'salon-1',
    name: 'Kumara Perera',
    role: 'owner',
    commissionPercent: 0,
    phone: '0771234567',
    createdAt: new Date('2026-01-15'),
  },
  {
    id: 'staff-2',
    salonId: 'salon-1',
    name: 'Saman Silva',
    role: 'staff',
    commissionPercent: 30,
    phone: '0759876543',
    createdAt: new Date('2026-02-01'),
  },
]

export const DEMO_PRODUCTS: Product[] = [
  { id: 'p1', salonId: 'salon-1', name: 'Wella Shampoo (1L)', stockQuantity: 3, lowStockThreshold: 5, unitCost: 1200 },
  { id: 'p2', salonId: 'salon-1', name: 'Hair Color – Dark Brown', stockQuantity: 2, lowStockThreshold: 4, unitCost: 850 },
  { id: 'p3', salonId: 'salon-1', name: 'Razor Blades (Box 100)', stockQuantity: 8, lowStockThreshold: 10, unitCost: 600 },
  { id: 'p4', salonId: 'salon-1', name: 'Hair Conditioner (500ml)', stockQuantity: 6, lowStockThreshold: 5, unitCost: 750 },
  { id: 'p5', salonId: 'salon-1', name: 'Beard Oil (100ml)', stockQuantity: 1, lowStockThreshold: 3, unitCost: 950 },
  { id: 'p6', salonId: 'salon-1', name: 'Talcum Powder (200g)', stockQuantity: 12, lowStockThreshold: 5, unitCost: 250 },
  { id: 'p7', salonId: 'salon-1', name: 'Hair Gel (250ml)', stockQuantity: 4, lowStockThreshold: 5, unitCost: 450 },
  { id: 'p8', salonId: 'salon-1', name: 'Sanitizer (500ml)', stockQuantity: 5, lowStockThreshold: 4, unitCost: 380 },
]

export const DEMO_CUSTOMERS: Customer[] = [
  { id: 'c1', salonId: 'salon-1', name: 'Nimal Bandara', phone: '0712345001', notes: 'Prefers short fade cut', createdAt: new Date('2026-02-10') },
  { id: 'c2', salonId: 'salon-1', name: 'Kasun Fernando', phone: '0723456002', notes: null, createdAt: new Date('2026-02-12') },
  { id: 'c3', salonId: 'salon-1', name: 'Ruwan Jayawardena', phone: '0734567003', notes: 'Beard trim too', createdAt: new Date('2026-02-15') },
  { id: 'c4', salonId: 'salon-1', name: 'Pradeep Wickrama', phone: '0745678004', notes: null, createdAt: new Date('2026-02-18') },
  { id: 'c5', salonId: 'salon-1', name: 'Chaminda Rajapaksa', phone: '0756789005', notes: 'Comes every 2 weeks', createdAt: new Date('2026-02-20') },
  { id: 'c6', salonId: 'salon-1', name: 'Thilak Mendis', phone: '0767890006', notes: null, createdAt: new Date('2026-02-22') },
  { id: 'c7', salonId: 'salon-1', name: 'Harsha Senanayake', phone: '0778901007', notes: 'Dislikes razors', createdAt: new Date('2026-03-01') },
  { id: 'c8', salonId: 'salon-1', name: 'Dinesh Rathnayake', phone: '0789012008', notes: null, createdAt: new Date('2026-03-05') },
  { id: 'c9', salonId: 'salon-1', name: 'Asanka Gunasekara', phone: '0700123009', notes: 'Loyal customer since 2024', createdAt: new Date('2026-03-08') },
  { id: 'c10', salonId: 'salon-1', name: 'Roshan Dissanayake', phone: '0711234010', notes: null, createdAt: new Date('2026-03-10') },
  { id: 'c11', salonId: 'salon-1', name: 'Chathura Karunaratne', phone: '0722345011', notes: null, createdAt: new Date('2026-03-12') },
  { id: 'c12', salonId: 'salon-1', name: 'Malith Wijesuriya', phone: '0733456012', notes: 'Always pays cash', createdAt: new Date('2026-03-15') },
  { id: 'c13', salonId: 'salon-1', name: 'Gayan Jayasinghe', phone: '0744567013', notes: null, createdAt: new Date('2026-03-18') },
  { id: 'c14', salonId: 'salon-1', name: 'Lahiru Pathirana', phone: '0755678014', notes: null, createdAt: new Date('2026-03-20') },
  { id: 'c15', salonId: 'salon-1', name: 'Sachith Weerasinghe', phone: '0766789015', notes: 'Color treatment occasionally', createdAt: new Date('2026-03-22') },
]

// Generate 30 days of sales data deterministically
function daysAgo(n: number, i: number = 0): Date {
  const d = new Date()
  d.setDate(d.getDate() - n)
  // deterministic hours and minutes based on index
  d.setHours((i % 8) + 9, (i * 13) % 60, 0, 0)
  return d
}

const services = ['Haircut', 'Shave', 'Haircut + Shave', 'Beard Trim', 'Fade Cut', 'Kids Haircut', 'Hair Color', 'Head Massage']
const prices = [350, 250, 550, 200, 400, 300, 800, 300]
const methods = ['cash', 'card', 'bank_transfer', 'cash', 'cash'] as const

export const DEMO_SALES: Sale[] = Array.from({ length: 90 }, (_, i) => ({
  id: `sale-${i + 1}`,
  salonId: 'salon-1',
  customerId: i % 4 === 0 ? null : DEMO_CUSTOMERS[i % 15].id,
  amount: prices[i % prices.length] + ((i * 17) % 100), // deterministic fluctuation
  paymentMethod: methods[i % methods.length],
  note: services[i % services.length],
  createdAt: daysAgo(Math.floor(i / 3), i),
  linkedAppointmentId: null,
  customer: i % 4 === 0 ? null : DEMO_CUSTOMERS[i % 15],
}))

export const DEMO_EXPENSES: Expense[] = [
  { id: 'e1', salonId: 'salon-1', category: 'rent', amount: 35000, note: 'Monthly rent - August', createdAt: daysAgo(25) },
  { id: 'e2', salonId: 'salon-1', category: 'supplies', amount: 8500, note: 'Shampoo, conditioner, razors', createdAt: daysAgo(20) },
  { id: 'e3', salonId: 'salon-1', category: 'utilities', amount: 4200, note: 'Electricity bill', createdAt: daysAgo(18) },
  { id: 'e4', salonId: 'salon-1', category: 'salary', amount: 25000, note: 'Saman monthly salary', createdAt: daysAgo(5) },
  { id: 'e5', salonId: 'salon-1', category: 'supplies', amount: 3200, note: 'Hair color products', createdAt: daysAgo(12) },
  { id: 'e6', salonId: 'salon-1', category: 'equipment', amount: 12000, note: 'New clippers', createdAt: daysAgo(28) },
  { id: 'e7', salonId: 'salon-1', category: 'marketing', amount: 2500, note: 'Facebook ads - July', createdAt: daysAgo(22) },
  { id: 'e8', salonId: 'salon-1', category: 'supplies', amount: 1800, note: 'Towels and capes', createdAt: daysAgo(8) },
  { id: 'e9', salonId: 'salon-1', category: 'utilities', amount: 1200, note: 'Water bill', createdAt: daysAgo(16) },
  { id: 'e10', salonId: 'salon-1', category: 'other', amount: 500, note: 'Cleaning supplies', createdAt: daysAgo(3) },
]

export const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    salonId: 'salon-1',
    customerId: 'c1',
    staffId: 'staff-1',
    serviceName: 'Fade Cut',
    scheduledAt: (() => { const d = new Date(); d.setHours(10, 0, 0, 0); return d })(),
    status: 'booked',
    price: 400,
    customer: DEMO_CUSTOMERS[0],
    staff: DEMO_STAFF[0],
  },
  {
    id: 'apt-2',
    salonId: 'salon-1',
    customerId: 'c2',
    staffId: 'staff-2',
    serviceName: 'Haircut + Shave',
    scheduledAt: (() => { const d = new Date(); d.setHours(11, 30, 0, 0); return d })(),
    status: 'booked',
    price: 550,
    customer: DEMO_CUSTOMERS[1],
    staff: DEMO_STAFF[1],
  },
  {
    id: 'apt-3',
    salonId: 'salon-1',
    customerId: 'c3',
    staffId: 'staff-1',
    serviceName: 'Haircut',
    scheduledAt: (() => { const d = new Date(); d.setHours(14, 0, 0, 0); return d })(),
    status: 'completed',
    price: 350,
    customer: DEMO_CUSTOMERS[2],
    staff: DEMO_STAFF[0],
  },
  {
    id: 'apt-4',
    salonId: 'salon-1',
    customerId: 'c4',
    staffId: 'staff-2',
    serviceName: 'Beard Trim',
    scheduledAt: (() => { const d = new Date(); d.setDate(d.getDate() - 1); d.setHours(15, 0, 0, 0); return d })(),
    status: 'no-show',
    price: 200,
    customer: DEMO_CUSTOMERS[3],
    staff: DEMO_STAFF[1],
  },
  {
    id: 'apt-5',
    salonId: 'salon-1',
    customerId: 'c5',
    staffId: 'staff-1',
    serviceName: 'Hair Color',
    scheduledAt: (() => { const d = new Date(); d.setDate(d.getDate() + 1); d.setHours(10, 0, 0, 0); return d })(),
    status: 'booked',
    price: 800,
    customer: DEMO_CUSTOMERS[4],
    staff: DEMO_STAFF[0],
  },
]

// Compute dashboard metrics from demo data
export function getDemoDashboardMetrics(): DashboardMetrics {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayEnd = new Date()
  todayEnd.setHours(23, 59, 59, 999)

  const todaySales = DEMO_SALES.filter(s => {
    const d = new Date(s.createdAt)
    return d >= today && d <= todayEnd
  })
  const todayExpenses = DEMO_EXPENSES.filter(e => {
    const d = new Date(e.createdAt)
    return d >= today && d <= todayEnd
  })
  const todayAppointments = DEMO_APPOINTMENTS.filter(a => {
    const d = new Date(a.scheduledAt)
    return d >= today && d <= todayEnd
  })

  const todayRevenue = todaySales.reduce((sum, s) => sum + s.amount, 0)
  const todayExp = todayExpenses.reduce((sum, e) => sum + e.amount, 0)

  // 7-day trend
  const weeklyTrend = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    date.setHours(0, 0, 0, 0)
    const dateEnd = new Date(date)
    dateEnd.setHours(23, 59, 59, 999)

    const daySales = DEMO_SALES.filter(s => {
      const d = new Date(s.createdAt)
      return d >= date && d <= dateEnd
    }).reduce((sum, s) => sum + s.amount, 0)

    const dayExp = DEMO_EXPENSES.filter(e => {
      const d = new Date(e.createdAt)
      return d >= date && d <= dateEnd
    }).reduce((sum, e) => sum + e.amount, 0)

    return {
      date: date.toLocaleDateString('en-LK', { weekday: 'short', month: 'short', day: 'numeric' }),
      revenue: daySales,
      expenses: dayExp,
    }
  })

  const noShowFollowUps = DEMO_APPOINTMENTS.filter(a => a.status === 'no-show')

  return {
    todayRevenue: todayRevenue || 24500,
    todayExpenses: todayExp || 8200,
    todayProfit: (todayRevenue || 24500) - (todayExp || 8200),
    todayAppointments: todayAppointments.length || 6,
    weeklyTrend,
    needsAttention: {
      lowStockItems: DEMO_PRODUCTS.filter(p => p.stockQuantity <= p.lowStockThreshold),
      noShowFollowUps,
      upcomingAppointments: todayAppointments.filter(a => a.status === 'booked'),
    },
  }
}
