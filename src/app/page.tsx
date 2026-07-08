"use client";

import { FormEvent, useState } from "react";

type MainSection = "admin" | "serviceClientele";

type ServiceClienteleSection = "schoolRegistration" | "universityRegistration" | "schoolSubscription";

type AdminSection =
    | "overview"
    | "clients"
    | "products"
    | "suppliers"
    | "sales"
    | "purchases"
    | "stock"
    | "services"
    | "users"
    | "settings";

type AdminModule = {
    key: AdminSection;
    title: string;
    description: string;
    tone: string;
};

type ModuleConfig = {
    title: string;
    badge: string;
    summary: string;
    fields: string[];
    headers: string[];
    rows: string[][];
};

const mainSections: Array<{ key: MainSection; label: string; description: string }> = [
    {
        key: "admin",
        label: "Administration",
        description: "Accéder aux modules de gestion métier",
    },
    {
        key: "serviceClientele",
        label: "Service clientèle",
        description: "Gérer l’assistance, les réclamations et les demandes",
    },
];

const adminModules: AdminModule[] = [
    {
        key: "clients",
        title: "Clients",
        description: "Ajouter, modifier et rechercher les clients de la librairie.",
        tone: "from-cyan-400/20 to-cyan-500/5",
    },
    {
        key: "products",
        title: "Produits",
        description: "Gérer les livres et fournitures dans un catalogue unifié.",
        tone: "from-amber-400/20 to-amber-500/5",
    },
    {
        key: "suppliers",
        title: "Fournisseurs",
        description: "Suivre les coordonnées, achats et historique des livraisons.",
        tone: "from-emerald-400/20 to-emerald-500/5",
    },
    {
        key: "sales",
        title: "Ventes",
        description: "Créer les tickets, factures et paiements des clients.",
        tone: "from-violet-400/20 to-violet-500/5",
    },
    {
        key: "purchases",
        title: "Achats",
        description: "Commander, réceptionner et mettre à jour les stocks.",
        tone: "from-rose-400/20 to-rose-500/5",
    },
    {
        key: "stock",
        title: "Stock",
        description: "Contrôler les entrées, sorties, ruptures et alertes.",
        tone: "from-sky-400/20 to-sky-500/5",
    },
    {
        key: "services",
        title: "Services",
        description: "Gérer les inscriptions scolaires et autres services.",
        tone: "from-teal-400/20 to-teal-500/5",
    },
    {
        key: "users",
        title: "Utilisateurs",
        description: "Administrer les rôles, permissions et journaux d’audit.",
        tone: "from-indigo-400/20 to-indigo-500/5",
    },
    {
        key: "settings",
        title: "Paramètres",
        description: "Configurer la librairie, la devise, le logo et la TVA.",
        tone: "from-slate-400/20 to-slate-500/5",
    },
];

const kpis = [
    { label: "Clients enregistrés", value: "12 480", delta: "+8,4 %" },
    { label: "Chiffre d’affaires", value: "1,86 M", delta: "+14,2 %" },
    { label: "Ventes du mois", value: "3 214", delta: "+9,1 %" },
    { label: "Stock critique", value: "18", delta: "Action requise" },
];

const monthlyChart = [
    { month: "Jan", value: 48 },
    { month: "Fév", value: 58 },
    { month: "Mar", value: 52 },
    { month: "Avr", value: 71 },
    { month: "Mai", value: 64 },
    { month: "Juin", value: 86 },
];

const topProducts = [
    { name: "Cahier 96 pages", value: 92 },
    { name: "Stylo bleu", value: 81 },
    { name: "Livre Math 3e", value: 68 },
    { name: "Compas", value: 47 },
];

const whyKpi = [
    "Voir rapidement la santé de l’activité",
    "Détecter une baisse des ventes ou du stock",
    "Comparer les périodes sans ouvrir des tableaux complexes",
    "Aider le gérant à décider plus vite",
];

const customerServices = [
    {
        key: "schoolRegistration" as const,
        title: "Inscription scolaire",
        description: "Créer le dossier d’inscription pour un établissement scolaire.",
    },
    {
        key: "universityRegistration" as const,
        title: "Inscription universitaire",
        description: "Gérer les inscriptions universitaires et les informations académiques.",
    },
    {
        key: "schoolSubscription" as const,
        title: "Abonnement scolaire",
        description: "Suivre l’abonnement scolaire au transport et sa période de validité.",
    },
];

