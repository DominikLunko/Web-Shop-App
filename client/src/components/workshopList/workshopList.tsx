import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { bindActionCreators } from "redux";

import Workshop from "./WorkShop/WorkShop";
import CircularProgress from "@material-ui/core/CircularProgress";
import './workshopList.scss';

import { RootStore } from "../../redux/store";
import { getWorkshops } from "../../redux/actions/workShopActions";

const WorkshopList: React.FC<any> = ({ onClick }) => {
  const workshopState = useSelector((state: RootStore) => state.workshop);
  const { loading, error, workshops } = workshopState;

  return (
    <div className="cards">
      <div className="title">
          <h2>Workshops</h2>
          <p>Displayed: {workshops.length}</p>
      </div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <Container className="cards-container">
          <Row className="row-project" xl="3" lg="2" md="2" xs="1">
            {workshops &&
              workshops.map((workshop,idx) => (
                <Col key={idx}>
                  <Workshop
                    key={workshop.id}
                    imageUrl={workshop.imageUrl}
                    title={workshop.title}
                    id={workshop.id}
                    price={workshop.price}
                    date={workshop.date}
                    category={workshop.category}
                    userId={workshop.userId}
                  />
                </Col>
              ))}
          </Row>
        </Container>
      )}
      <p className="load-more" onClick={onClick}>{workshops && "Load more"}</p>
    </div>
  );
};

export default WorkshopList;
