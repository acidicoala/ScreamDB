import { type Locale, useLocale } from "~/core/hooks/useLocale.ts";
import { useMemo } from "react";
import {
  createMRTColumnHelper,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { ThumbnailImage } from "~/features/game-offers/components/ThumbnailImage.tsx";
import { MonoText } from "~/core/components/MonoText.tsx";
import { OfferType } from "~/core/gql/graphql.ts";
import { OfferTableAlertContent } from "~/features/game-offers/components/OfferTableAlertContent.tsx";
import { Box, Tooltip } from "@mui/material";
import type { OfferElement } from "~/features/game-offers/GameOffersPage.tsx";

export function GameOffersTable(props: { elements: OfferElement[] }) {
  const locale = useLocale();

  const columns = useMemo(() => {
    const columnHelper = createMRTColumnHelper<OfferElement>();

    return [
      columnHelper.accessor("keyImages", {
        header: locale.image,
        grow: false,
        size: 128,
        enableColumnFilter: false,
        enableSorting: false,
        enableColumnActions: false,
        columnDefType: "display",
        Cell: ({ cell }) => ThumbnailImage({ keyImages: cell.getValue() }),
      }),
      columnHelper.accessor((row) => getItemID(row, locale), {
        header: locale.item_id,
        id: "id",
        grow: false,
        size: 280,
        Cell: (props) => {
          const { items } = props.row.original;

          return items.length > 1
            ? props.renderedCellValue
            : MonoText({ children: props.renderedCellValue });
        },
      }),
      columnHelper.accessor("title", {
        header: locale.title,
        Cell: (props) => TooltipTitle({ title: props.cell.getValue() }),
      }),
      columnHelper.accessor("offerType", {
        header: locale.offer_type,
        filterVariant: "multi-select",
        grow: false,
        size: 208,
        // We don't want to show an empty string as a filter option
        filterSelectOptions: Array.from(new Set(props.elements.map((it) => it.offerType))),
      }),
    ];
  }, [locale, props.elements]);

  const table = useMaterialReactTable({
    columns,
    data: props.elements, //must be memoized or stable
    layoutMode: "grid",
    enableRowSelection: true,
    enableGlobalFilter: true,
    enableHiding: false,
    enableFacetedValues: true,
    enableDensityToggle: false,
    paginateExpandedRows: false,
    // Workaround for: https://github.com/KevinVandy/material-react-table/issues/1252
    enableKeyboardShortcuts: false,
    enableFullScreenToggle: false,
    filterFromLeafRows: true,
    enableExpanding: true,
    renderToolbarAlertBannerContent: OfferTableAlertContent,
    getSubRows: (originalRow) => getSubRows(originalRow, props.elements),
    initialState: {
      density: "compact",
      showColumnFilters: true,
      pagination: { pageSize: 50, pageIndex: 0 },
    },
    displayColumnDefOptions: {
      "mrt-row-expand": {
        grow: false,
        size: 48,
      },
    },
  });

  return <MaterialReactTable table={table} />;
}

function getSubRows(originalRow: OfferElement, elements: OfferElement[]) {
  if (originalRow.items.length < 2) {
    return [];
  }

  return originalRow.items.map((item) => {
    // To assign name & offer type to an item,
    // we can search for offers that contain only that specific items
    const standaloneOffer = elements.find((e) => e.items.length === 1 && e.items[0].id === item.id);

    return {
      id: item.id,
      title: standaloneOffer?.title ?? "",
      offerType: "" as OfferType, // Items don't have offer types
      items: [],
    } satisfies OfferElement;
  });
}

function getItemID(row: OfferElement, locale: Locale) {
  switch (row.items.length) {
    case 0:
      return row.id; // Sub item from a bundle offer
    case 1:
      return row.items[0].id; // For offers with a single item, show that item's ID
    default:
      return `${row.items.length.toString()} ${locale.items}`; // "n items"
  }
}

function TooltipTitle({ title }: { title: string }) {
  return (
    <Tooltip title={title}>
      <Box>{title}</Box>
    </Tooltip>
  );
}
