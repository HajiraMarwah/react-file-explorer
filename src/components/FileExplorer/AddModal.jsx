import React, { useState } from "react";

export default function AddModal({ type, onAdd, onCancel }) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (name.trim() !== "") {
      onAdd(name.trim());
      setName("");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 8,
          minWidth: 300,
        }}
      >
        <h3>Add {type}</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 5 }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button data-testid="cancel" onClick={onCancel}>
            Cancel
          </button>
          <button data-testid="add" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
