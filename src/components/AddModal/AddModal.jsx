import React, { useState } from "react";
import "./AddModal.css";

export default function AddModal({ type, onAdd, onCancel }) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (name.trim() !== "") {
      onAdd(name.trim());
      setName("");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Add {type}</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="modal-buttons">
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
