import { createStore } from "redux";

// Initial state for the Redux store
const initial_state = {
  workout_library: [
   
  {
    id: 1,
    name: "Full Body Strength",
    activities: [
      { id: 1, name: "Barbell Squats", reps: 5, sets: 4 },
      { id: 2, name: "Bench Press", reps: 5, sets: 4 },
      { id: 3, name: "Deadlifts", reps: 5, sets: 3 },
      { id: 4, name: "Pull Ups", reps: 8, sets: 3 },
      { id: 5, name: "Overhead Press", reps: 6, sets: 3 },
    ],
  },
  {
    id: 2,
    name: "Upper Body Hypertrophy",
    activities: [
      { id: 1, name: "Incline Dumbbell Press", reps: 10, sets: 4 },
      { id: 2, name: "Lat Pulldown", reps: 12, sets: 3 },
      { id: 3, name: "Dumbbell Shoulder Press", reps: 10, sets: 3 },
      { id: 4, name: "Cable Chest Flys", reps: 12, sets: 3 },
      { id: 5, name: "Barbell Bicep Curls", reps: 12, sets: 3 },
      { id: 6, name: "Tricep Pushdowns", reps: 12, sets: 3 },
    ],
  },
  {
    id: 3,
    name: "Lower Body Power",
    activities: [
      { id: 1, name: "Barbell Deadlifts", reps: 5, sets: 4 },
      { id: 2, name: "Leg Press", reps: 8, sets: 4 },
      { id: 3, name: "Walking Lunges", reps: 12, sets: 3 },
      { id: 4, name: "Romanian Deadlifts", reps: 8, sets: 3 },
      { id: 5, name: "Calf Raises", reps: 15, sets: 4 },
    ],
  },
  {
    id: 4,
    name: "Core and Stability",
    activities: [
      { id: 1, name: "Hanging Leg Raises", reps: 15, sets: 3 },
      { id: 2, name: "Plank", duration: "60 seconds", sets: 3 },
      { id: 3, name: "Russian Twists", reps: 20, sets: 3 },
      { id: 4, name: "Cable Woodchoppers", reps: 12, sets: 3 },
      { id: 5, name: "Ab Wheel Rollouts", reps: 10, sets: 3 },
    ],
  },
  {
    id: 5,
    name: "Push Day (Chest, Shoulders, Triceps)",
    activities: [
      { id: 1, name: "Flat Barbell Bench Press", reps: 6, sets: 4 },
      { id: 2, name: "Incline Dumbbell Press", reps: 8, sets: 3 },
      { id: 3, name: "Arnold Press", reps: 10, sets: 3 },
      { id: 4, name: "Cable Tricep Pushdowns", reps: 12, sets: 3 },
      { id: 5, name: "Lateral Raises", reps: 12, sets: 3 },
    ],
  },
  {
    id: 6,
    name: "Pull Day (Back, Biceps)",
    activities: [
      { id: 1, name: "Pull Ups", reps: 8, sets: 4 },
      { id: 2, name: "Barbell Rows", reps: 8, sets: 4 },
      { id: 3, name: "Face Pulls", reps: 12, sets: 3 },
      { id: 4, name: "Dumbbell Hammer Curls", reps: 12, sets: 3 },
      { id: 5, name: "Seated Cable Rows", reps: 10, sets: 3 },
    ],
  },
  {
    id: 7,
    name: "Leg Day (Quads, Hamstrings, Glutes)",
    activities: [
      { id: 1, name: "Barbell Back Squats", reps: 6, sets: 4 },
      { id: 2, name: "Romanian Deadlifts", reps: 8, sets: 4 },
      { id: 3, name: "Leg Extensions", reps: 12, sets: 3 },
      { id: 4, name: "Leg Curls", reps: 12, sets: 3 },
      { id: 5, name: "Hip Thrusts", reps: 10, sets: 3 },
    ],
  },
  ],
  workout_history: [], // Initially empty
};

// Helper function to delete a session (workout) from a list
const deleteSession = (id, list) => {
  return list.filter((ses) => ses.id !== id); // Use !== for strict comparison
};

// Helper function to update a workout in the library
const updateWorkout = (id, workout_info, list) => {
  return list.map((workout) =>
    workout.id === id
      ? { ...workout, name: workout_info.name, activities: workout_info.activities }
      : workout
  );
};

// Reducer function to handle state updates
const workoutReducer = (state = initial_state, action) => {
  console.log("Dispatching action:", action.type, "Payload:", action.payload); // Debugging

  switch (action.type) {
    case "ADD_WORKOUT_TO_LIBRARY":
      return {
        ...state,
        workout_library: [action.payload, ...state.workout_library], // Add new workout to the library
      };

    case "ADD_WORKOUT_TO_HISTORY":
      return {
        ...state,
        workout_history: [action.payload, ...state.workout_history], // Add new workout to history
      };

    case "DELETE_WORKOUT_FROM_LIBRARY":
      return {
        ...state,
        workout_library: deleteSession(action.payload, state.workout_library), // Delete workout from library
      };

    case "DELETE_WORKOUT_FROM_HISTORY":
      return {
        ...state,
        workout_history: deleteSession(action.payload, state.workout_history), // Delete workout from history
      };

    case "UPDATE_WORKOUT":
      return {
        ...state,
        workout_library: updateWorkout(
          action.payload.id,
          action.payload.workout_info,
          state.workout_library
        ), // Update a specific workout
      };

    default:
      return state; // Return the current state for unknown actions
  }
};

// Create the Redux store
const store = createStore(workoutReducer);

// Log the initial state
console.log("Initial State:", store.getState());

// Subscribe to store updates (for debugging)
store.subscribe(() => {
  console.log("Store Updated:", store.getState());
});

export default store;