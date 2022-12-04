import { useState, useEffect, FC } from "react";

import { NoteModel } from "../../models/noteModel";

import "./style.scss";

interface AddFormPorps {
  addNote: (text: string) => void;
  updateNote: (note: NoteModel) => void;
  note?: NoteModel;
}

export const AddForm: FC<AddFormPorps> = ({ addNote, updateNote, note }) => {
  const [text, setText] = useState("");

  const onAddSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNote(text);
    setText("");
  };

  const onEditSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateNote({ ...note, text } as NoteModel);
    setText("");
  };

  useEffect(() => {
    if (note) {
      setText(note.text);
    }
  }, [note]);

  if (note) {
    return (
      <form onSubmit={onEditSubmit} className="form">
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Save Note</button>
      </form>
    );
  }

  return (
    <form onSubmit={onAddSubmit} className="form">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="text"
      />
      <button type="submit">Add Note</button>
    </form>
  );
};
