export default function Home() {
  const kpis = [
    { label: "Clients enregistrés", value: "12 480", delta: "+8,4 %" },
    { label: "Chiffre d'affaires", value: "1,86 M", delta: "+14,2 %" },
    { label: "Ventes du mois", value: "3 214", delta: "+9,1 %" },
    { label: "Stock critique", value: "18", delta: "Action requise" },
  ];

  const modules = [
    {
      title: "Catalogue unifié",
      description:
        "Une base produit commune pour les livres et les fournitures scolaires, avec variantes spécialisées pour les attributs métier.",
    },
    {
      title: "Ventes et caisse",
      description:
        "Saisie rapide, remise contrôlée, TVA automatique, ticket de caisse et mise à jour du stock en temps réel.",
    },
    {
      title: "Achats et fournisseurs",
      description:
        "Commandes, réceptions, factures et suivi des produits approvisionnés avec historisation complète.",
    },
    {
      title: "Services administratifs",
      description:
        "Inscriptions scolaires, universitaires et transport, avec une architecture prête à recevoir de nouveaux services.",
    },
    {
      title: "Pilotage décisionnel",
      description:
        "KPI, top produits, évolution mensuelle, alertes de stock et exports PDF/Excel pour le reporting.",
    },
    {
      title: "Sécurité et audit",
      description:
        "Rôles, permissions, journal d’actions, validations serveur et traçabilité des opérations sensibles.",
    },
  ];

  const navigation = [
    "Tableau de bord",
    "Ventes",
    "Clients",
    "Produits",
    "Stock",
    "Achats",
    "Services",
    "Rapports",
    "Paramètres",
  ];

  const roadmap = [
    "Base relationnelle normalisée jusqu’à la 3NF",
    "API REST versionnée et documentée",
    "Modules métiers découplés",
    "Power BI branché sur des vues SQL dédiées",
    "Évolutions futures: fidélité, e-commerce, retours",
  ];

  return (
    <main className="relative overflow-hidden px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl flex-col gap-6">
        <header className="grid gap-4 rounded-[2rem] border border-white/10 bg-[var(--surface)] p-5 shadow-2xl shadow-slate-950/30 backdrop-blur xl:grid-cols-[1.6fr_1fr] xl:p-8">
          <div className="space-y-5">
            <div className="inline-flex items-center rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200">
              Librairie Pro · Gestion commerciale unifiée
            </div>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Pilotez une librairie moderne avec stock, ventes, services et reporting dans une seule plateforme.
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
                Architecture pensée pour la 3NF, les rôles métier, la traçabilité, la BI et l’extension future vers le e-commerce, la fidélité et les nouveaux services.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">Produits unifiés</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">Services extensibles</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">API REST</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">Power BI</span>
            </div>
          </div>

          <aside className="grid gap-3 rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">Navigation principale</span>
              <span className="rounded-full bg-amber-400/15 px-3 py-1 text-xs text-amber-200">Responsive</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-2">
              {navigation.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-medium text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <article
              key={kpi.label}
              className="rounded-[1.5rem] border border-white/10 bg-[var(--surface)] p-5 shadow-lg shadow-slate-950/20"
            >
              <p className="text-sm text-slate-400">{kpi.label}</p>
              <div className="mt-3 flex items-end justify-between gap-3">
                <strong className="text-3xl font-semibold text-white">{kpi.value}</strong>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-emerald-200">
                  {kpi.delta}
                </span>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-5 shadow-xl shadow-slate-950/25 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">Socle métier</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">Modules fonctionnels principaux</h2>
              </div>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">
                Architecture modulaire
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {modules.map((module) => (
                <article
                  key={module.title}
                  className="rounded-3xl border border-white/10 bg-slate-950/35 p-5 transition-transform duration-200 hover:-translate-y-1 hover:border-amber-300/30"
                >
                  <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{module.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <section className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-5 shadow-xl shadow-slate-950/25 sm:p-6">
              <p className="text-sm text-slate-400">Décisions d’architecture</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">Choix structurants retenus</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                {roadmap.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-5 shadow-xl shadow-slate-950/25 sm:p-6">
              <p className="text-sm text-slate-400">Tableau de bord cible</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">Indicateurs à afficher</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {[
                  "Ventes du jour et du mois",
                  "Produits en rupture",
                  "Top livres et top fournitures",
                  "Évolution mensuelle du CA",
                  "Paiements par mode",
                  "Alertes de stock minimum",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="grid gap-4 rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] p-5 shadow-xl shadow-slate-950/25 lg:grid-cols-[1fr_1fr_1fr] sm:p-6">
          <div>
            <p className="text-sm text-slate-400">Expérience utilisateur</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">Menus clairs, rôles distincts, saisie rapide</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              L’interface doit être efficace pour la caisse, lisible pour le management et suffisamment structurée pour les rapports et l’audit.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Couleurs</p>
            <div className="mt-4 grid gap-3">
              <div className="flex items-center gap-3"><span className="h-4 w-4 rounded-full bg-[#12324A]" /> Bleu nuit</div>
              <div className="flex items-center gap-3"><span className="h-4 w-4 rounded-full bg-[#2E7D65]" /> Vert confiance</div>
              <div className="flex items-center gap-3"><span className="h-4 w-4 rounded-full bg-[#E3A008]" /> Ambre action</div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Extensions futures</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>• Fidélité client</li>
              <li>• Réservation de livres</li>
              <li>• Vente en ligne</li>
              <li>• Gestion des retours</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
