import { useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_HEALTH, CHANGE_STATUS, CHOOSE_ENEMY } from "../../redux/action";
import TextBox from "./textbox/TextBox";

const MyGame = (props) => {
  const dispatch = useDispatch();
  const playerInformation = useSelector((state) => state.player);
  const coordinates = useSelector((state) => state.coordinates);
  const status = useSelector((state) => state.player.status);
  const inventory = useSelector((state) => state.equipment);
  const fight = useSelector((state) => state.fight.enemies);
  const [loot, setLoot] = useState(null);
  const [playerMessage, setPlayerMessage] = useState(`${props.stages[coordinates.stages].presentation} `);

  //-----------------------------cambia messaggio------------------
  const setMessage = (msg) => {
    setPlayerMessage(msg);
  };

  //------------------------------esplorazione----------------------------------------
  const enterInFight = () => {
    if (props.stages[coordinates.stages].boss.includes(coordinates.position + 2)) {
      dispatch({ type: CHANGE_HEALTH, payload: playerInformation.maxHealth });
      dispatch({ type: CHOOSE_ENEMY, payload: props.boss[coordinates.stages] });
      setPlayerMessage("hai trovato un falò e ti sei riposato per qualche ora, i tuoi HP tornano al massimo");
    }
    if (props.stages[coordinates.stages].fight.includes(coordinates.position + 2)) {
      dispatch({
        type: CHOOSE_ENEMY,
        payload: props.enemies[Math.floor(Math.random(coordinates.position) * 3 + coordinates.stages * 3)],
      });
    }

    if (props.stages[coordinates.stages].fight.includes(coordinates.position + 1)) {
      dispatch({ type: CHANGE_STATUS, payload: "fight" });
      setPlayerMessage(`un ${fight.name} ti blocca la strada`);
    } else if (props.stages[coordinates.stages].boss.includes(coordinates.position + 1)) {
      dispatch({ type: CHANGE_STATUS, payload: "fight" });
      setPlayerMessage(`un ${fight.name} ti blocca la strada`);
    } else if (props.stages[coordinates.stages].tresure.includes(coordinates.position + 1)) {
      setLoot(props.items[Math.floor(Math.random() * 9)]);
      dispatch({ type: CHANGE_STATUS, payload: "looting" });
      setPlayerMessage("hai trovato una cassa in mezzo al tuo percorso vuoi aprirlo?");
    }
  };

  //--------------------------------------------------------------

  return (
    <>
      <Container
        style={{
          border: "cyan solid 2px",
          minHeight: "80vh",
          backgroundImage: `${props.stages[coordinates.stages].background}`,
          objectFit: "fill",
          position: "relative",
        }}
      >
        <Container style={{ maxWidth: "80%" }} className="d-flex ms-0">
          <p className="text-light d-none d-md-inline">Punti ferita :</p>
          <ProgressBar
            now={(100 * playerInformation.health) / playerInformation.maxHealth}
            label={`${playerInformation.health} / ${playerInformation.maxHealth}`}
            variant="danger"
            style={{ width: "40%" }}
            className="mt-1 ms-2"
          />
        </Container>
        {status === "fight" && (
          <Container className="d-flex justify-content-center">
            <ProgressBar
              now={(100 * fight.health) / fight.maxHealth}
              label={`${fight.health} / ${fight.maxHealth}`}
              variant="success"
              style={{ width: "20%", position: "absolute" }}
              className="mt-1 ms-2"
            />
            <img
              src={fight.image}
              alt="enemy-sprite"
              className="img-fluid"
              style={{ maxWidth: "360px", maxHeight: "360px" }}
            />
          </Container>
        )}

        {/* -----------------------------------------------------textbox---------------------------------------- */}

        <TextBox
          coordinates={coordinates}
          enterInFight={enterInFight}
          playerInformation={playerInformation}
          inventory={inventory}
          stages={props.stages}
          fight={fight}
          loot={loot}
          status={status}
          playerMessage={playerMessage}
          setPlayerMessage={setMessage}
        />

        {/* ---------------------------------fine textbox---------------------------------------- */}
      </Container>
    </>
  );
};

export default MyGame;
