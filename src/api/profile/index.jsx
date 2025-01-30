const accessToken = localStorage.getItem("accessToken");
console.log(localStorage.getItem("accessToken"));

const BASE_URL = "https://v2.api.noroff.dev/holidaze/profiles";

async function handleResponse(response) {
  if (!response.ok) {
    // Extract error message if available
    const errorData = await response.json();
    const errorMessage = errorData.message || "Something went wrong";
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function getSingleProfile(name) {
  const response = await fetch(`${BASE_URL}/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": "8c35aa6e-85b0-4670-96b8-6d1763511936",
    },
  });
  return handleResponse(response);
}

export async function getVenuesMadeByProfile(name) {
  const response = await fetch(`${BASE_URL}/${name}/venues`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": "8c35aa6e-85b0-4670-96b8-6d1763511936",
    },
  });
  return handleResponse(response);
}

export async function getBookingsByProfile(name) {
  const response = await fetch(`${BASE_URL}/${name}/bookings?_venue=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": "8c35aa6e-85b0-4670-96b8-6d1763511936",
    },
  });
  return handleResponse(response);
}

export async function updateProfile(name, data) {
  const response = await fetch(`${BASE_URL}/${name}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": "8c35aa6e-85b0-4670-96b8-6d1763511936",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update profile.");
  }

  return response.json();
}
