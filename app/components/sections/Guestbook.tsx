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
      className="section-split scroll-mt-24"
    >
      {/* Section header — sticky left column on large screens */}
      <div className="section-title mb-10 lg:mb-0">
        <span className="eyebrow block mb-4">
          Registro do Balcão
        </span>
        <h2 className="section-heading text-foreground text-balance">
          Caderno de Visitas
        </h2>
        <p className="mt-6 text-[15px] text-muted-foreground leading-relaxed max-w-xs">
          Deixe seu recado, nota ou feedback na bancada do laboratório.
        </p>
      </div>

      <div className="relative">
        {/* Decorative label */}
        <div className="flex justify-end mb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-terracotta font-semibold">
            Logbook
          </span>
        </div>

        {/* Input Form / Auth */}
        <div className="rule-top pt-8 mb-10">
          {session?.user ? (
            <div>
              <GuestbookForm user={session.user} />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p className="text-base font-medium text-foreground">Deseja assinar a bancada?</p>
                <p className="text-sm text-muted-foreground mt-1">Autentique-se com sua conta GitHub para deixar uma mensagem.</p>
              </div>
              <SignInButton />
            </div>
          )}
        </div>

        {/* Entries log — hairline-separated rows */}
        <div>
          {entries.length === 0 ? (
            <div className="rule-top py-10 text-muted-foreground font-mono text-xs">
              Nenhuma anotação registrada ainda. Seja o primeiro a assinar a bancada!
            </div>
          ) : (
            <div className="flex flex-col">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex gap-4 items-start py-6 rule-top"
                >
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-parchment shrink-0">
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
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                    <span className="text-lg font-normal tracking-tight text-foreground font-serif">
                      {entry.user.name}
                    </span>
                    <span className="text-[11px] font-mono px-3 py-0.5 rounded-full border border-border text-terracotta font-medium">
                      {new Date(entry.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-[15px] leading-relaxed text-foreground/90 break-words font-sans">
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