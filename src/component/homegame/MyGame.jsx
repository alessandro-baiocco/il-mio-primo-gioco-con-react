import { useEffect, useReducer, useState } from "react";
import { Button, Container, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DEATH, GO_AHEAD, makeAStep, nextLevel } from "../../redux/action";

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
  }, [fight]);

  const enterInFight = () => {
    if (props.stages[coordinates.stages].fight.includes(coordinates.position.length)) {
      setStatus("fight");
      setEnemiesHealth(fight.health);
    }
  };
  const attack = () => {
    let newEnemiesHelth = enemiesHealth;
    setEnemiesHealth((newEnemiesHelth -= playerInformation.attack));
    console.log(newEnemiesHelth, enemiesHealth);
    if (newEnemiesHelth <= 0) {
      setStatus("normal");
      setFight(null);
    } else {
      enemyTurn();
    }
  };

  const enemyTurn = () => {
    let newMyHealth = myHealth;
    setMyHealth(newMyHealth - fight.attack);
    if (newMyHealth <= 0) {
      dispatch({ type: DEATH, payload: 1 });
      setStatus("normal");
      setMyHealth(playerInformation.health);
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
        <Container>
          <img
            src={fight.image}
            alt="enemy-sprite"
            className="d-flex justify-content-center img-fluid"
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
            >
              vai avanti
            </Button>
          ) : (
            <Button
              variant="outline-primary"
              onClick={() => {
                dispatch(nextLevel());
              }}
            >
              prossimo livello
            </Button>
          ))}
      </Container>
    </Container>
  );
};

export default MyGame;
