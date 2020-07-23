import React from "react";
import "./bookmark.css";

export default function Bookmark({ data }) {
  const value = [
    window.location.protocol,
    "//",
    window.location.host,
    window.location.pathname,
    "?",
    btoa(JSON.stringify(data)),
  ].join("");
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
