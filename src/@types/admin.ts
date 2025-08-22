export type AdminType = {
  email: string;
  shiprocket: {
    username: string;
    password: string;
    token?: string;
    tokenExpire: number;
    pickupaddress?: string;
  };
  razorpay: {
    username: string;
    password: string;
  };
  password: string;
  singleton: string;
};
export interface IAdmin extends Document, AdminType {}
