"use client";

import { useState } from "react";
import { submitContactPlaceholder, validateContact, type ContactDraft, type ContactField } from "@/lib/contact";

const empty: ContactDraft = { name: "", email: "", phone: "", subject: "", message: "" };

const fields: { name: ContactField; label: string; type?: string; autoComplete: string }[] = [
  { name: "name", label: "نام", autoComplete: "name" },
  { name: "email", label: "ایمیل", type: "email", autoComplete: "email" },
  { name: "phone", label: "تلفن", type: "tel", autoComplete: "tel" },
  { name: "subject", label: "موضوع", autoComplete: "off" },
];

export function ContactForm() {
  const [draft, setDraft] = useState<ContactDraft>(empty);
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [notice, setNotice] = useState("");

  function update(field: ContactField, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setNotice("");
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setNotice("");
      return;
    }
    const result = submitContactPlaceholder(draft);
    setNotice(result.notice ?? "");
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <p className="form-note">ایمیل یا تلفن کافی است. ارسال این فرم هنوز پیامی را ثبت نمی‌کند.</p>
      {fields.map((field) => (
        <label key={field.name} htmlFor={`contact-${field.name}`}>
          <span>{field.label}</span>
          <input
            id={`contact-${field.name}`}
            name={field.name}
            type={field.type ?? "text"}
            autoComplete={field.autoComplete}
            value={draft[field.name]}
            aria-invalid={errors[field.name] ? true : undefined}
            aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined}
            onChange={(event) => update(field.name, event.target.value)}
          />
          {errors[field.name] ? (
            <small id={`contact-${field.name}-error`} role="alert">
              {errors[field.name]}
            </small>
          ) : null}
        </label>
      ))}
      <label htmlFor="contact-message">
        <span>پیام</span>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          value={draft.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          onChange={(event) => update("message", event.target.value)}
        />
        {errors.message ? (
          <small id="contact-message-error" role="alert">
            {errors.message}
          </small>
        ) : null}
      </label>
      <button type="submit" className="btn-uiverse">
        ثبت پیام
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {notice}
      </p>
    </form>
  );
}