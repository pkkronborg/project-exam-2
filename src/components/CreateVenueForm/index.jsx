import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation Schema
const schema = yup
  .object({
    name: yup.string().required("Venue Name is required"),
    description: yup.string().required("Description is required"),
    media: yup.string().required("At least one image URL is required"),
    price: yup
      .number()
      .positive("Price must be positive")
      .required("Price is required"),
    maxGuests: yup
      .number()
      .positive("Max Guests must be positive")
      .integer("Max Guests must be an integer")
      .required("Max Guests is required"),
    wifi: yup.boolean().default(false),
    parking: yup.boolean().default(false),
    breakfast: yup.boolean().default(false),
    pets: yup.boolean().default(false),
    address: yup.string().optional(),
    city: yup.string().optional(),
    country: yup.string().optional(),
  })
  .required();

function CreateVenueForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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
            <label className="form-label">
              Pictures (Image URLs, comma separeted)
            </label>
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
            <input className="form-control" {...register("address")} />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">City</label>
            <input className="form-control" {...register("city")} />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Country</label>
            <input className="form-control" {...register("country")} />
          </div>

          <div className="mt-4">
            <div className="form-check text-start">
              <input
                type="checkbox"
                className="form-check-input"
                {...register("pets")}
                id="pets"
              />
              <label className="form-check-label" htmlFor="pets">
                Pet allowed
              </label>
            </div>

            <div className="form-check text-start">
              <input
                type="checkbox"
                className="form-check-input"
                {...register("wifi")}
                id="wifi"
              />
              <label className="form-check-label" htmlFor="wifi">
                Wifi included
              </label>
            </div>

            <div className="form-check text-start">
              <input
                type="checkbox"
                className="form-check-input"
                {...register("parking")}
                id="parking"
              />
              <label className="form-check-label" htmlFor="parking">
                Parking available
              </label>
            </div>

            <div className="form-check text-start">
              <input
                type="checkbox"
                className="form-check-input"
                {...register("breakfast")}
                id="breakfast"
              />
              <label className="form-check-label" htmlFor="breakfast">
                Breakfast included
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary px-4" type="submit">
          Register
        </button>
      </div>
    </form>
  );
}

export default CreateVenueForm;
