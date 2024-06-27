import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchCarById, Car } from "../../api/carsApi";

export const useCarInfo = (id: number | null): UseQueryResult<Car, Error> => {
  return useQuery<Car, Error>({
    queryKey: ["car", id],
    queryFn: () => fetchCarById(id as number),
    enabled: id !== null,
  });
};
