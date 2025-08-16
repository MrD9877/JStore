export default async function FetchAddress(token) {
  let address;
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Make the request
    const res = await fetch("https://apiv2.shiprocket.in/v1/external/settings/company/pickup", {
      headers,
    });
    if (res.ok) {
      const data = await res.json();
      address = data.data.shipping_address;
    }
  } catch (err) {
    address = undefined;
  }
  return address;
}
