import { UpdateAdmin } from "@/@types/admin";
import PasswordInput from "@/components/ui/PasswordInput";
import { IndianStates } from "@/hooks/useEditProfile";
import useToast from "@/hooks/useToast";
import { ChevronDownIcon, LockIcon, LockOpen, Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

function Lock({ lock }: { lock: boolean }) {
  return (
    <>
      <LockIcon width={20} height={15} style={{ display: lock ? "" : "none" }} />{" "}
      <LockOpen width={20} height={15} style={{ display: lock ? "none" : "" }} />
    </>
  );
}

function EditButton({
  lock,
  setLocked,
  name,
}: {
  lock: boolean;
  setLocked: React.Dispatch<
    React.SetStateAction<{
      password: boolean;
      shiprocket: boolean;
      razorpay: boolean;
    }>
  >;
  name: "password" | "shiprocket" | "razorpay";
}) {
  return (
    <button
      type="button"
      style={{ display: lock ? "" : "none" }}
      onClick={() => setLocked((pre) => ({ ...pre, [name]: false }))}
      className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 flex items-center gap-2 ml-3"
    >
      <Pencil width={20} height={15} />
      Edit
    </button>
  );
}

export default function EditAdmin({ keyref, admin }: { admin: null | UpdateAdmin; keyref: React.RefObject<string | null> }) {
  const toast = useToast();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [locked, setLocked] = useState({ password: !!admin, shiprocket: true, razorpay: true });

  function getLockInputProps(lock: boolean) {
    return {
      type: lock ? "password" : "text",
      readOnly: lock,
      tabIndex: lock ? -1 : 0,
      disabled: lock,
      required: !lock,
    };
  }

  const onSubmit = async (data: FormData) => {
    const key = keyref.current;
    if (!key) {
      return toast("Key is missing", false);
    }
    const postData: UpdateAdmin = {
      key,
    };
    if (!locked.shiprocket) {
      postData.shiprocket = {
        email: data.get("shiprocket-email"),
        password: data.get("shiprocket-password"),
        pickupaddress: data.get("shiprocket-pickup"),
      } as UpdateAdmin["shiprocket"];
    }
    if (!locked.razorpay) {
      postData.razorpay = {
        username: data.get("razorpay-username"),
        password: data.get("razorpay-password"),
      } as UpdateAdmin["razorpay"];
    }
    if (!locked.password) {
      postData.password = data.get("password") as string;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin`, {
      method: "PUT",
      body: JSON.stringify(postData),
    });
    if (res.ok) {
      toast("Admin updated successfully");
      router.push("/admin/orders");
    } else {
      toast("Error updating admin");
    }
  };
  return (
    <div style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_HOSTED_URL}/images/bgImage.jpg)` }} className="py-10">
      <form ref={formRef} className="bg-black/85 w-[80%] rounded-xl mx-auto px-8 py-10" action={onSubmit}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-2xl font-semibold text-white">Admin Data</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* pasword */}
              <div className="sm:col-span-4">
                <label htmlFor="password" className="text-sm/6 font-medium text-white flex items-center gap-2">
                  Password <Lock lock={locked.password} />
                </label>
                <div className="mt-2 flex items-center gap-4">
                  <input
                    id="password"
                    name="password"
                    {...getLockInputProps(locked.password)}
                    autoComplete="password"
                    defaultValue={admin?.password || ""}
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                  <EditButton lock={locked.password} setLocked={setLocked} name="password" />
                </div>
              </div>
              {/* shiprocket */}
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 sm:col-span-6 mt-10">
                <h3 className="text-xl font-semibold text-white sm:col-span-6 flex items-center gap-2">
                  Shiprocket <Lock lock={locked.shiprocket} /> <EditButton lock={locked.shiprocket} setLocked={setLocked} name="shiprocket" />
                </h3>
                <div className="sm:col-span-3 ">
                  <label htmlFor="shiprocket-email" className="block text-sm/6 font-medium text-white">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="shiprocket-email"
                      name="shiprocket-email"
                      autoComplete="given-name"
                      {...getLockInputProps(locked.shiprocket)}
                      defaultValue={admin?.shiprocket?.email || ""}
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 ">
                  <label htmlFor="shiprocket-password" className="block text-sm/6 font-medium text-white">
                    Password
                  </label>
                  <div className="mt-2">
                    <PasswordInput
                      name="shiprocket-password"
                      id="shiprocket-password"
                      {...getLockInputProps(locked.shiprocket)}
                      defaultValue={admin?.shiprocket?.password || ""}
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="shiprocket-pickup" className="block text-sm/6 font-medium text-white">
                    PickUp Location
                  </label>
                  <div className="flex gap-2">
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <select
                        id="shiprocket-pickup"
                        name="shiprocket-pickup"
                        autoComplete="shiprocket-pickup"
                        {...getLockInputProps(locked.shiprocket)}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pl-3 pr-8 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      >
                        {IndianStates.map((state) => {
                          return (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          );
                        })}
                      </select>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                      />
                      <button
                        type="button"
                        className="rounded-md col-start-2 bg-indigo-500 px-3 py-1.5 text-[10px] sm:text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 flex items-center justify-center gap-2"
                      >
                        <Plus width={12} height={12} />
                        New Pickuplocation
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* razorpay */}
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 sm:col-span-6 my-10">
                <h3 className="text-xl font-semibold text-white sm:col-span-6 flex items-center gap-2 ">
                  RazorPay <Lock lock={locked.razorpay} />
                  <EditButton lock={locked.razorpay} setLocked={setLocked} name="razorpay" />
                </h3>
                <div className="sm:col-span-3 ">
                  <label htmlFor="razorpay-username" className="block text-sm/6 font-medium text-white">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="razorpay-username"
                      name="razorpay-username"
                      autoComplete="given-name"
                      {...getLockInputProps(locked.razorpay)}
                      defaultValue={admin?.razorpay?.username || ""}
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 ">
                  <label htmlFor="razorpay-password" className="block text-sm/6 font-medium text-white">
                    Password
                  </label>
                  <div className="mt-2">
                    <PasswordInput
                      name="razorpay-password"
                      id="razorpay-password"
                      {...getLockInputProps(locked.razorpay)}
                      defaultValue={admin?.razorpay?.password || ""}
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="key" className="gap-2 text-sm/6 font-medium text-white flex items-center ">
                  KEY <Lock lock={true} />
                </label>
                <div className="mt-2 flex items-center">
                  <input
                    value={keyref.current || ""}
                    readOnly
                    tabIndex={-1}
                    name="key"
                    type="password"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                  <span
                    style={{ width: "19px", marginLeft: "4px", display: "inline-block", verticalAlign: "middle" }}
                    dangerouslySetInnerHTML={{
                      __html: `<lord-icon
                    style="width:19px;"
                    src="https://cdn.lordicon.com/drdlomqk.json"
                    trigger="hover"
                    colors="primary:#6c16c7,secondary:#545454,tertiary:#6c16c7"
                  ></lord-icon>`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
