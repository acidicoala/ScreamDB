import { OfferRowData } from "../../util/types";
import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp, Panorama } from "@material-ui/icons";
import { useLocale } from "../../hooks/locale";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { bindPopover } from "material-ui-popup-state";

export function OfferRow(props: { data: OfferRowData }) {
  const { data } = props;
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();

  const popupState = usePopupState({
    variant: "popover",
    popupId: "offer-img",
  });

  return (
    <>
      <TableRow>
        <TableCell padding={"none"}>
          {data.items.length > 1 && (
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          )}
        </TableCell>
        <TableCell width={100} height={64}>
          <Box display={"flex"}>
            {data.image ? (
              <img
                src={data.image}
                alt={""}
                style={{ objectFit: "cover", cursor: "pointer" }}
                width={88.88}
                height={50}
                {...bindTrigger(popupState)}
              />
            ) : (
              <Panorama style={{ width: 88.88, height: 50, color: "gray" }} />
            )}
          </Box>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
            disableRestoreFocus
          >
            <Box display={"flex"}>
              <img
                src={data.image}
                alt={data.title}
                style={{
                  objectFit: "cover",
                  maxWidth: 400,
                  maxHeight: 400,
                }}
              />
            </Box>
          </Popover>
        </TableCell>
        <TableCell>{data.title}</TableCell>
        <TableCell>{data.items.length === 1 ? data.items[0].id : locale.multiple_items}</TableCell>
        <TableCell>{data.offerType}</TableCell>
      </TableRow>
      {data.items.length > 1 && (
        <TableRow>
          <TableCell padding={"none"} colSpan={5} style={{ border: "none" }}>
            <Collapse in={open} timeout="auto">
              <Table size={"small"}>
                <TableBody>
                  {data.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell width={180} />
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
