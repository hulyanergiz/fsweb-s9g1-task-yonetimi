import React from "react";
import { useForm } from "react-hook-form";

const PeopleForm = ({ kisiler, submitFn }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({ mode: "onBlur" });

  function handleKisiSubmit(data) {
    submitFn(data.title);
    reset();
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(handleKisiSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          İsim
        </label>
        <input
          className="input-text"
          id="title"
          {...register("title", {
            required: "Bu isim daha önce eklenmiş",
            validate: (kisi) =>
              !kisiler.includes(kisi) || "Bu isim daha önce eklenmiş",
          })}
          type="text"
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Ekle
        </button>
      </div>
    </form>
  );
};

export default PeopleForm;
