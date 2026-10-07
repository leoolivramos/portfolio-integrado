'use client';

import { saveGuestbookEntry } from "@/app/actions";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { SignOutButton } from "../ui/SignOutButton";
import { Send } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-sm text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all shadow-xs cursor-pointer"
    >
      <Send size={14} />
      <span>{pending ? 'Registrando...' : 'Assinar Livro'}</span>
    </button>
  );
}

export function GuestbookForm({ user }: { user: any }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await saveGuestbookEntry(formData);
        formRef.current?.reset();
      }}
      className="flex flex-col gap-3"
    >
      <input
        name="message"
        required
        placeholder={`Escreva sua nota como ${user.name}...`}
        className="w-full p-3 rounded-sm bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all text-sm font-sans placeholder:text-muted-foreground"
        maxLength={500}
      />
      <div className="flex justify-between items-center text-xs text-muted-foreground pt-1">
        <span>Assinando como <strong className="text-foreground">{user.name}</strong></span>
        <SignOutButton />
      </div>
      <div className="flex justify-end pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}