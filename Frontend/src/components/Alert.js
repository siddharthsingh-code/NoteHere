import React from "react";

function Alert(props) {
  const capitalise = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        width: "350px",
      }}
    >
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalise(props.alert.type==='success'?'success':'Invalid')}</strong>: {props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
