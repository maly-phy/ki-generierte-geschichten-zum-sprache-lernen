<script>
  import Navbar from "$lib/components/websiteNavbar.svelte";
</script>

<div>
  <Navbar />
  <section class="section">
    <div id="imprint-content" class="content">
      <h2>Impressum</h2>
      <p>
        Im Folgenden finden Sie Informationen zum Betreiber dieser Website, zur
        Haftung, zu Dritten und zu rechtlichen Fragen.
      </p>
      <h3>Website</h3>
      <p>
        KI kurz generierte Geschichten zum Sprache-Lernen, abgekürzt im
        englischen als AILLA.
      </p>

      <h3>Anbieter & Herausgeber</h3>
      <p>Diese Website wird bereitgestellt von:</p>
      <p>
        MSc. Mohamed Aly<br />
        Master Abschluss in Physik<br />
        Master Student in angewandter Informatik
      </p>
      <p>
        Institut für Mathematik und Informatik<br />
        George-August-University of Göttingen Goldschmidtstr. 7<br />
        37077 Göttingen, Deutschland<br />
      </p>
      <p>
        Haupt-E-Mail-Adresse: mohamed.aly@stud.uni-goettingen.de<br />
        zweite E-Mail-Adresse: mohamedscience8@gmail.com
      </p>
      <h3>Rechtliche Struktur</h3>
      <p>
        AILLA ist ein <strong>gemeinnütziges</strong> Privatprojekt und steht in
        keiner Verbindung zu einem Unternehmen oder einer Organisation. Die Website
        wird von Herrn Mohamed Aly betreut, der für deren Inhalt und Betrieb verantwortlich
        ist.
      </p>
      <h3>Fremdsprachen</h3>
      <p>AILLA ist in beiden Sprachen, Englisch und Deutsch, verfügbar.</p>
      <h3>Haftung für Inhalte</h3>
      <p>
        AILLA setzt beim Sprachenlernen auf KI-generierte Geschichten. Der
        Anbieter bemüht sich nach Kräften sicherzustellen, dass die vom Large
        Language Model (LLM) generierten Inhalte im Rahmen der Lernziele und des
        Zwecks der Website bleiben. Allerdings können LLMs gelegentlich
        „halluzinieren“ und unrichtige, irreführende oder sogar rechtswidrige
        Inhalte generieren. Daher haftet der Anbieter nicht für Schäden oder
        Verluste, die sich aus der direkten oder indirekten Nutzung der Website
        ergeben.
      </p>
      <h3>Dritte</h3>
      <p>
        Wir verwenden Dienste von Drittanbietern, um die Website zu betreiben:
      </p>
      <ul>
        <li>
          Datenbank: Wir nutzen einen selbst gehosteten <a
            href="https://pocketbase.io/"
            target="_blank"
            rel="noopener noreferrer">Pocketbase</a
          >-Server, um die Benutzerregistrierungsdaten und die über die
          Benutzeroberfläche erstellten Benutzerdaten zu speichern.
        </li>
        <li>
          API-Modell: Das im Backend verwendete LLM wird über ein von der <a
            href="https://gwdg.de/"
            target="_blank"
            rel="noopener noreferrer">GWDG</a
          > gehostetes Modell bereitgestellt. Der Zugriff auf den Dienst erfolgt
          über einen authentifizierten API-Schlüssel.
        </li>
        <li>
          API-Backend: Es basiert auf einem selbst gehosteten Server, der vom
          Open-Source- Framework <a
            href="https://hono.dev/"
            target="_blank"
            rel="noopener noreferrer">Hono</a
          > bereitgestellt wird.
        </li>
        <li>
          Frontend: Es basiert auf einem selbst gehosteten Server, der vom
          Open-Source- Framework <a
            href="https://svelte.dev/"
            target="_blank"
            rel="noopener noreferrer">Svelte</a
          > bereitgestellt wird.
        </li>
        <li>
          Layout und Symbole: Das Layout von AILLA basiert auf dem Open-Source-
          lokal installierten <a
            href="https://bulma.io/"
            target="_blank"
            rel="noopener noreferrer">Bulma CSS</a
          >
          Frameworks gestaltet. Die auf der Website verwendeten Symbole stammen aus
          lokal installierten
          <a
            href="https://fontawesome.com/"
            target="_blank"
            rel="noopener noreferrer">Font Awesome</a
          >-Paketen.
        </li>
      </ul>
      <p>
        Sie können mehr über die Verarbeitung der Benutzerdaten in unserer <a
          href="/data-privacy">Datenschutzrichtlinie</a
        > erfahren.
      </p>
      <h3>Lizenz & Urheberrecht</h3>
      <p>
        Die Inhalte dieser Website stehen unter der <a
          href="https://creativecommons.org/licenses/by-nc/4.0/deed.en"
          target="_blank"
          rel="noopener noreferrer">Creative Commons</a
        >-Lizenz „Namensnennung – Nicht kommerziell 4.0 International“. Die
        Inhalte unterliegen dem deutschen Urheberrecht. Jede Vervielfältigung,
        Bearbeitung, Verbreitung oder jede Form der Verwertung dieses Materials,
        die über den Rahmen des Urheberrechts hinausgeht, bedarf der vorherigen
        schriftlichen Zustimmung des Anbieters. Downloads und Kopien dieser
        Website sind nur für Bildungszwecke und zur nichtkommerziellen Nutzung
        gestattet.
      </p>
      <p>© AILLA. Alle Rechte vorbehalten.</p>
    </div>
  </section>
</div>
