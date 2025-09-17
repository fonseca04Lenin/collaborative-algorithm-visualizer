import type { SortingStep } from '../types';

export function bubbleSortSteps(arr: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const generator = bubbleSortStepsGenerator(arr);

  for (const step of generator) {
    steps.push(step);
  }

  return steps;
}

export function mergeSortSteps(arr: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const generator = mergeSortStepsGenerator(arr);

  for (const step of generator) {
    steps.push(step);
  }

  return steps;
}

export function quickSortSteps(arr: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const generator = quickSortStepsGenerator(arr);

  for (const step of generator) {
    steps.push(step);
  }

  return steps;
}

function* bubbleSortStepsGenerator(arr: number[]): Generator<SortingStep, void, unknown> {
  let array = [...arr];
  let stepNumber = 0;

  yield {
    state: { array: [...array] },
    explanation: `Starting bubble sort with array [${array.join(', ')}]`,
    stepNumber: stepNumber++
  };

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      yield {
        state: {
          array: [...array],
          comparing: [j, j + 1]
        },
        explanation: `Comparing ${array[j]} and ${array[j + 1]}`,
        stepNumber: stepNumber++
      };

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        yield {
          state: {
            array: [...array],
            swapping: [j, j + 1]
          },
          explanation: `Swapping ${array[j + 1]} and ${array[j]}`,
          stepNumber: stepNumber++
        };
      }
    }

    yield {
      state: {
        array: [...array],
        sorted: Array.from({ length: i + 1 }, (_, idx) => array.length - 1 - idx)
      },
      explanation: `Element at position ${array.length - 1 - i} is now in correct position`,
      stepNumber: stepNumber++
    };
  }

  yield {
    state: { array: [...array] },
    explanation: 'Array is now sorted!',
    stepNumber: stepNumber++
  };
}

function* mergeSortStepsGenerator(arr: number[]): Generator<SortingStep, void, unknown> {
  let array = [...arr];
  let stepNumber = 0;

  yield {
    state: { array: [...array] },
    explanation: `Starting merge sort with array [${array.join(', ')}]`,
    stepNumber: stepNumber++
  };

  function* mergeSortRecursive(left: number, right: number): Generator<SortingStep, void, unknown> {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      yield {
        state: {
          array: [...array],
          dividing: { left, right }
        },
        explanation: `Dividing array from index ${left} to ${right} at midpoint ${mid}`,
        stepNumber: stepNumber++
      };

      yield* mergeSortRecursive(left, mid);
      yield* mergeSortRecursive(mid + 1, right);

      yield {
        state: {
          array: [...array],
          merging: { left, mid, right }
        },
        explanation: `Merging sorted subarrays [${left}..${mid}] and [${mid + 1}..${right}]`,
        stepNumber: stepNumber++
      };

      yield* merge(left, mid, right);
    }
  }

  function* merge(left: number, mid: number, right: number): Generator<SortingStep, void, unknown> {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);

    yield {
      state: {
        array: [...array],
        leftArray: leftArr,
        rightArray: rightArr,
        merging: { left, mid, right }
      },
      explanation: `Created temporary arrays: left [${leftArr.join(', ')}], right [${rightArr.join(', ')}]`,
      stepNumber: stepNumber++
    };

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      yield {
        state: {
          array: [...array],
          comparing: [left + i, mid + 1 + j],
          leftArray: leftArr,
          rightArray: rightArr,
          merging: { left, mid, right }
        },
        explanation: `Comparing ${leftArr[i]} (left) and ${rightArr[j]} (right)`,
        stepNumber: stepNumber++
      };

      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i];
        yield {
          state: {
            array: [...array],
            leftArray: leftArr,
            rightArray: rightArr,
            merging: { left, mid, right }
          },
          explanation: `Placed ${leftArr[i]} from left array at position ${k}`,
          stepNumber: stepNumber++
        };
        i++;
      } else {
        array[k] = rightArr[j];
        yield {
          state: {
            array: [...array],
            leftArray: leftArr,
            rightArray: rightArr,
            merging: { left, mid, right }
          },
          explanation: `Placed ${rightArr[j]} from right array at position ${k}`,
          stepNumber: stepNumber++
        };
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      array[k] = leftArr[i];
      yield {
        state: {
          array: [...array],
          leftArray: leftArr,
          rightArray: rightArr,
          merging: { left, mid, right }
        },
        explanation: `Copying remaining ${leftArr[i]} from left array`,
        stepNumber: stepNumber++
      };
      i++;
      k++;
    }

    while (j < rightArr.length) {
      array[k] = rightArr[j];
      yield {
        state: {
          array: [...array],
          leftArray: leftArr,
          rightArray: rightArr,
          merging: { left, mid, right }
        },
        explanation: `Copying remaining ${rightArr[j]} from right array`,
        stepNumber: stepNumber++
      };
      j++;
      k++;
    }

    yield {
      state: {
        array: [...array],
        sorted: Array.from({ length: right - left + 1 }, (_, idx) => left + idx)
      },
      explanation: `Merged subarray [${left}..${right}] is now sorted`,
      stepNumber: stepNumber++
    };
  }

  yield* mergeSortRecursive(0, array.length - 1);

  yield {
    state: {
      array: [...array],
      sorted: Array.from({ length: array.length }, (_, idx) => idx)
    },
    explanation: 'Merge sort complete! Array is now sorted.',
    stepNumber: stepNumber++
  };
}

