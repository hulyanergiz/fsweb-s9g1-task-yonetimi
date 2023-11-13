import React from "react";
import { useForm } from "react-hook-form";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PeopleForm = ({ kisiler, submitFn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  function handleSubmitFn(e) {
    submitFn(e.title);
    toast.success("Kişilere yeni kişi eklendi");
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(handleSubmitFn)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          İsim
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title", {
            validate: (kisi) =>
              !kisiler.includes(kisi) || "Bu isim daha önce eklenmiş",
          })}
        />
        <p className="input-error">{errors?.title?.message}</p>
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
