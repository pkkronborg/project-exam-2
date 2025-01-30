import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Venue Name is required"),
  description: yup.string().required("Description is required"),
  media: yup.string().required("At least one image URL is required"),
  price: yup
    .number("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required")
    .transform((value, originalValue) =>
      typeof originalValue === "string" && originalValue.trim() === ""
        ? undefined
        : value
    ),
  maxGuests: yup
    .number("Guests must be a number")
    .positive("Guests must be positive")
    .integer("Guests must be an integer")
    .required("Guests is required")
    .transform((value, originalValue) =>
      typeof originalValue === "string" && originalValue.trim() === ""
        ? undefined
        : value
    ),
  rating: yup
    .number("Rating must be a number")
    .min(0, "Rating cannot be negative")
    .max(5, "Rating cannot exceed 5")
    .optional(),
  meta: yup.object().shape({
    wifi: yup.boolean().optional(),
    parking: yup.boolean().optional(),
    breakfast: yup.boolean().optional(),
    pets: yup.boolean().optional(),
  }),
  location: yup.object().shape({
    address: yup.string().notRequired(),
    city: yup.string().notRequired(),
    country: yup.string().notRequired(),
  }),
});

function EditVenueForm({ initialValues, onSubmit, errorMessage }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...initialValues,
      media: initialValues.media
        ? initialValues.media.map((m) => m.url).join(", ")
        : "", // Convert array to string
    },
  });

  const mediaInput = watch("media", "");

  const imageUrls = mediaInput
    .split(",")
    .map((url) => url.trim())
    .filter((url) => url.length > 0);

  const handleFormSubmit = (data) => {
    const mediaArray = imageUrls.map((url) => ({ url }));
    const finalData = { ...data, media: mediaArray };

    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3 text-start">
            <label className="form-label">Venue Name</label>
            <input className="form-control" {...register("name")} />
            <p className="text-danger">{errors.name?.message}</p>
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              {...register("price")}
            />
            <p className="text-danger">{errors.price?.message}</p>
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Guests</label>
            <input
              type="number"
              className="form-control"
              {...register("maxGuests")}
            />
            <p className="text-danger">{errors.maxGuests?.message}</p>
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              {...register("description")}
              rows="2"
            ></textarea>
            <p className="text-danger">{errors.description?.message}</p>
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Pictures (Image URLs)</label>
            <input
              type="text"
              className="form-control"
              {...register("media")}
            />
            <p className="text-danger">{errors.media?.message}</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3 text-start">
            <label className="form-label">Address</label>
            <input className="form-control" {...register("location.address")} />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">City</label>
            <input className="form-control" {...register("location.city")} />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Country</label>
            <input className="form-control" {...register("location.country")} />
          </div>

          <div className="mt-4">
            <div className="form-check text-start">
              <input
                type="checkbox"
                className="form-check-input"
                {...register("meta.wifi")}
                id="wifi"
              />
              <label className="form-check-label" htmlFor="wifi">
                WiFi
              </label>
            </div>

            <div className="form-check text-start">
              <input
                type="checkbox"
                className="form-check-input"
                {...register("meta.parking")}
                id="parking"
              />
              <label className="form-check-label" htmlFor="parking">
                Parking
              </label>
            </div>

            <div className="form-check text-start">
              <input
                type="checkbox"
                className="form-check-input"
                {...register("meta.breakfast")}
                id="breakfast"
              />
              <label className="form-check-label" htmlFor="breakfast">
                Breakfast
              </label>
            </div>

            <div className="form-check text-start">
              <input
                type="checkbox"
                className="form-check-input"
                {...register("meta.pets")}
                id="pets"
              />
              <label className="form-check-label" htmlFor="pets">
                Pets Allowed
              </label>
            </div>
          </div>
        </div>
      </div>

      {errorMessage && (
        <p className="text-danger text-center mt-3">{errorMessage}</p>
      )}

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary px-4" type="submit">
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default EditVenueForm;
