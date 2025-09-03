import React from "react";

export function MonoText(props: React.PropsWithChildren) {
  return <code style={{ fontFamily: "Fira Code Variable" }}>{props.children}</code>;
}
