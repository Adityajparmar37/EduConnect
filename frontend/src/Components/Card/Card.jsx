import React from "react";
import { Link } from "react-router-dom";
import { IoArrowForwardSharp } from "react-icons/io5";
import { GoTriangleRight } from "react-icons/go";

const Card = ({ icon, title, text, link }) => {
  return (
    <div
      className={`relative flex h-[15rem] w-[25rem] flex-col rounded-md border-l-8 border-gray-800  bg-white p-5 shadow-lg duration-300 hover:shadow-xl`}
    >
      <div className="p-3 text-4xl">{icon}</div>
      <div>
        <h1 className="ml-2 text-2xl font-bold">{title}</h1>
      </div>
      <div className="text-md ml-3 mt-3 flex flex-col font-light leading-6">
        {text.map((item, index) => (
          <p key={index} className="flex items-center">
            <span className="mr-1">
              <GoTriangleRight />
            </span>
            {item}
          </p>
        ))}
      </div>
      <div className="absolute bottom-10 left-80 flex justify-end text-3xl text-darkPrimary duration-200 hover:translate-x-3">
        <Link to={link} className={`cursor-pointer text-gray-800`}>
          <IoArrowForwardSharp />
        </Link>
      </div>
    </div>
  );
};

export default Card;
