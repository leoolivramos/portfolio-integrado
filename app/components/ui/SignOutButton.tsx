'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="text-xs font-mono text-muted-foreground hover:text-terracotta flex items-center gap-1 transition-colors cursor-pointer"
    >
      <LogOut size={12} />
      <span>Encerrar sessão</span>
    </button>
  );
}