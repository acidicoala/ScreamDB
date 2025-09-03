import { useLocale } from "~/core/hooks/useLocale.ts";
import { Box, Button, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { type MRT_TableInstance } from "material-react-table";
import { DataObject } from "@mui/icons-material";
import { JsonDialog } from "./JsonDialog.tsx";
import type { OfferElement } from "~/features/game-offers/GameOffersPage.tsx";

export function OfferTableAlertContent({ table }: { table: MRT_TableInstance<OfferElement> }) {
  const locale = useLocale();

  const [showJsonDialog, setShowJsonDialog] = useState(false);
  const [exportedJson, setExportedJson] = useState<object>({});

  // We need to calculate selected count manually, given our unusual use-case
  const selectedFlatRows = table.getSelectedRowModel().flatRows;
  const selectedElements = useMemo(() => {
    const idNameMap = new Map<string, string>();
    const elements = selectedFlatRows.map((row) => row.original);

    for (const element of elements) {
      // Skip bundle offers
      if (element.items.length > 1) {
        continue;
      }

      // Title can be empty, so want to replace items that don't have one
      if (!idNameMap.has(element.id) || element.title) {
        idNameMap.set(element.id, element.title || locale.unknown_item);
      }
    }

    return Object.fromEntries(idNameMap);
  }, [locale, selectedFlatRows]);

  const allFlatRows = table.getRowModel().flatRows;
  const totalSelectableCount = useMemo(
    () =>
      new Set(
        allFlatRows
          .map((r) => r.original)
          .filter((e) => e.items.length <= 1)
          .map((e) => e.id),
      ).size,
    [allFlatRows],
  );

  const alertText = useMemo(
    () =>
      locale.items_selected
        .replace("%0", Object.keys(selectedElements).length.toString())
        .replace("%1", totalSelectableCount.toString()),
    [locale, selectedElements, totalSelectableCount],
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", gap: "8px", p: "4px 12px", alignItems: "center" }}>
        {/*<MRT_SelectCheckbox table={table} />*/}
        <Typography variant={"body2"}>{alertText}</Typography>
        <Button size={"small"} variant={"text"} onClick={() => table.resetRowSelection()}>
          {locale.clear_selection}
        </Button>
      </Box>

      <Button
        color="info"
        size={"small"}
        variant="contained"
        startIcon={<DataObject />}
        onClick={() => {
          setExportedJson(selectedElements);
          setShowJsonDialog(true);
        }}
      >
        {locale.export_as_json}
      </Button>

      <JsonDialog
        json={exportedJson}
        open={showJsonDialog}
        onClose={() => {
          setShowJsonDialog(false);
        }}
      />
    </Box>
  );
}
