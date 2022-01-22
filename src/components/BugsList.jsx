import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBugs, resolveBug, getUnresolvedBugs } from "../store/bugs";

const BugsList = () => {
  const dispatch = useDispatch();

  const bugs = useSelector(getUnresolvedBugs);

  useEffect(() => {
    dispatch(loadBugs());
  }, []);

  const handleResolved = (bugId) => {
    dispatch(resolveBug(bugId));
  };

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug.id}>
          <span>{bug.description}</span>
          <button onClick={() => handleResolved(bug.id)}>Resolved</button>
        </li>
      ))}
    </ul>
  );
};

export default BugsList;
