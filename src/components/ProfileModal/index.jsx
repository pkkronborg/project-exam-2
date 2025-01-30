import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define the validation schema
const schema = yup.object().shape({
  newAvatarUrl: yup
    .string()
    .url("Must be a valid URL")
    .required("New picture URL is required"),
});

function ProfileModal({ currentAvatar, onClose, onSave }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onSave(data.newAvatarUrl);
  };

  return (
    <div
      className="modal fade show d-flex align-items-center justify-content-center"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">
          <div className="d-flex justify-content-end">
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <h3 className="text-center mb-3">Change Avatar</h3>

          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group text-start">
                <label>Avatar url</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("newAvatarUrl")}
                  placeholder="Enter new picture URL"
                />
                <p className="text-danger">{errors.newAvatarUrl?.message}</p>
              </div>
              <div className="mt-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-primary px-4">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2 px-4"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
