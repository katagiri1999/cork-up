import { useState } from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState("");

  const onChange = (value) => {
    setMarkdownValue(value);
  };

  return <SimpleMde value={markdownValue} onChange={onChange} />;
};

export default MarkdownEditor;