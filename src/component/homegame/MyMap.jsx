import { useEffect } from "react";
import { Container } from "react-bootstrap";

const MyMap = (props) => {
  let generateLevels = Array.from(Array(props.stages[props.level].levels).keys());

  useEffect(() => {}, [props.position]);

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
          className="d-none d-md-inline"
          key={`room-${i}`}
        >
          {`stanza ${i + 1}`}
          {props.stages[props.level].fight.includes(i) && (
            <img
              src={"https://static.thenounproject.com/png/4728546-200.png"}
              className={`${i === props.position ? "d-none" : ""} img-fluid`}
              alt="fight-room"
            />
          )}
          {props.stages[props.level].boss.includes(i) && (
            <img
              src={"https://cdn3.iconfinder.com/data/icons/video-game-items-concepts/128/skull-2-512.png"}
              className={`${i === props.position ? "d-none" : ""} img-fluid`}
              alt="fight-room"
            />
          )}
          {props.stages[props.level].tresure.includes(i) && (
            <img
              src={"https://cdn.icon-icons.com/icons2/2248/PNG/512/treasure_chest_icon_135086.png"}
              className={`${i === props.position ? "d-none" : ""} img-fluid`}
              alt="tresure-room"
            />
          )}

          <img
            src={"https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png"}
            className={`${i === props.position ? "" : "d-none"}`}
            alt="player-position"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </Container>
      ))}
      <Container className="d-md-none" style={{ background: "white", height: "100px" }}>
        <p>posizione attuale: {props.position}</p>
      </Container>
    </Container>
  );
};

export default MyMap;
