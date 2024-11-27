import React, { useState } from 'react';
import { ExerciseForm } from './components/ExerciseForm';
import { WorkoutTracker } from './components/WorkoutTracker';
import { ProgressChart } from './components/ProgressChart';
import type { Exercise, Workout } from './types';

function App() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const handleExerciseSubmit = (exercise: Omit<Exercise, 'id'>) => {
    const newExercise: Exercise = {
      ...exercise,
      id: crypto.randomUUID(),
    };
    setExercises(prev => [...prev, newExercise]);
  };

  const handleWorkoutSubmit = (workout: Omit<Workout, 'id'>) => {
    const newWorkout: Workout = {
      ...workout,
      id: crypto.randomUUID(),
    };
    setWorkouts(prev => [...prev, newWorkout]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Workout Volume Tracker
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ExerciseForm onSubmit={handleExerciseSubmit} />
            <WorkoutTracker onSaveWorkout={handleWorkoutSubmit} />
          </div>
          <div>
            <ProgressChart workouts={workouts} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;