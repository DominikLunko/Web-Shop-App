import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { RootStore } from "../../redux/store";
import {
  changeCategory,
  getWorkshops,
  increasePage,
  resetWorkshopList,
} from "../../redux/actions/workShopActions";

import "./Homepage.scss";

import BrushIcon from "@material-ui/icons/Brush";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import CodeIcon from "@material-ui/icons/Code";
import FlashOnRoundedIcon from "@material-ui/icons/FlashOnRounded";

import WorkshopList from "../../components/workshopList/workshopList";
import Workshop from "../../components/workshopList/WorkShop/WorkShop";
import { workshopDetailReset } from "../../redux/actions/workShopDetailsAction";

const Homepage: React.FC<any> = ({ onClick }) => {
  const dispatch = useDispatch();

  const currentWorkshop = useSelector(
    (state: RootStore) => state.workshopDetails
  );
  const { page, category, workshops } = useSelector(
    (state: RootStore) => state.workshop
  );
  const [w, setW] = useState(window.innerWidth);

  const [categoryList, setCategoryList] = useState([
    "All",
    "Design",
    "Frontend",
    "Backend",
    "Marketing",
  ]);

  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //       setW(window.innerWidth);
  //   });
  // }, [window.innerWidth]);

  useEffect(() => {
    if (currentWorkshop.workshop) {
      if (workshops.length == 0 && page && category) {
        dispatch(getWorkshops(page, category));
      }
      dispatch(workshopDetailReset());
      const scrollToWorkshop = document.getElementById(
        JSON.stringify(currentWorkshop.workshop?.id)?.concat("-card")
      );
      let X = scrollToWorkshop?.offsetLeft;
      let Y = scrollToWorkshop?.offsetTop;
      if (X && Y) {
        Y = Y - 200;
        window.scrollTo(X, Y);
      }
    } else {
      if (page && category) {
        dispatch(getWorkshops(page, category));
      }
    }
  }, [page, category]);

  return (
    <>
      <div className="workshop-list-wrap">
        <div className="filters">
          <div className="filters-inside-div">
            <p>Filter by category:</p>
            <ul className="category-list">
              {categoryList.map((categoryElem, idx) => (
                <li
                  key={idx}
                  id={categoryElem}
                  className={
                    category === categoryElem.toLowerCase()
                      ? "disabled"
                      : "active"
                  }
                  onClick={() => {
                    dispatch(resetWorkshopList());
                    dispatch(changeCategory(categoryElem.toLowerCase()));
                  }}
                >
                  {categoryElem === "Design" && (
                    <BrushIcon className="categories-icon" />
                  )}
                  {categoryElem === "Frontend" && (
                    <DesktopWindowsIcon className="categories-icon" />
                  )}
                  {categoryElem === "Backend" && (
                    <CodeIcon className="categories-icon" />
                  )}
                  {categoryElem === "Marketing" && (
                    <FlashOnRoundedIcon className="categories-icon" />
                  )}

                  {categoryElem}
                </li>
              ))}
            </ul>
          </div>
          <select
            className="categorySelect"
            onChange={(e) => {
              dispatch(resetWorkshopList());
              dispatch(changeCategory(e.target.value.toLowerCase()));
            }}
          >
            {categoryList.map((categoryItem, idx) => (
              <option
                className="option"
                selected={categoryItem.toLowerCase() == category && true}
                key={idx}
                value={categoryItem}
              >
                {categoryItem}
              </option>
            ))}
          </select>
        </div>
        <WorkshopList />
      </div>
      {workshops.length > 0 && (
        <div className="footer">
          <p>© TINEL Meetup 2020.</p>
        </div>
      )}
    </>
  );
};

export default Homepage;
