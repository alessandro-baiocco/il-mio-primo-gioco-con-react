import { useEffect, useState } from "react";
import { Button, Container, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DEATH, makeAStep, nextLevel } from "../../redux/action";

const MyGame = (props) => {
  const [status, setStatus] = useState("normal");
  const [fight, setFight] = useState(null);

  const playerInformation = useSelector((state) => state.player);
  const coordinates = useSelector((state) => state.coordinates);
  const dispatch = useDispatch();
  const [myHealth, setMyHealth] = useState(playerInformation.health);

  const [enemiesHealth, setEnemiesHealth] = useState();

  useEffect(() => {
    setFight(props.enemies[Math.floor(Math.random() * 2)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fight]);

  const enterInFight = () => {
    if (props.stages[coordinates.stages].fight.includes(coordinates.position.length)) {
      setStatus("fight");
      setEnemiesHealth(fight.health);
    }
  };
  const attack = () => {
    let dice = Math.floor(Math.random() * 20 + 1);
    if (dice >= fight.armorClass) {
      let newEnemiesHelth = enemiesHealth;
      setEnemiesHealth((newEnemiesHelth -= playerInformation.attack));
      if (newEnemiesHelth <= 0) {
        setStatus("normal");
        setFight(null);
      } else {
        enemyTurn();
      }
    } else {
      console.log("lo hai mancato");
      enemyTurn();
    }
  };

  const enemyTurn = () => {
    let dice = Math.floor(Math.random() * 20 + 1);
    if (dice >= playerInformation.armorClass) {
      let newMyHealth = myHealth;
      setMyHealth(newMyHealth - fight.attack);
      if (newMyHealth <= 0) {
        dispatch({ type: DEATH, payload: 1 });
        setStatus("normal");
        setMyHealth(playerInformation.health);
      }
    } else {
      console.log("l'avversario ti ha mancato");
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
        {status === "fight" && enemiesHealth > 0 && (
          <Button
            variant="outline-danger"
            onClick={() => {
              attack();
            }}
            style={{ position: "absolute", bottom: "4px", left: "100px" }}
          >
            attacca
          </Button>
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
