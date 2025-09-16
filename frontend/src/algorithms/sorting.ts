import type { SortingStep } from '../types';
import {
  bubbleSortSteps as sharedBubbleSortSteps,
  mergeSortSteps as sharedMergeSortSteps,
  quickSortSteps as sharedQuickSortSteps
} from '../../../shared/dist/algorithms/sorting';

export function bubbleSortSteps(arr: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const generator = sharedBubbleSortSteps(arr);

  for (const step of generator) {
    steps.push(step);
  }

  return steps;
}

export function mergeSortSteps(arr: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const generator = sharedMergeSortSteps(arr);

  for (const step of generator) {
    steps.push(step);
  }

  return steps;
}

export function quickSortSteps(arr: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const generator = sharedQuickSortSteps(arr);

  for (const step of generator) {
    steps.push(step);
  }

  return steps;
}