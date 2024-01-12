import { useEffect, useReducer, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GO_AHEAD } from "../../redux/action";

const MyGame = (props) => {
  const [status, setStatus] = useState("normal");
  const playerInformation = useSelector((state) => state.player);
  const dispatch = useDispatch();

  // const handleAhead = () => {
  //   props.player.position += 1;
  //   console.log(props.player.position);
  // };

  useEffect(() => {
    console.log(playerInformation);
  }, [playerInformation]);

  return (
    <Container
      style={{
        border: "cyan solid 2px",
        minHeight: "80vh",
        backgroundImage: `${props.stages[playerInformation.stages].background}`,
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
        <Button
          variant="outline-primary"
          onClick={() => {
            dispatch({ type: GO_AHEAD, payload: 1 });
          }}
        >
          vai avanti
        </Button>
      </Container>
    </Container>
  );
};

export default MyGame;