const moduleConfigs: Record<Exclude<AdminSection, "overview">, ModuleConfig> = {
    clients: {
        title: "Gestion des clients",
        badge: "Client",
        summary: "Créer, modifier, rechercher et suivre les clients de la librairie.",
        fields: ["Nom", "Prénom", "Téléphone", "Email", "Adresse", "CIN"],
        headers: ["Client", "Téléphone", "Email", "État"],
        rows: [
            ["Amina Benali", "0612345678", "amina@mail.com", "Actif"],
            ["Youssef Idrissi", "0698765432", "youssef@mail.com", "Actif"],
            ["Sara El Amrani", "0622334455", "sara@mail.com", "Actif"],
        ],
    },
    products: {
        title: "Gestion des produits",
        badge: "Produit",
        summary: "Gérer les livres et les fournitures dans un catalogue unifié.",
        fields: ["Code", "Nom", "Catégorie", "Prix d’achat", "Prix de vente", "Stock minimum"],
        headers: ["Produit", "Catégorie", "Prix vente", "Stock"],
        rows: [
            ["Cahier 96 pages", "Papeterie", "8,50", "124"],
            ["Livre Math 3e", "Livre", "72,00", "36"],
            ["Stylo bleu", "Écriture", "2,20", "210"],
        ],
    },
    suppliers: {
        title: "Gestion des fournisseurs",
        badge: "Fournisseur",
        summary: "Suivre les coordonnées, les achats et l’historique des livraisons.",
        fields: ["Code", "Nom", "Téléphone", "Email", "Adresse", "Identifiant fiscal"],
        headers: ["Fournisseur", "Téléphone", "Dernier achat", "État"],
        rows: [
            ["Société Atlas", "0522334455", "12/06/2026", "Actif"],
            ["Papeterie Nord", "0533445566", "15/06/2026", "Actif"],
            ["Librairie Centrale", "0544556677", "18/06/2026", "Actif"],
        ],
    },
    sales: {
        title: "Gestion des ventes",
        badge: "Vente",
        summary: "Créer les tickets, factures, remises et paiements clients.",
        fields: ["Client", "Produit", "Quantité", "Remise", "TVA", "Paiement"],
        headers: ["Ticket", "Client", "Montant", "Statut"],
        rows: [
            ["V-2026-001", "Amina Benali", "218,00", "Payé"],
            ["V-2026-002", "Youssef Idrissi", "84,50", "Payé"],
            ["V-2026-003", "Sara El Amrani", "35,00", "En attente"],
        ],
    },
    purchases: {
        title: "Gestion des achats",
        badge: "Achat",
        summary: "Commander, réceptionner et mettre à jour les stocks automatiquement.",
        fields: ["Fournisseur", "Produit", "Quantité", "Prix unitaire", "Référence commande"],
        headers: ["Commande", "Fournisseur", "Montant", "Réception"],
        rows: [
            ["A-2026-014", "Société Atlas", "3 500,00", "Partielle"],
            ["A-2026-015", "Papeterie Nord", "1 240,00", "Complète"],
            ["A-2026-016", "Librairie Centrale", "9 800,00", "En cours"],
        ],
    },
    stock: {
        title: "Gestion du stock",
        badge: "Stock",
        summary: "Contrôler les entrées, les sorties, les ruptures et les alertes.",
        fields: ["Produit", "Type de mouvement", "Quantité", "Motif"],
        headers: ["Produit", "Entrée", "Sortie", "Solde"],
        rows: [
            ["Cahier 96 pages", "40", "12", "124"],
            ["Livre Math 3e", "10", "4", "36"],
            ["Stylo bleu", "80", "15", "210"],
        ],
    },
    services: {
        title: "Gestion des services",
        badge: "Service",
        summary: "Gérer les inscriptions scolaires et les autres services administratifs.",
        fields: ["Client", "Type de service", "Montant", "Date", "État"],
        headers: ["Service", "Client", "Montant", "Statut"],
        rows: [
            ["Inscription scolaire", "Amina Benali", "250,00", "Payé"],
            ["Inscription universitaire", "Youssef Idrissi", "300,00", "Payé"],
            ["Transport scolaire", "Sara El Amrani", "180,00", "En cours"],
        ],
    },
    users: {
        title: "Gestion des utilisateurs",
        badge: "Utilisateur",
        summary: "Administrer les rôles, les permissions et les journaux d’audit.",
        fields: ["Nom", "Login", "Email", "Rôle", "Mot de passe"],
        headers: ["Utilisateur", "Rôle", "Dernière connexion", "État"],
        rows: [
            ["Admin Principal", "admin", "admin@mail.com", "Administrateur"],
            ["Caissier 1", "cashier01", "cashier@mail.com", "Caissier"],
            ["Gestionnaire", "manager01", "manager@mail.com", "Gestionnaire"],
        ],
    },
    settings: {
        title: "Paramètres de la librairie",
        badge: "Paramètre",
        summary: "Configurer l’identité de la librairie, la TVA, la devise et le logo.",
        fields: ["Nom librairie", "Adresse", "Téléphone", "Email", "Devise", "TVA"],
        headers: ["Paramètre", "Valeur", "État", "Note"],
        rows: [
            ["Devise", "MAD", "Actif", "Monnaie utilisée"],
            ["TVA", "20 %", "Actif", "Taux par défaut"],
            ["Logo", "Upload", "Actif", "Identité visuelle"],
        ],
    },
};

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeSection, setActiveSection] = useState<MainSection>("admin");
    const [activeAdminSection, setActiveAdminSection] = useState<AdminSection>("overview");
    const [activeCustomerService, setActiveCustomerService] = useState<ServiceClienteleSection>("schoolRegistration");
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("admin123");

    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!username.trim() || !password.trim()) {
            return;
        }

        setIsAuthenticated(true);
    }

    function handleLogout() {
        setIsAuthenticated(false);
        setActiveSection("admin");
        setActiveAdminSection("overview");
        setActiveCustomerService("schoolRegistration");
    }

    function renderCustomerServiceWorkspace() {
        const selectedService = customerServices.find((service) => service.key === activeCustomerService) ?? customerServices[0];

        return (
            <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <article className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-5 shadow-xl shadow-slate-950/25 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-slate-400">Service clientèle</p>
                            <h3 className="mt-1 text-2xl font-semibold text-white">{selectedService.title}</h3>
                        </div>
                        <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">Support</span>
                    </div>

                    <div className="mt-5 grid gap-3">
                        {customerServices.map((service) => {
                            const isActive = activeCustomerService === service.key;

                            return (
                                <button
                                    key={service.key}
                                    onClick={() => setActiveCustomerService(service.key)}
                                    className={`rounded-2xl border px-4 py-4 text-left transition ${isActive
                                        ? "border-cyan-300/30 bg-cyan-400 text-slate-950"
                                        : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                                        }`}
                                >
                                    <div className="text-sm font-semibold">{service.title}</div>
                                    <div className={`mt-1 text-xs leading-5 ${isActive ? "text-slate-950/70" : "text-slate-400"}`}>
                                        {service.description}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-5 grid gap-3">
                        {(
                            activeCustomerService === "schoolRegistration"
                                ? ["Nom du client", "Téléphone", "Établissement", "Niveau", "Classe", "Année scolaire", "Montant"]
                                : activeCustomerService === "universityRegistration"
                                    ? ["Nom du client", "Téléphone", "Université", "Faculté", "Spécialité", "Année universitaire", "Montant"]
                                    : ["Nom du client", "Téléphone", "Compagnie", "Ligne", "Date début", "Date fin", "Montant"]
                        ).map((field) => (
                            <label key={field} className="grid gap-2 text-sm text-slate-300">
                                <span>{field}</span>
                                <input
                                    type="text"
                                    className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
                                    placeholder={`Saisir ${field.toLowerCase()}`}
                                />
                            </label>
                        ))}
                        <label className="grid gap-2 text-sm text-slate-300">
                            <span>Observations</span>
                            <textarea
                                rows={5}
                                className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
                                placeholder="Ajouter une note ou une précision"
                            />
                        </label>

                        <button className="rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
                            Enregistrer {selectedService.title.toLowerCase()}
                        </button>
                    </div>
                </article>

                <article className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-5 shadow-xl shadow-slate-950/25 sm:p-6">
                    <p className="text-sm text-slate-400">Demandes en cours</p>
                    <h3 className="mt-1 text-2xl font-semibold text-white">Suivi des dossiers</h3>
                    <div className="mt-5 space-y-4">
                        {[
                            ["Dossier 001", "Inscription scolaire", "En cours"],
                            ["Dossier 002", "Inscription universitaire", "Résolu"],
                            ["Dossier 003", "Abonnement scolaire", "En attente"],
                        ].map((row) => (
                            <div key={row[0]} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <div className="text-sm font-semibold text-white">{row[0]}</div>
                                        <div className="mt-1 text-sm text-slate-300">{row[1]}</div>
                                    </div>
                                    <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs text-slate-200">
                                        {row[2]}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </section>
        );
    }

    function renderModulePanel(section: Exclude<AdminSection, "overview">) {
        const config = moduleConfigs[section];

        return (
            <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
                <article className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-5 shadow-xl shadow-slate-950/25 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-slate-400">{config.badge}</p>
                            <h2 className="mt-1 text-2xl font-semibold text-white">{config.title}</h2>
                        </div>
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">Interface métier</span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-300">{config.summary}</p>

                    <div className="mt-5 grid gap-3">
                        {config.fields.map((field) => (
                            <label key={field} className="grid gap-2 text-sm text-slate-300">
                                <span>{field}</span>
                                <input
                                    type="text"
                                    className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
                                    placeholder={`Saisir ${field.toLowerCase()}`}
                                />
                            </label>
                        ))}

                        <div className="grid gap-3 sm:grid-cols-2">
                            <button className="rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
                                Enregistrer
                            </button>
                            <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-slate-200 transition hover:bg-white/10">
                                Réinitialiser
                            </button>
                        </div>
                    </div>
                </article>

                <article className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-5 shadow-xl shadow-slate-950/25 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-slate-400">{config.title}</p>
                            <h2 className="mt-1 text-2xl font-semibold text-white">Liste et suivi</h2>
                        </div>
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">Consultation</span>
                    </div>

                    <div className="mt-5 flex gap-3">
                        <input
                            type="search"
                            className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
                            placeholder="Rechercher"
                        />
                        <button className="rounded-2xl bg-emerald-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300">
                            Filtrer
                        </button>
                    </div>

                    <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/10">
                        <div className={`grid gap-3 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 ${config.headers.length === 4 ? "grid-cols-4" : "grid-cols-4"}`}>
                            {config.headers.map((header) => (
                                <span key={header}>{header}</span>
                            ))}
                        </div>
                        {config.rows.map((row) => (
                            <div key={row[0]} className="grid grid-cols-4 gap-3 border-t border-white/10 bg-slate-950/30 px-4 py-4 text-sm text-slate-200">
                                {row.map((cell) => (
                                    <span key={cell}>{cell}</span>
                                ))}
                            </div>
                        ))}
                    </div>
                </article>
            </section>
        );
    }

    function renderAdminWorkspace() {
        if (activeAdminSection === "overview") {
            return (
                <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                    <article className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-5 shadow-xl shadow-slate-950/25 sm:p-6">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-slate-400">Gestion rapide</p>
                                <h2 className="mt-1 text-2xl font-semibold text-white">Actions courantes</h2>
                            </div>
                            <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">Buttons</span>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            {[
                                "Ajouter un client",
                                "Ajouter un produit",
                                "Ajouter un fournisseur",
                                "Créer une vente",
                                "Réceptionner un achat",
                                "Créer un service",
                            ].map((item) => (
                                <button
                                    key={item}
                                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-5 shadow-xl shadow-slate-950/25 sm:p-6">
                        <p className="text-sm text-slate-400">Pourquoi ces boutons ?</p>
                        <h2 className="mt-1 text-2xl font-semibold text-white">Navigation directe par métier</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-300">
                            Les boutons évitent les menus trop complexes. Le caissier, le gestionnaire et l’administrateur accèdent rapidement à la fonction utile sans se perdre.
                        </p>
                        <div className="mt-5 grid gap-3">
                            {[
                                "Clients et fournisseurs",
                                "Produits et stock",
                                "Ventes et achats",
                                "Services et utilisateurs",
                            ].map((item) => (
                                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </article>
                </section>
            );
        }

        if (activeAdminSection === "clients") {
            return renderModulePanel("clients");
        }

        return renderModulePanel(activeAdminSection);
    }

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
                <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-7xl items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <section className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-6 shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-8">
                        <div className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200">
                            Librairie Pro · Plateforme de gestion
                        </div>
                        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                            Une seule plateforme pour gérer la librairie, les clients, les produits, les services et l’analyse.
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                            Le premier écran est la connexion. Après authentification, l’utilisateur accède à un portail composé de boutons d’administration et d’un espace d’analyse avec KPI et graphiques.
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {[
                                "Gestion des clients et fournisseurs",
                                "Ventes, achats et stock",
                                "Services administratifs",
                                "Tableaux de bord et rapports",
                            ].map((item) => (
                                <div key={item} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-5">
                            <p className="text-sm text-slate-400">Exemple de compte de démonstration</p>
                            <div className="mt-3 grid gap-2 text-sm text-slate-200">
                                <div>Utilisateur: <span className="font-semibold text-white">admin</span></div>
                                <div>Mot de passe: <span className="font-semibold text-white">admin123</span></div>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] p-6 shadow-2xl shadow-slate-950/30 sm:p-8">
                        <div>
                            <p className="text-sm text-slate-400">Connexion</p>
                            <h2 className="mt-1 text-2xl font-semibold text-white">Accéder à la plateforme</h2>
                        </div>

                        <form onSubmit={handleLogin} className="mt-6 space-y-4">
                            <label className="grid gap-2 text-sm text-slate-300">
                                <span>Nom d’utilisateur</span>
                                <input
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
                                    placeholder="Entrez votre identifiant"
                                />
                            </label>

                            <label className="grid gap-2 text-sm text-slate-300">
                                <span>Mot de passe</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
                                    placeholder="Entrez votre mot de passe"
                                />
                            </label>

                            <button className="mt-2 w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
                                Se connecter
                            </button>
                        </form>

                        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
                            Après connexion, l’utilisateur accède à un menu principal composé de boutons pour la partie administrative et un bouton ou onglet pour l’analyse.
                        </div>
                    </section>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen px-4 py-4 text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-[1600px] gap-4 lg:grid-cols-[280px_1fr]">
                <aside className="flex flex-col rounded-[2rem] border border-white/10 bg-[var(--surface)] p-4 shadow-2xl shadow-slate-950/30">
                    <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-4">
                        <div className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
                            Librairie Pro
                        </div>
                        <h1 className="mt-3 text-lg font-semibold text-white">Panneau de gestion</h1>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                            Navigation à gauche, contenu métier à droite.
                        </p>
                    </div>

                    <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-3">
                        <p className="px-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Modules</p>
                        <div className="mt-3 flex flex-col gap-2">
                            {mainSections.map((section) => {
                                const isActive = activeSection === section.key;

                                return (
                                    <button
                                        key={section.key}
                                        onClick={() => setActiveSection(section.key)}
                                        className={`rounded-2xl px-4 py-3 text-left transition ${isActive
                                            ? "border border-cyan-300/30 bg-cyan-400 text-slate-950"
                                            : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                                            }`}
                                    >
                                        <div className="text-sm font-semibold">{section.label}</div>
                                        <div className={`mt-1 text-xs ${isActive ? "text-slate-950/70" : "text-slate-400"}`}>
                                            {section.description}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {activeSection === "admin" && (
                        <div className="mt-4 flex-1 rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-3">
                            <p className="px-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Administration</p>
                            <div className="mt-3 flex flex-col gap-2">
                                <button
                                    onClick={() => setActiveAdminSection("overview")}
                                    className={`rounded-2xl px-4 py-3 text-left transition ${activeAdminSection === "overview"
                                        ? "border border-amber-300/30 bg-amber-400 text-slate-950"
                                        : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                                        }`}
                                >
                                    Vue générale
                                </button>
                                {adminModules.map((module) => {
                                    const isActive = activeAdminSection === module.key;

                                    return (
                                        <button
                                            key={module.key}
                                            onClick={() => setActiveAdminSection(module.key)}
                                            className={`rounded-2xl px-4 py-3 text-left transition ${isActive
                                                ? "border border-cyan-300/30 bg-cyan-400 text-slate-950"
                                                : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                                                }`}
                                        >
                                            <div className="text-sm font-semibold">{module.title}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className="mt-4 rounded-2xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-left text-sm font-semibold text-rose-100 transition hover:bg-rose-300/20"
                    >
                        Déconnexion
                    </button>
                </aside>

                <section className="rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] p-5 shadow-2xl shadow-slate-950/30 sm:p-6">
                    <div className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200">
                                Connexion réussie · Portail librairie
                            </div>
                            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                {activeSection === "admin" ? "Interface d’administration" : "Interface d’analyse"}
                            </h2>
                            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                                La barre latérale à gauche contient tous les boutons. Le panneau de droite affiche l’écran de travail sélectionné.
                            </p>
                        </div>
                        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                            {activeSection === "admin"
                                ? adminModules.find((module) => module.key === activeAdminSection)?.title ?? "Vue générale"
                                : "Analyse des indicateurs"}
                        </div>
                    </div>

                    <div className="mt-6">
                        {activeSection === "admin" ? (
                            <>
                                {activeAdminSection === "overview" ? (
                                    <>
                                        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                            {kpis.map((kpi) => (
                                                <article
                                                    key={kpi.label}
                                                    className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-5 shadow-lg shadow-slate-950/20"
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

                                        <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                                            <article className="rounded-[2rem] border border-white/10 bg-slate-950/35 p-5 shadow-xl shadow-slate-950/25 sm:p-6">
                                                <p className="text-sm text-slate-400">Point d’entrée</p>
                                                <h3 className="mt-1 text-2xl font-semibold text-white">Choisis un module dans la barre de gauche</h3>
                                                <p className="mt-3 text-sm leading-6 text-slate-300">
                                                    Chaque bouton ouvre son interface métier dédiée: clients, produits, fournisseurs, ventes, achats, stock, services, utilisateurs et paramètres.
                                                </p>
                                            </article>

                                            <article className="rounded-[2rem] border border-white/10 bg-slate-950/35 p-5 shadow-xl shadow-slate-950/25 sm:p-6">
                                                <p className="text-sm text-slate-400">Raccourci</p>
                                                <h3 className="mt-1 text-2xl font-semibold text-white">Module actif</h3>
                                                <button
                                                    onClick={() => setActiveAdminSection("clients")}
                                                    className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
                                                >
                                                    Ouvrir Clients
                                                </button>
                                            </article>
                                        </div>

                                        <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                                            <article className="rounded-[2rem] border border-white/10 bg-slate-950/35 p-5 shadow-xl shadow-slate-950/25 sm:p-6">
                                                <div className="flex items-center justify-between gap-4">
                                                    <div>
                                                        <p className="text-sm text-slate-400">Analyse</p>
                                                        <h3 className="mt-1 text-2xl font-semibold text-white">Évolution du chiffre d’affaires</h3>
                                                    </div>
                                                    <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">Analyse</span>
                                                </div>
                                                <div className="mt-6 flex h-72 items-end gap-3 rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-4">
                                                    {monthlyChart.map((item) => (
                                                        <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                                                            <div className="flex w-full items-end justify-center">
                                                                <div
                                                                    className="w-full max-w-14 rounded-t-2xl bg-gradient-to-t from-amber-400 via-cyan-400 to-emerald-300 shadow-lg shadow-cyan-500/20"
                                                                    style={{ height: `${item.value * 2}px` }}
                                                                />
                                                            </div>
                                                            <span className="text-xs text-slate-400">{item.month}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </article>

                                            <article className="rounded-[2rem] border border-white/10 bg-slate-950/35 p-5 shadow-xl shadow-slate-950/25 sm:p-6">
                                                <p className="text-sm text-slate-400">Top produits</p>
                                                <h3 className="mt-1 text-2xl font-semibold text-white">Produits les plus vendus</h3>
                                                <div className="mt-6 space-y-4">
                                                    {topProducts.map((product) => (
                                                        <div key={product.name} className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                                                            <div className="flex items-center justify-between gap-4 text-sm">
                                                                <span className="text-slate-200">{product.name}</span>
                                                                <span className="text-slate-400">{product.value}%</span>
                                                            </div>
                                                            <div className="h-3 rounded-full bg-white/5">
                                                                <div
                                                                    className="h-3 rounded-full bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-300"
                                                                    style={{ width: `${product.value}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </article>
                                        </section>

                                        <section className="mt-6 rounded-[2rem] border border-white/10 bg-slate-950/35 p-5 shadow-xl shadow-slate-950/25 sm:p-6">
                                            <p className="text-sm text-slate-400">Pourquoi les KPI ?</p>
                                            <h3 className="mt-1 text-2xl font-semibold text-white">Les KPI donnent une lecture immédiate de la librairie</h3>
                                            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
                                                Les indicateurs clés de performance servent à piloter l’activité en temps réel. Ils permettent de repérer les ventes, les ruptures, les produits performants et les zones qui nécessitent une action.
                                            </p>
                                            <div className="mt-5 grid gap-3 md:grid-cols-3">
                                                {whyKpi.map((item) => (
                                                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </>
                                ) : (
                                    renderAdminWorkspace()
                                )}
                            </>
                        ) : (
                            renderCustomerServiceWorkspace()
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
