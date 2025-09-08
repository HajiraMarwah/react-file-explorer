import React from "react";
import { MdExpandMore, MdExpandLess, MdDeleteOutline } from "react-icons/md";
import { FiFolderPlus } from "react-icons/fi";
import { AiOutlineFileAdd } from "react-icons/ai";
import "./FileNode.css";

export default function FileNode({ node, onToggle, onDelete, openModal }) {
  return (
    <div className="node-wrapper">
      {node.type === "folder" ? (
        <div className="node-row">
          <span onClick={() => onToggle(node.id)} className="node-icon">
            {node.isOpen ? <MdExpandLess /> : <MdExpandMore />}
          </span>
          <strong>{node.name}</strong>
          <FiFolderPlus
            data-testid={`add-folder-${node.id}`}
            className="node-action"
            onClick={() => openModal(node.id, "folder")}
          />
          <AiOutlineFileAdd
            data-testid={`add-file-${node.id}`}
            className="node-action"
            onClick={() => openModal(node.id, "file")}
          />
          <MdDeleteOutline
            data-testid="delete"
            className="node-action"
            onClick={() => onDelete(node.id)}
          />
        </div>
      ) : (
        <div className="node-row">
          <span>{node.name}</span>
          <MdDeleteOutline
            data-testid="delete"
            className="node-action"
            onClick={() => onDelete(node.id)}
          />
        </div>
      )}
      {node.children && node.isOpen &&
        node.children.map((child) => (
          <div key={child.id} className="node-child">
            <FileNode
              node={child}
              onToggle={onToggle}
              onDelete={onDelete}
              openModal={openModal}
            />
          </div>
        ))}
    </div>
  );
}
