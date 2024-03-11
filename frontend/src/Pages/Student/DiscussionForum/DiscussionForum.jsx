import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import { MySubject } from "../../../Services/discussionForumServices";

export default function DiscussionForum() {
  const { user } = useAuth();
  const [subjects, setSubject] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const allsubject = await MySubject(user.CurrentSemester);
        console.log(allsubject);
        setSubject(allsubject);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return <div>DiscussionForum</div>;
}
