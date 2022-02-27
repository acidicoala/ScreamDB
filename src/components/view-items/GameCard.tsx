import { Box, Card } from "@material-ui/core";
import { CSSProperties, useState } from "react";
import { OverflowText } from "../util/OverflowText";
import { Link } from "react-router-dom";
import { path } from "../../util/paths";
import { GameCardData } from "../../util/types";

export function GameCard(props: { data: GameCardData; style?: CSSProperties }) {
  const { data, style } = props;
  const [raised, setRaised] = useState(false);

  return (
    <Box style={{ width: 210, ...style }}>
      <Card
        raised={raised}
        style={{ height: 280 }}
        onMouseEnter={() => setRaised(true)}
        onMouseLeave={() => setRaised(false)}
      >
        <Link to={path.to.offers(data.namespace)}>
          <img
            src={data.image ?? undefined}
            alt={data.title}
            style={{ objectFit: "cover" }}
            width={"100%"}
            height={"100%"}
          />
        </Link>
      </Card>
      <Box marginY={1} />
      <OverflowText
        lines={2}
        style={{ lineHeight: "1.3rem", fontSize: "1rem", fontWeight: "bold" }}
        children={data.title}
      />
    </Box>
  );
}
