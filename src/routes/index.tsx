import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { VoiceWave } from "@/components/VoiceWave";
import { Button } from "@/components/ui/button";
import { PhoneOutgoing, PhoneIncoming, Phone, CheckCircle2, Bot, Clock, ShieldCheck, Zap, BarChart3, Headphones } from "lucide-react";

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
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Tudo certo! Nossa IA vai te ligar em instantes.");
      setName("");
      setPhone("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-10 max-w-xl rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 md:p-8 text-left shadow-[0_25px_80px_-30px_rgba(0,0,0,0.6)]"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">Demonstração Gratuita</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Nossa IA vai ligar para você agora mesmo!
        </p>
      </div>
      <div className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="w-full h-14 rounded-2xl bg-white/10 border border-white/15 px-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#facc15]/60 focus:border-transparent transition"
          autoComplete="name"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          placeholder="(xx) xxxxx-xxxx"
          className="w-full h-14 rounded-2xl bg-white/10 border border-white/15 px-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#facc15]/60 focus:border-transparent transition"
          autoComplete="tel"
          inputMode="tel"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="group mt-4 w-full inline-flex items-center justify-center gap-3 rounded-full bg-[#facc15] h-14 text-base font-bold text-black shadow-[0_10px_30px_-10px_rgba(250,204,21,0.7)] hover:bg-[#fde047] hover:shadow-[0_15px_40px_-10px_rgba(250,204,21,0.9)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
      >
        <Phone className="h-5 w-5 transition-transform group-hover:rotate-12" />
        <span className="tracking-wide">
          {loading ? "ENVIANDO..." : "RECEBER LIGAÇÃO AGORA"}
        </span>
      </button>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          Ligação em 30 segundos
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          100% gratuito
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          Sem compromisso
        </span>
      </div>
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
            Agentes de IA de voz <strong className="text-foreground">ativa e receptiva</strong> que ligam, atendem, qualificam e vendem — com naturalidade humana e escala de máquina.
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
              <li>• Integração com CRM e ERP</li>
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
            { i: Headphones, t: "Integração total", d: "PABX, CRM, WhatsApp e seus sistemas internos." },
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
      <section id="contato" className="mx-auto max-w-5xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border p-12 md:p-16 text-center" style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-glow)" }}>
          <VoiceWave className="h-12 mb-8" />
          <h2 className="text-4xl md:text-5xl font-black tracking-tight max-w-2xl mx-auto">
            Veja Nossa <span className="text-[#facc15]">Demonstração</span> ao Vivo!
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Deixe seu número e receba uma ligação da nossa IA em menos de 30 segundos. Experimente a tecnologia que vai revolucionar seu negócio!
          </p>
          <CallMeForm />
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
    </div>
  );
}
