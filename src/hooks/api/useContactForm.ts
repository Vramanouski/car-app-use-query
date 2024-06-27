import axios from "axios";

export interface FormData {
  firstName: string;
  lastName: string;
  contact: string;
  message: string;
}

export interface ResponseData {
  message: string;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkpvaG4gV2ljayIsInBhc3N3b3JkIjoiSmFyZGFuaSIsIndlYnNpdGUiOiJ3d3cubXlmYWtlYXBpLmNvbSIsImlhdCI6MTU3NDgyMjMxNiwiZXhwIjoxNTc0ODI0MTE2fQ.UxTH-6sU4i05FXaLUeinlXdex0t7khX4D9nEPw8hUWw";

export const sendContactForm = async (
  data: FormData
): Promise<ResponseData> => {
  const response = await axios.post<ResponseData>(
    "https://myfakeapi.com/api/contactus",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
