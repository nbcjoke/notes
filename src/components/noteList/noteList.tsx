import React, { FC } from "react";

import { NoteItem } from "./noteItem/noteItem";
import { NoteModel } from "../../models/noteModel";

import "./style.scss";

interface NoteList {
  //   notes: NoteModel[];
  filterNotes: NoteModel[];
  removeNote: (id: string) => void;
  updateNote: (note: NoteModel) => void;
}

export const NoteList: FC<NoteList> = ({
  removeNote,
  updateNote,
  filterNotes,
}) => {
  return (
    <div className="note-container">
      {filterNotes.map((filterNote) => {
        return (
          <NoteItem
            key={filterNote.id}
            // note={note}
            removeNote={removeNote}
            updateNote={updateNote}
            note={filterNote}
          />
        );
      })}
    </div>
  );
};
