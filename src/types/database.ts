// Database types for Altitude WMS/TMS
// Based on the SQL schema created in Phase 1

// ============================================================================
// ENUMS
// ============================================================================

export type InboundStatus = 
  | 'expected' 
  | 'in_dock' 
  | 'unloading' 
  | 'received' 
  | 'received_partial' 
  | 'closed'

export type LogisticsUnitStatus = 
  | 'in_reception' 
  | 'in_control' 
  | 'available' 
  | 'committed' 
  | 'blocked' 
  | 'dispatched'

export type SalesOrderStatus = 
  | 'pending' 
  | 'in_picking' 
  | 'in_packing' 
  | 'ready' 
  | 'dispatched' 
  | 'delivered' 
  | 'cancelled' 
  | 'returned'

export type AppointmentStatus = 
  | 'scheduled' 
  | 'arrived' 
  | 'loading' 
  | 'completed' 
  | 'no_show' 
  | 'cancelled'

export type QualityResult = 'approved' | 'observed' | 'rejected'

export type QuarantineStatus = 'pending' | 'released' | 'rejected' | 'returned'

export type CustomerDecision = 'release' | 'return' | 'recondition' | 'destroy'

export type DeliveryResult = 'delivered' | 'failed' | 'partial'

export type DeliveryFailureReason = 
  | 'absent' 
  | 'wrong_address' 
  | 'rejected' 
  | 'closed' 
  | 'documentation' 
  | 'damaged' 
  | 'other'

export type IncidentType = 
  | 'shortage' 
  | 'overage' 
  | 'damage' 
  | 'wrong_sku' 
  | 'stock_not_found' 
  | 'picking_error' 
  | 'delivery_failed' 
  | 'saturation'

export type IncidentDetectionPoint = 
  | 'reception' 
  | 'control' 
  | 'picking' 
  | 'packing' 
  | 'dispatch' 
  | 'delivery'

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical'

export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'closed'

export type MovementType = 
  | 'reception' 
  | 'put_away' 
  | 'pick' 
  | 'replenish' 
  | 'transfer' 
  | 'adjustment_in' 
  | 'adjustment_out' 
  | 'return_in' 
  | 'return_out' 
  | 'block' 
  | 'release'

export type BillingServiceType = 
  | 'reception' 
  | 'control' 
  | 'storage' 
  | 'picking' 
  | 'packing' 
  | 'dispatch' 
  | 'delivery' 
  | 'retry' 
  | 'return_process' 
  | 'penalty_no_appointment' 
  | 'penalty_late_arrival' 
  | 'penalty_urgency' 
  | 'materials'

export type BillingUnit = 
  | 'pallet' 
  | 'bulto' 
  | 'unit' 
  | 'line' 
  | 'order' 
  | 'pallet_day' 
  | 'pallet_month' 
  | 'km' 
  | 'zone' 
  | 'each'

export type ControlType = 'full' | 'sample'

export type LogisticsUnitType = 'pallet' | 'bulto' | 'caja'

export type AbcClass = 'A' | 'B' | 'C'

export type ZoneType = 
  | 'reception' 
  | 'quarantine' 
  | 'storage' 
  | 'picking' 
  | 'staging' 
  | 'dispatch'

export type UserRole = 
  | 'admin' 
  | 'jefe_deposito' 
  | 'recepcion' 
  | 'almacen' 
  | 'picking_packing' 
  | 'trafico' 
  | 'administracion' 
  | 'cliente'

// ============================================================================
// TABLE TYPES
// ============================================================================

