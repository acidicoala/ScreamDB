import { Box, createStyles, makeStyles } from "@material-ui/core";

import ReactMarkdown from "react-markdown";
import React, { useEffect, useState } from "react";
import home_en from "../md/home_en.md";
import home_es from "../md/home_es.md";
import home_ru from "../md/home_ru.md";
import home_zh from "../md/home_zh.md";
import { useLanguage } from "../context/language";

const useStyles = makeStyles(() =>
  createStyles({
    home: {
      "& a": {
        color: "#0E0",
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  })
);

export function Home() {
  const { lang } = useLanguage();
  const classes = useStyles();

  const [home, setHome] = useState({
    en: "",
    es: "",
    ru: "",
    zh: "",
  });

  useEffect(() => {
    const en = fetch(home_en).then((file) => file.text());
    const es = fetch(home_es).then((file) => file.text());
    const ru = fetch(home_ru).then((file) => file.text());
    const zh = fetch(home_zh).then((file) => file.text());

    Promise.all([en, es, ru, zh]).then(([en, es, ru, zh]) =>
      setHome({
        en: en,
        es: es,
        ru: ru,
        zh: zh,
      })
    );
  }, []);

  return (
    <Box className={classes.home}>
      <ReactMarkdown children={home[lang]} />
    </Box>
  );
}
