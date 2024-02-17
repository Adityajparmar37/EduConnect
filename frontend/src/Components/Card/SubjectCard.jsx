import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";

export default function SubjectCard({ semSubject }) {
  return (
    <>
      <Link>
        <div className="mr-auto h-auto">
          {semSubject && (
            <div className="grid grid-cols-4 gap-14">
              {semSubject.map((subject, index) => (
                <div
                  key={index}
                  className="mb-2 rounded-md bg-zinc-50 border-black p-4 shadow-md duration-300 hover:shadow-xl"
                >
                  <h2 className="text-lg font-bold">
                    <div className="flex items-center">
                      <span className="text-slate-500">
                        <IoMdArrowDropright />
                      </span>{" "}
                      <span className="text-slate-500">Subject Name :</span>
                      <sapn className="ml-2">{subject.subjectName}</sapn>
                    </div>
                  </h2>
                  <h2 className="text-lg font-bold">
                    <div className="flex items-center">
                      <span className="text-slate-500">
                        <IoMdArrowDropright />
                      </span>{" "}
                      <span className="text-slate-500">Subject Number :</span>
                      <sapn className="ml-2">{subject.subjectNumber}</sapn>
                    </div>
                  </h2>
                </div>
              ))}
            </div>
          )}
        </div>
      </Link>
    </>
  );
}
