import { useAuth } from "../../state/auth";

function Logout() {
  const { setIsLoggedIn, setVenueManager } = useAuth();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("name");
  localStorage.removeItem("venueManager");

  setIsLoggedIn(false);
  setVenueManager(false);
}

export default Logout;
