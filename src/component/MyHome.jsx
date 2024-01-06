import { Container } from "react-bootstrap";
import MyGame from "./MyGame";

const MyHome = () => {
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
      <MyGame></MyGame>
    </Container>
  );
};

export default MyHome;