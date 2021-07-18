import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { RootStore } from "../../redux/store";
import {
  getWorkshops,
  getWorkshopsByCategory,
  resetWorkshopList,
} from "../../redux/actions/workShopActions";

import "./Homepage.scss";

import BrushIcon from "@material-ui/icons/Brush";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import CodeIcon from "@material-ui/icons/Code";
import FlashOnRoundedIcon from "@material-ui/icons/FlashOnRounded";

import WorkshopList from "../../components/workshopList/workshopList";

const Homepage: React.FC<{ onClick?: React.MouseEventHandler<HTMLElement> }> =
  ({ onClick }) => {
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("all");

    // const {getAllWorkshops } = bindActionCreators(workshopActionCreators, dispatch)
    useEffect(() => {
      dispatch(getWorkshopsByCategory(category));
    }, [category]);
    
    useEffect(() => {
      dispatch(getWorkshops(page));
    }, [page]);

    const setPageHandler = () => {
      setPage((prevState) => prevState + 1);
    };
    return (
      <div className="workshop-list-wrap">
        <div className="filters">
          <p>Filter by category:</p>
          <ul className="category-list">
            <li onClick={() => {
            dispatch(resetWorkshopList())
              dispatch(getWorkshops(page))
              }}>
              All
            </li>
            <li
              onClick={() => {
                setCategory("design")
              }}
            >
              <BrushIcon /> Design
            </li>
            <li
              onClick={() => {
                setCategory("frontend")
              }}
            >
              <DesktopWindowsIcon /> Frontend
            </li>
            <li
              onClick={() => {
                setCategory("backend")
              }}
            >
              <CodeIcon /> Backend
            </li>
            <li
              onClick={() => {
                setCategory("marketing")
                setPage(1)
              }}
            >
              <FlashOnRoundedIcon /> Marketing
            </li>
          </ul>
        </div>
        <WorkshopList onClick={setPageHandler} />
      </div>
    );
  };

export default Homepage;
