import { Box, Typography } from "@material-ui/core";
import { useLocale } from "../../hooks/locale";

export function ScreamFooter() {
  const { locale } = useLocale();
  const versionNumber = process.env.REACT_APP_VERSION;

  return (
    <Box marginY={2}>
      <Typography style={{ textAlign: "center" }} children={`${locale.version} ${versionNumber}`} />
    </Box>
  );
}
