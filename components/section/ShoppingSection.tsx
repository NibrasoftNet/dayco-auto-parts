import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

const ShoppingSection = () => {
  return (
    <section className="flex w-screen justify-center items-center bg-gray-100 min-h-[400px] p-10">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex size-full items-center justify-center gap-4">
          <div className="flex relative">
            <Image
              src="/landing/shopping_1.png"
              alt="product section image"
              width={300}
              height={300}
              className="avsolute rounded-md object-cover"
            />
            <div className="absolute top-5 left-5 flex flex-col">
              <h4 className="text-sm text-gray-700">YOUR client, Our client</h4>
              <h2 className=" text-4xl font-bold text-black">Our Products</h2>
              <p className="max-w-xs">Get the parts, make the fix.</p>
            </div>
          </div>
          <div className="flex relative">
            <Image
              src="/landing/shopping_2.png"
              alt="product section image"
              width={300}
              height={300}
              className="avsolute rounded-md object-cover"
            />
            <div className="absolute top-5 left-5 flex flex-col text-white">
              <h4 className="text-sm">Search by part Number</h4>
              <h2 className=" text-4xl font-bold ">Advanced search</h2>
              <p className="max-w-xs">
                Our search engine provide accurate search.
              </p>
            </div>
          </div>
          <div className="flex relative">
            <Image
              src="/landing/shopping_3.png"
              alt="product section image"
              width={300}
              height={300}
              className="avsolute rounded-md object-cover"
            />
            <div className="absolute top-5 left-5 flex flex-col">
              <h4 className="text-sm text-gray-700">YOUR client, Our client</h4>
              <h2 className=" text-4xl font-bold text-black">Join us</h2>
              <p className="max-w-xs">Add your shop, get the best service.</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full bg-blue-800 text-white rounded-md p-2">
          <div className="flex-col flex col-span-1 items-center justify-center">
            <h2 className="text-3xl font-bold">
              Looking for a specific part ?
            </h2>
            <p className="p-1 text-center">
              Our team is here to help you find the right part for your needs.
            </p>
          </div>
          <div className="flex col-span-1 items-center justify-center gap-4">
            <Button className="bg-white text-black hover:text-white cursor-pointer">
              Request a call
            </Button>
            <div className="flex flex-col items-center justify-center">
              <h4 className="font-bold text-4xl">+216 55 123 456</h4>
              <span className="text-center text-md text-gray-400">
                We are available 24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingSection;
