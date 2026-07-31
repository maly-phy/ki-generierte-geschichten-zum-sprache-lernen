<script>
  import Navbar from "$lib/components/websiteNavbar.svelte";
  import { language } from "$lib/stores/items";
</script>

<div>
  <Navbar />
  <section class="section">
    <div id="access-content" class="content">
      <h2>Erklärung zur Barrierefreiheit</h2>
      <p>
        Der Anbieter von AILLA ist bestrebt, die Website gemäß der EU-Richtlinie
        2016/2102 barrierefrei zu gestalten. Barrierefreiheit bedeutet, dass
        Informationen für Menschen mit unterschiedlichen Behinderungen lesbar
        und bedienbar sind.<br />
        Die folgende Erklärung zur Barrierefreiheit dokumentiert den Umsetzungsstand
        gemäß dem Behindertengleichstellungsgesetz (BGG) sowie die entsprechenden
        Kontaktmöglichkeiten.
        <br />
        Die Bewertung basiert auf einer Selbstbewertung (auf der Grundlage der Web
        Content Accessibility Guidelines (WCAG)). Der AILLA-Anbieter ist bestrebt,
        die Barrierefreiheit der Website kontinuierlich durch Stichproben zu überprüfen.
      </p>
      <h3>Geltungsbereich der Erklärung</h3>
      <p>
        Die Erklärung zur Barrierefreiheit gilt für alle Seiten der
        AILLA-Website. Ausgenommen sind die Websites externer Links, die nicht
        zu AILLA gehören.
      </p>
      <h3>Stand der Vereinbarkeit mit den Anforderungen</h3>
      <p>
        Die AILLA-Website entspricht teilweise der EU-Richtlinie 2016/2102. Es
        gibt jedoch noch einige Bereiche, die die Anforderungen der
        EU-Richtlinie 2016/2102 nicht erfüllen. Die implementierten
        IT-Funktionen zur Verbesserung der Barrierefreiheit sind nachstehend
        aufgeführt.
      </p>
      <h4>Barrierefreiheitsfunktionen</h4>
      <ul>
        <li>
          Kontrastreiche Farben für alle Funktionen der Website mit
          ausreichenden Abständen dazwischen.
        </li>
        <li>Es stehen zwei Designs zur Verfügung (hell und dunkel).</li>
        <li>
          Für alle Seiten werden zwei Sprachen (Englisch und Deutsch)
          unterstützt.
        </li>
        <li>
          Tastaturnavigation zwischen allen Funktionen mit der Möglichkeit, eine
          Funktion auszuwählen (Enter-Taste) oder ein Burger-Menü zu schließen
          (Esc-Taste oder Leertaste). Alle Funktionen sind über einen kurzen
          Pfad erreichbar und werden hervorgehoben, wenn sie im Fokus stehen.
        </li>
        <li>
          Mausereignisse werden unterstützt, wobei ein Menü durch einen
          Mausklick außerhalb des Menüs geschlossen werden kann und automatisch
          geschlossen wird, sobald der Benutzer auf ein anderes Element auf der
          Seite klickt.
        </li>
        <li>
          Anmeldedaten können im Browser gespeichert werden (nach Wahl des
          Benutzers) und werden dann bei zukünftigen Anmeldungen automatisch
          ausgefüllt.
        </li>
        <li>
          Informationsmeldungen, die dem Nutzer bei jeder Aktion angezeigt
          werden, und die automatisch nach einer bestimmten Zeit (~ 5 Sekunden)
          verschwinden.
        </li>
        <li>
          Anpassung der Website an den mobilen Modus (kleine Bildschirme bis zum
          300px).
        </li>
      </ul>
      <p>
        Die nicht barrierefreien Gestaltungselemente sind nachfolgend
        aufgeführt.
      </p>
      <h4>Nicht barrierefreie Funktionen</h4>
      <ul>
        <li>Easy und Gebärdensprache werden nicht unterstützt.</li>
        <li>
          Die Größe des Website-Symbols im Browser ist klein und wird vom
          Browser gesteuert.
        </li>
      </ul>
      <h3>Gründe für fehlende Barrierefreiheit</h3>
      <p>
        Die Website enthält keine Audio-, Video-, Bild- oder PDF-Inhalte und
        weist daher keine Probleme hinsichtlich der Barrierefreiheit in Bezug
        auf diese Elemente auf. Der Anbieter überprüft die Website jedoch
        regelmäßig und bemüht sich nach Kräften, die Barrierefreiheit zu
        verbessern, was jedoch mit einem hohen Zeitaufwand verbunden ist.
      </p>
      <h3>Kontakt und Feedback</h3>
      <p>
        Wenn Sie Mängel hinsichtlich der Einhaltung der
        Barrierefreiheitsanforderungen melden möchten oder Anregungen oder
        Fragen zur Umsetzung der Barrierefreiheit haben, wenden Sie sich bitte
        direkt an den AILLA-Anbieter. Die Kontaktdaten finden Sie <a
          href={`/${$language}/imprint`}
          target="_blank"
          rel="noopener noreferrer">hier</a
        >.
      </p>
      <h3>Schlichtungsverfahren</h3>
      <p>
        Sollten Sie vom AILLA-Anbieter keine zufriedenstellende Antwort
        erhalten, können Sie bei der vom Bundesbeauftragten für die Belange von
        Menschen mit Behinderungen eingerichteten Schlichtungsstelle einen
        Antrag stellen, um ein Schlichtungsverfahren gemäß dem
        Behindertengleichstellungsgesetz (BGG) einzuleiten. Das
        Schlichtungsverfahren ist kostenlos und es ist kein Rechtsbeistand
        erforderlich.
      </p>
      <h3>Kontakt zur Schlichtungsstelle</h3>
      <p>
        Schlichtungsstelle nach dem Behindertengleichstellungsgesetz (BGG)<br
        /><br />
        bei dem Beauftragten der Bundesregierung für die Belange von Menschen mit
        Behinderungen<br /><br />
        MauerStraße 53<br />
        10117 Berlin<br />
        Telefon: +49 (0)30 18 527-2901<br />
        Fax: +49 (0)30 18 527-2901<br />
        E-Mail:
        <a href="mailto:info@schlichtungsstelle-bgg.de"
          >info@schlichtungsstelle-bgg.de</a
        ><br />
        Web:
        <a
          href="https://www.schlichtungsstelle-bgg.de/"
          target="_blank"
          rel="noopener noreferrer">https://www.schlichtungsstelle-bgg.de/</a
        ><br />
      </p>
    </div>
  </section>
</div>
