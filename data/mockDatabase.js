/**
 * Production-ready Mock Database for StyleHub Frontend.
 * Converted directly from the MySQL enterprise schema and seed records.
 */

export const mockUsers = [
  {
    id: 1,
    username: 'superadmin',
    fullName: 'System Administrator',
    email: 'admin@stylehub.com',
    phone: '+12345678901',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'SUPER_ADMIN',
    isActive: true,
    createdAt: '2026-06-01 00:00:00',
    updatedAt: '2026-06-01 00:00:00'
  },
  {
    id: 2,
    username: 'sarah_stylist',
    fullName: 'Sarah Jenkins',
    email: 'sarah@stylehub.com',
    phone: '+12345678902',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'STAFF',
    isActive: true,
    createdAt: '2026-06-01 00:00:00',
    updatedAt: '2026-06-01 00:00:00'
  },
  {
    id: 3,
    username: 'mike_barber',
    fullName: 'Michael Ross',
    email: 'mike@stylehub.com',
    phone: '+12345678903',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'STAFF',
    isActive: true,
    createdAt: '2026-06-01 00:00:00',
    updatedAt: '2026-06-01 00:00:00'
  },
  {
    id: 4,
    username: 'emily_colorist',
    fullName: 'Emily Blunt',
    email: 'emily@stylehub.com',
    phone: '+12345678904',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'STAFF',
    isActive: true,
    createdAt: '2026-06-01 00:00:00',
    updatedAt: '2026-06-01 00:00:00'
  },
  {
    id: 5,
    username: 'david_spa',
    fullName: 'David Miller',
    email: 'david@stylehub.com',
    phone: '+12345678905',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'STAFF',
    isActive: true,
    createdAt: '2026-06-01 00:00:00',
    updatedAt: '2026-06-01 00:00:00'
  },
  {
    id: 6,
    username: 'jane_doe',
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+12345678906',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'CUSTOMER',
    isActive: true,
    createdAt: '2026-06-01 00:00:00',
    updatedAt: '2026-06-01 00:00:00'
  },
  {
    id: 7,
    username: 'john_smith',
    fullName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+12345678907',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'CUSTOMER',
    isActive: true,
    createdAt: '2026-06-01 00:00:00',
    updatedAt: '2026-06-01 00:00:00'
  },
  {
    id: 8,
    username: 'lisa_ray',
    fullName: 'Lisa Ray',
    email: 'lisa.ray@example.com',
    phone: '+12345678908',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'CUSTOMER',
    isActive: true,
    createdAt: '2026-06-01 00:00:00',
    updatedAt: '2026-06-01 00:00:00'
  },
  {
    id: 9,
    username: 'robert_fox',
    fullName: 'Robert Fox',
    email: 'robert.fox@example.com',
    phone: '+12345678909',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'CUSTOMER',
    isActive: true,
    createdAt: '2026-06-01 00:00:00',
    updatedAt: '2026-06-01 00:00:00'
  },
  {
    id: 10,
    username: 'amanda_nelson',
    fullName: 'Amanda Nelson',
    email: 'amanda.nelson@example.com',
    phone: '+12345678910',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'CUSTOMER',
    isActive: true,
    createdAt: '2026-06-01 00:00:00',
    updatedAt: '2026-06-01 00:00:00'
  }
];

export const mockServices = [
  {
    id: 1,
    name: 'Executive Haircut & Styling',
    description: 'Precision haircut consultation, wash, cut, and professional blow-dry styling.',
    price: 45.00,
    durationMinutes: 30,
    available: true
  },
  {
    id: 2,
    name: 'Full Color & Highlights',
    description: 'Complete hair coloring service with customized highlights and toner.',
    price: 120.00,
    durationMinutes: 120,
    available: true
  },
  {
    id: 3,
    name: 'Classic Beard Trim & Shave',
    description: 'Hot towel treatment, precision beard shaping, and straight razor finish.',
    price: 25.00,
    durationMinutes: 20,
    available: true
  },
  {
    id: 4,
    name: 'Luxury Spa Facial',
    description: 'Deep cleansing, exfoliation, custom mask, and facial massage.',
    price: 85.00,
    durationMinutes: 60,
    available: true
  },
  {
    id: 5,
    name: 'Bridal Makeup & Hair',
    description: 'Full glam makeup application and intricate bridal hairstyling trial & event.',
    price: 200.00,
    durationMinutes: 150,
    available: true
  },
  {
    id: 6,
    name: 'Keratin Smoothing Treatment',
    description: 'Frizz-control keratin treatment for silky, smooth, and manageable hair.',
    price: 150.00,
    durationMinutes: 90,
    available: true
  },
  {
    id: 7,
    name: 'Gel Manicure & Pedicure',
    description: 'Complete nail care, cuticle treatment, massage, and long-lasting gel polish.',
    price: 60.00,
    durationMinutes: 60,
    available: true
  }
];

