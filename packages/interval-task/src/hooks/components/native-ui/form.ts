export function useSetField<T>(mode: T) {
  return function (data: { event: T[keyof T]; field: keyof T }) {
    const { field, event } = data;
    mode[field] = event;
  };
}
