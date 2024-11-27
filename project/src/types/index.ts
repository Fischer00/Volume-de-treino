export interface Exercise {
  id: string;
  name: string;
  description: string;
  targetMuscles: string[];
  type: 'strength' | 'hypertrophy' | 'endurance';
}

export interface WorkoutSet {
  weight: number;
  reps: number;
  rpe?: number; // Rate of Perceived Exertion
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: WorkoutSet[];
  notes?: string;
}

export interface Workout {
  id: string;
  date: string;
  exercises: WorkoutExercise[];
  notes?: string;
}

export interface UserProfile {
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  goal: 'strength' | 'hypertrophy' | 'endurance';
  weeklyFrequency: number;
}