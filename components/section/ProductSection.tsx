import Image from "next/image";
import React from "react";

const ProductsSection = () => {
  return (
    <section className="flex w-screen h-screen justify-center items-center">
      <div className="flex items-center gap-2">
        <div className="flex relative">
          <Image
            src="/landing/product-section.png"
            alt="product section image"
            width={620}
            height={300}
            className="rounded-md object-cover"
          />
          <div>
            <h2 className="absolute top-10 left-10 text-4xl font-bold text-black">
              Our Products
            </h2>
            <p className="absolute top-20 left-10  max-w-xs">
              Discover our exclusive range of Dayco products, designed for
              quality and performance.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <Image
              src="/landing/tire_1.jpeg"
              alt="tire_1"
              width={250}
              height={250}
              className="rounded-md object-cover"
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Complete Tire Guide
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <Image
              src="/landing/tire_2.jpeg"
              alt="tire_2"
              width={250}
              height={250}
              className="rounded-md object-cover"
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Latest tech in Tire
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <Image
              src="/landing/tire_3.jpeg"
              alt="tire_3"
              width={250}
              height={250}
              className="rounded-md object-cover"
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Fast delivery & shipping
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
