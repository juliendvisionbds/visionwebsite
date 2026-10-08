import Link from "next/link";
import { ConfirmButton } from "@/components/app/buttons";
import { requireAdmin } from "@/lib/partners/auth";
import { PARTNER_STATUS, groupBy, listContracts, listPartners, listReferrals, summarize, type PartnerStatus } from "@/lib/partners/db";
import { day, euro } from "@/lib/partners/format";
import Shell from "./Shell";
import { setPartnerStatus } from "./actions";

const FILTERS: Array<[PartnerStatus | "all", string]> = [
  ["pending", "En attente"],
  ["accepted", "Acceptés"],
  ["rejected", "Refusés"],
  ["all", "Tous"],
];

export default async function Page({ searchParams }: PageProps<"/admin">) {
  await requireAdmin();
  const [partners, referrals, contracts] = await Promise.all([listPartners(), listReferrals(), listContracts()]);
  const referralsOf = groupBy(referrals);
  const contractsOf = groupBy(contracts);
  const total = summarize(referrals, contracts);
  const count = (s: PartnerStatus) => partners.filter((p) => p.status === s).length;

  // Par défaut : les candidatures à traiter s'il y en a, sinon les partenaires actifs.
  const asked = (await searchParams).statut;
  const filter = FILTERS.find(([id]) => id === asked)?.[0] ?? (count("pending") ? "pending" : "accepted");
  const rows = filter === "all" ? partners : partners.filter((p) => p.status === filter);

  return (
    <Shell active="partners">
      <div className="app-head">
        <div>
          <h1>Partenaires</h1>
          <p>Les candidatures reçues sur /devenir-partenaire, les recommandations et les contrats rattachés.</p>
        </div>
      </div>

      <div className="kpis">
        <div className="kpi">
          <b>{count("pending")}</b>
          <span>candidature{count("pending") > 1 ? "s" : ""} à traiter</span>
        </div>
        <div className="kpi">
          <b>{count("accepted")}</b>
          <span>partenaire{count("accepted") > 1 ? "s" : ""} actif{count("accepted") > 1 ? "s" : ""}</span>
          <small>{total.referrals} recommandation{total.referrals > 1 ? "s" : ""}</small>
        </div>
        <div className="kpi">
          <b>{euro(total.revenue)}</b>
          <span>signés grâce aux partenaires</span>
          <small>{total.contracts} contrat{total.contracts > 1 ? "s" : ""}, HT</small>
        </div>
        <div className="kpi hl">
          <b>{euro(total.due)}</b>
          <span>de commissions à verser</span>
          <small>{euro(total.paid)} déjà versés</small>
        </div>
      </div>

      <section className="card">
        <div className="card-head">
          <nav className="tabs" aria-label="Filtrer par statut">
            {FILTERS.map(([id, label]) => (
              <Link key={id} href={`/?statut=${id}`} aria-current={id === filter ? "page" : undefined}>
                {label}
                <i>{id === "all" ? partners.length : count(id)}</i>
              </Link>
            ))}
          </nav>
        </div>

        {rows.length === 0 ? (
          <p className="empty">{filter === "pending" ? "Aucune candidature en attente." : "Aucun partenaire dans cette liste."}</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Partenaire</th>
                  <th>Activité</th>
                  <th>Candidature</th>
                  <th>Statut</th>
                  <th className="r">Recos</th>
                  <th className="r">Signé HT</th>
                  <th className="r">Commission</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => {
                  const s = summarize(referralsOf.get(p.id) ?? [], contractsOf.get(p.id) ?? []);
                  return (
                    <tr key={p.id}>
                      <td>
                        <Link className="link" href={`/partenaires/${p.id}/`}>
                          {p.name}
                        </Link>
                        <span className="sub">{p.company || p.email}</span>
                      </td>
                      <td>{p.profile || "—"}</td>
                      <td className="num">{day(p.created_at)}</td>
                      <td>
                        <span className={`badge ${p.status}`}>{PARTNER_STATUS[p.status]}</span>
                      </td>
                      <td className="r num">{s.referrals || "—"}</td>
                      <td className="r num">{s.contracts ? euro(s.revenue) : "—"}</td>
                      <td className="r num">{s.contracts ? euro(s.earned) : "—"}</td>
                      <td className="r">
                        {p.status === "pending" ? (
                          <form className="row" style={{ justifyContent: "flex-end", flexWrap: "nowrap" }} action={setPartnerStatus}>
                            <input type="hidden" name="id" value={p.id} />
                            <input type="hidden" name="status" value="accepted" />
                            <ConfirmButton
                              className="btn btn-primary btn-sm"
                              message={`Accepter ${p.name} ? L'email de bienvenue (kit et accès à l'espace partenaires) part aussitôt.`}
                            >
                              Accepter
                            </ConfirmButton>
                            <Link className="btn btn-ghost btn-sm" href={`/partenaires/${p.id}/`}>
                              Voir
                            </Link>
                          </form>
                        ) : (
                          <Link className="btn btn-ghost btn-sm" href={`/partenaires/${p.id}/`}>
                            Ouvrir
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Shell>
  );
}
