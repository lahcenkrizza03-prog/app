import { sitePath } from '@/config/business';
import { business, money, planDuration, plans, whatsappLink, activationInformation, refundInformation } from '@/config/business';

const chapters = [
  ['anbieter', 'Anbieter und Geltungsbereich'],
  ['anfrage', 'Anfrage und Vertragsschluss'],
  ['leistung', 'Leistungsumfang und Inhalte'],
  ['tarife', 'Tarife, Preise und Zahlung'],
  ['technik', 'Geräte und technische Voraussetzungen'],
  ['laufzeit', 'Beginn, Laufzeit und Kündigung'],
  ['nutzung', 'Nutzung und Zugangsdaten'],
  ['maengel', 'Störungen und gesetzliche Rechte'],
  ['widerruf', 'Widerruf und Erstattungen'],
  ['haftung', 'Haftung'],
  ['datenschutz', 'Datenschutz und Kommunikation'],
  ['schluss', 'Vertragsfassung und Schlussbestimmungen'],
] as const;

export function Terms() {
  return <article className="legal-content prose" aria-label="Allgemeine Geschäftsbedingungen – Entwurf">
    <aside className="draft-notice" aria-label="Stand der Vertragsbedingungen">
      <div>
        <strong>AGB-Entwurf · noch nicht zur Verwendung für entgeltliche Abonnements freigegeben</strong>
        <p>Diese Fassung enthält die Angaben der direkten IPTV-Anbieterin zum Angebotsumfang sowie die bestätigten Preise, Zahlungsarten und Laufzeitregeln. Der genaue Senderkatalog, die Informationen zu Verbreitungsrechten für Deutschland und die passenden vollständigen Widerrufsinformationen müssen noch ergänzt werden. Bis dahin wird dieser Entwurf nicht als vereinbarte Abo-AGB verwendet.</p>
      </div>
    </aside>
    <p>Stand: <time dateTime={business.contentUpdated}>{new Intl.DateTimeFormat('de-DE', { timeZone: 'UTC' }).format(new Date(`${business.contentUpdated}T12:00:00Z`))}</time> · Vertragssprache: Deutsch</p>
    <nav aria-label="Inhaltsverzeichnis der AGB">
      <h2>Auf dieser Seite</h2>
      <ol>{chapters.map(([id, label]) => <li key={id}><a href={`#agb-${id}`}>{label}</a></li>)}</ol>
    </nav>

    <section id="agb-anbieter">
      <h2>1. Anbieter und Geltungsbereich</h2>
      <p>Das Informations- und Anfrageangebot upip-tv.com richtet sich an Verbraucherinnen und Verbraucher in Deutschland. Als Anbieterin ist benannt:</p>
      <address style={{ fontStyle: 'normal' }}>
        {business.company.legalName}<br />{business.company.address}<br />
        E-Mail: <a href={`mailto:${business.company.email}`}>{business.company.email}</a><br />
        WhatsApp: <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">{business.whatsappDisplay}</a>
      </address>
      <p>{business.company.legalName} tritt für upip-tv.com als direkte IPTV-Anbieterin auf. Die hier veröffentlichten Angaben zu ihrem Dienst beruhen auf ihren eigenen Informationen.</p>
      <p>Weitere Anbieterangaben stehen im <a href={sitePath('/impressum')}>Impressum</a>. Die Nutzung der Informationsseiten ist kostenfrei. Ein entgeltlicher Streamingzugang wird durch den Besuch der Website nicht eingerichtet.</p>
    </section>

    <section id="agb-anfrage">
      <h2>2. Anfrage und Vertragsschluss</h2>
      <p>Die Website stellt Informationen bereit und hilft dir, eine unverbindliche Nachricht vorzubereiten. Die Schaltflächen „Plan auswählen“ und „Nachricht in WhatsApp öffnen“ öffnen einen externen Kommunikationsweg. Erst du entscheidest, ob du die Nachricht dort versendest. Eine Anfrage ist keine Bestellung, löst keine Zahlung aus und reserviert keinen Zugang.</p>
      <p>Es gibt auf dieser Website keinen Online-Checkout und keine automatische Vertragsannahme. Vor einer entgeltlichen Buchung müssen dir ein konkretes Angebot, die vollständigen Vertragsinformationen und die dafür vorgesehene AGB-Fassung zugänglich gemacht werden. Ob und wie ein Vertrag angenommen werden kann, muss daraus eindeutig hervorgehen. Der bloße Abruf dieser Seite begründet keine Zustimmung zu Abo-Bedingungen.</p>
    </section>

    <section id="agb-leistung">
      <h2>3. Leistungsumfang und Inhalte</h2>
      <p><strong>Bestätigte Beschreibung des Angebots:</strong> Nach Angaben der Anbieterin umfasst das Abonnement den Zugang zum vollständigen Senderangebot ihres eigenen IPTV-Dienstes. Dieser Angebotsumfang ist für die Laufzeiten von einem, drei, sechs und zwölf Monaten vorgesehen.</p>
      <p><strong>Noch zu ergänzen – Senderkatalog:</strong> Die genaue Sender- und Inhaltsliste wurde noch nicht bereitgestellt. Die tatsächlich enthaltenen Sender und gegebenenfalls weitere Inhalte, Sprachen, Auflösungen und technischen Beschränkungen müssen vor einer Buchung konkret benannt werden. Die allgemeine Beschreibung bestätigt keine bestimmten Sender, Filme, Serien oder Sportereignisse.</p>
      <p><strong>Noch zu ergänzen – Verbreitungsrechte für Deutschland:</strong> Die Informationen, die eine Berechtigung zur Verbreitung der angebotenen Inhalte in Deutschland bestätigen, wurden noch nicht bereitgestellt. Die Bezeichnung als direkte Anbieterin und der Hinweis auf das vollständige Senderangebot ersetzen diese Angaben nicht. Eine entsprechende Rechtefreigabe wird hier nicht als bestätigt dargestellt.</p>
      <p>Die gezeigten Open Movies sind redaktionelle Empfehlungen mit Quellen- und Lizenzangaben. Sie sind keine Zusage, dass diese Titel in einem Abonnement enthalten sind. Es wird kein Anspruch auf ungeprüfte Kanalzahlen, bestimmte Sport- oder PPV-Rechte oder einen bestimmten Veröffentlichungsplan zugesichert.</p>
    </section>

    <section id="agb-tarife">
      <h2>4. Tarife, Preise und Zahlung</h2>
      <p>Für unverbindliche Anfragen sind folgende Gesamtpreise vorgesehen. Jeder Plan bezieht sich auf ein Gerät und einen Login:</p>
      <div className="table-scroll"><table>
        <caption>Aktuelle Anfragepreise für ein Gerät</caption>
        <thead><tr><th scope="col">Laufzeit</th><th scope="col">Gesamtpreis</th><th scope="col">Rechnerisch pro Monat</th></tr></thead>
        <tbody>{plans.map(plan => <tr key={plan.months}><th scope="row">{planDuration(plan.months)}</th><td>{money(plan.cents)}</td><td>{money(plan.cents / plan.months)}</td></tr>)}</tbody>
      </table></div>
      <p>Alle genannten Gesamtpreise enthalten Umsatzsteuer. Der Monatswert ist eine gerundete Rechenhilfe und keine Zusage monatlicher Ratenzahlung.</p>
      <p>Akzeptiert werden {new Intl.ListFormat('de-DE', { type: 'conjunction' }).format(business.terms.paymentMethods)}. Die Zahlungsabwicklung wird dir vor der Buchung mitgeteilt; diese Website hat keinen eigenen Online-Checkout. Vor einer Zahlung müssen der vollständige Leistungsumfang, der verbindliche Gesamtpreis und die Zahlungsbedingungen feststehen. Zusätzliche Kosten müssen vorab offengelegt werden. Einzelheiten der Darstellung findest du auf der <a href={sitePath('/preise#bedingungen')}>Preisseite</a>.</p>
    </section>

    <section id="agb-technik">
      <h2>5. Geräte und technische Voraussetzungen</h2>
      <p>Ob ein Gerät geeignet ist, hängt unter anderem von Modell, Betriebssystem, App und Internetverbindung ab. Allgemeine Gerätehinweise ersetzen keine Freigabe für ein bestimmtes Angebot. Erforderliche Apps, deren mögliche Kosten, unterstützte Systeme und notwendige Verbindungseigenschaften müssen vor der Buchung geklärt werden.</p>
      <p>Ein 4K-fähiges Gerät allein ist keine Zusage von 4K-Inhalten. Verfügbare Qualitätsstufen und technische Beschränkungen müssen zum konkreten Leistungsumfang passen. Nutze die <a href={sitePath('/geraete')}>Geräteanfrage</a>, um dein Modell vorab prüfen zu lassen.</p>
    </section>

    <section id="agb-laufzeit">
      <h2>6. Beginn, Laufzeit und Kündigung</h2>
      <p>Zur Anfrage stehen ausschließlich ein, drei, sechs oder zwölf Monate. Ein 24-Monats-Plan wird nicht angeboten. {activationInformation()} Die gebuchte Laufzeit beginnt mit der Aktivierung des Zugangs. Beginn und Ende deiner Laufzeit werden vor der Buchung mitgeteilt.</p>
      <p>Der Zugang endet nach der gebuchten Laufzeit automatisch. Eine Kündigung zum regulären Laufzeitende ist nicht erforderlich. Es gibt keine automatische Verlängerung und keine automatische Folgeabbuchung. Wenn du den Zugang fortsetzen möchtest, ist eine neue Bestellung erforderlich. Gesetzliche Rechte zur vorzeitigen Vertragsbeendigung bleiben unberührt.</p>
      <p>Diese Website verwaltet derzeit keine Vertragsbestände und bestätigt keine Kündigungen. Bei einem bestehenden Vertrag gelten die dort vereinbarten Bedingungen und die gesetzlichen Rechte. Informationen zum aktuellen Kontaktweg stehen unter <a href={sitePath('/kuendigung')}>Kündigung</a>.</p>
    </section>

    <section id="agb-nutzung">
      <h2>7. Nutzung und Zugangsdaten</h2>
      <p>Jedes Abonnement ist auf ein Gerät und einen Login begrenzt. Ein Wechsel auf ein Ersatzgerät ist erlaubt, solange das Abonnement nur auf einem Gerät genutzt wird. Ein Recht auf zusätzliche gleichzeitige Verbindungen, Weiterverkauf, öffentliche Vorführung oder Weitergabe an Dritte wird dadurch nicht zugesagt. Die zulässige Nutzung eines späteren Zugangs muss im konkreten Angebot beschrieben werden.</p>
      <p>Übermittle bei einer Anfrage nur die für dein Anliegen erforderlichen Angaben. Teile keine Passwörter, Zahlungsdaten oder Ausweiskopien in einer ersten Nachricht. Auf der Website werden keine fremden Streaming-Zugangsdaten abgefragt.</p>
    </section>

    <section id="agb-maengel">
      <h2>8. Störungen und gesetzliche Rechte</h2>
      <p>Wenn du ein technisches Problem meldest, helfen Angaben zu Gerät, App, Fehlermeldung und Zeitpunkt. Feste Supportzeiten, Reaktionsfristen oder eine bestimmte Verfügbarkeitsquote sind derzeit nicht zugesagt.</p>
      <p>Bei einem späteren Verbrauchervertrag über ein digitales Produkt bleiben die gesetzlichen Rechte bei fehlender Bereitstellung oder Mängeln unberührt. Dazu können, bei Vorliegen der gesetzlichen Voraussetzungen, Nacherfüllung, Vertragsbeendigung, Preisminderung und Schadensersatz gehören. Es wird kein pauschaler Ausschluss von Erstattungen oder Mängelrechten vereinbart.</p>
    </section>

    <section id="agb-widerruf">
      <h2>9. Widerruf und Erstattungen</h2>
      <h3>Freiwillige Erstattungen</h3>
      <p>{refundInformation()}</p>
      <p>Gesetzliche Widerrufs- und Mängelrechte bleiben von dieser zusätzlichen Erstattungsmöglichkeit unberührt.</p>
      <h3>Gesetzlicher Widerruf</h3>
      <p>Eine unverbindliche Anfrage ist kein entgeltlicher Vertrag. Vor einem späteren Fernabsatzvertrag müssen dir die für das konkrete Produkt geltenden Widerrufsinformationen und gegebenenfalls ein Muster-Widerrufsformular bereitgestellt werden.</p>
      <p>Ein Klick auf einen WhatsApp-Link oder eine Anfrage lässt ein gesetzliches Widerrufsrecht nicht entfallen. Die Voraussetzungen für einen vorzeitigen Leistungsbeginn und ein mögliches Erlöschen hängen von der konkreten Leistung und den gesetzlichen Anforderungen ab. Die Seite <a href={sitePath('/widerruf')}>Widerruf</a> beschreibt den aktuellen Vorbereitungsstand; sie ist noch keine vollständige Belehrung für ein konkretes Abonnement.</p>
    </section>

    <section id="agb-haftung">
      <h2>10. Haftung</h2>
      <p>Für die Haftung gelten die gesetzlichen Vorschriften. Dieser Entwurf enthält keine vertragliche Begrenzung der Haftung und schränkt insbesondere Ansprüche wegen vorsätzlichen oder grob fahrlässigen Verhaltens sowie wegen Verletzung von Leben, Körper oder Gesundheit nicht ein.</p>
    </section>

    <section id="agb-datenschutz">
      <h2>11. Datenschutz und Kommunikation</h2>
      <p>Das Kontaktformular versendet oder speichert deine Nachricht nicht auf einem Server dieser Website. Es bereitet einen WhatsApp-Link vor; das Absenden erfolgt durch dich bei WhatsApp. Du kannst stattdessen per E-Mail Kontakt aufnehmen. Für externe Dienste gelten deren eigene Datenschutzinformationen.</p>
      <p>Informationen zu Hosting, Kontaktwegen und lokalen Datenschutzeinstellungen findest du unter <a href={sitePath('/datenschutz')}>Datenschutz</a>. Der dort kenntlich gemachte Ergänzungsbedarf bleibt bestehen.</p>
    </section>

    <section id="agb-schluss">
      <h2>12. Vertragsfassung und Schlussbestimmungen</h2>
      <p>Dieser Entwurf wird mit seinem Standdatum veröffentlicht und kann über die Druckfunktion deines Browsers gespeichert werden. Eine spätere Vertragsfassung muss dir vor der Buchung zugänglich sein. Nachträgliche Änderungen dieser Website ändern bestehende Verträge nicht automatisch.</p>
      <p>Individuelle Vertragsabreden haben Vorrang vor Allgemeinen Geschäftsbedingungen. Die Einbeziehung von AGB richtet sich nach den gesetzlichen Voraussetzungen. Dieser Entwurf legt weder einen ausschließlichen Gerichtsstand noch einen Verzicht auf zwingenden Verbraucherschutz fest.</p>
      <p>Fragen zu einem Angebot oder Beschwerden kannst du an <a href={`mailto:${business.company.email}`}>{business.company.email}</a> richten. Ein bestimmtes Verfahren zur Verbraucherschlichtung wird hier nicht behauptet; erforderliche Informationen dazu müssen für den tatsächlichen Geschäftsbetrieb ergänzt werden.</p>
    </section>

    <aside className="panel" aria-label="Noch zu bestätigende Vertragsdetails">
      <h2>Vor der Verwendung als Abo-AGB zu bestätigen</h2>
      <ul>
        <li>Genauer Sender- und Inhaltskatalog des angebotenen IPTV-Dienstes</li>
        <li>Informationen und Nachweise zu den Verbreitungsrechten für Deutschland</li>
        <li>Konkrete Zahlungsabwicklung für das tatsächliche Angebot</li>
        <li>Passende Widerrufsinformationen, Vertragsbestätigung und erforderliche Schlichtungsangaben</li>
      </ul>
      <p>Nach Festlegung dieser Angaben muss die Vertragsfassung auf das tatsächliche Geschäftsmodell abgestimmt und vor ihrem Einsatz rechtlich geprüft werden.</p>
    </aside>
    <p className="small-text">Gesetzliche Grundlagen: <a href="https://www.gesetze-im-internet.de/bgb/__305.html" target="_blank" rel="noopener noreferrer">Einbeziehung von AGB (§ 305 BGB)</a> · <a href="https://www.gesetze-im-internet.de/bgb/__327i.html" target="_blank" rel="noopener noreferrer">Mängelrechte (§ 327i BGB)</a> · <a href="https://www.gesetze-im-internet.de/bgb/__356.html" target="_blank" rel="noopener noreferrer">Widerruf (§ 356 BGB)</a></p>
  </article>;
}
