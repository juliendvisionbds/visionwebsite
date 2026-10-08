import type { Metadata } from "next";
import Link from "next/link";
import { SubmitButton } from "@/components/app/buttons";
import { requireAdmin } from "@/lib/partners/auth";
import { listContracts, listPartners, summarize } from "@/lib/partners/db";
import { day, euro, percent } from "@/lib/partners/format";
import Shell from "../Shell";
import { setContractPaid } from "../actions";

export const metadata: Metadata = { title: "Contrats" };

export default async function Page({ searchParams }: PageProps<"/admin/contrats">) {
  await requireAdmin();
  const [contracts, partners] = await Promise.all([listContracts(), listPartners()]);
  const nameOf = new Map(partners.map((p) => [p.id, p.name]));
  const total = summarize([], contracts);
  const dueOnly = (await searchParams).versement === "a-verser";
  const rows = dueOnly ? contracts.filter((c) => !c.commission_paid_at) : contracts;

  return (
    <Shell active="contracts">
      <div className="app-head">
        <div>
          <h1>Contrats</h1>
          <p>Tous les contrats rattachés à un partenaire. Pour en ajouter un, ouvrez la fiche du partenaire.</p>
        </div>
      </div>

      <div className="kpis">
        <div className="kpi">
          <b>{total.contracts}</b>
          <span>contrat{total.contracts > 1 ? "s" : ""}</span>
        </div>
        <div className="kpi">
          <b>{euro(total.revenue)}</b>
          <span>signés, HT</span>
        </div>
        <div className="kpi">
          <b>{euro(total.paid)}</b>
          <span>de commissions versées</span>
        </div>
        <div className="kpi hl">
          <b>{euro(total.due)}</b>
          <span>de commissions à verser</span>
        </div>
      </div>

      <section className="card yellow">
        <div className="card-head">
          <nav className="tabs" aria-label="Filtrer par versement">
            <Link href="/contrats/" aria-current={dueOnly ? undefined : "page"}>
              Tous<i>{contracts.length}</i>
            </Link>
            <Link href="/contrats/?versement=a-verser" aria-current={dueOnly ? "page" : undefined}>
              À verser<i>{contracts.filter((c) => !c.commission_paid_at).length}</i>
            </Link>
          </nav>
        </div>

        {rows.length === 0 ? (
          <p className="empty">{dueOnly ? "Aucune commission en attente de versement." : "Aucun contrat rattaché à un partenaire pour l'instant."}</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Partenaire</th>
                  <th>Signé le</th>
                  <th className="r">Montant HT</th>
                  <th className="r">Taux</th>
                  <th className="r">Commission</th>
                  <th>Versement</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <b>{c.client}</b>
                      {c.title && <span className="sub">{c.title}</span>}
                    </td>
                    <td>
                      <Link className="link" href={`/partenaires/${c.partner_id}/`}>
                        {nameOf.get(c.partner_id) ?? "Partenaire"}
                      </Link>
                    </td>
                    <td className="num">{day(c.signed_at)}</td>
                    <td className="r num">{euro(c.amount_ht)}</td>
                    <td className="r num">{percent(c.commission_rate)}</td>
                    <td className="r num">
                      <b>{euro(c.commission_amount)}</b>
                    </td>
                    <td>
                      <form className="row" style={{ flexWrap: "nowrap" }} action={setContractPaid}>
                        <input type="hidden" name="id" value={c.id} />
                        <input type="hidden" name="paid" value={c.commission_paid_at ? "0" : "1"} />
                        <span className={`badge ${c.commission_paid_at ? "paid" : "due"}`}>
                          {c.commission_paid_at ? `Versée le ${day(c.commission_paid_at)}` : "À verser"}
                        </span>
                        <SubmitButton className="btn btn-ghost btn-sm">{c.commission_paid_at ? "Annuler" : "Marquer versée"}</SubmitButton>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Shell>
  );
}
