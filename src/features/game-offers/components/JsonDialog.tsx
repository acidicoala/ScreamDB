import { ContentCopy } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, type DialogProps } from "@mui/material";
import { lazy, Suspense, useMemo } from "react";
import { useLocale } from "~/core/hooks/useLocale.ts";
import { enqueueSnackbar } from "notistack";
import { LoadingFallback } from "~/core/components/LoadingFallback.tsx";

const JsonViewer = lazy(() => import("./JsonViewer.tsx"));

export function JsonDialog(props: { json: object } & DialogProps) {
  const locale = useLocale();

  const { json, ...dialogProps } = props;
  const jsonString = useMemo(() => JSON.stringify(json, null, 2), [json]);

  async function copyJsonToClipboard() {
    try {
      await navigator.clipboard.writeText(jsonString);
      enqueueSnackbar(locale.copy_json_success, { variant: "info" });
    } catch (e) {
      enqueueSnackbar(locale.copy_json_error, { variant: "error" });
      console.error(locale.copy_json_error, e);
    }
  }

  return (
    <Dialog
      maxWidth={"md"}
      slotProps={{ paper: { sx: { height: "75vh", width: "100%" } } }}
      // Workaround for https://github.com/mui/material-ui/issues/43106#issuecomment-2314809028
      disableRestoreFocus={true}
      closeAfterTransition={true}
      {...dialogProps}
    >
      <Box height={"100%"} padding={1}>
        <Suspense fallback={<LoadingFallback />}>
          <JsonViewer jsonString={jsonString} />
        </Suspense>
      </Box>
      <DialogActions>
        <Button
          onClick={(e) => dialogProps.onClose?.(e, "escapeKeyDown")}
          children={locale.close}
        />
        <Button
          variant={"outlined"}
          startIcon={<ContentCopy />}
          onClick={() => void copyJsonToClipboard()}
          children={locale.copy_to_clipboard}
        />
      </DialogActions>
    </Dialog>
  );
}
