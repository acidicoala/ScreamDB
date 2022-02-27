import { CSSProperties, PropsWithChildren } from "react";
import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = (lines: number) =>
  makeStyles(() =>
    createStyles({
      text: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": lines,
        "-webkit-box-orient": "vertical",
      },
    })
  )();

export function OverflowText(
  props: PropsWithChildren<{
    lines: number;
    style: CSSProperties;
  }>
) {
  const { lines, style, children } = props;
  const { text } = useStyles(lines);

  return (
    <div className={text} style={style}>
      {children}
    </div>
  );
}
