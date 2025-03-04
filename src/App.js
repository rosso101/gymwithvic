import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";
import Home from "./components/Home/Home";
import FloatingButtons from "./components/FloatingButtons";
import History from "./components/History/History";
import Library from "./components/Home/Library";
import EditWorkout from "./components/Edit/EditWorkout";
import WorkoutInfo from "./components/WorkoutInfo/WorkoutInfo";
import WorkoutSession from "./components/WorkoutSession/WorkoutSession";
import WorkoutStats from "./components/WokoutStats/WorkoutStats";

export default function App() {
  const dispatch = useDispatch();
  const library = useSelector((state) => state.workout_library);
  const history = useSelector((state) => state.workout_history);
  const [view, setView] = useState("Home");

  // Debugging: Log the current state whenever it changes
  useEffect(() => {
    console.log("Current Library:", library);
    console.log("Current History:", history);
  }, [library, history]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const lcLibKey = "circuit.LIBRARY_STORAGE";
    const lcHisKey = "circuit.HISTORY_STORAGE";

    const storedLibrary = JSON.parse(localStorage.getItem(lcLibKey));
    const storedHistory = JSON.parse(localStorage.getItem(lcHisKey));

    if (storedLibrary !== null) {
      dispatch({ type: "UPDATE_LIBRARY", payload: storedLibrary });
    }
    if (storedHistory !== null) {
      dispatch({ type: "UPDATE_HISTORY", payload: storedHistory });
    }
  }, [dispatch]);

  // Save library to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("circuit.LIBRARY_STORAGE", JSON.stringify(library));
  }, [library]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("circuit.HISTORY_STORAGE", JSON.stringify(history));
  }, [history]);

  return (
    <>
      {view.substring(0, 3) !== "wss" && (
        <FloatingButtons changeView={(view) => setView(view)} />
      )}

      <div className="container">
        {view === "Home" && (
          <Home
            changeView={(view) => {
              setView(view);
            }}
          />
        )}
        {view === "History" && (
          <History
            changeView={(view) => {
              setView(view);
            }}
          />
        )}
        {view === "Library" && (
          <Library
            changeView={(view) => {
              setView(view);
            }}
          />
        )}
        {view === "Create Workout" && (
          <EditWorkout
            workoutId="New"
            changeView={(view) => {
              setView(view);
            }}
          />
        )}
        {view.substring(0, 3) === "wos" && (
          <WorkoutSession workoutId={view.substring(3)} />
        )}
        {view.substring(0, 3) === "ewo" && (
          <EditWorkout
            workoutId={view.substring(3)}
            changeView={(view) => {
              setView(view);
            }}
          />
        )}
        {view.substring(0, 3) === "woi" && (
          <WorkoutInfo
            workoutId={view.substring(3)}
            changeView={(view) => {
              setView(view);
            }}
          />
        )}
        {view.substring(0, 3) === "wss" && (
          <WorkoutSession
            changeView={(view) => {
              setView(view);
            }}
            workoutId={view.substring(3)}
          />
        )}
        {view.substring(0, 3) === "sta" && (
          <WorkoutStats workoutId={view.substring(3)} />
        )}
      </div>
    </>
  );
}