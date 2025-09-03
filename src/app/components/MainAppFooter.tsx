import { Box, Container, Typography } from "@mui/material";

import { MAX_WIDTH_BREAKPOINT } from "~/core/theme.ts";

export function MainAppFooter() {
  return (
    <Container maxWidth={MAX_WIDTH_BREAKPOINT}>
      <Box sx={{ my: 1, textAlign: "center" }}>
        <Typography variant="caption" color={"textSecondary"}>
          ScreamDB is a hobby project and is not affiliated with Epic Games.
        </Typography>
      </Box>
    </Container>
  );
}
