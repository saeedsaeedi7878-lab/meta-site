"use client";

import { useSyncExternalStore, useState, type FormEvent } from "react";

type Note = {
  id: string;
  name: string;
  text: string;
  at: string;
};

const EMPTY: Note[] = [];
const cache = new Map<string, { raw: string; notes: Note[] }>();

function storageKey(slug: string) {
  return `metatest-comments:${slug}`;
}

function parseNotes(raw: string): Note[] {
  try {
    const parsed = JSON.parse(raw) as Note[];
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed.filter((note) => note && typeof note.name === "string" && typeof note.text === "string" && typeof note.at === "string");
  } catch {
    return EMPTY;
  }
}

function subscribe(onStoreChange: () => void) {
  const notify = () => onStoreChange();
  window.addEventListener("metatest-comments", notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener("metatest-comments", notify);
    window.removeEventListener("storage", notify);
  };
}

function readNotes(slug: string) {
  const raw = window.localStorage.getItem(storageKey(slug)) ?? "[]";
  const hit = cache.get(slug);
  if (hit?.raw === raw) return hit.notes;
  const notes = parseNotes(raw);
  cache.set(slug, { raw, notes });
  return notes;
}

function writeNotes(slug: string, notes: Note[]) {
  const raw = JSON.stringify(notes);
  window.localStorage.setItem(storageKey(slug), raw);
  cache.set(slug, { raw, notes });
  window.dispatchEvent(new Event("metatest-comments"));
}

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("fa-IR", { year: "numeric", month: "long", day: "numeric" }).format(date);
}

export function ArticleComments({ slug }: { slug: string }) {
  const notes = useSyncExternalStore(subscribe, () => readNotes(slug), () => EMPTY);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = name.trim().slice(0, 40);
    const nextText = text.trim().slice(0, 500);
    if (!nextName || !nextText) return;
    const note: Note = {
      id: crypto.randomUUID(),
      name: nextName,
      text: nextText,
      at: new Date().toISOString(),
    };
    writeNotes(slug, [note, ...readNotes(slug)].slice(0, 40));
    setText("");
  }

  return (
    <section className="read-comments" aria-labelledby="read-comments-title">
      <div className="read-comments-head">
        <h2 id="read-comments-title">دیدگاه‌ها</h2>
        <span>{notes.length.toLocaleString("fa-IR")}</span>
      </div>
      {notes.length === 0 ? <p className="read-comments-empty">هنوز دیدگاهی نوشته نشده.</p> : null}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <b>{note.name}</b>
            <time dateTime={note.at}>{formatWhen(note.at)}</time>
            <p>{note.text}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={submit}>
        <label>
          نام
          <input value={name} maxLength={40} autoComplete="name" onChange={(event) => setName(event.target.value)} required />
        </label>
        <label>
          دیدگاه
          <textarea value={text} maxLength={500} rows={4} onChange={(event) => setText(event.target.value)} required />
        </label>
        <div className="read-comments-row">
          <p>دیدگاه روی همین مرورگر ذخیره می‌شود.</p>
          <button type="submit" className="btn-fill">
            ثبت دیدگاه
          </button>
        </div>
      </form>
    </section>
  );
}
