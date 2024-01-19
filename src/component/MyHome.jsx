import { Container } from "react-bootstrap";
import MyGame from "./homegame/MyGame";
import { stages } from "./assets/variables";
import { enemies } from "./assets/variables";
import { boss } from "./assets/variables";
import { items } from "./assets/variables";
import MyMap from "./homegame/MyMap";
import { useSelector } from "react-redux";

const MyHome = () => {
  const coordinates = useSelector((state) => state.coordinates);
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
      <MyMap stages={stages} position={coordinates.position} level={coordinates.stages}></MyMap>
      <MyGame stages={stages} items={items} boss={boss} enemies={enemies}></MyGame>
    </Container>
  );
};

export default MyHome;
