import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function MyEditor({
  value,handleBlur,disabled,name,setFieldValue, setFieldTouched}) {

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }],
    ],
  };

  const formats = [
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
    "formula",
    "table",
  ];

  const calculateEditorHeight = (lines) => {
    const fontSize = 14;
    const lineHeight = 1.5;
    const lineHeightPx = fontSize * lineHeight;
    const minHeight = lineHeightPx * lines;
    return `${minHeight}px`;
  };

  const editorStyle = {
    minHeight: calculateEditorHeight(5),
    fontFamily: "Roboto",
  };
  return (
    <ReactQuill
      theme="snow"
      className={disabled ? "disable" : ""}
      value={value}
      onBlur={() => {
        handleBlur && handleBlur(name, true);
        setFieldTouched && setFieldTouched(name, true);
      }}
      style={editorStyle}
      onChange={(content) => setFieldValue && setFieldValue(name, content)}
      readOnly={disabled}
      name={name || "taskAnswer"}
      modules={modules}
      formats={formats}
      placeholder="Start writing..."
    />
  );
}

MyEditor.defaultProps = {
  name: "taskAnswer", // Set a default value for the name prop
};
