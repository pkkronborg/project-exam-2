import React, { useState, useEffect } from "react";
import { getSingleProfile, updateProfile } from "../../api/profile";
import ProfileModal from "../ProfileModal";

function ProfileDetails() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const name = localStorage.getItem("name");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!name) throw new Error("Name is not available in localStorage.");
        const data = await getSingleProfile(name);
        setProfile(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [name]);

  const handleChangePicture = async (newAvatarUrl) => {
    try {
      await updateProfile(name, { avatar: { url: newAvatarUrl } });
      setProfile((prevProfile) => ({
        ...prevProfile,
        avatar: { ...prevProfile.avatar, url: newAvatarUrl },
      }));
    } catch (error) {
      setError(error.message);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="text-center">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-center mt-4 alert alert-danger">{error}</div>
      ) : (
        <>
          <div className="d-flex flex-column align-items-center vh-100">
            <h1 className="fw-bold my-5">{profile.name}</h1>
            <p className="text-muted">{profile.email}</p>

            {profile?.avatar?.url && (
              <img
                className="img-fluid rounded shadow my-3"
                src={profile.avatar.url}
                alt={profile.avatar.alt || "Profile image"}
                style={{ width: "250px", height: "250px", objectFit: "cover" }}
              />
            )}

            <button
              className="btn btn-success mt-3 px-4"
              onClick={() => setIsModalOpen(true)}
            >
              Change Avatar
            </button>

            {isModalOpen && (
              <ProfileModal
                currentAvatar={profile.avatar?.url}
                onClose={() => setIsModalOpen(false)}
                onSave={handleChangePicture}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileDetails;
