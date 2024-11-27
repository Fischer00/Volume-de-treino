import React, { useState } from 'react';
import { BarChart, Clock, Dumbbell, Plus } from 'lucide-react';
import type { Workout, WorkoutExercise, WorkoutSet } from '../types';

interface WorkoutTrackerProps {
  onSaveWorkout: (workout: Omit<Workout, 'id'>) => void;
}

export function WorkoutTracker({ onSaveWorkout }: WorkoutTrackerProps) {
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [notes, setNotes] = useState('');

  const addSet = (exerciseIndex: number) => {
    setExercises(prev => {
      const newExercises = [...prev];
      newExercises[exerciseIndex].sets.push({
        weight: 0,
        reps: 0
      });
      return newExercises;
    });
  };

  const addExercise = () => {
    setExercises(prev => [...prev, {
      exerciseId: `Exercise ${prev.length + 1}`,
      sets: []
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveWorkout({
      date: new Date().toISOString(),
      exercises,
      notes,
    });
    setExercises([]);
    setNotes('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Dumbbell className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Workout Tracker</h2>
        </div>
        <button
          type="button"
          onClick={addExercise}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Exercise
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg flex items-center space-x-3">
          <Clock className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-blue-600">Duration</p>
            <p className="text-2xl font-bold text-blue-800">45:00</p>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg flex items-center space-x-3">
          <BarChart className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm font-medium text-green-600">Volume</p>
            <p className="text-2xl font-bold text-green-800">
              {exercises.reduce((acc, ex) => acc + ex.sets.length, 0)} sets
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {exercises.map((exercise, index) => (
          <div key={index} className="border-b pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">{exercise.exerciseId}</h3>
              <button
                type="button"
                onClick={() => addSet(index)}
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Set
              </button>
            </div>
            
            {exercise.sets.length > 0 && (
              <>
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <div className="font-medium text-sm text-gray-500">Weight (kg)</div>
                  <div className="font-medium text-sm text-gray-500">Reps</div>
                  <div className="font-medium text-sm text-gray-500">RPE</div>
                </div>
                {exercise.sets.map((set, setIndex) => (
                  <div key={setIndex} className="grid grid-cols-3 gap-4 mb-2">
                    <input
                      type="number"
                      value={set.weight}
                      onChange={(e) => {
                        const newExercises = [...exercises];
                        newExercises[index].sets[setIndex].weight = Number(e.target.value);
                        setExercises(newExercises);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      min="0"
                      step="0.5"
                    />
                    <input
                      type="number"
                      value={set.reps}
                      onChange={(e) => {
                        const newExercises = [...exercises];
                        newExercises[index].sets[setIndex].reps = Number(e.target.value);
                        setExercises(newExercises);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      min="0"
                    />
                    <input
                      type="number"
                      value={set.rpe || ''}
                      onChange={(e) => {
                        const newExercises = [...exercises];
                        newExercises[index].sets[setIndex].rpe = Number(e.target.value);
                        setExercises(newExercises);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      min="1"
                      max="10"
                      step="0.5"
                      placeholder="1-10"
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Workout Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Workout
        </button>
      </form>
    </div>
  );
}