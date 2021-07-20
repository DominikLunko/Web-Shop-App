import React, { useEffect, useState } from "react";

import {
  useLocation
} from "react-router-dom";

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

const Homepage: React.FC<any> =
  ({ onClick }) => {
    const dispatch = useDispatch();
    const currentWorkshop = useSelector((state:RootStore) => state.workshopDetails)
    const {page,category} = useSelector((state:RootStore) =>state.workshop)
    const location = useLocation();
    const [categoryList, setCategoryList] = useState(["all","design","frontend","backend","marketing"]);
    
    
    // const {getAllWorkshops } = bindActionCreators(workshopActionCreators, dispatch)
    
    useEffect(() => {
      console.log("page: ",page)
      console.log("category: ",category)
      if(currentWorkshop.workshop){
        dispatch(workshopDetailReset());
        const scrollToWorkshop =document.getElementById(JSON.stringify(currentWorkshop.workshop?.id)?.concat("-card"))
        if(scrollToWorkshop){
          scrollToWorkshop.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      else{
        if(page && category){
          dispatch(getWorkshops(page, category))
        }
      }
    }, [page,category]);

    
   
    return (
      <div  className="workshop-list-wrap">
        <div className="filters">
          <p>Filter by category:</p>
          <ul className="category-list">
            {categoryList.map((categoryElem,idx) => (
              <li key ={idx} id={categoryElem} className={category ===categoryElem ? "disabled" : "active"} onClick={() => {
                dispatch(resetWorkshopList())
                dispatch(changeCategory(categoryElem))
                // setCategory((prevState) => prevState !== categoryElem ? categoryElem : prevState)
              }}>
              {categoryElem==="design" && <BrushIcon />}
              {categoryElem==="frontend" && <DesktopWindowsIcon/>}
              {categoryElem==="backend" && <CodeIcon/>}
              {categoryElem==="marketing" && <FlashOnRoundedIcon/>}
            
              {categoryElem}
            </li>
            ))}
            {/* <li
              onClick={() => {
                dispatch(resetWorkshopList())
                setPage(1)
                setCategory("design")
              }}
            >
              <BrushIcon /> Design
            </li>
            <li
              onClick={() => {
                dispatch(resetWorkshopList())
                setPage(1)
                setCategory("frontend")
              }}
            >
              <DesktopWindowsIcon /> Frontend
            </li>
            <li
              onClick={() => {
                dispatch(resetWorkshopList())
                setPage(1)
                setCategory("backend")
              }}
            >
              <CodeIcon /> Backend
            </li>
            <li
              onClick={() => {
                dispatch(resetWorkshopList())
                setCategory("marketing")
                setPage(1)
              }}
            >
              <FlashOnRoundedIcon /> Marketing
            </li> */}
          </ul>
        </div>
        <WorkshopList/>
      </div>
    );
  };

export default Homepage;
