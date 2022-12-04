import React, { useState, useEffect, FC, ChangeEvent } from "react";
import { v4 as uuid } from "uuid";

import { NoteList } from "./components/noteList/noteList";
import { AddForm } from "./components/addForm/addForm";
import { NoteModel } from "./models/noteModel";

import "./App.scss";

export const App: FC = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [editingNote, setEditingNote] = useState<NoteModel | undefined>(
    undefined
  );
  const [filteredNotes, setFilteredNotes] = useState<NoteModel[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    filterNotes();
  }, [search, notes]);

  const filterNotes = () => {
    let result = notes;
    if (search) {
      result = notes.filter((note) => {
        return note.hashtags?.some((hashtag) =>
          hashtag.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    setFilteredNotes(result);
  };

  const addNote = (text: string): void => {
    const regex = /\B\#\w+\b/g;
    const result = (text.match(regex) as string[]) || undefined;
    const newNote = {
      text: text,
      id: uuid(),
      hashtags: result,
    };
    if (newNote.text.trim() !== "") {
      setNotes([...notes, newNote]);
    }
    return;
  };

  const removeNote = (noteId: string): void => {
    setNotes(notes.filter((note) => note.id != noteId));
  };

  const updateNote = (note: NoteModel): void => {
    const regex = /\B\#\w+\b/g;
    const result = (note.text.match(regex) as string[]) || undefined;
    const newNote = {
      ...note,
      hashtags: result,
    };
    const index = notes.findIndex(({ id }) => id === note.id);
    notes.splice(index, 1, newNote);
    setNotes(notes);
    setEditingNote(undefined);
  };

  const onUpdateNote = (note: NoteModel): void => {
    setEditingNote(note);
  };

  return (
    <div>
      <div className="filter-container">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="filter"
        />
      </div>
      <AddForm addNote={addNote} updateNote={updateNote} note={editingNote} />
      <NoteList
        // notes={notes}
        filterNotes={filteredNotes}
        removeNote={removeNote}
        updateNote={onUpdateNote}
      />
    </div>
  );
};
