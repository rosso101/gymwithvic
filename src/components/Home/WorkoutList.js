import React, { useState } from "react";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";

const WorkoutList = (props) => {
  const library = useSelector((state) => state.workout_library);
  const [showAll, setShowAll] = useState(false); // State to control whether to show all workouts or not

  // Number of workouts to display initially
  const initialWorkoutsToShow = 3;

  // Function to handle "I'm Feeling Lucky" button click
  const handleFeelingLucky = () => {
    if (library.length > 0) {
      const randomWorkout = library[Math.floor(Math.random() * library.length)];
      props.changeView("woi" + randomWorkout.id); // Navigate to the randomly selected workout
    }
  };

  return (
    <>
      <ul className={styles.workoutList}>
        {/* If showAll is true, show all workouts; otherwise, show only the first few */}
        {(showAll ? library : library.slice(0, initialWorkoutsToShow)).map((itm) => (
          <button
            onClick={() => {
              props.changeView("woi" + itm.id);
            }}
            key={itm.id}
          >
            {itm.name}
          </button>
        ))}
      </ul>

      {/* Dynamically change the button text based on the showAll state */}
      <button
        className={styles.allButton}
        onClick={() => {
          setShowAll(!showAll); // Toggle between showing all and showing less
        }}
      >
        {showAll ? "Show Less" : "All Workouts"}
      </button>

      {/* "I'm Feeling Lucky" button */}
      <button
        id="feelingLuckyButton" // Unique ID for the button
        className={styles.feelingLuckyButton} // Unique CSS class
        onClick={handleFeelingLucky}
      >
        I'm Feeling Lucky
      </button>
    </>
  );
};

export default WorkoutList;