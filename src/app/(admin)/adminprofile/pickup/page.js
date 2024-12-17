"use client";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const popTost = (msg, success) => {
    let emote = "❌";
    if (success) emote = "✅";
    toast(`${msg}`, {
      icon: `${emote}`,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    let shipRocketToken;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, { credentials: "include" });
      const user = await res.json();
      shipRocketToken = user.shiprocket.token;
    } catch (err) {
      return popTost("somthing is not working try reloading or Login...");
    }
    try {
      const headers = { Authorization: `Bearer ${shipRocketToken}`, "Content-Type": "application/json" };
      const res = await fetch("https://apiv2.shiprocket.in/v1/external/settings/company/addpickup", { method: "POST", headers, body: JSON.stringify(data) });
      const msg = await res.json();
      if (res.status === 200) {
        popTost("Done", true);
        router.push("/adminprofile");
      } else {
        popTost(`Rejected! ${msg.message}`);
      }
    } catch {
      return popTost("somthing is not working try reloading or check for connection");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-gray-900">
        <div className="max-w-lg mx-auto mt-10 bg-gray-600 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 ">Pickup Location Form</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="pickup_location" className="block text-sm font-medium text-white">
                Pickup Location
              </label>
              <input type="text" id="pickup_location" name="pickup_location" placeholder="Home" {...register("pickup_location")} className="w-full text-black mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Name
              </label>
              <input type="text" id="name" name="name" placeholder="Deadpool" {...register("name")} className="w-full text-black mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input type="email" id="email" name="email" placeholder="deadpool@chimichanga.com" {...register("email")} className="w-full text-black mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white">
                Phone
              </label>
              <input type="tel" id="phone" name="phone" placeholder="9777777779" {...register("phone")} className="w-full text-black mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-white">
                Address
              </label>
              <input type="text" id="address" name="address" placeholder="Mutant Facility, Sector 3" {...register("address")} className="w-full text-black mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="address_2" className="block text-sm font-medium text-white">
                Address 2
              </label>
              <input type="text" id="address_2" name="address_2" placeholder="" {...register("address_2")} className="w-full text-black mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-white">
                City
              </label>
              <input type="text" id="city" name="city" placeholder="Pune" {...register("city")} className="w-full text-black mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-white">
                State
              </label>
              <input type="text" id="state" name="state" placeholder="Maharashtra" {...register("state")} className="w-full text-black mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-white">
                Country
              </label>
              <input type="text" id="country" name="country" value="India" {...register("country")} className="w-full text-black mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="pin_code" className="block text-sm font-medium text-white">
                Pin Code
              </label>
              <input type="text" id="pin_code" name="pin_code" placeholder="110022" {...register("pin_code")} className="w-full text-black mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
