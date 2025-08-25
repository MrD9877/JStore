import z from "zod";

export type AdminType = {
  shiprocket: {
    email: string;
    password: string;
    token?: string;
    tokenExpire?: number;
    pickupaddress?: string;
  };
  razorpay: {
    username: string;
    password: string;
  };
  password: string;
  singleton: string;
};

export const createAdminSchema = z.object({
  shiprocket: z
    .object({
      email: z.string(),
      password: z.string(),
      pickupaddress: z.string().optional(),
    })
    .optional(),
  razorpay: z
    .object({
      username: z.string(),
      password: z.string(),
    })
    .optional(),
  password: z.string().optional(),
  key: z.string(),
});

export type UpdateAdmin = z.infer<typeof updateAdminSchema>;

export const updateAdminSchema = z.object({
  shiprocket: z
    .object({
      email: z.string(),
      password: z.string(),
      pickupaddress: z.string().optional(),
    })
    .optional(),
  razorpay: z
    .object({
      username: z.string(),
      password: z.string(),
    })
    .optional(),
  password: z.string().optional(),
  key: z.string().optional(),
});

export const AddPickuploationSchema = z.object({
  pickup_location: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  address_2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  pin_code: z.number(),
  country: z.string().optional(),
  is_default: z.boolean().optional(),
});
