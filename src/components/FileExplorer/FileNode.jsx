import React from "react";
import { MdExpandMore, MdExpandLess, MdDeleteOutline } from "react-icons/md";
import { FiFolderPlus } from "react-icons/fi";
import { AiOutlineFileAdd } from "react-icons/ai";

export default function FileNode({ node, onToggle, onDelete, openModal }) {
  return (
    <div style={{ marginLeft: 20 }}>
      {node.type === "folder" ? (
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span onClick={() => onToggle(node.id)} style={{ cursor: "pointer" }}>
            {node.isOpen ? <MdExpandLess /> : <MdExpandMore />}
          </span>
          <strong>{node.name}</strong>
          <FiFolderPlus
            data-testid={`add-folder-${node.id}`}
            style={{ cursor: "pointer" }}
            onClick={() => openModal(node.id, "folder")}
          />
          <AiOutlineFileAdd
            data-testid={`add-file-${node.id}`}
            style={{ cursor: "pointer" }}
            onClick={() => openModal(node.id, "file")}
          />
          <MdDeleteOutline
            data-testid="delete"
            style={{ cursor: "pointer" }}
            onClick={() => onDelete(node.id)}
          />
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span>{node.name}</span>
          <MdDeleteOutline
            data-testid="delete"
            style={{ cursor: "pointer" }}
            onClick={() => onDelete(node.id)}
          />
        </div>
      )}
      {node.children && node.isOpen &&
        node.children.map((child) => (
          <FileNode
            key={child.id}
            node={child}
            onToggle={onToggle}
            onDelete={onDelete}
            openModal={openModal}
          />
        ))}
    </div>
  );
}
