import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchCars, Car } from "../../api/carsApi";

export const useCars = (enabled: boolean): UseQueryResult<Car[], Error> => {
  return useQuery<Car[], Error>({
    queryKey: ["cars"],
    queryFn: fetchCars,
    enabled,
  });
};
