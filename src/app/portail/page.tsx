import Link from "next/link";
import Blip from "@/components/app/Blip";
import { requirePartner } from "@/lib/partners/auth";
import { REFERRAL_STATUS, listContracts, listReferrals, summarize } from "@/lib/partners/db";
import { firstName } from "@/lib/partners/emails";
import { day, euro, percent } from "@/lib/partners/format";
import { TODO } from "@/lib/partners/kit";
import ReferralForm from "./ReferralForm";
import Shell from "./Shell";
import { toggleTodo } from "./actions";

const Check = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 8.4l3 3 6-6.6" />
  </svg>
);

export default async function Page() {
  const partner = await requirePartner();
  const [referrals, contracts] = await Promise.all([listReferrals(partner.id), listContracts(partner.id)]);
  const s = summarize(referrals, contracts);
  const todo = TODO.map((t) => ({ ...t, locked: Boolean(t.auto && referrals.length), done: partner.todo_done.includes(t.id) || Boolean(t.auto && referrals.length) }));
  const doneCount = todo.filter((t) => t.done).length;

  return (
    <Shell active="dashboard">
      <section className="hello">
        <div>
          <h1>Bonjour {firstName(partner.name)}</h1>
          <p>
            Dès lors que vous nous obtenez un premier appel avec une entreprise, vous touchez <b>{percent(partner.commission_rate)} des contrats</b> que nous
            signons avec elle. Tout se suit ici.
          </p>
        </div>
        <Blip pose="wave" color="yellow" />
      </section>

      <div className="kpis">
        <div className="kpi">
          <b>{s.referrals}</b>
          <span>recommandation{s.referrals > 1 ? "s" : ""}</span>
        </div>
        <div className="kpi">
          <b>{s.calls}</b>
          <span>premier{s.calls > 1 ? "s" : ""} appel{s.calls > 1 ? "s" : ""} obtenu{s.calls > 1 ? "s" : ""}</span>
        </div>
        <div className="kpi">
          <b>{s.contracts}</b>
          <span>contrat{s.contracts > 1 ? "s" : ""} signé{s.contracts > 1 ? "s" : ""}</span>
          <small>{euro(s.revenue)} HT</small>
        </div>
        <div className="kpi hl">
          <b>{euro(s.earned)}</b>
          <span>de commissions gagnées</span>
          <small>
            {euro(s.paid)} versés · {euro(s.due)} à venir
          </small>
        </div>
      </div>

      {doneCount < todo.length && (
        <section className="card">
          <div className="card-head">
            <div>
              <h2>Pour démarrer</h2>
              <p>Cinq étapes, dans l’ordre : quoi faire, et avec quel document.</p>
            </div>
            <div className="row" style={{ flex: 1, justifyContent: "flex-end" }}>
              <span className="small muted">
                {doneCount} sur {todo.length}
              </span>
              <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={todo.length} aria-valuenow={doneCount} aria-label="Avancement">
                <i style={{ width: `${(doneCount / todo.length) * 100}%` }} />
              </div>
            </div>
          </div>
          <ol className="todo">
            {todo.map((t) => (
              <li key={t.id} className={t.done ? "done" : undefined}>
                <form action={toggleTodo}>
                  <input type="hidden" name="id" value={t.id} />
                  <button className="check" type="submit" disabled={t.locked} aria-label={t.done ? `Marquer « ${t.title} » comme à faire` : `Marquer « ${t.title} » comme fait`}>
                    <Check />
                  </button>
                </form>
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
                {t.href.endsWith(".pdf") ? (
                  <a className="btn btn-ghost btn-sm" href={t.href} target="_blank" rel="noopener">
                    {t.cta}
                  </a>
                ) : (
                  <Link className="btn btn-ghost btn-sm" href={t.href}>
                    {t.cta}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="cols">
        <section className="card yellow" id="recommander">
          <div className="card-head">
            <div>
              <h2>Recommander une entreprise</h2>
              <p>Vous avez envoyé une mise en contact, ou vous allez le faire ? Déclarez-la ici : c’est ce qui vous l’attribue.</p>
            </div>
          </div>
          <ReferralForm />
        </section>

        <section className="card flat">
          <div className="card-head">
            <h2>Mes recommandations</h2>
          </div>
          {referrals.length === 0 ? (
            <div className="empty">
              <Blip pose="look" color="orange" />
              Aucune recommandation pour l’instant. La première se déclare juste à côté.
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Entreprise</th>
                    <th>Déclarée</th>
                    <th>Avancement</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <b>{r.company}</b>
                        {r.contact_name && <span className="sub">{r.contact_name}</span>}
                      </td>
                      <td className="num">{day(r.created_at)}</td>
                      <td>
                        <span className={`badge ${r.status}`}>{REFERRAL_STATUS[r.status]}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <section className="card">
        <div className="card-head">
          <div>
            <h2>Mes contrats et commissions</h2>
            <p>Les contrats signés avec les entreprises que vous nous avez présentées.</p>
          </div>
        </div>
        {contracts.length === 0 ? (
          <p className="empty">Pas encore de contrat signé. Dès qu’il y en a un, il apparaît ici avec votre commission.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Signé le</th>
                  <th className="r">Montant HT</th>
                  <th className="r">Taux</th>
                  <th className="r">Votre commission</th>
                  <th>Versement</th>
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
                      <span className={`badge ${c.commission_paid_at ? "paid" : "due"}`}>
                        {c.commission_paid_at ? `Versée le ${day(c.commission_paid_at)}` : "À venir"}
                      </span>
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
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </section>
    </Shell>
  );
}