export const mockStaffSchedules = [
  { id: 1, staffId: 2, dayOfWeek: 'Monday', startTime: '09:00:00', endTime: '17:00:00', isWorkingDay: true },
  { id: 2, staffId: 2, dayOfWeek: 'Tuesday', startTime: '09:00:00', endTime: '17:00:00', isWorkingDay: true },
  { id: 3, staffId: 2, dayOfWeek: 'Wednesday', startTime: '09:00:00', endTime: '17:00:00', isWorkingDay: true },
  { id: 4, staffId: 2, dayOfWeek: 'Thursday', startTime: '09:00:00', endTime: '17:00:00', isWorkingDay: true },
  { id: 5, staffId: 2, dayOfWeek: 'Friday', startTime: '09:00:00', endTime: '17:00:00', isWorkingDay: true },
  { id: 6, staffId: 3, dayOfWeek: 'Monday', startTime: '10:00:00', endTime: '18:00:00', isWorkingDay: true },
  { id: 7, staffId: 3, dayOfWeek: 'Tuesday', startTime: '10:00:00', endTime: '18:00:00', isWorkingDay: true },
  { id: 8, staffId: 3, dayOfWeek: 'Wednesday', startTime: '10:00:00', endTime: '18:00:00', isWorkingDay: true },
  { id: 9, staffId: 3, dayOfWeek: 'Thursday', startTime: '10:00:00', endTime: '18:00:00', isWorkingDay: true },
  { id: 10, staffId: 3, dayOfWeek: 'Saturday', startTime: '09:00:00', endTime: '15:00:00', isWorkingDay: true },
  { id: 11, staffId: 4, dayOfWeek: 'Wednesday', startTime: '08:00:00', endTime: '16:00:00', isWorkingDay: true },
  { id: 12, staffId: 4, dayOfWeek: 'Thursday', startTime: '08:00:00', endTime: '16:00:00', isWorkingDay: true },
  { id: 13, staffId: 4, dayOfWeek: 'Friday', startTime: '08:00:00', endTime: '16:00:00', isWorkingDay: true },
  { id: 14, staffId: 4, dayOfWeek: 'Saturday', startTime: '08:00:00', endTime: '16:00:00', isWorkingDay: true },
  { id: 15, staffId: 5, dayOfWeek: 'Monday', startTime: '11:00:00', endTime: '19:00:00', isWorkingDay: true },
  { id: 16, staffId: 5, dayOfWeek: 'Tuesday', startTime: '11:00:00', endTime: '19:00:00', isWorkingDay: true },
  { id: 17, staffId: 5, dayOfWeek: 'Friday', startTime: '11:00:00', endTime: '19:00:00', isWorkingDay: true },
  { id: 18, staffId: 5, dayOfWeek: 'Saturday', startTime: '10:00:00', endTime: '18:00:00', isWorkingDay: true }
];

export const mockAppointments = [
  {
    id: 1,
    clientId: 6,
    clientName: 'Jane Doe',
    staffId: 2,
    staffName: 'Sarah Jenkins',
    serviceId: 1,
    serviceName: 'Executive Haircut & Styling',
    appointmentDate: '2026-06-10',
    startTime: '10:00:00',
    endTime: '10:30:00',
    status: 'CONFIRMED',
    notes: 'Client prefers low-side fade.'
  },
  {
    id: 2,
    clientId: 7,
    clientName: 'John Smith',
    staffId: 3,
    staffName: 'Michael Ross',
    serviceId: 3,
    serviceName: 'Classic Beard Trim & Shave',
    appointmentDate: '2026-06-10',
    startTime: '11:00:00',
    endTime: '11:20:00',
    status: 'PENDING',
    notes: 'First time customer.'
  },
  {
    id: 3,
    clientId: 8,
    clientName: 'Lisa Ray',
    staffId: 4,
    staffName: 'Emily Blunt',
    serviceId: 2,
    serviceName: 'Full Color & Highlights',
    appointmentDate: '2026-06-11',
    startTime: '09:00:00',
    endTime: '11:00:00',
    status: 'CONFIRMED',
    notes: 'Wants platinum highlights.'
  },
  {
    id: 4,
    clientId: 9,
    clientName: 'Robert Fox',
    staffId: 5,
    staffName: 'David Miller',
    serviceId: 4,
    serviceName: 'Luxury Spa Facial',
    appointmentDate: '2026-06-11',
    startTime: '12:00:00',
    endTime: '13:00:00',
    status: 'DONE',
    notes: 'Sensitive skin, use organic products.'
  },
  {
    id: 5,
    clientId: 10,
    clientName: 'Amanda Nelson',
    staffId: 2,
    staffName: 'Sarah Jenkins',
    serviceId: 6,
    serviceName: 'Keratin Smoothing Treatment',
    appointmentDate: '2026-06-12',
    startTime: '13:00:00',
    endTime: '14:30:00',
    status: 'CONFIRMED',
    notes: 'Regular keratin maintenance.'
  },
  {
    id: 6,
    clientId: 6,
    clientName: 'Jane Doe',
    staffId: 5,
    staffName: 'David Miller',
    serviceId: 7,
    serviceName: 'Gel Manicure & Pedicure',
    appointmentDate: '2026-06-12',
    startTime: '15:00:00',
    endTime: '16:00:00',
    status: 'PENDING',
    notes: 'French tips requested.'
  }
];

export const mockSalonSettings = {
  id: 1,
  salonName: 'StyleHub Flagship Salon',
  phone: '+18005550199',
  address: '123 Beauty Lane, Suite 400, New York, NY',
  openingTime: '08:00:00',
  closingTime: '20:00:00'
};