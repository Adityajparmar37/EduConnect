import React from "react";

export default function SubjectCard({ semSubject }) {
  return (
    <>
      <div className="h-auto">
        {semSubject && (
          <div className="grid grid-cols-3 gap-6">
            {semSubject.map((subject, index) => (
              <div
                key={index}
                className="mb-2 rounded-md border-2 border-black bg-gray-50 p-4 shadow-md duration-300 hover:shadow-xl"
              >
                <h2 className="text-lg font-semibold">
                  <span className="text-slate-500">Subject Name :</span>{" "}
                  {subject.subjectName}
                </h2>
                <h2 className="text-lg font-semibold">
                  <span className="text-slate-500">Subject Name :</span>{" "}
                  {subject.subjectNumber}
                </h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
