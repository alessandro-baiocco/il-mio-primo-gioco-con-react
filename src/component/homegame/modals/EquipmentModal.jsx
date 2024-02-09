import { Button, Col, Modal, Row } from "react-bootstrap";

const EquipmentModal = (props) => {
  return (
    <Modal show={props.show} onHide={() => props.onHide()} className="btn-close-white" size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title>Equipaggiamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12} md={6} lg={4}>
            <p className="fs-3">armatura: {props.inventory.armor.name}</p>
            <img
              src={
                props.inventory.armor.image !== ""
                  ? props.inventory.armor.image
                  : "https://gfftactical.com/wp-content/uploads/2021/07/IIIA_Panel-1.jpeg"
              }
              alt={props.inventory.armor.name}
              className="img-fluid"
            />
            <p>armatura: {props.inventory.armor.defence}</p>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <p className="fs-2">scudo: {props.inventory.shield.name}</p>
            <img
              src={
                props.inventory.shield.image !== ""
                  ? props.inventory.shield.image
                  : "https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D186047961W9058H10000/views/1,width=550,height=550,appearanceId=839,backgroundColor=F2F2F2/coat-of-arms-blank-form-placeholder-sticker.jpg"
              }
              alt={props.inventory.shield.name}
              className="img-fluid"
            />
            <p>classe armatura bonus: {props.inventory.shield.bonusAC}</p>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <p className="fs-2">arma: {props.inventory.weapon.name}</p>
            <img
              src={
                props.inventory.weapon.image !== ""
                  ? props.inventory.weapon.image
                  : "https://thumb.silhouette-ac.com/t/dd/dd4e9b56617afe9310a6b6c534bc1a4c_t.jpeg"
              }
              alt={props.inventory.weapon.name}
              className="img-fluid"
            />
            <p>attacco bonus: {props.inventory.weapon.bonusAT}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.onHide()}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EquipmentModal;
