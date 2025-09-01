import { OrderType } from "@/@types/orders";
import React from "react";

export default function CustomerDetailCard({ order }: { order: OrderType }) {
  return (
    <>
      <div className="w-full lg:ml-8">
        <div className="mx-4 lg:mx-auto shadow-grayesh rounded-lg">
          <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="w-full flex flex-col">
              <div className="flex-1 bg-white   p-8">
                <h4 className="text-xl text-gray-900 font-bold">Customer Details</h4>
                <ul className="mt-2 text-gray-700">
                  <li className="flex justify-between border-y py-2">
                    <div className="flex">
                      <svg className="w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g data-name="60.User">
                          <path d="M12 12a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2zM18.9 21.166l-1.972-.332a5 5 0 1 0-9.862 0l-1.966.332a7 7 0 1 1 13.806 0z" />
                          <path d="M12 24a12 12 0 1 1 12-12 12.013 12.013 0 0 1-12 12zm0-22a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2z" />
                        </g>
                      </svg>
                      <span className="font-bold w-24">Name:</span>
                    </div>
                    <span className="text-gray-700 mr-28 flex-wrap">{order.address.name}</span>
                  </li>
                  {/* <li className="flex justify-between border-b py-2">
                    <div className="flex">
                      <svg className="w-4 mr-2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                        <path d="M123.25 24.192c0-.018 0-.034-.005-.052s-.007-.063-.009-.094a1.734 1.734 0 0 0-.083-.408c-.006-.018 0-.037-.011-.055s-.01-.015-.013-.023a1.734 1.734 0 0 0-.227-.407c-.021-.028-.043-.053-.066-.08a1.755 1.755 0 0 0-.31-.294c-.012-.009-.022-.02-.034-.028a1.744 1.744 0 0 0-.414-.2c-.034-.012-.068-.022-.1-.032a1.733 1.733 0 0 0-.474-.073H6.5a1.733 1.733 0 0 0-.474.073c-.035.01-.068.02-.1.032a1.744 1.744 0 0 0-.414.2c-.012.008-.022.019-.034.028a1.755 1.755 0 0 0-.31.294c-.022.027-.045.052-.066.08a1.734 1.734 0 0 0-.227.407c0 .008-.01.015-.013.023s-.005.037-.011.055a1.734 1.734 0 0 0-.083.408c0 .032-.009.063-.009.094s-.005.034-.005.052v79.615c0 .023.006.045.007.068a1.737 1.737 0 0 0 .019.188c.008.051.015.1.027.152a1.74 1.74 0 0 0 .056.179c.017.047.033.094.054.139a1.729 1.729 0 0 0 .093.172c.024.04.048.081.075.119a1.743 1.743 0 0 0 .125.152c.033.036.066.072.1.106.021.019.037.042.059.061s.036.017.052.03a1.736 1.736 0 0 0 .452.263c.035.014.071.022.107.033a1.732 1.732 0 0 0 .488.085c.012 0 .023.006.035.006H121.501c.012 0 .023-.006.034-.006a1.732 1.732 0 0 0 .489-.085c.035-.011.07-.019.1-.033a1.736 1.736 0 0 0 .453-.263c.016-.013.036-.017.052-.03s.038-.042.059-.061c.036-.034.069-.069.1-.106a1.743 1.743 0 0 0 .125-.152c.027-.038.051-.078.075-.119a1.729 1.729 0 0 0 .093-.172c.021-.045.037-.092.054-.139a1.74 1.74 0 0 0 .056-.179c.012-.05.019-.1.027-.152a1.737 1.737 0 0 0 .019-.188c0-.023.007-.045.007-.068zM45.8 60.316l17.058 14.677a1.751 1.751 0 0 0 2.283 0L82.2 60.316l35.512 41.741H10.289zM8.25 99.052V28.007l34.9 30.026zm76.6-41.019 34.9-30.026v71.045zm31.931-32.091L81.276 56.493c-.006.005-.014.008-.02.014l-.019.02L64 71.358 46.763 56.527l-.019-.02-.02-.014-35.507-30.551z" />
                      </svg>
                      <span className="font-bold w-24">Email:</span>
                    </div>
                    <span className="text-gray-700 flex overflow-x-scroll"> {order.? customer.email : "NOT Provided"}</span>
                  </li> */}
                  <li className="flex justify-between border-b py-2">
                    <div className="flex">
                      <svg className="w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                        <path d="M96.131 123.433c-13.342 0-38.082-3.982-62.831-28.733C4.67 66.071 3.829 37.453 4.8 26.478a19.431 19.431 0 0 1 4.445-10.735l6.973-8.4a7.716 7.716 0 0 1 11.394-.528L50.205 29.41a7.717 7.717 0 0 1-.528 11.4l-15.424 12.8a82.706 82.706 0 0 0 16.712 23.425 82.726 82.726 0 0 0 23.426 16.712L87.2 78.322a7.718 7.718 0 0 1 11.4-.527l22.593 22.593a7.716 7.716 0 0 1-.528 11.394l-8.4 6.973a19.438 19.438 0 0 1-10.735 4.448 61.91 61.91 0 0 1-5.399.23zM22.164 8.057h-.2a4.171 4.171 0 0 0-3.05 1.52l-6.973 8.4a15.945 15.945 0 0 0-3.655 8.807c-.924 10.486-.1 37.853 27.491 65.44s54.958 28.415 65.441 27.491a15.936 15.936 0 0 0 8.8-3.656l8.4-6.972a4.218 4.218 0 0 0 .289-6.227L96.115 80.27a4.216 4.216 0 0 0-6.226.288l-13.66 16.454a1.752 1.752 0 0 1-2.056.481A85.615 85.615 0 0 1 48.49 79.51a85.615 85.615 0 0 1-17.983-25.683 1.75 1.75 0 0 1 .481-2.056l16.453-13.66a4.215 4.215 0 0 0 .289-6.226L25.138 9.292a4.166 4.166 0 0 0-2.974-1.235zm-4.6.406zM111.752 61.86A1.749 1.749 0 0 1 110 60.11 42.161 42.161 0 0 0 67.89 18a1.75 1.75 0 1 1 0-3.5 45.664 45.664 0 0 1 45.61 45.61 1.749 1.749 0 0 1-1.748 1.75z" />
                        <path d="M101.442 61.86a1.75 1.75 0 0 1-1.75-1.75 31.838 31.838 0 0 0-31.8-31.8 1.75 1.75 0 0 1 0-3.5 35.343 35.343 0 0 1 35.3 35.3 1.749 1.749 0 0 1-1.75 1.75z" />
                        <path d="M91.132 61.86a1.749 1.749 0 0 1-1.75-1.75A21.517 21.517 0 0 0 67.89 38.618a1.75 1.75 0 0 1 0-3.5A25.021 25.021 0 0 1 92.882 60.11a1.749 1.749 0 0 1-1.75 1.75z" />
                      </svg>
                      <span className="font-bold w-24">Phone:</span>
                    </div>
                    <span className="text-gray-700 mr-28 flex-wrap"> {order.address.phonenumber}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-4 m-auto lg:mx-auto shadow-grayesh rounded-lg">
          <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="w-full flex flex-col ">
              <div className="flex-1 bg-white   p-8">
                <h4 className="text-xl text-gray-900 font-bold">Deliver Address</h4>
                <ul className="mt-2 text-gray-700 overflow-hidden">
                  <li className="flex justify-between border-y py-2">
                    <div className="flex">
                      <span className="font-bold w-24">State:</span>
                    </div>
                    <span className="text-gray-700 mr-28 flex-wrap "> {order.address.state}</span>
                  </li>
                  <li className="flex justify-between border-b py-2">
                    <div className="flex">
                      <span className="font-bold w-24">PIN:</span>
                    </div>
                    <span className="text-gray-700 mr-28 flex-wrap"> {order.address.pincode}</span>
                  </li>
                  <li className="flex justify-between border-b py-2">
                    <div className="flex">
                      <span className="font-bold w-24">City:</span>
                    </div>
                    <span className="text-gray-700 mr-28 flex-wrap"> {order.address.city}</span>
                  </li>
                  <li className="flex justify-between border-b py-2">
                    <div className="flex">
                      <span className="font-bold w-24">Address:</span>
                    </div>
                    <span className="text-gray-700 mr-28 flex-wrap">
                      <p>{order.address.addressLine1},</p>
                      <p>{order.address.addressLine2}</p>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
