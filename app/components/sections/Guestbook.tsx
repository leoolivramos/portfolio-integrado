import { getAuthSession } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { SignInButton } from "../ui/SignInButton";
import { GuestbookForm } from "../sections/GuestbookForm";
import Image from "next/image";

async function getEntries() {
  return await prisma.guestbookEntry.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true, image: true }
      }
    }
  });
}

export async function Guestbook() {
  const session = await getAuthSession();
  const entries = await getEntries();

  return (
    <section
      id="guestbook"
      className="scroll-mt-24 mt-12"
    >
      {/* Artisanal Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta font-semibold">
              Registro do Balcão
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-foreground">
              Caderno de Visitas
            </h2>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Deixe seu recado, nota ou feedback na bancada do laboratório.
        </p>
      </div>

      <div className="p-6 md:p-8 border border-border rounded-2xl bg-card shadow-sm relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
          <div className="absolute transform rotate-45 bg-terracotta/10 text-[9px] font-mono uppercase tracking-widest text-terracotta font-semibold py-1 right-[-35px] top-[18px] w-[120px] text-center border-b border-terracotta/20">
            Logbook
          </div>
        </div>

        {/* Input Form / Auth */}
        <div className="mb-8 pb-8 border-b border-border/80">
          {session?.user ? (
            <div className="rounded-xl border border-border bg-parchment/60 p-5">
              <GuestbookForm user={session.user} />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border border-dashed border-border bg-parchment/40">
              <div>
                <p className="text-sm font-medium text-foreground">Deseja assinar a bancada?</p>
                <p className="text-xs text-muted-foreground">Autentique-se com sua conta GitHub para deixar uma mensagem.</p>
              </div>
              <SignInButton />
            </div>
          )}
        </div>

        {/* Entries Log in 2-Column Board */}
        <div>
          {entries.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground font-mono text-xs">
              Nenhuma anotação registrada ainda. Seja o primeiro a assinar a bancada!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex gap-4 items-start p-4 rounded-xl border border-border/70 bg-background/60 hover:bg-parchment/40 transition-all card-elevate"
                >
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-border bg-parchment shrink-0">
                  {entry.user.image ? (
                    <Image
                      src={entry.user.image}
                      alt={entry.user.name || "Visitante"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-xs font-bold text-terracotta">
                      {entry.user.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <span className="text-sm font-semibold text-foreground font-serif">
                      {entry.user.name}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-parchment border border-border text-terracotta font-medium">
                      {new Date(entry.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90 break-words font-sans">
                    {entry.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </section>
  );
}