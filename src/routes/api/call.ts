import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/call")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { telefone } = (await request.json()) as { telefone?: string };
          if (!telefone) {
            return new Response(JSON.stringify({ error: "telefone obrigatório" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }
          const res = await fetch("https://f3.ia.br/api/ura", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              assistenteId: "17d6b0a1-1d6a-4f7d-9bf9-9c3b56fed839",
              phoneNumberId: "ee0500e4-6514-4627-a158-b4000533a1d4",
              telefone,
              token: "c658ea47-5b77-47b3-8953-08c0b81879de",
            }),
            redirect: "follow",
          });
          const text = await res.text();
          return new Response(text || JSON.stringify({ ok: res.ok }), {
            status: res.status,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          return new Response(
            JSON.stringify({ error: err instanceof Error ? err.message : "Erro" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});