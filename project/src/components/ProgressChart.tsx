import React from 'react';
import type { Workout } from '../types';

interface ProgressChartProps {
  workouts: Workout[];
}

export function ProgressChart({ workouts }: ProgressChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Progress Chart</h2>
      <div className="h-64 flex items-center justify-center text-gray-500">
        Chart will be implemented with a charting library based on your preference
      </div>
    </div>
  );
}