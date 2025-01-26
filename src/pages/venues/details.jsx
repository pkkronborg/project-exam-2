import React from "react";
import VenueDetails from "../../components/VenueDetails";


const Details = () => {
    const isLoggedIn = !!localStorage.getItem("accessToken");
    return (
        <div>
            <VenueDetails isLoggedIn={isLoggedIn} />
        </div>
    )
}

export default Details;