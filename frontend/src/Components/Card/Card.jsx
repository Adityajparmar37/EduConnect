import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoTriangleRight } from "react-icons/go";
import CustomModal from "../CustomModal/CustomModal";

const Card = ({ bgColor, icon, title, text, link, icon2 }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`relative flex h-[15rem] w-[25rem] flex-col rounded-md border-l-8 border-${bgColor} bg-white p-5 shadow-lg duration-300 hover:shadow-xl`}
        style={{ zIndex: 1 }}
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
        <div
          className={`absolute bottom-10 left-80 flex justify-end text-3xl text-${bgColor} duration-200 hover:translate-x-3`}
          style={{ zIndex: 2 }}
        >
          <Link
            to={link}
            className="cursor-pointer text-gray-800"
          >
            {icon2}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
