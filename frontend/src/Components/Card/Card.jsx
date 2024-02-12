import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoTriangleRight } from "react-icons/go";
import CustomModal from "../CustomModal/CustomModal";


const Card = ({ bgColor, icon, title, text, link, icon2 }) => {
  // State to manage modal visibility
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (event) => {
    event.preventDefault();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = () => {};

  return (
    <>
      <div
        className={`relative flex h-[15rem] w-[25rem] flex-col rounded-md border-l-8 border-${bgColor}  bg-white p-5 shadow-lg duration-300 hover:shadow-xl`}
        style={{ zIndex: 1 }} // Ensure cards have lower z-index
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
          style={{ zIndex: 2 }} // Ensure link has higher z-index
        >
          <Link
            onClick={(event) =>
              link === "/attendance" ? openModal(event) : undefined
            }
            to={link}
            className="cursor-pointer text-gray-800"
          >
            {icon2}
          </Link>
        </div>
      </div>
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h1 className="text-xl text-gray-800 font-semibold">Select Semester</h1>
        <select
          onChange={handleChange}
          className="absolute left-0 top-16 w-full border-2 border-black p-2"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
            <option key={semester} value={semester}>
              Semester {semester}
            </option>
          ))}
        </select>
      </CustomModal>
    </>
  );
};

export default Card;
