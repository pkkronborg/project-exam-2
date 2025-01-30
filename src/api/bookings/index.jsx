const accessToken = localStorage.getItem("accessToken");

console.log("!!!!!!", localStorage.getItem("accessToken"));

const BASE_URL = "https://v2.api.noroff.dev/holidaze/bookings";

async function handleResponse(response) {
  if (!response.ok) {
    // Extract error message if available
    const errorData = await response.json();
    const errorMessage = errorData.errors[0].message || "Something went wrong";
    console.log("errorMessage", errorMessage);
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function book(data) {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": "8c35aa6e-85b0-4670-96b8-6d1763511936",
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}
