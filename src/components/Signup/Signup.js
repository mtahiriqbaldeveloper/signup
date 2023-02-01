import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { checkUserEmail, signup } from "../utils/api";
import { classErrors } from "../utils/errors";
import "./Signup.css";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required field"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required field"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(2, "Seems a bit short...")
    .max(20, "We prefer insecure system, try a shorter password."),
});

const validateEmail = async (value) => {
  let error;
  if (!value) {
    error = "Required";
    return error;
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
    return error;
  }

  let emailExist = await checkUserEmail(value);
  const status = emailExist.data["status"];
  if (status === "EXISTS") {
    error = "Email already EXISTS";
  }

  return error;
};

export const Signup = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [successSubmit, setSuccessSubmit] = useState("");
  const onSubmit = async (initialValues, { resetForm }) => {
    const data = await signup(initialValues);
    const error = data["errors"];
    setSuccessSubmit(data["message"] || "User " + error[0].code);
    resetForm({});
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, ...props }) => (
        <div>
          <div className="title">
            <h1>{!successSubmit ? "Signup" : successSubmit}</h1>
          </div>
          <Form className="styledForm">
            <div className="container">
              <div className="names">
                <Field
                  name="firstName"
                  type="firstName"
                  placeholder="First Name"
                  className={classErrors(props, "firstName")}
                />
                <ErrorMessage
                  component="div"
                  name="firstName"
                  className="error-title"
                />
              </div>
              <div className="names">
                <Field
                  name="lastName"
                  type="lastName"
                  placeholder="Last Name"
                  className={classErrors(props, "lastName")}
                />
                <ErrorMessage
                  component="div"
                  name="lastName"
                  className="error-title"
                />
              </div>
            </div>
            <div>
              <Field
                name="email"
                validate={validateEmail}
                type="email"
                placeholder="Email"
                className={classErrors(props, "email")}
              />
              <ErrorMessage
                component="div"
                name="email"
                className="error-title"
              />
            </div>
            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={classErrors(props, "password")}
              />
              <ErrorMessage
                component="div"
                name="password"
                className="error-title"
              />
            </div>
            <button className="btn" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
