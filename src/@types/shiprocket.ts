import z from "zod";

export const shiprocketCreateOrderResponse = z.object({
  order_id: z.union([z.string(), z.number()]),
  shipment_id: z.union([z.string(), z.number()]),
  status: z.string(),
  status_code: z.number(),
  onboarding_completed_now: z.number(),
});

export type ShiprocketCreateOrderResponse = z.infer<typeof shiprocketCreateOrderResponse>;

export type ShipRocketType = ShiprocketCreateOrderResponse & {
  updatedAt: number;
  createdAt: number;
  customerUsername: string;
  appOrderId: string;
};

const shipRocketPickupAddress = z.object({
  id: z.number(),
  pickup_location: z.string(),
  address_type: z.string().nullable(),
  address: z.string(),
  address_2: z.string(),
  updated_address: z.boolean(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pin_code: z.string(),
  email: z.string(),
  phone: z.string(),
  name: z.string(),
  company_id: z.number(),
  gstin: z.string().nullable(),
  vendor_name: z.string().nullable(),
  status: z.number(),
  phone_verified: z.number(),
  lat: z.string().optional(),
  long: z.string().optional(),
  open_time: z.string().nullable(),
  close_time: z.string().nullable(),
  warehouse_code: z.string().nullable(),
  alternate_phone: z.string().optional(),
  rto_address_id: z.number().optional(),
  lat_long_status: z.number().optional(),
  new: z.number(),
  is_primary_location: z.number(),
});

export const pickupResponse = z.object({
  data: z.object({
    shipping_address: z.array(shipRocketPickupAddress),
    allow_more: z.string(),
    is_blackbox_seller: z.boolean(),
    company_name: z.string(),
  }),
});
