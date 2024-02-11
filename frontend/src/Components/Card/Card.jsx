import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoTriangleRight } from "react-icons/go";
import Modal from "react-modal";

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
            onClick={(event) => openModal(event)}
            to={link}
            className={`cursor-pointer text-gray-800`}
          >
            {icon2}
          </Link>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Select Semester Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1001,
            maxWidth: "30%",
            maxHeight: "30%",
            overflow: "auto",
          },
        }}
      >
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex w-full">
            <h1 className="items-start text-xl font-semibold">
              Select Semester
            </h1>
            <button onClick={closeModal} className="items-end">
              Close Modal
            </button>
          </div>
          <div>
            <select>
              <option value="" disabled>
                Choose Semester
              </option>
              {[1, 2, 3, 4, 5, 6].map((semester) => (
                <option key={semester} value={semester}>
                  Semester {semester}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Card;
