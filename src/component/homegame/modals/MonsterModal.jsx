import { Button, Modal } from "react-bootstrap";

const MonsterModal = (props) => {
  return (
    <Modal show={props.show} onHide={() => props.onHide()} className="btn-close-white" size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title>{props.fight.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.fight.description}</p>
        <p>attaco: {props.fight.attack}</p>
        <p>bonus: {props.fight.bonus}</p>
        <p>classe armatura: {props.fight.armorClass}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.onHide()}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MonsterModal;
