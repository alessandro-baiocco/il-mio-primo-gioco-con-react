import { useEffect } from "react";
import { Container } from "react-bootstrap";

const MyMap = (props) => {
  let generateLevels = Array.from(Array(props.stages[props.level.length - 1].levels).keys());

  useEffect(() => {}, [props.position.length]);

  return (
    <Container className="d-flex flex-wrap" style={{ position: "relative" }}>
      <Container
        style={{ height: "10px", background: "black", zIndex: "1", position: "absolute", top: "40px", width: "90%" }}
        className="d-none d-lg-block"
      ></Container>
      {generateLevels.map((level, i) => (
        <Container
          style={{
            background: "white",
            height: "100px",
            maxWidth: "100px",
            border: "black 2px solid",
            zIndex: "10",
            overflow: "hidden",
            position: "relative",
          }}
          key={`room-${i}`}
        >
          {`stanza ${i + 1}`}
          {props.stages[props.level.length - 1].fight.includes(i) && (
            <img
              src={"https://static.thenounproject.com/png/4728546-200.png"}
              className={`${i === props.position.length - 1 ? "d-none" : ""} img-fluid`}
              alt="fight-room"
            />
          )}
          {props.stages[props.level.length - 1].boss.includes(i) && (
            <img
              src={"https://cdn3.iconfinder.com/data/icons/video-game-items-concepts/128/skull-2-512.png"}
              className={`${i === props.position.length - 1 ? "d-none" : ""} img-fluid`}
              alt="fight-room"
            />
          )}

          <img
            src={"https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png"}
            className={`${i === props.position.length - 1 ? "" : "d-none"}`}
            alt="player-position"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </Container>
      ))}
    </Container>
  );
};

export default MyMap;
