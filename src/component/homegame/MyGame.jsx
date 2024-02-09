import { useState } from "react";
import { Button, Container, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  DEATH,
  CHANGE_HEALTH,
  makeAStep,
  nextLevel,
  CHANGE_STATUS,
  CHOOSE_ENEMY,
  ENEMY_DEFEATED,
  ENEMY_HIT,
} from "../../redux/action";
import LootModal from "./modals/LootModal";
import PlayerInfo from "./modals/PlayerInfo";
import EquipmentModal from "./modals/EquipmentModal";
import MonsterModal from "./modals/MonsterModal";

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
  //------------------------------cambia messaggio---------------------------
  const chooseMessage = (message) => {
    setPlayerMessage(message);
  };
  //----------------------codice per chiudere modali----------------------------------------
  const lootModalSet = () => {
    setLootModal(false);
  };
  const playerInfoModalSet = () => {
    setPlayerInfo(false);
  };
  const playerEquipModalSet = () => {
    setPlayerEquipment(false);
  };
  const monsterStatsModalSet = () => {
    setMonsterInfo(false);
  };
  //------------------------------esplorazione----------------------------------------
  const enterInFight = () => {
    if (props.stages[coordinates.stages].boss.includes(coordinates.position + 2)) {
      dispatch({ type: CHOOSE_ENEMY, payload: props.boss[coordinates.stages] });
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
      const myDamage =
        (dice === 20
          ? playerInformation.attack * 2 + inventory.weapon.bonusAT
          : playerInformation.attack + inventory.weapon.bonusAT) - fight.defence;
      console.log(myDamage);
      if (myDamage > 0) {
        newEnemiesHelth -= myDamage;
      } else {
        newEnemiesHelth -= 1;
      }

      dispatch({
        type: ENEMY_HIT,
        payload: newEnemiesHelth,
      });
      setPlayerMessage(
        `riesci a colpire ${fight.name} con ${dice} sul dado, infligendogli ${myDamage > 0 ? myDamage : 1} danni`
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
      let newMyHealth = playerInformation.health;
      const enemyDamage = (dice === 20 ? fight.attack * 2 : fight.attack) - inventory.armor.defence;
      switch (enemyDamage) {
        case enemyDamage > 0:
          newMyHealth -= enemyDamage;
          break;
        default:
          newMyHealth -= 1;
          break;
      }
      setEnemyMessage(
        `l'avversario ti colpisce con un ${dice} (totale ${dice + fight.bonus}) , infligendoti ${
          enemyDamage > 0 ? enemyDamage : 1
        } danni`
      );
      newMyHealth -= dispatch({ type: CHANGE_HEALTH, payload: newMyHealth });
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
                  dispatch(nextLevel(coordinates.stages + 1));
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
            className="d-none d-md-inline"
            onClick={() => {
              setPlayerInfo(true);
            }}
            style={{ position: "absolute", bottom: "4px", right: "110px" }}
          >
            Statistiche
          </Button>
          <Button
            variant="outline-warning"
            className="d-none d-md-inline"
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
      <EquipmentModal show={playerEquipment} inventory={inventory} onHide={playerEquipModalSet} />
      {/* ----------------------------------modale per le info del nemico-------------------------------- */}
      <MonsterModal show={monsterInfo} fight={fight} onHide={() => monsterStatsModalSet()} />
    </>
  );
};

export default MyGame;
