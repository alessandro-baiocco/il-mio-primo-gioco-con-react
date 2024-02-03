import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CHANGE_ARMOR, CHANGE_SHIELD, CHANGE_STATUS, CHANGE_WEAPON } from "../../../redux/action";

const LootModal = (props) => {
  const dispatch = useDispatch();

  //per cambiare loot
  const changeEquipment = () => {
    switch (props.loot.type) {
      case "shield": {
        dispatch({ type: CHANGE_SHIELD, payload: props.loot });
        break;
      }
      case "weapon": {
        dispatch({ type: CHANGE_WEAPON, payload: props.loot });
        break;
      }
      case "armor": {
        dispatch({ type: CHANGE_ARMOR, payload: props.loot });
        break;
      }
      default: {
        console.log("niente");
      }
    }
    dispatch({ type: CHANGE_STATUS, payload: "normal" });
    props.chooseMessage("hai sacchegiato il forziere e indossato l'equipagiamento");
  };

  return (
    <Modal show={props.show} className="btn-close-white">
      <Modal.Header closeButton>
        <Modal.Title>hai trovato {props.loot?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={props.loot?.image} alt={props.loot?.name} className="img-fluid" />
        <p>
          tipo: {props.loot?.type} , bonus :{" "}
          {props.loot?.bonusAC !== undefined
            ? `${props.loot?.bonusAC} classe armatura`
            : props.loot?.bonusAT !== undefined
            ? `${props.loot?.bonusAT} ai danni`
            : `${props.loot?.defence} armatura`}{" "}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.onHide()}>
          Chiudi
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            changeEquipment();
            props.onHide();
          }}
        >
          Equipaggia
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default LootModal;
