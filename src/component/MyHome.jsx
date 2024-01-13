import { Container } from "react-bootstrap";
import MyGame from "./homegame/MyGame";
import { stages } from "./assets/variables";
import { enemies } from "./assets/variables";
import MyMap from "./homegame/MyMap";
import { useSelector } from "react-redux";

const MyHome = () => {
  const playerInformation = useSelector((state) => state.player);
  return (
    <Container
      fluid
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        minHeight: "100vh",
        objectFit: "cover",
      }}
      className="pt-5 px-4"
    >
      <MyMap stages={stages} position={playerInformation.position} level={playerInformation.stages}></MyMap>
      <MyGame stages={stages} enemies={enemies}></MyGame>
    </Container>
  );
};

export default MyHome;
