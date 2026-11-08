import { activationInformation, business, money, planDuration, plans, refundInformation } from '@/config/business';

export function PlanComparisonTable() {
  return <div className="table-scroll"><table>
    <caption>IPTV-Laufzeiten: Gesamtpreis und rechnerischer Monatswert für ein Gerät</caption>
    <thead><tr><th scope="col">Laufzeit</th><th scope="col">Gesamtpreis inkl. USt.</th><th scope="col">Rechnerisch pro Monat</th><th scope="col">Geräte / Logins</th></tr></thead>
    <tbody>{plans.map(plan => <tr key={plan.months}><th scope="row">{planDuration(plan.months)}</th><td>{money(plan.cents)}</td><td>{money(plan.cents / plan.months)}</td><td>{plan.devices} / {plan.devices}</td></tr>)}</tbody>
  </table></div>;
}

export function PlanDetails() {
  return <div className="prose panel" id="bedingungen">
    <h2>IPTV Preise vergleichen: Gesamtpreis und Laufzeit</h2>
    <p>Vergleiche zuerst den Gesamtpreis für den Zeitraum, den du tatsächlich nutzen möchtest. Alle vier Anfragepreise enthalten Umsatzsteuer. Der Monatswert teilt den Gesamtpreis durch die Laufzeit und ist keine monatliche Ratenzahlung.</p>
    <PlanComparisonTable />
    <h3>Was für alle vier Pläne gilt</h3>
    <dl className="legal-fields">
      <dt>Ein Gerät und ein Login</dt><dd>Ein Wechsel auf ein Ersatzgerät ist erlaubt, solange nur ein Gerät genutzt wird. Prüfe dein konkretes Modell vor der Buchung auf der <a href="/geraete">Geräteseite</a>.</dd>
      <dt>Feste Laufzeit</dt><dd>Die Laufzeit beginnt mit der Aktivierung und endet automatisch. Eine Fortsetzung erfordert eine neue Bestellung; es gibt keine automatische Verlängerung oder Folgeabbuchung.</dd>
      <dt>Zahlung und Aktivierung</dt><dd>Akzeptiert werden {new Intl.ListFormat('de-DE', { type: 'conjunction' }).format(business.terms.paymentMethods)}. {activationInformation()}</dd>
      <dt>Vollständige Erstattung</dt><dd>{refundInformation()} Die <a href="/agb#agb-widerruf">AGB erläutern Erstattungen und Widerruf</a>.</dd>
    </dl>
    <h3>Welche Laufzeit passt zu deiner Nutzung?</h3>
    <p>Ein Monat hat den niedrigsten Gesamtpreis und die kürzeste Bindung. Längere Zeiträume senken den rechnerischen Monatswert, verlangen aber einen höheren Gesamtbetrag. Unser <a href="/ratgeber/iptv-kosten-laufzeiten">Ratgeber zu IPTV-Kosten und Laufzeiten</a> erklärt den Vergleich an den tatsächlichen Preisen.</p>
    <h3>Senderliste und Verfügbarkeit vorab klären</h3>
    <p>Nach Angaben der direkten Anbieterin ist der Zugang zum vollständigen Senderangebot ihres Dienstes vorgesehen. Der genaue Katalog und die Informationen zur Bestätigung der Verbreitungsrechte für Deutschland wurden noch nicht bereitgestellt. Vor einer Buchung müssen diese Angaben sowie die Gerätefreigabe und die vollständigen Vertragsinformationen vorliegen. Redaktionell gezeigte Open Movies sind keine bestätigten Abo-Inhalte.</p>
    <p>Die Auswahl eines Plans öffnet eine unverbindliche WhatsApp-Anfrage und löst keine Zahlung aus. Verantwortlich ist {business.company.legalName}; die <a href="/kontakt">Kontaktseite</a> enthält E-Mail und Anschrift.</p>
  </div>;
}
