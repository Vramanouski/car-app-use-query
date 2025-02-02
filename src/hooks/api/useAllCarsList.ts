import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchCars, Car } from "../../api/carsApi";

const getRandomCars = (cars: Car[], count: number): Car[] => {
  const shuffled = cars.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const useCars = (): UseQueryResult<Car[], Error> => {
  return useQuery<Car[], Error>({
    queryKey: ["cars"],
    queryFn: fetchCars,
    select: (data) => getRandomCars(data, 10),
    enabled: true,
  });
};
