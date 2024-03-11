import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { useAuth } from "../../../Hooks/useAuth";
import { MySubject } from "../../../Services/discussionForumServices";
import { FcReadingEbook } from "react-icons/fc";

export default function DiscussionForum() {
  const { user } = useAuth();
  const [subjects, setSubject] = useState([]);
  const [selectSub, setSelectSub] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        const allsubject = await MySubject(user.CurrentSemester);
        console.log(allsubject.subjects);
        setSubject(allsubject.subjects);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const handleSubjectBtn = (sub) => {
    console.log(sub);
    setSelectSub(sub);
  };

  return (
    <div className="h-screen bg-gray-100 pt-16">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-[98%] w-[90%] flex-row rounded-2xl bg-white shadow-xl">
          <div className="w-1/4 border-r border-gray-500">
            <div className="flex h-16 flex-row items-center rounded-tl-2xl border-b border-gray-500 bg-gray-700/95 ">
              <FcReadingEbook className="ml-20 text-3xl text-gray-300" />
              <h1 className="ml-5 text-xl font-light text-white">
                {" "}
                Your Subjects
              </h1>
            </div>
            <div className="flex p-5">
              <div className="w-full">
                {/* {console.log("Hello", subjects)} */}
                {subjects && subjects.length > 0 ? (
                  <ul className="text-xl font-bold ">
                    {subjects.map((sub) => (
                      <button
                        className={`mb-2 w-full rounded-lg border-b-4 p-3 text-xl  font-bold ${sub.subjectName === selectSub ? " border-2 bg-gray-50 text-mintPrimary shadow-inner" : "hover:border-2 hover:bg-gray-50 hover:text-mintPrimary hover:shadow-inner"}`}
                        key={sub._id}
                        onClick={() => handleSubjectBtn(sub.subjectName)}
                      >
                        {sub.subjectName}
                      </button>
                    ))}
                  </ul>
                ) : (
                  <p>No Subject Group available</p>
                )}
              </div>
            </div>
          </div>
          <div className="relative flex w-full flex-col">
            <div className="flex h-16 w-full flex-row items-center rounded-tr-2xl border-b border-gray-500 bg-gray-700/95">
              {selectSub ? (
                <h1 className="ml-3 text-xl font-bold text-white">
                  🔸{selectSub}
                </h1>
              ) : (
                <h1 className="ml-3 text-xl font-light text-white">
                  Disscusion Fourm
                </h1>
              )}
            </div>
            <div className="absolute bottom-0 flex w-full flex-col">
              <div
                id="chatContainer"
                className="max-h-[80vh] overflow-y-auto pb-24"
              >
                <div className="p-5 leading-8">
                  {/* {messageReceived && messageReceived.length > 0 ? (
                    messageReceived.map((message, index) => (
                      <div
                        key={index}
                        ref={(m) =>
                          m &&
                          index === messageReceived.length - 1 &&
                          m.parentElement.scrollTo({
                            behavior: "smooth",
                            top: m.parentElement.scrollHeight,
                          })
                        }
                      >
                        {console.log("Message", message)}
                        <div
                          className={
                            message.senderId === student._id
                              ? "flex justify-end"
                              : "flex justify-start"
                          }
                        >
                          {message.senderId === student._id ? (
                            <>
                              <h1 className="mb-3 rounded-xl bg-blue-100 px-8 py-1 text-right text-lg font-bold leading-9 ">
                                {message.content}
                              </h1>
                              <span className="text-md mb-3 ml-2 rounded-full bg-gray-100 px-3 py-1 font-bold leading-9">
                                {message.senderName}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-md mb-3 mr-2 rounded-full bg-gray-100 px-3 py-1 font-bold leading-9">
                                {message.senderName}
                              </span>
                              <h1 className="mb-3 rounded-xl bg-purple-100 px-8 py-1 text-left text-lg font-bold leading-9">
                                {message.content}
                              </h1>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-center justify-center">
                        <h1 className="rounded-lg bg-gray-200 p-2 font-bold shadow-inner">
                          Please Select Group or No chat
                        </h1>
                      </div>
                    </>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
