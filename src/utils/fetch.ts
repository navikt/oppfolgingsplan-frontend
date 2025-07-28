import { loginUser } from "./urlUtils";

export const get = async <ResponseData>(
  path: string,
): Promise<ResponseData> => {
  const response = await fetch(path, {
    method: "GET",
    credentials: "include",
  });

  if (response.status === 401) {
    loginUser();
  }

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status} ${response.statusText} - ${response.url}`,
    );
  }

  return await response.json();
};

export const post = async <ResponseData>(
  url: string,
  data: unknown,
): Promise<ResponseData> => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    loginUser();
  }

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status} ${response.statusText} - ${response.url}`,
    );
  }

  return await response.json();
};
