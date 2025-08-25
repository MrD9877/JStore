import z from "zod";

export type DeliveryAddress = z.infer<typeof DeliveryAddressSchema>;

export const DeliveryAddressSchema = z
  .object({
    nickname: z.string(),
    state: z.string(),
    pincode: z.number(),
    name: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string(),
    city: z.string(),
    country: z.string(),
    type: z.enum(["home", "office", "other"]),
    phonenumber: z.number(),
  })
  .strip();

export type UserType = {
  username: string;
  email?: string;
  password: string;
  deliveryaddress: DeliveryAddress[];
  name?: string;
  state?: string;
  phonenumber?: number;
  avatarId?: number;
};
