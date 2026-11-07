export type ContactDraft = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactField = keyof ContactDraft;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(draft: ContactDraft) {
  const errors: Partial<Record<ContactField, string>> = {};
  const name = draft.name.trim();
  const email = draft.email.trim();
  const phone = draft.phone.trim();
  const subject = draft.subject.trim();
  const message = draft.message.trim();

  if (name.length < 2) errors.name = "نام را کامل‌تر بنویسید.";
  if (subject.length < 3) errors.subject = "موضوع را مشخص کنید.";
  if (message.length < 10) errors.message = "متن پیام باید دست‌کم ده نویسه باشد.";
  if (!email && !phone) errors.email = "ایمیل یا شماره تلفن را وارد کنید.";
  if (email && !emailPattern.test(email)) errors.email = "ایمیل معتبر نیست.";
  if (phone && phone.replace(/\D/g, "").length < 8) errors.phone = "شماره تلفن کامل نیست.";

  return errors;
}

/** Phase 2 has no backend. This never stores or sends the message. */
export function submitContactPlaceholder(draft: ContactDraft) {
  const errors = validateContact(draft);
  if (Object.keys(errors).length > 0) {
    return { ok: false as const, errors };
  }
  return {
    ok: false as const,
    errors: {} as Partial<Record<ContactField, string>>,
    notice:
      "این فرم هنوز به سرور متصل نیست. پیام ذخیره یا ارسال نشد. تا راه‌اندازی دریافت پیام، از تلفن یا ایمیل همین صفحه استفاده کنید.",
  };
}
