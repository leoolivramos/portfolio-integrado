'use client';

import { signIn } from 'next-auth/react';
import { Github, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function SignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('github', { callbackUrl: '/#guestbook' });
    } catch (error) {
      console.error("Erro ao logar", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="inline-flex items-center gap-2.5 font-medium py-2.5 px-4.5 rounded-xl transition-all text-xs font-mono tracking-tight disabled:opacity-70 disabled:cursor-not-allowed bg-foreground text-background hover:opacity-90 border border-border shadow-xs cursor-pointer"
    >
      {isLoading ? (
        <Loader2 size={15} className="animate-spin" />
      ) : (
        <Github size={15} />
      )}
      <span>Entrar com GitHub</span>
    </button>
  );
}