import React, { FC, useState } from "react";

import { NoteModel } from "../../../models/noteModel";

import "./style.scss";

interface NoteItemProps {
  note: NoteModel;
  removeNote: (id: string) => void;
  updateNote: (note: NoteModel) => void;
}

export const NoteItem: FC<NoteItemProps> = ({
  note,
  removeNote,
  updateNote,
}) => {
  const getHighlightedText = (text: string, tags: string[]) => {
    const parts = text.split(new RegExp(`(${tags.join("|")})`, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            key={i}
            style={tags.includes(part) ? { fontWeight: "bold" } : {}}
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  };

  return (
    <div className="note">
      <div className="note-text">
        {getHighlightedText(note.text, note.hashtags || [])}
      </div>
      <div className="note-hashtag">
        {note.hashtags?.map((hashtag, index) => {
          return (
            <span key={index} style={{ color: "blue" }}>
              {hashtag}
            </span>
          );
        })}
      </div>
      <div className="note-buttons">
        <button onClick={() => removeNote(note.id)}>
          <i className="delete-icon"></i>
        </button>
        <button onClick={() => updateNote(note)}>
          <i className="edit-icon"></i>
        </button>
      </div>
    </div>
  );
};
