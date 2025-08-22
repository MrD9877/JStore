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

export interface IShiprocket extends Document, ShipRocketType {}
