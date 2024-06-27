import axios from "axios";

export interface Car {
  id: number;
  car: string;
  car_model: string;
  car_color: string;
  car_model_year: number;
  car_vin: string;
  price: string;
  availability: boolean;
}

const API_URL = "https://myfakeapi.com/api/cars/";

export const fetchCars = async (): Promise<Car[]> => {
  const response = await axios.get<{ cars: Car[] }>(API_URL);
  return response.data.cars;
};

export const fetchCarById = async (id: number): Promise<Car> => {
  const response = await axios.get<{ Car: Car }>(`${API_URL}${id}`);
  return response.data.Car;
};
