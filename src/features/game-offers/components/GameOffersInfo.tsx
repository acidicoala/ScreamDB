import { useLocale } from "~/core/hooks/useLocale.ts";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { MonoText } from "~/core/components/MonoText.tsx";
import type { GameData } from "../queries.ts";

export function GameOffersInfo({ gameData }: { gameData: GameData }) {
  const locale = useLocale();

  return (
    <TableContainer component={Paper} variant={"outlined"}>
      <Table size={"small"}>
        <TableBody>
          <TableRow>
            <TableCell>{locale.game_title}</TableCell>
            <TableCell>{gameData.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ minWidth: 128, wordBreak: "break-all" }}>
              {locale.namespace_id}
            </TableCell>
            <TableCell>
              <MonoText>{gameData.namespace}</MonoText>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{locale.description}</TableCell>
            <TableCell sx={{ textAlign: "justify" }}>
              <Typography fontSize={"small"} lineHeight={1}>
                {gameData.description}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
