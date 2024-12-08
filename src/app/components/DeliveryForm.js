import { useForm } from "react-hook-form";
export default function DeliveryForm({ submitForm }) {
  const { register, handleSubmit } = useForm();
  return (
    <section className=" antialiased">
      <form onSubmit={handleSubmit(submitForm)} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-white">
                    {" "}
                    Your name{" "}
                  </label>
                  <input {...register("name")} type="text" id="your_name" className="block w-full rounded-sm  py-1  px-3 border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400  focus:border-primary-500 focus:ring-primary-500" placeholder="Bonnie Green" required />
                </div>

                <div>
                  <label htmlFor="your_email" className="mb-2 block text-sm font-medium text-white">
                    {" "}
                    Your email <span className="text-gray-500">(optional)</span>{" "}
                  </label>
                  <input {...register("email")} type="email" id="your_email" className="block w-full py-1 rounded-sm  px-3 border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400  focus:border-primary-500 focus:ring-primary-500" placeholder="name@flowbite.com" />
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <label htmlFor="select-country-input-3" className="block text-sm font-medium text-white">
                      {" "}
                      State
                    </label>
                  </div>
                  <select {...register("state")} id="select-country-input-3" className="block w-full py-1 rounded-sm  px-3 border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400  focus:border-primary-500 focus:ring-primary-500">
                    <option defaultValue={"Punjab"}>Punjab</option>
                    <option value="AS">Haryana</option>
                    <option value="FR">Delhi</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="your_city" className="mb-2 block text-sm font-medium text-white">
                    {" "}
                    City{" "}
                  </label>
                  <input {...register("city")} type="text" id="your_city" className="block w-full rounded-sm  py-1 px-3 border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400  focus:border-primary-500 focus:ring-primary-500" placeholder="name@flowbite.com" required />
                </div>

                <div>
                  <label htmlFor="phone-input-3" className="mb-2 block text-sm font-medium text-white">
                    {" "}
                    Phone Number
                  </label>
                  <div className="flex items-center">
                    <span id="dropdown-phone-button-3" className="z-10 py-1 inline-flex shrink-0 items-center rounded-s-lg border  border-gray-600 bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-700" type="button">
                      +91
                    </span>
                    <div className="relative w-full">
                      <input {...register("phonenumber")} type="number" id="phone-input" className="z-20 py-1 block w-full rounded-e-lg border border-s-0  border-gray-600 border-s-gray-700  bg-gray-700 text-white placeholder:text-gray-400 focus:border-primary-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="pincode" className="mb-2 block text-sm font-medium text-white">
                    {" "}
                    PIN-Code{" "}
                  </label>
                  <input {...register("pin")} type="number" id="pincode" className="block w-full rounded-sm  py-1 px-3 border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400  focus:border-primary-500 focus:ring-primary-500" placeholder="142026" required />
                </div>

                <div>
                  <label htmlFor="housenumber" className="mb-2 block text-sm font-medium text-white">
                    {" "}
                    House No
                  </label>
                  <input {...register("housenumber")} type="text" id="housenumber" className="block w-full  py-1 rounded-sm  px-3 border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400  focus:border-primary-500 focus:ring-primary-500" placeholder="House Number:2002" required />
                </div>

                <div>
                  <label htmlFor="streetname" className="mb-2 block text-sm font-medium text-white">
                    Street Name
                  </label>
                  <input {...register("streetname")} type="text" id="streetname" className="block w-full py-1 rounded-sm  px-3 border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400  focus:border-primary-500 focus:ring-primary-500" placeholder="Pashim marg...." required />
                </div>

                <div className="sm:col-span-2">
                  <button type="submit" class="flex items-center justify-center gap-2 hover:bg-neutral-200 bg-neutral-50 rounded text-neutral-800 font-extrabold w-full p-3">
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                    </svg>
                    Add new address
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
