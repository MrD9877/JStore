export type DeliveryAddress = {
  nickname: string;
  state: string;
  pincode: number;
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  type: "home" | "office" | "other";
  phonenumber: number;
};

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
