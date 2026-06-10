import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { VoiceWave } from "@/components/VoiceWave";
import { Button } from "@/components/ui/button";
import { PhoneOutgoing, PhoneIncoming, Phone, Bot, Clock, ShieldCheck, Zap, BarChart3, Headphones } from "lucide-react";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function CallMeForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) {
      toast.error("Informe seu nome completo");
      return;
    }
    if (digits.length < 10) {
      toast.error("Informe um telefone válido com DDD");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://ia.discador.net/api/ura", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assistenteId: "17d6b0a1-1d6a-4f7d-9bf9-9c3b56fed839",
          phoneNumberId: "ee0500e4-6514-4627-a158-b4000533a1d4",
          telefone: digits,
          token: "c658ea47-5b77-47b3-8953-08c0b81879de",
        }),
      });
      if (!res.ok) throw new Error(`Falha (${res.status})`);
      toast.success("Tudo certo! Nossa IA vai te ligar em instantes.");
      setName("");
      setPhone("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao iniciar a chamada");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="group relative block rounded-2xl border border-border bg-background/60 p-4 transition-all focus-within:border-[var(--brand-orange)] focus-within:bg-background focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--brand-orange)_18%,transparent)] hover:border-foreground/30">
          <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1 group-focus-within:text-[var(--brand-orange)]">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--brand-orange)] text-[9px] font-bold text-background">1</span>
            Nome
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Como devemos te chamar?"
            className="w-full bg-transparent border-0 p-0 text-base font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            autoComplete="name"
          />
        </label>
        <label className="group relative block rounded-2xl border border-border bg-background/60 p-4 transition-all focus-within:border-[var(--brand-orange)] focus-within:bg-background focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--brand-orange)_18%,transparent)] hover:border-foreground/30">
          <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1 group-focus-within:text-[var(--brand-orange)]">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--brand-orange)] text-[9px] font-bold text-background">2</span>
            Telefone
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="(11) 99999-9999"
            className="w-full bg-transparent border-0 p-0 text-base font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            autoComplete="tel"
            inputMode="tel"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group relative w-full inline-flex items-center justify-between rounded-2xl border border-[var(--brand-orange)] bg-[var(--brand-orange)] text-background h-14 px-6 text-sm font-semibold uppercase tracking-[0.2em] shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--brand-orange)_70%,transparent)] hover:shadow-[0_15px_40px_-10px_color-mix(in_oklab,var(--brand-orange)_90%,transparent)] hover:-translate-y-0.5 transition-all disabled:opacity-60"
      >
        <span className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full animate-ping bg-background opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-background" />
          </span>
          {loading ? "Conectando" : "Iniciar chamada"}
        </span>
        <span className="flex items-center gap-2">
          <Phone className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          <span aria-hidden>→</span>
        </span>
      </button>
    </form>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "F3ai — IA de Voz Ativa e Receptiva" },
      { name: "description", content: "F3ai oferece agentes de IA de voz ativa e receptiva para atendimento, vendas e suporte 24/7. Tecnologia que conversa como gente." },
      { property: "og:title", content: "F3ai — IA de Voz Ativa e Receptiva" },
      { property: "og:description", content: "Agentes de voz com IA para escalar atendimento, vendas e suporte." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-baseline gap-0.5 text-2xl font-black tracking-tight">
            <span className="text-foreground">F</span>
            <span style={{ color: "var(--brand-orange)" }}>3</span>
            <span className="text-foreground">ai</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#solucoes" className="hover:text-foreground transition">Soluções</a>
            <a href="#como" className="hover:text-foreground transition">Como funciona</a>
            <a href="#beneficios" className="hover:text-foreground transition">Benefícios</a>
            <a href="#contato" className="hover:text-foreground transition">Contato</a>
          </nav>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            <a href="#contato">Falar com IA</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs text-muted-foreground mb-8">
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: "var(--brand-orange)" }} />
            IA de voz que conversa como gente
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Sua empresa atendendo{" "}
            <span style={{ background: "var(--gradient-wave)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              24 horas
            </span>{" "}
            por voz.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Agentes de IA de voz <strong className="text-foreground">ativa e receptiva</strong> que ligam, atendem, qualificam e vendem — com naturalidade humana, escala de máquina e <strong className="text-foreground">integração nativa com seu CRM, PABX e sistemas de telefonia</strong>.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="outline" className="border-border bg-card/50 hover:bg-card text-base h-12 px-8">
              <a href="#contato">Agendar demonstração</a>
            </Button>
          </div>
          <VoiceWave className="mt-16 h-16" />
        </div>
      </section>

      {/* Soluções */}
      <section id="solucoes" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--brand-orange)" }}>Soluções</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">Voz ativa e receptiva, em um só lugar</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group rounded-2xl border border-border bg-card p-8 hover:border-primary/50 transition">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-6" style={{ background: "var(--brand-orange)" }}>
              <PhoneOutgoing className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Voz Ativa</h3>
            <p className="text-muted-foreground mb-6">Agentes que realizam ligações em massa para prospecção, qualificação de leads, cobrança e pesquisas — com cadência natural e roteiros dinâmicos.</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Discagem inteligente e automatizada</li>
              <li>• Qualificação BANT em tempo real</li>
              <li>• Transferência para humanos no momento certo</li>
              <li>• Integração com CRM, PABX e discadores existentes</li>
            </ul>
          </div>
          <div className="group rounded-2xl border border-border bg-card p-8 hover:border-accent/50 transition">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-6" style={{ background: "var(--brand-purple)" }}>
              <PhoneIncoming className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Voz Receptiva</h3>
            <p className="text-muted-foreground mb-6">Atendimento 24/7 para SAC, suporte e vendas inbound. Responde, resolve e encaminha sem fila, sem espera, sem perda de oportunidade.</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 0 segundos de espera</li>
              <li>• Integração com CRM, ERP, helpdesk e WhatsApp</li>
              <li>• Histórico e contexto por cliente</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Métricas */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { v: "24/7", l: "Disponibilidade" },
            { v: "<1s", l: "Tempo de resposta" },
            { v: "+85%", l: "Taxa de contato" },
            { v: "10x", l: "Mais conversas" },
          ].map((m) => (
            <div key={m.l}>
              <div className="text-4xl md:text-5xl font-black" style={{ background: "var(--gradient-wave)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{m.v}</div>
              <div className="text-sm text-muted-foreground mt-2">{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section id="como" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--brand-purple)" }}>Como funciona</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">Do briefing ao primeiro "alô" em dias</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "01", t: "Mapeamos seu processo", d: "Entendemos seu fluxo de atendimento, integrações e objetivos de negócio." },
            { n: "02", t: "Treinamos o agente", d: "Construímos persona, scripts dinâmicos e base de conhecimento da sua operação." },
            { n: "03", t: "Colocamos em produção", d: "Deploy, monitoramento contínuo e otimização baseada em dados reais." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-8">
              <div className="text-5xl font-black mb-4" style={{ color: "var(--brand-orange)" }}>{s.n}</div>
              <h3 className="text-xl font-bold mb-2">{s.t}</h3>
              <p className="text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--brand-orange)" }}>Benefícios</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">Tecnologia que entrega resultado</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { i: Bot, t: "Naturalidade humana", d: "Vozes que respiram, pausam e entonam como pessoas reais." },
            { i: Zap, t: "Latência ultrabaixa", d: "Conversas fluídas sem cortes ou silêncios desconfortáveis." },
            { i: ShieldCheck, t: "LGPD e segurança", d: "Dados protegidos, criptografia ponta-a-ponta e auditoria completa." },
            { i: BarChart3, t: "Analytics em tempo real", d: "Dashboards de chamadas, sentimento, conversão e qualidade." },
            { i: Clock, t: "Suporte 8h–17h30", d: "Equipe técnica brasileira em horário comercial estendido." },
            { i: Headphones, t: "Integração com qualquer sistema", d: "Conecta-se de forma nativa a CRMs (HubSpot, Salesforce, RD Station, Pipedrive), sistemas de telefonia/PABX, ERPs, helpdesks, WhatsApp e APIs internas da sua operação." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6 hover:bg-muted/40 transition">
              <Icon className="h-6 w-6 mb-4" style={{ color: "var(--brand-orange)" }} />
              <h3 className="font-bold mb-1">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contato" className="border-y border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Left: editorial copy */}
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              <span className="h-px w-10 bg-[var(--brand-orange)]" />
              Demonstração ao vivo
            </div>
            <h2 className="mt-6 text-4xl md:text-6xl font-black tracking-tight leading-[1.02]">
              Ouça a IA <br />
              <span style={{ color: "var(--brand-orange)" }}>em 30 segundos.</span>
            </h2>
            <p className="mt-6 text-base text-muted-foreground max-w-md">
              Sem cadastro, sem comercial. Você preenche, nossa IA disca para o seu número e você conversa com ela de verdade.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-px bg-border border border-border max-w-md">
              {[
                { v: "30s", l: "para tocar" },
                { v: "0", l: "compromisso" },
                { v: "100%", l: "gratuito" },
              ].map((s) => (
                <div key={s.l} className="bg-background p-5">
                  <div className="text-2xl font-black" style={{ color: "var(--brand-orange)" }}>{s.v}</div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form panel */}
          <div className="relative">
            <div className="absolute -top-3 left-6 px-3 py-1 bg-background border border-border rounded-full text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Linha direta · IA
            </div>
            <div className="border border-border bg-card p-8 md:p-10 rounded-3xl">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-dashed border-border">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Status</div>
                  <div className="mt-1 flex items-center gap-2 text-sm font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Agente disponível agora
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Tempo médio</div>
                  <div className="mt-1 text-sm font-semibold">~ 22s</div>
                </div>
              </div>
              <CallMeForm />
              <p className="mt-6 text-[11px] text-muted-foreground leading-relaxed">
                Ao enviar você concorda em receber uma ligação de teste da F3ai. Seus dados não são compartilhados — LGPD garantida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-baseline gap-0.5 text-xl font-black">
            <span className="text-foreground">F</span>
            <span style={{ color: "var(--brand-orange)" }}>3</span>
            <span className="text-foreground">ai</span>
          </div>
          <p>Suporte & Desenvolvimento · 08:00–12:00 · 13:00–17:30</p>
          <p>© {new Date().getFullYear()} F3ai. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Floating minimalist call bubble */}
      <a
        href="#contato"
        aria-label="Testar IA de voz"
        className="group fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#facc15] text-black pl-4 pr-5 h-12 shadow-[0_10px_30px_-10px_rgba(250,204,21,0.7)] hover:shadow-[0_15px_40px_-10px_rgba(250,204,21,0.9)] hover:-translate-y-0.5 transition-all"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-black/40 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black" />
        </span>
        <Phone className="h-4 w-4" />
        <span className="text-sm font-semibold tracking-wide">Testar IA</span>
      </a>
    </div>
  );
}