function* quickSortStepsGenerator(arr: number[]): Generator<SortingStep, void, unknown> {
  let array = [...arr];
  let stepNumber = 0;

  yield {
    state: { array: [...array] },
    explanation: `Starting quick sort with array [${array.join(', ')}]`,
    stepNumber: stepNumber++
  };

  function* quickSortRecursive(left: number, right: number): Generator<SortingStep, void, unknown> {
    if (left < right) {
      yield {
        state: {
          array: [...array],
          partitioning: { left, right, pivot: right }
        },
        explanation: `Sorting subarray [${left}..${right}] using pivot ${array[right]} at index ${right}`,
        stepNumber: stepNumber++
      };

      const pivotIndex = yield* partition(left, right);

      yield {
        state: {
          array: [...array],
          partitioned: { left: pivotIndex, right: pivotIndex },
          sorted: [pivotIndex]
        },
        explanation: `Pivot ${array[pivotIndex]} is now in correct position ${pivotIndex}`,
        stepNumber: stepNumber++
      };

      yield* quickSortRecursive(left, pivotIndex - 1);
      yield* quickSortRecursive(pivotIndex + 1, right);
    }
  }

  function* partition(left: number, right: number): Generator<SortingStep, number, unknown> {
    const pivot = array[right];
    let i = left - 1;

    yield {
      state: {
        array: [...array],
        pivot: right,
        partitioning: { left, right, pivot: right }
      },
      explanation: `Using ${pivot} as pivot. Partitioning array from ${left} to ${right}`,
      stepNumber: stepNumber++
    };

    for (let j = left; j < right; j++) {
      yield {
        state: {
          array: [...array],
          comparing: [j, right],
          pivot: right,
          partitioning: { left, right, pivot: right }
        },
        explanation: `Comparing ${array[j]} with pivot ${pivot}`,
        stepNumber: stepNumber++
      };

      if (array[j] <= pivot) {
        i++;
        if (i !== j) {
          yield {
            state: {
              array: [...array],
              swapping: [i, j],
              pivot: right,
              partitioning: { left, right, pivot: right }
            },
            explanation: `${array[j]} ≤ ${pivot}, swapping positions ${i} and ${j}`,
            stepNumber: stepNumber++
          };

          [array[i], array[j]] = [array[j], array[i]];

          yield {
            state: {
              array: [...array],
              pivot: right,
              partitioning: { left, right, pivot: right }
            },
            explanation: `Swapped ${array[i]} and ${array[j]}`,
            stepNumber: stepNumber++
          };
        }
      }
    }

    yield {
      state: {
        array: [...array],
        swapping: [i + 1, right],
        pivot: right,
        partitioning: { left, right, pivot: right }
      },
      explanation: `Placing pivot ${pivot} in correct position ${i + 1}`,
      stepNumber: stepNumber++
    };

    [array[i + 1], array[right]] = [array[right], array[i + 1]];

    return i + 1;
  }

  yield* quickSortRecursive(0, array.length - 1);

  yield {
    state: {
      array: [...array],
      sorted: Array.from({ length: array.length }, (_, idx) => idx)
    },
    explanation: 'Quick sort complete! Array is now sorted.',
    stepNumber: stepNumber++
  };
}