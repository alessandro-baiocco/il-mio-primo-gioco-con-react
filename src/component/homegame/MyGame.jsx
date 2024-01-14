import { useEffect, useReducer, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GO_AHEAD, makeAStep, nextLevel } from "../../redux/action";

const MyGame = (props) => {
  const [status, setStatus] = useState("normal");
  const [fight, setFight] = useState(props.enemies[Math.floor(Math.random() + 1)]);
  const playerInformation = useSelector((state) => state.player);
  const coordinates = useSelector((state) => state.coordinates);
  const dispatch = useDispatch();

  const [enemiesHealth, setEnemiesHealth] = useState();

  useEffect(() => {
    console.log(playerInformation);
  }, [playerInformation]);

  const enterInFight = () => {
    if (props.stages[coordinates.stages].fight.includes(coordinates.position.length)) {
      setFight(props.enemies[Math.floor(Math.random())]);
      setStatus("fight");
      console.log(props.enemies[0]);
      console.log(fight, Math.floor(Math.random()));
      setEnemiesHealth(fight.health);
    }
  };
  const attack = () => {
    let newEnemiesHelth = enemiesHealth;
    setEnemiesHealth((newEnemiesHelth -= 5));
    console.log(newEnemiesHelth, enemiesHealth);
    if (newEnemiesHelth <= 0) {
      setStatus("normal");
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
