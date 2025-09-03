import { Box, Divider, Link, Typography } from "@mui/material";

export function HomePage() {
  return (
    <Box sx={{ color: "#EEE" }}>
      <Typography variant={"h5"}>📜 Welcome to the ScreamDB!</Typography>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant={"h6"}>❓ Questions and Answers</Typography>
      <ul>
        <li>
          <Typography fontWeight={"bold"}>What is ScreamDB?</Typography>
          <Typography>
            ScreamDB is a web application for viewing Item IDs of all games from the Epic Games
            Store.
          </Typography>
        </li>
        <br />
        <li>
          <Typography fontWeight={"bold"}>What is the use for Item IDs?</Typography>
          <Typography>
            Item IDs can be used for enabling/disabling desired DLCs in EOS SDK DLC unlockers like{" "}
            <Link href={"https://github.com/acidicoala/ScreamAPI#readme"}>ScreamAPI</Link>.
          </Typography>
        </li>
        <br />
        <li>
          <Typography fontWeight={"bold"}>Where is the data coming from?</Typography>
          <Typography>
            The data comes directly from the official Epic Games servers, so it is always
            up-to-date.
          </Typography>
        </li>
      </ul>
      <Typography variant={"h6"}>➕ Extra Info for Developers</Typography>
      <ul>
        <li>
          This web app is open-source and available at{" "}
          <Link href={"https://github.com/acidicoala/ScreamDB#readme"}>GitHub</Link>.
        </li>
      </ul>
    </Box>
  );
}
