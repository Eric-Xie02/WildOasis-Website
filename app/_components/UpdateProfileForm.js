"use client";
import { useState } from "react";
import { updateGuest } from "../_lib/actions";
import { useFormStatus } from "react-dom";
import SubmitButton from "./SubmitButton";

function UpdateProfileForm({ guest, children }) {
  const [nationalIdError, setNationalIdError] = useState("");
  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  function validateNationalId(value) {
    if (!value || value.trim() === "") {
      return "";
    }

    const regex = /^[a-zA-Z0-9]{6,12}$/;

    if (value.length < 6) {
      return "National ID must be at least 6 characters long";
    }
    if (value.length > 12) {
      return "National ID must be no more than 12 characters long";
    }
    if (!regex.test(value)) {
      return "National ID can only contain letters and numbers";
    }
    return "";
  }

  function handleNationalIdChange(e) {
    const value = e.target.value;
    const error = validateNationalId(value);
    setNationalIdError(error);
  }

  function handleSubmit(e) {
    const formData = new FormData(e.target);
    const nationalId = formData.get("nationalID");
    const error = validateNationalId(nationalId);

    if (error) {
      e.preventDefault();
      setNationalIdError(error);
      return;
    }
  }

  return (
    <div>
      <form
        action={updateGuest}
        onSubmit={handleSubmit}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label>Full name</label>
          <input
            name="fullName"
            disabled
            defaultValue={fullName}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            name="email"
            disabled
            defaultValue={email}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            <img
              src={countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          </div>
          {children}
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number (optional)</label>
          <input
            name="nationalID"
            id="nationalID"
            placeholder="optional"
            pattern="[a-zA-Z0-9]{6,12}"
            minLength={6}
            maxLength={12}
            title="National ID must be 6-12 characters long and contain only letters and numbers"
            onChange={handleNationalIdChange}
            className={`px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm ${
              nationalIdError ? "border-2 border-red-500" : ""
            }`}
            defaultValue={nationalID}
          />
          {nationalIdError && (
            <p className="text-red-500 text-sm mt-1">{nationalIdError}</p>
          )}
          <p className="text-primary-400 text-sm">
            Must be 6-12 characters long and contain only letters and numbers
          </p>
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton
            pendingLabel="Submitting..."
            disabled={!!nationalIdError}
          >
            Submit
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfileForm;
