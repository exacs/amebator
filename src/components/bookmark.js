import React from "react";
import "./bookmark.css";

export default function Bookmark({ data }) {
  const value = window.location.href + "?" + btoa(JSON.stringify(data));
  const ref = React.createRef();

  function selectText() {
    ref.current.select();
  }

  return (
    <input
      type="text"
      className="Bookmark-input"
      value={value}
      ref={ref}
      onClick={selectText}
      readOnly
    />
  );
}
