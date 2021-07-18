import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { useState } from 'react';

import Cart from './components/cart/Cart';
import Navbar from './components/Navbar/Navbar';
import Homepage from './pages/Homepage/Homepage';
import WorkShopDetails from './pages/workShopDetails/WorkshopDetails';




const App:React.FC = () => {
  const [show, setShow] = useState(false);

  function handleShowSidebar(): void{
    setShow((prevSetShow) => !prevSetShow)
  }

  return (
    <Router>
        <Navbar onClick={handleShowSidebar}/>
        <Cart  onClick={handleShowSidebar}  show={show}/>
        {/* <SideDrawer show={sideToggle} click={() => setSideToggle(false)} /> */}
        {/* <Backdrop show={sideToggle} click={() => setSideToggle(false)} /> */}
        
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/workshop/:id" component={WorkShopDetails} />
           {/*  <Route exact path="/cart" component={CartScreen} /> */}
          </Switch>
        
    </Router>
  )
}

export default App
