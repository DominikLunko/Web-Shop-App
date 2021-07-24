import React, { useState, useRef } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import content from "./formContent";
import DatePicker from "react-datepicker";

import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions/orderAction";
import { RootStore } from "../../redux/store";

import "./Checkout.scss";
import { Resolver } from "dns";

interface MyProps {
  setShowCheckout: (show: boolean) => void;
  showCheckout: boolean;
}

const schema = yup.object().shape({
  firstName: yup.string().required("Please enter your first name").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed!"),
  lastName: yup.string().required("Please enter your last name").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed!"),
  emailAddress: yup
    .string()
    .required("Please enter your email")
    .email("Email doesn't contain @"),
  address: yup.string().required("Please enter your Address"),
  zipCode: yup.string().required("Please enter your Zip Code")
  .matches(/^[0-9]+$/, "Must be only digits")
  .min(5, 'Must be exactly 5 digits')
  .max(5, 'Must be exactly 5 digits'),
  iAgree: yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
  date: yup.date().default(() => new Date()),
});
const Checkout: React.FC<MyProps> = ({ setShowCheckout, showCheckout }) => {
  const dispatch = useDispatch();

  const cartState = useSelector((state: RootStore) => state.cart);
  const [showThankYou, setShowThankYou] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleProceedCheckout = () => {
    setShowThankYou(true);
    dispatch(createOrder());
    reset();
    // treba staviti dispatch() reset card jer nakon uspjesne kupnje se mora resetirati Cart
  };
  return (
    <>
      {showCheckout && (
        <div className="checkout-wrap">
          <div
            className="checkout-div"
            onClick={() => setShowCheckout(false)}
          ></div>
          <div className={!showThankYou ? "form-div" : "form-div-thank-you"}>
            {!showThankYou ? (
              <form
                className="form"
                onSubmit={handleSubmit(handleProceedCheckout)}
              >
                <div className="title-desc">
                  <h2>CHECKOUT</h2>
                  <p>desc</p>
                </div>
                {content.inputs.map((input, key) => {
                  return (
                    <div className="input-div" key={key}>
                      <div className="label">
                        <label>{input.label}</label>
                        <span>{errors[input.name]?.message}</span>
                      </div>
                      <input
                        {...register(input.name)}
                        className={!errors[input.name] ? "input" : "input-fail"}
                        name={input.name}
                        placeholder={input.label}
                        type={input.type}
                      />
                    </div>
                  );
                })}
                <label className="date-gender-label">
                  <span>Date Of Birth</span>
                  <span>Gender</span>
                </label>
                <div className="date-gender">
                  <DatePicker
                    {...register("date")}
                    name="date"
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                  />
                  <select>
                    <option>Other</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="input-div">
                  <div className="label">
                    <label>Address</label>
                    <span>{errors["address"]?.message}</span>
                  </div>
                  <input
                    {...register("address")}
                    className={!errors["address"] ? "input" : "input-fail"}
                    name="address"
                    placeholder="Address"
                  />
                </div>
                <div className="input-div">
                  <div className="label">
                    <label>ZIP Code</label>
                    <span>{errors["zipCode"]?.message}</span>
                  </div>
                  <input
                    {...register("zipCode")}
                    className={!errors["zipCode"] ? "input" : "input-fail"}
                    name="zipCode"
                    placeholder="e.g 21300"
                  />
                </div>
                <label className="agree-label">
                  I Agree
                  <input
                    type="checkbox"
                    {...register("iAgree")}
                    name="iAgree"
                  />
                </label>
                <span>{errors["iAgree"]?.message}</span>
                <button type="submit">Checkout</button>
              </form>
            ) : (
              <div>
                <h2>Thank You</h2>
                <p>Your order was successfull</p>
                <button
                  onClick={() => {
                    setShowThankYou(false);
                    setShowCheckout(false);
                  }}
                >
                  Back To Shop
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
