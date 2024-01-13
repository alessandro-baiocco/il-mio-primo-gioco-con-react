import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const MyMap = (props) => {
  // const playerPosition = useSelector((state) => state.player.position);
  // const playerStages = useSelector((state) => state.player.stages);
  let generateLevels = Array.from(Array(props.stages[props.level.length - 1].levels).keys());

  useEffect(() => {
    console.log(props.position.length);
  }, [props.position.length]);

  return (
    <Container className="d-flex" style={{ position: "relative" }}>
      <Container
        style={{ height: "10px", background: "black", zIndex: "1", position: "absolute", top: "40px", width: "90%" }}
      ></Container>
      {generateLevels.map((level, i) => (
        <Container
          style={{ background: "white", height: "100px", width: "100px", border: "black 2px solid", zIndex: "10" }}
          key={`level-${i}`}
        >
          {`level ${i + 1}`}
          {props.stages[props.level.length - 1].fight.includes(i) && (
            <img src={"https://static.thenounproject.com/png/4728546-200.png"} className="img-fluid" alt="fight-room" />
          )}

          <img
            src={"https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png"}
            className={`${i === props.position.length - 1 ? "" : "d-none"} img-fluid`}
            alt="player-position"
            style={{ objectFit: "cover" }}
          />
        </Container>
      ))}
    </Container>
  );
};

export default MyMap;
