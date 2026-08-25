// ===================================================================
// SALONSYNC TYPES — derived from Drizzle schema
// ===================================================================

export type Role = 'owner' | 'staff'

export type AppointmentStatus = 'booked' | 'completed' | 'no-show' | 'cancelled'

export type PaymentMethod = 'cash' | 'card' | 'bank_transfer' | 'other'

export type ExpenseCategory =
  | 'supplies'
  | 'utilities'
  | 'rent'
  | 'salary'
  | 'equipment'
  | 'marketing'
  | 'other'

export interface Salon {
  id: string
  name: string
  ownerId: string
  phone: string | null
  address: string | null
  createdAt: Date
}

export interface Staff {
  id: string
  salonId: string
  name: string
  role: Role
  commissionPercent: number
  phone: string | null
  createdAt: Date
}

export interface Customer {
  id: string
  salonId: string
  name: string
  phone: string | null
  notes: string | null
  createdAt: Date
}

export interface Appointment {
  id: string
  salonId: string
  customerId: string | null
  staffId: string | null
  serviceName: string
  scheduledAt: Date
  status: AppointmentStatus
  price: number
  customer?: Customer | null
  staff?: Staff | null
}

export interface Sale {
  id: string
  salonId: string
  customerId: string | null
  amount: number
  paymentMethod: PaymentMethod
  note: string | null
  createdAt: Date
  linkedAppointmentId: string | null
  customer?: Customer | null
}

export interface Expense {
  id: string
  salonId: string
  category: ExpenseCategory
  amount: number
  note: string | null
  createdAt: Date
}

export interface Product {
  id: string
  salonId: string
  name: string
  stockQuantity: number
  lowStockThreshold: number
  unitCost: number
}

// Dashboard summary
export interface DashboardMetrics {
  todayRevenue: number
  todayExpenses: number
  todayProfit: number
  todayAppointments: number
  weeklyTrend: { date: string; revenue: number; expenses: number }[]
  needsAttention: {
    lowStockItems: Product[]
    noShowFollowUps: Appointment[]
    upcomingAppointments: Appointment[]
  }
}
