import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../redux/store";

import { Link } from "react-router-dom";

import "./WorkshopDetails.scss";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import BrushIcon from "@material-ui/icons/Brush";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import CodeIcon from "@material-ui/icons/Code";
import FlashOnRoundedIcon from "@material-ui/icons/FlashOnRounded";
import EventIcon from "@material-ui/icons/Event";
import ScheduleIcon from "@material-ui/icons/Schedule";

import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { getWorkshopDetail } from "../../redux/actions/workShopDetailsAction";

const WorkShopDetails: React.FC<any> = ({ match, history }) => {
  const workshopDetailsState = useSelector(
    (state: RootStore) => state.workshopDetails
  );
  const dispatch = useDispatch();
  const { loading, error, workshop, user, similarWorkshops } =
    workshopDetailsState;

  let clearTime;
  const clearDate = workshop?.date.split("T")[0];
  const onlyTime = workshop?.date.split("T")[1];
  if (onlyTime) {
    clearTime = onlyTime.split(".")[0];
  }
  const decimalPrice = workshop?.price.toFixed(2);
  useEffect(() => {
    dispatch(getWorkshopDetail(match.params.id));
    window.scrollTo(0,0);
  }, []);

  return (
    <>
      <div className="details-container">
        <div className="button-section">
          <Link className="back-section" to="/">
            <KeyboardBackspaceIcon className="arrow-back" />
            <p className="back">Back</p>
          </Link>
        </div>
        <div className="workshop-detail-wrapper">
          {loading ? (
            <CircularProgress className="loading-details" />
          ) : error ? (
            <h2 className="details-error">{error}</h2>
          ) : (
              <>
              <img src={workshop?.imageUrl} className="details-img"/>
              <div className="details-cart-div">
              <div className="details-div">
                <div className="category-date-time">
                  {workshop?.category === "design" && <BrushIcon className="category-icon-detail"/>}
                  {workshop?.category === "frontend" && <DesktopWindowsIcon className="category-icon-detail"/>}
                  {workshop?.category === "backend" && <CodeIcon className="category-icon-detail"/>}
                  {workshop?.category === "marketing" && <FlashOnRoundedIcon className="category-icon-detail"/>}
                  <div className="date-time">
                    <div className="dt">
                      <EventIcon />
                      <p>{clearDate}</p>
                    </div>
                    <div className="dt">
                      <ScheduleIcon />
                      <p>{clearTime}</p>
                    </div>
                  </div>
                </div>
                <div className="details-div">
                  <h1 className="workshop-title">{workshop?.title}</h1>
                  <h3 className="user-name">WITH {user?.name}</h3>
                  <p className="workshop-desc">{workshop?.desc}</p>
                </div>
              </div>
                <div className="cart-div">
                  <div>
                    <h3 className="buy-ticket">Buy Your Ticket</h3>
                    <h2 className="price">{decimalPrice} EUR</h2>
                    <div className="select-cart-div">
                      <select></select>
                      <button className="add-button">Add to Cart</button>
                    </div>
                    <p>Subtotal:</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {similarWorkshops && similarWorkshops.length > 2 && (
        <div className="similar-workshops-wrapper">
          <h1>Similar Workshops</h1>
          <div className="similar-workshops">
            {similarWorkshops.map((similarWorkshop) => (
              <p key={similarWorkshop.id}>{similarWorkshop.title}</p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WorkShopDetails;
