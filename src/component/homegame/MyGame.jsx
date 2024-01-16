import { useEffect, useState } from "react";
import { Button, Container, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DEATH, makeAStep, nextLevel } from "../../redux/action";

const MyGame = (props) => {
  const playerInformation = useSelector((state) => state.player);
  const coordinates = useSelector((state) => state.coordinates);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("normal");
  const [fight, setFight] = useState(null);
  const [playerMessage, setPlayerMessage] = useState(`${props.stages[coordinates.stages.length - 1].presentation} `);
  const [enemyMessage, setEnemyMessage] = useState("");
  const [myHealth, setMyHealth] = useState(playerInformation.health);
  const [enemiesHealth, setEnemiesHealth] = useState();

  useEffect(() => {
    setFight(props.enemies[Math.floor(Math.random() * 2)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fight]);

  const enterInFight = () => {
    if (props.stages[coordinates.stages.length - 1].fight.includes(coordinates.position.length)) {
      setStatus("fight");
      setPlayerMessage(`un ${fight.name} ti blocca la strada`);
      setEnemiesHealth(fight.health);
    } else {
      setPlayerMessage(`hai fatto un'altro passo`);
    }
  };
  const attack = () => {
    let dice = Math.floor(Math.random() * 20 + 1);
    if (dice >= fight.armorClass) {
      let newEnemiesHelth = enemiesHealth;
      setEnemiesHealth((newEnemiesHelth -= dice === 20 ? playerInformation.attack * 2 : playerInformation.attack));
      setPlayerMessage(
        `riesci a colpire ${fight.name} con ${dice} sul dado, infligendogli ${
          dice === 20 ? playerInformation.attack * 2 : playerInformation.attack
        } danni`
      );
      if (newEnemiesHelth <= 0) {
        setPlayerMessage("l'avversario cade a terra");
        setStatus("normal");
        setFight(null);
        setEnemyMessage("");
      } else {
        enemyTurn();
      }
    } else {
      setPlayerMessage(`hai mancato ${fight.name} facendo ${dice} sul dado`);
      enemyTurn();
    }
  };

  const enemyTurn = () => {
    let dice = Math.floor(Math.random() * 20 + 1);
    if (dice >= playerInformation.armorClass) {
      setEnemyMessage(
        `l'avversario ti colpisce con un ${dice} , infligendoti ${dice === 20 ? fight.attack * 2 : fight.attack} danni`
      );
      let newMyHealth = myHealth;
      setMyHealth((newMyHealth -= dice === 20 ? fight.attack * 2 : fight.attack));
      if (newMyHealth <= 0) {
        dispatch({ type: DEATH, payload: 1 });
        setStatus("normal");
        setMyHealth(playerInformation.health);
      }
    } else {
      setEnemyMessage(`l'avversario ti manca con un ${dice} `);
    }
  };

  return (
    <Container
      style={{
        border: "cyan solid 2px",
        minHeight: "80vh",
        backgroundImage: `${props.stages[coordinates.stages].background}`,
        position: "relative",
      }}
    >
      <Container style={{ maxWidth: "30%" }} className="d-flex ms-0">
        <p className="text-light">Punti ferita :</p>
        <ProgressBar
          now={(100 * myHealth) / playerInformation.health}
          label={`${myHealth} / ${playerInformation.health}`}
          variant="danger"
          style={{ width: "40%" }}
          className="mt-1 ms-2"
        />
      </Container>
      {status === "fight" && (
        <Container className="d-flex justify-content-center">
          <ProgressBar
            now={(100 * enemiesHealth) / fight.health}
            label={`${enemiesHealth} / ${fight.health}`}
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

        {status === "fight" && enemiesHealth > 0 && (
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
          </>
        )}
        {status === "normal" &&
          (coordinates.position.length < 10 ? (
            <Button
              variant="outline-primary"
              onClick={() => {
                dispatch(makeAStep());
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
                dispatch(nextLevel());
                setPlayerMessage(`${props.stages[coordinates.stages.length - 1].presentation} `);
              }}
              style={{ position: "absolute", bottom: "4px", left: "6px" }}
            >
              prossimo livello
            </Button>
          ))}
      </Container>
    </Container>
  );
};

export default MyGame;
