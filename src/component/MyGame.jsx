import { Container } from "react-bootstrap";

const MyGame = () => {
  const stages = [
    {
      name: "forest",
      background: "url('https://unsplash.com/it/foto/luci-gialle-tra-gli-alberi-hvrpOmuMrAI')",
    },
  ];

  return (
    <Container style={{ border: "cyan solid 2px", minHeight: "300px", backgroundImage: `${stages[0].background}` }}>
      {console.log(stages[0].background)}
    </Container>
  );
};

export default MyGame;