export interface Customer {
  id: string
  code: string
  business_name: string
  tax_id: string | null
  email: string | null
  phone: string | null
  contact_name: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CustomerAddress {
  id: string
  customer_id: string
  address_type: string
  street: string
  city: string | null
  state: string | null
  postal_code: string | null
  country: string
  lat: number | null
  lng: number | null
  notes: string | null
  is_default: boolean
  created_at: string
}

export interface CustomerSLA {
  id: string
  customer_id: string
  control_type: ControlType
  sample_percentage: number
  requires_photos: boolean
  requires_serial_capture: boolean
  requires_lot_tracking: boolean
  cutoff_time: string
  penalty_no_appointment: number
  penalty_late_arrival: number
  max_retry_attempts: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  customer_id: string
  sku: string
  description: string
  category_id: string | null
  unit: string
  weight_kg: number | null
  height_cm: number | null
  width_cm: number | null
  depth_cm: number | null
  abc_class: AbcClass
  requires_temperature_control: boolean
  min_temperature: number | null
  max_temperature: number | null
  is_hazardous: boolean
  requires_serial: boolean
  requires_lot: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Warehouse {
  id: string
  code: string
  name: string
  address: string | null
  city: string | null
  total_pallet_positions: number | null
  manager_name: string | null
  phone: string | null
  is_active: boolean
  created_at: string
}

export interface Zone {
  id: string
  warehouse_id: string
  code: string
  name: string
  zone_type: ZoneType
  pallet_capacity: number | null
  temperature_controlled: boolean
  min_temperature: number | null
  max_temperature: number | null
  is_active: boolean
  created_at: string
}

export interface Location {
  id: string
  zone_id: string
  code: string
  aisle: string | null
  rack: string | null
  level: string | null
  position: string | null
  max_weight_kg: number | null
  max_height_cm: number | null
  pallet_capacity: number
  is_active: boolean
  is_blocked: boolean
  blocked_reason: string | null
  created_at: string
}

export interface ReceivingOrder {
  id: string
  order_number: string
  customer_id: string
  warehouse_id: string
  external_reference: string | null
  supplier_name: string | null
  status: InboundStatus
  expected_pallets: number | null
  expected_bultos: number | null
  received_pallets: number
  received_bultos: number
  has_incidents: boolean
  expected_date: string | null
  received_at: string | null
  closed_at: string | null
  created_by: string | null
  received_by: string | null
  notes: string | null
  created_at: string
  updated_at: string
  // Joined fields
  customer?: Customer
  warehouse?: Warehouse
}

export interface ReceivingOrderItem {
  id: string
  receiving_order_id: string
  product_id: string
  expected_quantity: number
  received_quantity: number
  lot_number: string | null
  expiration_date: string | null
  is_complete: boolean
  has_variance: boolean
  variance_quantity: number
  notes: string | null
  created_at: string
  // Joined fields
  product?: Product
}

export interface DockAppointment {
  id: string
  receiving_order_id: string | null
  warehouse_id: string
  dock_number: number
  scheduled_date: string
  scheduled_time_start: string
  scheduled_time_end: string
  tolerance_minutes: number
  status: AppointmentStatus
  arrival_time: string | null
  start_time: string | null
  end_time: string | null
  vehicle_plate: string | null
  driver_name: string | null
  driver_dni: string | null
  carrier_name: string | null
  was_late: boolean
  penalty_applied: number
  notes: string | null
  created_by: string | null
  created_at: string
  updated_at: string
  // Joined fields
  receiving_order?: ReceivingOrder
  warehouse?: Warehouse
}

export interface LogisticsUnit {
  id: string
  barcode: string
  type: LogisticsUnitType
  receiving_order_id: string | null
  customer_id: string
  current_location_id: string | null
  status: LogisticsUnitStatus
  weight_kg: number | null
  height_cm: number | null
  width_cm: number | null
  depth_cm: number | null
  created_at: string
  updated_at: string
  // Joined fields
  customer?: Customer
  current_location?: Location
}

export interface Inventory {
  id: string
  product_id: string
  location_id: string
  customer_id: string
  quantity_available: number
  quantity_committed: number
  quantity_blocked: number
  lot_number: string | null
  expiration_date: string | null
  last_movement_at: string | null
  created_at: string
  updated_at: string
  // Joined fields
  product?: Product
  location?: Location
  customer?: Customer
}

export interface StockMovement {
  id: string
  logistics_unit_id: string | null
  product_id: string
  customer_id: string
  from_location_id: string | null
  to_location_id: string | null
  quantity: number
  movement_type: MovementType
  reason: string | null
  reference_type: string | null
  reference_id: string | null
  operator_id: string
  created_at: string
  // Joined fields
  product?: Product
  from_location?: Location
  to_location?: Location
}

export interface SalesOrder {
  id: string
  order_number: string
  customer_id: string
  warehouse_id: string
  external_reference: string | null
  channel: string | null
  status: SalesOrderStatus
  delivery_address_id: string | null
  delivery_address_text: string | null
  delivery_notes: string | null
  required_date: string | null
  cutoff_applied_at: string | null
  priority: number
  total_lines: number
  total_units: number
  total_weight_kg: number | null
  picked_at: string | null
  packed_at: string | null
  dispatched_at: string | null
  delivered_at: string | null
  created_by: string | null
  notes: string | null
  created_at: string
  updated_at: string
  // Joined fields
  customer?: Customer
  warehouse?: Warehouse
}

export interface SalesOrderItem {
  id: string
  sales_order_id: string
  product_id: string
  quantity_ordered: number
  quantity_picked: number
  quantity_packed: number
  quantity_shipped: number
  is_complete: boolean
  has_shortage: boolean
  suggested_location_id: string | null
  picked_from_location_id: string | null
  lot_number: string | null
  serial_numbers: string[] | null
  notes: string | null
  created_at: string
  // Joined fields
  product?: Product
}

export interface Incident {
  id: string
  incident_number: string
  type: IncidentType
  detected_at: IncidentDetectionPoint
  severity: IncidentSeverity
  description: string
  evidence_photos: string[] | null
  reference_type: string | null
  reference_id: string | null
  customer_id: string | null
  immediate_action: string | null
  corrective_action: string | null
  root_cause: string | null
  status: IncidentStatus
  assigned_to: string | null
  resolved_by: string | null
  resolved_at: string | null
  closed_by: string | null
  closed_at: string | null
  created_at: string
  updated_at: string
  // Joined fields
  customer?: Customer
}

export interface BillingEvent {
  id: string
  customer_id: string
  service_type: BillingServiceType
  quantity: number
  unit: BillingUnit
  unit_price: number
  total_price: number
  currency: string
  reference_type: string | null
  reference_id: string | null
  description: string | null
  event_date: string
  billed: boolean
  invoice_id: string | null
  billed_at: string | null
  created_at: string
  // Joined fields
  customer?: Customer
}

export interface DeliveryProof {
  id: string
  shipment_id: string | null
  route_stop_id: string | null
  sales_order_id: string
  result: DeliveryResult
  failure_reason: DeliveryFailureReason | null
  failure_notes: string | null
  recipient_name: string | null
  recipient_dni: string | null
  signature_photo: string | null
  delivery_photo: string | null
  lat: number | null
  lng: number | null
  delivered_at: string | null
  requires_retry: boolean
  retry_scheduled_for: string | null
  retry_count: number
  captured_by: string
  created_at: string
}

// ============================================================================
// VIEW TYPES
// ============================================================================

export interface StockSummary {
  customer_id: string
  customer_name: string
  product_id: string
  sku: string
  product_description: string
  total_available: number
  total_committed: number
  total_blocked: number
  total_stock: number
}

export interface BillingPending {
  customer_id: string
  customer_name: string
  service_type: BillingServiceType
  event_count: number
  total_amount: number
  currency: string
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  pageSize: number
  totalPages: number
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface CreateReceivingOrderInput {
  customer_id: string
  warehouse_id: string
  external_reference?: string
  supplier_name?: string
  expected_pallets?: number
  expected_bultos?: number
  expected_date?: string
  notes?: string
}

export interface CreateDockAppointmentInput {
  receiving_order_id?: string
  warehouse_id: string
  dock_number: number
  scheduled_date: string
  scheduled_time_start: string
  scheduled_time_end: string
  vehicle_plate?: string
  driver_name?: string
  carrier_name?: string
  notes?: string
}

export interface CreateSalesOrderInput {
  customer_id: string
  warehouse_id: string
  external_reference?: string
  channel?: string
  delivery_address_id?: string
  delivery_address_text?: string
  delivery_notes?: string
  required_date?: string
  priority?: number
  notes?: string
  items: CreateSalesOrderItemInput[]
}

export interface CreateSalesOrderItemInput {
  product_id: string
  quantity_ordered: number
  notes?: string
}
