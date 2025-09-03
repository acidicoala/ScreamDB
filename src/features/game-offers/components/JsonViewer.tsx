// See: https://github.com/suren-atoyan/monaco-react/tree/v4.7.0?tab=readme-ov-file#loader-config
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/language/json/monaco.contribution";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";

import MonacoEditor, { loader } from "@monaco-editor/react";

self.MonacoEnvironment = {
  // We only need to support json syntax
  getWorker: (_, label) => (label === "json" ? new jsonWorker() : new editorWorker()),
};

loader.config({ monaco });

void loader.init();

// default export is required for lazy react loading
export default function JsonViewer(props: { jsonString: string }) {
  return (
    <MonacoEditor
      height="100%"
      width="100%"
      language="json"
      theme="vs-dark"
      value={props.jsonString}
      options={{
        readOnly: true,
        fontFamily: "Fira Code Variable",
        lineNumbersMinChars: 3,
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
      }}
    />
  );
}
