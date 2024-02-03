import { useState } from "react";
import { Button, Col, Container, Modal, ProgressBar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  CHANGE_SHIELD,
  DEATH,
  CHANGE_HEALTH,
  makeAStep,
  nextLevel,
  CHANGE_STATUS,
  CHANGE_WEAPON,
  CHANGE_ARMOR,
  CHOOSE_ENEMY,
  ENEMY_DEFEATED,
  ENEMY_HIT,
} from "../../redux/action";
import equipment from "../../redux/reducers/equipment";
import LootModal from "./modals/LootModal";
import PlayerInfo from "./modals/PlayerInfo";

const MyGame = (props) => {
  const dispatch = useDispatch();
  const playerInformation = useSelector((state) => state.player);
  const coordinates = useSelector((state) => state.coordinates);
  const status = useSelector((state) => state.player.status);
  const inventory = useSelector((state) => state.equipment);
  const fight = useSelector((state) => state.fight.enemies);
  const [loot, setLoot] = useState(null);
  const [playerMessage, setPlayerMessage] = useState(`${props.stages[coordinates.stages].presentation} `);
  const [enemyMessage, setEnemyMessage] = useState("");
  const enemiesHealth = useSelector((state) => state.fight.enemies.health);
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [lootModal, setLootModal] = useState(false);
  const [playerInfo, setPlayerInfo] = useState(false);
  const [playerEquipment, setPlayerEquipment] = useState(false);
  const [monsterInfo, setMonsterInfo] = useState(false);
  //------------------------------genera e prendi il loot---------------------------
  const chooseMessage = (message) => {
    setPlayerMessage(message);
  };
  const lootModalSet = () => {
    setLootModal(false);
  };
  const playerInfoModalSet = () => {
    setPlayerInfo(false);
  };

  //------------------------------esplorazione----------------------------------------
  const enterInFight = () => {
    if (props.stages[coordinates.stages].boss.includes(coordinates.position + 2)) {
      dispatch({ type: CHOOSE_ENEMY, payload: props.boss[coordinates.stages] });
    }
    if (props.stages[coordinates.stages].fight.includes(coordinates.position + 2)) {
      dispatch({ type: CHOOSE_ENEMY, payload: props.enemies[Math.floor(Math.random(coordinates.position) * 2)] });
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
    } else {
      setPlayerMessage(`hai fatto un'altro passo`);
    }
  };

  //-------------------turno giocatore--------------------------------------------------------
  const attack = () => {
    setIsMyTurn(false);
    let dice = Math.floor(Math.random() * 20 + 1);
    if (dice >= fight.armorClass) {
      let newEnemiesHelth = enemiesHealth;
      dispatch({
        type: ENEMY_HIT,
        payload: (newEnemiesHelth -=
          dice === 20
            ? playerInformation.attack * 2 + inventory.weapon.bonusAT
            : playerInformation.attack + inventory.weapon.bonusAT),
      });
      setPlayerMessage(
        `riesci a colpire ${fight.name} con ${dice} sul dado, infligendogli ${
          dice === 20
            ? playerInformation.attack * 2 + inventory.weapon.bonusAT
            : playerInformation.attack + inventory.weapon.bonusAT
        } danni`
      );
      if (newEnemiesHelth <= 0) {
        setPlayerMessage("l'avversario cade a terra");
        dispatch({ type: CHANGE_STATUS, payload: "normal" });
        dispatch({ type: ENEMY_DEFEATED, payload: null });
        setEnemyMessage("");
        setIsMyTurn(true);
      } else {
        setTimeout(() => {
          enemyTurn();
        }, 2000);
      }
    } else {
      setPlayerMessage(`hai mancato ${fight.name} facendo ${dice} sul dado`);
      setTimeout(() => {
        enemyTurn();
      }, 2000);
    }
  };

  //-------------------turno nemico-----------------------------------------------------
  const enemyTurn = () => {
    let dice = Math.floor(Math.random() * 20 + 1);
    if (dice + fight.bonus >= playerInformation.armorClass) {
      setEnemyMessage(
        `l'avversario ti colpisce con un ${dice} (totale ${dice + fight.bonus}) , infligendoti ${
          dice === 20 ? fight.attack * 2 : fight.attack
        } danni`
      );
      let newMyHealth = playerInformation.health;
      newMyHealth -= dice === 20 ? fight.attack * 2 : fight.attack;
      dispatch({ type: CHANGE_HEALTH, payload: newMyHealth });
      if (newMyHealth <= 0) {
        setPlayerMessage("il tuo nemico esegue il colpo di grazia e tu cadi a terra perdendo i sensi");
        dispatch({ type: CHANGE_STATUS, payload: "death" });
        setEnemyMessage("");
      }
    } else {
      setEnemyMessage(`l'avversario ti manca con un ${dice} `);
    }
    setIsMyTurn(true);
  };

  return (
    <>
      <Container
        style={{
          border: "cyan solid 2px",
          minHeight: "80vh",
          backgroundImage: `${props.stages[coordinates.stages].background}`,
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

        <Container
          style={{
            background: "black",
            position: "absolute",
            height: "30%",
            width: "calc(100% - 2px)",
            bottom: "0px",
            left: "0px",
            border: "white 4px solid ",
            margin: "1px",
          }}
        >
          <p className="mt-2 ms-2 text-success">{playerMessage}</p>

          {isMyTurn && status === "fight" && enemiesHealth > 0 && (
            <>
              <p className="text-danger ms-2 ">{enemyMessage}</p>
              <Button
                variant="outline-danger"
                onClick={() => {
                  attack();
                }}
                style={{ position: "absolute", bottom: "4px", left: "100px" }}
              >
                attacca
              </Button>
              <Button
                variant="outline-info"
                onClick={() => {
                  setMonsterInfo(true);
                }}
                style={{ position: "absolute", bottom: "4px", left: "180px" }}
              >
                osserva
              </Button>
            </>
          )}
          {status === "looting" && (
            <>
              <Button
                variant="outline-primary"
                onClick={() => {
                  dispatch({ type: CHANGE_STATUS, payload: "normal" });
                  dispatch(makeAStep(coordinates.position + 1));
                  enterInFight();
                }}
                style={{ position: "absolute", bottom: "4px", left: "6px" }}
              >
                Vai Avanti
              </Button>

              <Button
                variant="outline-warning"
                onClick={() => {
                  setLootModal(true);
                }}
                style={{ position: "absolute", bottom: "4px", left: "120px" }}
              >
                Sacchegia
              </Button>
            </>
          )}
          {status === "normal" &&
            (coordinates.position < 10 ? (
              <Button
                variant="outline-primary"
                onClick={() => {
                  dispatch(makeAStep(coordinates.position + 1));
                  enterInFight();
                }}
                style={{ position: "absolute", bottom: "4px", left: "6px" }}
              >
                vai avanti
              </Button>
            ) : (
              <Button
                variant="outline-primary"
                onClick={() => {
                  dispatch(nextLevel(0));
                  setPlayerMessage(`${props.stages[coordinates.stages].presentation} `);
                }}
                style={{ position: "absolute", bottom: "4px", left: "6px" }}
              >
                prossimo livello
              </Button>
            ))}
          {status === "death" && (
            <Button
              variant="outline-secondary"
              onClick={() => {
                dispatch({ type: CHANGE_HEALTH, payload: playerInformation.maxHealth });
                dispatch({ type: DEATH, payload: 0 });
                dispatch({ type: CHANGE_STATUS, payload: "normal" });
                setPlayerMessage(`${props.stages[coordinates.stages].presentation} `);
              }}
              style={{ position: "absolute", bottom: "4px", left: "6px" }}
            >
              Ricomincia
            </Button>
          )}
          <Button
            variant="outline-success"
            onClick={() => {
              setPlayerInfo(true);
            }}
            style={{ position: "absolute", bottom: "4px", right: "110px" }}
          >
            Statistiche
          </Button>
          <Button
            variant="outline-warning"
            onClick={() => {
              setPlayerEquipment(true);
            }}
            style={{ position: "absolute", bottom: "4px", right: "6px" }}
          >
            Inventario
          </Button>
        </Container>
      </Container>

      {/* ----------------------------------modale per il loot-------------------------------- */}

      <LootModal show={lootModal} loot={loot} chooseMessage={chooseMessage} onHide={lootModalSet} />

      {/* ----------------------------------modale per le info del giocatore-------------------------------- */}
      <PlayerInfo
        playerInformation={playerInformation}
        inventory={inventory}
        show={playerInfo}
        onHide={playerInfoModalSet}
      />
      {/* ----------------------------------modale per l'equip del giocatore-------------------------------- */}
      <Modal show={playerEquipment} onHide={() => setPlayerEquipment(false)} className="btn-close-white" size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Equipaggiamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={6} lg={4}>
              <p className="fs-3">armatura: {inventory.armor.name}</p>
              <img
                src={
                  inventory.armor.image !== ""
                    ? inventory.armor.image
                    : "https://gfftactical.com/wp-content/uploads/2021/07/IIIA_Panel-1.jpeg"
                }
                alt={inventory.armor.name}
                className="img-fluid"
              />
              <p>armatura: {inventory.armor.defence}</p>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <p className="fs-2">scudo: {inventory.shield.name}</p>
              <img
                src={
                  inventory.shield.image !== ""
                    ? inventory.shield.image
                    : "https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D186047961W9058H10000/views/1,width=550,height=550,appearanceId=839,backgroundColor=F2F2F2/coat-of-arms-blank-form-placeholder-sticker.jpg"
                }
                alt={inventory.shield.name}
                className="img-fluid"
              />
              <p>classe armatura bonus: {inventory.shield.bonusAC}</p>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <p className="fs-2">arma: {inventory.weapon.name}</p>
              <img
                src={
                  inventory.weapon.image !== ""
                    ? inventory.weapon.image
                    : "https://thumb.silhouette-ac.com/t/dd/dd4e9b56617afe9310a6b6c534bc1a4c_t.jpeg"
                }
                alt={inventory.weapon.name}
                className="img-fluid"
              />
              <p>attacco bonus: {inventory.weapon.bonusAT}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPlayerEquipment(false)}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ----------------------------------modale per le info del nemico-------------------------------- */}
      <Modal show={monsterInfo} onHide={() => setMonsterInfo(false)} className="btn-close-white" size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>{fight.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{fight.description}</p>
          <p>attaco: {fight.attack}</p>
          <p>bonus: {fight.bonus}</p>
          <p>classe armatura: {fight.armorClass}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMonsterInfo(false)}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyGame;
