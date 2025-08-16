"use client";
export async function createRocketOrder({ order, customer, packageDetails, handleRocket }) {
  const getToken = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user}`, { credentials: "include" });
      if (res.status === 200) {
        const data = await res.json();
        return data.shiprocket.token;
      }
    } catch {
      //todo pop
      return false;
    }
  };

  const dispatchDelivery = async () => {
    console.log(customer);
    console.log(pickupLocation);
    const token = await getToken();
    if (!token) return;
    const date = new Date(order.orderDate).toLocaleString(undefined, { timeZone: "Asia/Kolkata" });
    const products = order.products.map((product) => {
      return {
        name: product.title,
        sku: product.productId,
        units: product.count,
        selling_price: product.price,
      };
    });
    const data = {
      order_id: order.orderId,
      order_date: date,
      pickup_location: packageDetails.pickupLocation,
      billing_customer_name: customer.name,
      billing_last_name: "",
      billing_address: customer.deliveryaddress.housenumber,
      billing_address_2: customer.deliveryaddress.streetname,
      billing_isd_code: "",
      billing_city: customer.deliveryaddress.city,
      billing_pincode: customer.deliveryaddress.pin,
      billing_state: customer.deliveryaddress.state,
      billing_country: "India",
      billing_email: customer.email,
      billing_phone: customer.phonenumber,
      shipping_is_billing: true,
      order_items: products,
      payment_method: packageDetails.method,
      sub_total: order.amount,
      length: packageDetails.length,
      breadth: packageDetails.breadth,
      height: packageDetails.height,
      weight: packageDetails.weight,
    };
    console.log(data);

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const res = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", { method: "POST", headers, body: JSON.stringify(data) });
      console.log(res);
      try {
        if (res.ok) {
          const shiprocketOrderData = await res.json();
          const fetch = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order?orderId=${order.orderId}`, { method: "PATCH", credentials: "include", body: JSON.stringify(shiprocketOrderData) });
          fetch.ok ? console.log("ok") : console.log(fetch.status);
        }
      } catch {}
    } catch (err) {
      console.log(err);
    }
  };
  return await dispatchDelivery();
}
