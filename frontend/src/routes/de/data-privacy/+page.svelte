<script>
  import Navbar from "$lib/components/websiteNavbar.svelte";
</script>

<div>
  <Navbar />
  <div id="privacy-content" class="content">
    <h2>Allgemeine Informationen zur Datenverarbeitung</h2>
    <h3>Übersicht der Website</h3>
    <p>
      AILLA besteht im Wesentlichen aus einem Frontend und einem Large Language
      Model (LLM) im Backend. Das Frontend bietet dem Nutzer eine Weboberfläche
      zur Anzeige der generierten Inhalte (Kurzgeschichten) und ermöglicht es
      dem Nutzer, mit diesen zu interagieren. Außerdem bietet es einige
      Funktionen, mit denen der Nutzer Einstellungen anpassen kann (z. B.
      Anzeigemodus und Sprache). Das LLM generiert zunächst eine Kurzgeschichte
      aus fünf zufällig ausgewählten Wörtern aus den vorab gespeicherten
      Vokabular-Daten. Wenn der Nutzer im Text der Geschichte auf Wörter klickt,
      deren Bedeutung er nicht kennt, erscheint direkt ein Popup-Fenster, das
      die Übersetzung des ausgewählten Wortes ins Englische, die Wortart
      (Substantiv, Verb usw.), den Artikel (falls es sich um ein Substantiv
      handelt) sowie ein Beispiel für die Verwendung des Wortes im Englischen
      und Deutschen anzeigt. Nachdem der Nutzer auf die Schaltfläche „Nächste
      Geschichte“ geklickt hat, leitet das Frontend die aktuelle Geschichte und
      die ausgewählten Wörter an das Backend weiter, wo sie in der Datenbank des
      Nutzers gespeichert werden. Die ausgewählten Wörter werden dann als
      Eingabe für das LLM verwendet, um die nächste Geschichte zu generieren.
      Auf Seiten der GWDG wird das LLM auf der <a
        href="https://docs.hpc.gwdg.de/services/ai-services/saia/index.html"
        target="_blank"
        rel="noopener noreferrer">SAIA</a
      >
      gehostet, was bedeutet, dass die Eingabe des Nutzers in das Modell (ausgewählte
      Wörter) und die zurückgegebene Antwort (generierte Geschichte) von der GWDG
      verwaltet werden. Daher empfehlen wir dem Nutzer, die
      <a
        href="https://docs.hpc.gwdg.de/services/ai-services/chat-ai/data-privacy/index.html"
        target="_blank"
        rel="noopener noreferrer">Datenschutzerklärung</a
      >
      der GWDG zu beachten. Wir empfehlen dem Nutzer außerdem, die an AILLA beteiligten
      Drittanbieter zu berücksichtigen, die in unserem
      <a href="/imprint" target="_blank" rel="noopener noreferrer">Impressum</a>
      aufgeführt sind.
    </p>
    <h3>Umfang der Verarbeitung personenbezogener Daten</h3>
    <p>
      Die Verarbeitung personenbezogener Daten beschränkt sich auf das Maß, das
      zur Bereitstellung eines funktionsfähigen Dienstes erforderlich ist, und
      erfolgt ausschließlich mit Einwilligung des Nutzers (Art. 6 Abs. 1 lit. a
      DSGVO). Die Registrierungsdaten des Nutzers werden auf einem selbst
      gehosteten Pocketbase-Server gespeichert, der zur Verwaltung der
      Nutzerkonten und der auf der Benutzeroberfläche erstellten Nutzerdaten
      dient. Auf die in der Datenbank gespeicherten Daten haben nur der Nutzer
      und der Anbieter von AILLA Zugriff. Der Anbieter gibt keine
      personenbezogenen Daten an Dritte weiter, mit Ausnahme der Weitergabe der
      vom Nutzer ausgewählten Wörter an die GWDG, die als LLM-Anbieter fungiert.
    </p>
    <h3>Rechte der betroffenen Personen</h3>
    <p>
      Der Nutzer hat gemäß der Datenschutz-Grundverordnung (DSGVO) der EU und
      dem deutschen Recht folgende Rechte hinsichtlich der Speicherung und
      Verarbeitung personenbezogener Daten.
    </p>
    <h4>Auskunftsrecht der betroffenen Person (Artikel 15 DSGVO; § 34 BDSG)</h4>
    <p>
      Der Nutzer hat das Recht, vom Anbieter eine Bestätigung darüber zu
      verlangen, ob seine personenbezogenen Daten verarbeitet werden (z. B. im
      Rahmen der statistischen Auswertung der Website usw.). Dies umfasst das
      Recht auf Auskunft darüber, ob die den Nutzer betreffenden
      personenbezogenen Daten in ein Drittland oder an eine internationale
      Organisation übermittelt werden. In diesem Zusammenhang ist es ratsam,
      sich an die GWDG unter <a
        href="mailto:support@gwdg.de"
        target="_blank"
        rel="noopener noreferrer">support@gwdg.de</a
      > zu wenden.
    </p>
    <h4>
      Recht auf Löschung / Recht auf Vergessenwerden (Artikel 17/18 DSGVO; § 35
      BDSG)
    </h4>
    <p>
      Der Nutzer hat das Recht, jederzeit die Löschung seiner personenbezogenen
      Daten zu verlangen. Die vom Website-Betreiber gespeicherten Nutzerdaten
      können gelöscht werden, die von der GWDG verarbeiteten Daten unterliegen
      jedoch nicht unserer Kontrolle. Dazu muss sich der Nutzer direkt an die
      GWDG wenden unter
      <a href="mailto:support@gwdg.de" target="_blank" rel="noopener noreferrer"
        >support@gwdg.de</a
      >
    </p>
    <h4>Widerspruchsrecht (Artikel 21 DSGVO; § 36 BDSG)</h4>
    <p>
      Der Nutzer hat das Recht, der Verarbeitung seiner personenbezogenen Daten
      jederzeit zu widersprechen. Recht auf Widerruf seiner Einwilligungen im
      Sinne der Datenschutzgesetze (Artikel 7 Absatz 3 DSGVO). Der Widerruf der
      Einwilligung hat keinen Einfluss auf die Rechtmäßigkeit der Verarbeitung,
      die auf der Grundlage dieser Einwilligung vor deren Widerruf erfolgt ist.
      Um Ihre Einwilligung zu widerrufen, finden Sie die Kontaktdaten des
      Anbieters <a href="/imprint" target="_blank" rel="noopener noreferrer"
        >hier</a
      >.
    </p>
  </div>
</div>
