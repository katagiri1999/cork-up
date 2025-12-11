import { useState } from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState("");

  return (
    <>
      <SimpleMde
        id="simple-mde"
        value={markdownValue}
        onChange={(value) => setMarkdownValue(value)}
      />
    </>
  );
};

export default MarkdownEditor;