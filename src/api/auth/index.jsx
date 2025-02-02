const auth = localStorage.getItem("accessToken");
const name = localStorage.getItem("name");

const BASE_URL = "https://v2.api.noroff.dev/auth";

async function handleResponse(response) {
  if (!response.ok) {
    // Extract error message if available
    const errorData = await response.json();
    const errorMessage = errorData.errors[0].message || "Something went wrong";
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function login(credentials) {
  const response = await fetch(`${BASE_URL}/login?_holidaze=true`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
}

export async function register(data) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export { auth, name };
