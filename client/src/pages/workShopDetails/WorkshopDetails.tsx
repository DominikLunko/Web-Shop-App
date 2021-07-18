import React from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { RootStore } from '../../redux/store';

import { useHistory } from "react-router-dom";
import { CircularProgress } from '@material-ui/core';
  
  
const WorkShopDetails:React.FC = () => {
    const workshopDetailsState = useSelector((state: RootStore) => state.workshopDetails);
    const { loading, error, workshop, user } = workshopDetailsState;
    const dispatch = useDispatch()
    const history = useHistory();
    return (
        <div>
            <button onClick={()=>history.goBack}>back</button>
            {loading ? <CircularProgress/> : error ? <p>error</p> :(
            user && user.name,
            workshop && workshop.title
             ) }
        </div>
    
    )
}

export default WorkShopDetails
