import { useState } from "react";
import { Container } from "react-bootstrap";

const MyGame = (props) => {
  const [status, setStatus] = useState("not in fight");

  return (
    <Container
      style={{
        border: "cyan solid 2px",
        minHeight: "80vh",
        backgroundImage: `${props.stages[0].background}`,
        position: "relative",
      }}
    >
      <Container
        style={{
          background: "black",
          position: "absolute",
          height: "30%",
          width: "100%",
          bottom: "0px",
          left: "0px",
          border: "white 2px solid",
        }}
      ></Container>
    </Container>
  );
};

export default MyGame;
