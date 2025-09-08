import React, { useState } from "react";
import "./FileExplorer.css";
import FileNode from "../FileNode/FileNode";
import AddModal from "../AddModal/AddModal";

export default function FileExplorer() {
  const [tree, setTree] = useState([
    { id: 1, name: "Folder 1", type: "folder", children: [], isOpen: true },
  ]);

  const [modal, setModal] = useState({ isOpen: false, parentId: null, type: "" });

  const toggleFolder = (id) => {
    const toggle = (nodes) =>
      nodes.map((node) => {
        if (node.id === id) node.isOpen = !node.isOpen;
        if (node.children) node.children = toggle(node.children);
        return node;
      });
    setTree(toggle(tree));
  };

  const addItem = (parentId, name, type) => {
    const newNode = {
      id: Date.now(),
      name,
      type,
      children: type === "folder" ? [] : null,
      isOpen: type === "folder" ? true : null,
    };

    const add = (nodes) =>
      nodes.map((node) => {
        if (node.id === parentId && node.type === "folder") {
          node.children.push(newNode);
        } else if (node.children) {
          node.children = add(node.children);
        }
        return node;
      });

    setTree(add(tree));
    closeModal();
  };

  const removeItem = (id) => {
    const remove = (nodes) =>
      nodes
        .filter((node) => node.id !== id)
        .map((node) => {
          if (node.children) node.children = remove(node.children);
          return node;
        });
    setTree(remove(tree));
  };

  const openModal = (parentId, type) => setModal({ isOpen: true, parentId, type });
  const closeModal = () => setModal({ isOpen: false, parentId: null, type: "" });

  return (
    <div className="explorer-container">
      {tree.map((node) => (
        <FileNode
          key={node.id}
          node={node}
          onToggle={toggleFolder}
          onDelete={removeItem}
          openModal={openModal}
        />
      ))}
      {modal.isOpen && (
        <AddModal
          type={modal.type}
          onAdd={(name) => addItem(modal.parentId, name, modal.type)}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}
