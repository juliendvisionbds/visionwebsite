import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AutoSelect, ConfirmButton, SubmitButton } from "@/components/app/buttons";
import { requireAdmin } from "@/lib/partners/auth";
import { PARTNER_STATUS, REFERRAL_STATUS, getPartner, listContracts, listReferrals, summarize, type ReferralStatus } from "@/lib/partners/db";
import { day, euro, percent, today } from "@/lib/partners/format";
import Shell from "../../Shell";
import {
  addContract,
  addReferral,
  removeContract,
  removeReferral,
  resendWelcome,
  savePartner,
  setContractPaid,
  setPartnerStatus,
  setReferralStatus,
} from "../../actions";

export const metadata: Metadata = { title: "Fiche partenaire" };

const REFERRAL_OPTIONS = Object.entries(REFERRAL_STATUS) as Array<[ReferralStatus, string]>;

export default async function Page({ params }: PageProps<"/admin/partenaires/[id]">) {
  await requireAdmin();
  const partner = await getPartner((await params).id);
  if (!partner) notFound();
  const [referrals, contracts] = await Promise.all([listReferrals(partner.id), listContracts(partner.id)]);
  const s = summarize(referrals, contracts);
  const accepted = partner.status === "accepted";

  return (
    <Shell active="partners">
      <div className="app-head">
        <div>
          <Link className="app-back" href="/">
            ← Tous les partenaires
          </Link>
          <div className="row" style={{ gap: 14 }}>
            <h1>{partner.name}</h1>
            <span className={`badge ${partner.status}`}>{PARTNER_STATUS[partner.status]}</span>
          </div>
          <p>
            {[partner.company, partner.profile].filter(Boolean).join(" · ") || "Société non renseignée"} · candidature du {day(partner.created_at)}
          </p>
        </div>

        <form className="row" action={setPartnerStatus}>
          <input type="hidden" name="id" value={partner.id} />
          {partner.status !== "accepted" && (
            <ConfirmButton
              className="btn btn-primary"
              name="status"
              value="accepted"
              message={
                partner.welcome_sent_at
                  ? `Accepter ${partner.name} ? L'email de bienvenue a déjà été envoyé : il ne repart pas.`
                  : `Accepter ${partner.name} ? L'email de bienvenue (kit et accès à l'espace partenaires) part aussitôt.`
              }
            >
              Accepter
            </ConfirmButton>
          )}
          {partner.status !== "rejected" && (
            <ConfirmButton
              className="btn btn-danger"
              name="status"
              value="rejected"
              message={
                accepted
                  ? `Retirer ${partner.name} du programme ? Son accès à l'espace partenaires est coupé. Aucun email ne lui est envoyé.`
                  : `Refuser ${partner.name} ? Aucun email ne lui est envoyé.`
              }
            >
              {accepted ? "Retirer du programme" : "Refuser"}
            </ConfirmButton>
          )}
          {partner.status === "rejected" && (
            <SubmitButton className="btn btn-ghost" name="status" value="pending">
              Remettre en attente
            </SubmitButton>
          )}
        </form>
      </div>

      <div className="kpis">
        <div className="kpi">
          <b>{s.referrals}</b>
          <span>recommandation{s.referrals > 1 ? "s" : ""}</span>
          <small>{s.calls} avec un premier appel</small>
        </div>
        <div className="kpi">
          <b>{s.contracts}</b>
          <span>contrat{s.contracts > 1 ? "s" : ""} signé{s.contracts > 1 ? "s" : ""}</span>
          <small>{euro(s.revenue)} HT</small>
        </div>
        <div className="kpi">
          <b>{euro(s.earned)}</b>
          <span>de commissions</span>
          <small>{euro(s.paid)} versés</small>
        </div>
        <div className="kpi hl">
          <b>{euro(s.due)}</b>
          <span>à verser</span>
          <small>taux actuel : {percent(partner.commission_rate)}</small>
        </div>
      </div>

      <div className="cols">
        <section className="card flat">
          <div className="card-head">
            <h2>Candidature</h2>
          </div>
          <dl className="facts">
            <div>
              <dt>Email</dt>
              <dd>
                <a className="link" href={`mailto:${partner.email}`}>
                  {partner.email}
                </a>
              </dd>
            </div>
            <div>
              <dt>Téléphone</dt>
              <dd>{partner.phone ? <a href={`tel:${partner.phone}`}>{partner.phone}</a> : "—"}</dd>
            </div>
            <div>
              <dt>Société</dt>
              <dd>{partner.company || "—"}</dd>
            </div>
            <div>
              <dt>Activité</dt>
              <dd>{partner.profile || "—"}</dd>
            </div>
            <div>
              <dt>Décision</dt>
              <dd>{partner.decided_at ? `${PARTNER_STATUS[partner.status]} le ${day(partner.decided_at)}` : "En attente"}</dd>
            </div>
            {accepted && (
              <div>
                <dt>Espace</dt>
                <dd>{partner.last_login_at ? `Dernière connexion le ${day(partner.last_login_at)}` : "Jamais connecté"}</dd>
              </div>
            )}
          </dl>
          <h3 style={{ margin: "20px 0 8px" }}>Qui peut-il nous présenter ?</h3>
          <p className="quote">{partner.network || "Non renseigné."}</p>

          {accepted && (
            <form className="row" style={{ marginTop: 18 }} action={resendWelcome}>
              <input type="hidden" name="id" value={partner.id} />
              <span className={partner.welcome_sent_at ? "small muted" : "error"}>
                {partner.welcome_sent_at ? `Email de bienvenue envoyé le ${day(partner.welcome_sent_at)}.` : "L'email de bienvenue n'est pas parti."}
              </span>
              <ConfirmButton className="btn btn-ghost btn-sm" message={`Envoyer l'email de bienvenue à ${partner.email} ? Il contient un nouveau lien d'accès, valable 7 jours.`}>
                {partner.welcome_sent_at ? "Renvoyer" : "Envoyer maintenant"}
              </ConfirmButton>
            </form>
          )}
        </section>

        <section className="card flat">
          <div className="card-head">
            <h2>Réglages</h2>
          </div>
          <form className="form" action={savePartner}>
            <input type="hidden" name="id" value={partner.id} />
            <label className="field" style={{ maxWidth: 200 }}>
              <span>Taux de commission (%)</span>
              <input name="commission_rate" inputMode="decimal" defaultValue={String(partner.commission_rate).replace(".", ",")} />
            </label>
            <p className="note">Appliqué aux prochains contrats. Les contrats déjà saisis gardent leur taux.</p>
            <label className="field">
              <span>
                Notes internes <i>(invisibles pour le partenaire)</i>
              </span>
              <textarea name="notes" maxLength={4000} defaultValue={partner.notes ?? ""} />
            </label>
            <div>
              <SubmitButton className="btn btn-ghost">Enregistrer</SubmitButton>
            </div>
          </form>
        </section>
      </div>

      <section className="card">
        <div className="card-head">
          <div>
            <h2>Recommandations</h2>
            <p>Les entreprises qu’il nous a présentées. Celles qu’il déclare dans son espace arrivent ici.</p>
          </div>
        </div>
        {referrals.length === 0 ? (
          <p className="empty">Aucune recommandation pour l’instant.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Entreprise</th>
                  <th>Contact</th>
                  <th>Contexte</th>
                  <th>Ajoutée</th>
                  <th>Avancement</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {referrals.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <b>{r.company}</b>
                    </td>
                    <td>
                      {r.contact_name || "—"}
                      {(r.contact_email || r.contact_phone) && <span className="sub">{[r.contact_email, r.contact_phone].filter(Boolean).join(" · ")}</span>}
                    </td>
                    <td className="small muted" style={{ maxWidth: 280 }}>
                      {r.note || "—"}
                    </td>
                    <td className="num">
                      {day(r.created_at)}
                      <span className="sub">{r.source === "partner" ? "par le partenaire" : "par l'équipe"}</span>
                    </td>
                    <td>
                      <form action={setReferralStatus}>
                        <input type="hidden" name="id" value={r.id} />
                        <AutoSelect name="status" value={r.status} options={REFERRAL_OPTIONS} label={`Avancement de ${r.company}`} />
                      </form>
                    </td>
                    <td className="r">
                      <form action={removeReferral}>
                        <input type="hidden" name="id" value={r.id} />
                        <ConfirmButton className="icon-btn" message={`Supprimer la recommandation « ${r.company} » ?`}>
                          Supprimer
                        </ConfirmButton>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <details className="add">
          <summary>Ajouter une recommandation</summary>
          <form className="form" action={addReferral}>
            <input type="hidden" name="partner_id" value={partner.id} />
            <div className="grid2">
              <label className="field">
                <span>Entreprise</span>
                <input name="company" required maxLength={200} />
              </label>
              <label className="field">
                <span>
                  Contact <i>(facultatif)</i>
                </span>
                <input name="contact_name" maxLength={200} />
              </label>
            </div>
            <div className="grid2">
              <label className="field">
                <span>
                  Email <i>(facultatif)</i>
                </span>
                <input name="contact_email" type="email" maxLength={254} />
              </label>
              <label className="field">
                <span>
                  Téléphone <i>(facultatif)</i>
                </span>
                <input name="contact_phone" type="tel" maxLength={40} />
              </label>
            </div>
            <label className="field">
              <span>
                Contexte <i>(facultatif)</i>
              </span>
              <input name="note" maxLength={2000} />
            </label>
            <div>
              <SubmitButton>Ajouter</SubmitButton>
            </div>
          </form>
        </details>
      </section>

      <section className="card yellow">
        <div className="card-head">
          <div>
            <h2>Contrats</h2>
            <p>Les contrats signés grâce à lui. La commission est calculée sur le montant HT.</p>
          </div>
        </div>
        {contracts.length === 0 ? (
          <p className="empty">Aucun contrat rattaché.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Signé le</th>
                  <th className="r">Montant HT</th>
                  <th className="r">Taux</th>
                  <th className="r">Commission</th>
                  <th>Versement</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {contracts.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <b>{c.client}</b>
                      {c.title && <span className="sub">{c.title}</span>}
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
                    <td className="r">
                      <form action={removeContract}>
                        <input type="hidden" name="id" value={c.id} />
                        <ConfirmButton className="icon-btn" message={`Supprimer le contrat « ${c.client} » (${euro(c.amount_ht)}) ?`}>
                          Supprimer
                        </ConfirmButton>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>Total</td>
                  <td className="r num">{euro(s.revenue)}</td>
                  <td />
                  <td className="r num">{euro(s.earned)}</td>
                  <td colSpan={2} className="small muted">
                    dont {euro(s.due)} à verser
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        <details className="add" open={accepted && contracts.length === 0 && referrals.length > 0}>
          <summary>Rattacher un contrat</summary>
          <form className="form" action={addContract}>
            <input type="hidden" name="partner_id" value={partner.id} />
            <div className="grid2">
              <label className="field">
                <span>Client</span>
                <input name="client" required maxLength={200} />
              </label>
              <label className="field">
                <span>
                  Recommandation liée <i>(passe en « Contrat signé »)</i>
                </span>
                <select name="referral_id" defaultValue="">
                  <option value="">Aucune</option>
                  {referrals.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.company}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="field">
              <span>
                Intitulé <i>(facultatif)</i>
              </span>
              <input name="title" maxLength={200} placeholder="Ex. : bibliothèque de prix et devis automatisés" />
            </label>
            <div className="grid3">
              <label className="field">
                <span>Montant HT (€)</span>
                <input name="amount_ht" required inputMode="decimal" pattern="[0-9 ]+([.,][0-9]{1,2})?" placeholder="12 000" />
              </label>
              <label className="field">
                <span>Date de signature</span>
                <input name="signed_at" type="date" required defaultValue={today()} />
              </label>
              <label className="field">
                <span>Taux de commission (%)</span>
                <input name="commission_rate" inputMode="decimal" defaultValue={String(partner.commission_rate).replace(".", ",")} />
              </label>
            </div>
            <div>
              <SubmitButton>Rattacher le contrat</SubmitButton>
            </div>
          </form>
        </details>
      </section>
    </Shell>
  );
}
