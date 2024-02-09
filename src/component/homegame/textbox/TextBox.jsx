import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  CHANGE_HEALTH,
  CHANGE_STATUS,
  DEATH,
  ENEMY_DEFEATED,
  ENEMY_HIT,
  makeAStep,
  nextLevel,
} from "../../../redux/action";
import { useState } from "react";
import LootModal from "../modals/LootModal";
import PlayerInfo from "../modals/PlayerInfo";
import EquipmentModal from "../modals/EquipmentModal";
import MonsterModal from "../modals/MonsterModal";

const TextBox = (props) => {
  const dispatch = useDispatch();
  const [enemyMessage, setEnemyMessage] = useState("");
  const [isMyTurn, setIsMyTurn] = useState(true);
  const enemiesHealth = useSelector((state) => state.fight.enemies.health);
  const [lootModal, setLootModal] = useState(false);
  const [playerInfo, setPlayerInfo] = useState(false);
  const [playerEquipment, setPlayerEquipment] = useState(false);
  const [monsterInfo, setMonsterInfo] = useState(false);

  //turno giocatore

  const attack = () => {
    setIsMyTurn(false);
    let dice = Math.floor(Math.random() * 20 + 1);
    if (dice >= props.fight.armorClass) {
      let newEnemiesHelth = enemiesHealth;
      const myDamage =
        (dice === 20
          ? props.playerInformation.attack * 2 + props.inventory.weapon.bonusAT
          : props.playerInformation.attack + props.inventory.weapon.bonusAT) - props.fight.defence;
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
      props.setPlayerMessage(
        `riesci a colpire ${props.fight.name} con ${dice} sul dado, infligendogli ${myDamage > 0 ? myDamage : 1} danni`
      );
      if (newEnemiesHelth <= 0) {
        props.setPlayerMessage("l'avversario cade a terra");
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
      props.setPlayerMessage(`hai mancato ${props.fight.name} facendo ${dice} sul dado`);
      setTimeout(() => {
        enemyTurn();
      }, 2000);
    }
  };

  //-------------------turno nemico-----------------------------------------------------
  const enemyTurn = () => {
    let dice = Math.floor(Math.random() * 20 + 1);
    if (dice + props.fight.bonus >= props.playerInformation.armorClass) {
      let newMyHealth = props.playerInformation.health;
      const enemyDamage = (dice === 20 ? props.fight.attack * 2 : props.fight.attack) - props.inventory.armor.defence;
      if (enemyDamage > 0) {
        newMyHealth -= enemyDamage;
      } else {
        newMyHealth -= 1;
      }

      setEnemyMessage(
        `l'avversario ti colpisce con un ${dice} (totale ${dice + props.fight.bonus}) , infligendoti ${
          enemyDamage > 0 ? enemyDamage : 1
        } danni`
      );
      dispatch({ type: CHANGE_HEALTH, payload: newMyHealth });
      if (newMyHealth <= 0) {
        props.setPlayerMessage("il tuo nemico esegue il colpo di grazia e tu cadi a terra perdendo i sensi");
        dispatch({ type: CHANGE_STATUS, payload: "death" });
        setEnemyMessage("");
      }
    } else {
      setEnemyMessage(`l'avversario ti manca con un ${dice} `);
    }
    setIsMyTurn(true);
  };

  //----------------------codice per chiudere modali----------------------------------------
  const chooseMessage = (message) => {
    props.setPlayerMessage(message);
  };

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

  //------------------------------------------------------------------

  return (
    <>
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
        <p className="mt-2 ms-2 text-success">{props.playerMessage}</p>

        {isMyTurn && props.playerInformation.status === "fight" && enemiesHealth > 0 && (
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
        {props.playerInformation.status === "looting" && (
          <>
            <Button
              variant="outline-primary"
              onClick={() => {
                dispatch({ type: CHANGE_STATUS, payload: "normal" });
                dispatch(makeAStep(props.coordinates.position + 1));
                props.enterInFight();
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
        {props.playerInformation.status === "normal" &&
          (props.coordinates.position < 10 ? (
            <Button
              variant="outline-primary"
              onClick={() => {
                props.setPlayerMessage("hai fatto un'altro passo");
                dispatch(makeAStep(props.coordinates.position + 1));
                props.enterInFight();
              }}
              style={{ position: "absolute", bottom: "4px", left: "6px" }}
            >
              vai avanti
            </Button>
          ) : (
            <Button
              variant="outline-primary"
              onClick={() => {
                dispatch(nextLevel(props.coordinates.stages + 1));
                props.setPlayerMessage(`${props.stages[props.coordinates.stages].presentation} `);
              }}
              style={{ position: "absolute", bottom: "4px", left: "6px" }}
            >
              prossimo livello
            </Button>
          ))}
        {props.playerInformation.status === "death" && (
          <Button
            variant="outline-secondary"
            onClick={() => {
              dispatch({ type: CHANGE_HEALTH, payload: props.playerInformation.maxHealth });
              dispatch({ type: DEATH, payload: 0 });
              dispatch({ type: CHANGE_STATUS, payload: "normal" });
              props.setPlayerMessage(`${props.stages[props.coordinates.stages].presentation} `);
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

      {/* ----------------------------------modale per il loot-------------------------------- */}
      <LootModal show={lootModal} loot={props.loot} chooseMessage={chooseMessage} onHide={lootModalSet} />
      {/* ----------------------------------modale per le info del giocatore-------------------------------- */}
      <PlayerInfo
        playerInformation={props.playerInformation}
        inventory={props.inventory}
        show={playerInfo}
        onHide={playerInfoModalSet}
      />
      {/* ----------------------------------modale per l'equip del giocatore-------------------------------- */}
      <EquipmentModal show={playerEquipment} inventory={props.inventory} onHide={playerEquipModalSet} />
      {/* ----------------------------------modale per le info del nemico-------------------------------- */}
      <MonsterModal show={monsterInfo} fight={props.fight} onHide={() => monsterStatsModalSet()} />
    </>
  );
};

export default TextBox;
