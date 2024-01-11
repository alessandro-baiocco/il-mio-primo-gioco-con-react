import { Container } from "react-bootstrap";

const MyMap = (props) => {
  const generateLevels = Array.from(Array(props.stages[0].levels).keys());

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
          {props.stages[0].fight.includes(i) && (
            <img src={"https://static.thenounproject.com/png/4728546-200.png"} className="img-fluid" alt="fight-room" />
          )}
        </Container>
      ))}
    </Container>
  );
};

export default MyMap;
