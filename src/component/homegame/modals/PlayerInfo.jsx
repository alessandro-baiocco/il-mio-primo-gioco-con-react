import { Button, Modal } from "react-bootstrap";

const PlayerInfo = (props) => {
  return (
    <Modal show={props.show} onHide={() => props.onHide()} className="btn-close-white" size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title>Statistiche</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>attaco: {props.playerInformation.attack}</p>
        <p>classe armatura: {props.playerInformation.armorClass}</p>
        <p>difesa: {props.inventory.armor.defence}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.onHide()}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlayerInfo;
