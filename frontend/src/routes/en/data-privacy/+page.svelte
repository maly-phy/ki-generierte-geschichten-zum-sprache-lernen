<script>
  import Navbar from "$lib/components/websiteNavbar.svelte";
  import { language } from "$lib/stores/items";
</script>

<div>
  <Navbar />
  <section class="section">
    <div id="privacy-content" class="content">
      <h2>General information on data processing</h2>
      <h3>Overview of the website</h3>
      <p>
        AILLA consists mainly of a frontend and a Large Language Model (LLM) in
        the backend. The frontend provides the user with a web interface to
        display the generated content (short stories) and to allow the user
        interact with it. It also adds some functionalities for the user to
        customize (e.g. display mode and language). The LLM initially generates
        a short story out of five randomly selected words from the pre-stored
        vocabulary data. When the user clicks on words in the story text that he
        does not know their meaning, a pop-up window appears directly that shows
        the translation of the selected word in English, the word type (noun,
        verb, etc.), its article if a noun, and an example of the word usage in
        English and German. After the user clicks on the "Next Story" button,
        the frontend forwards the current story and the selected words to the
        backend, which get saved to the user's database. The selected words are
        then given to the prompt for the LLM generate the next story. On the
        GWDG side, the LLM is hosted on the <a
          href="https://docs.hpc.gwdg.de/services/ai-services/saia/index.html"
          target="_blank"
          rel="noopener noreferrer">SAIA</a
        >
        platform, which means the user's input to the model (selected words) and
        the response returned (generated story) are managed by the GWDG. Therefore,
        we advise the user to consider the
        <a
          href="https://docs.hpc.gwdg.de/services/ai-services/chat-ai/data-privacy/index.html"
          target="_blank"
          rel="noopener noreferrer">data privacy policy</a
        >
        of the GWDG. We alse advise the user to consider the third-parties involved
        in AILLA, which are listed in our
        <a
          href={`/${$language}/imprint`}
          target="_blank"
          rel="noopener noreferrer">Imprint</a
        >.
      </p>
      <h3>Scope of the processing of personal data</h3>
      <p>
        The processing of personal data is limited to the extent necessary to
        provide a functional service and only with the consent of the user (Art.
        6 para. 1 lit. a GDPR). The registration data of the user are stored in
        a self-hosted pocketbase server, which is used to manage the user
        accounts and the user data created on the UI. The data stored in the
        database are only accessible to the user and the provider of AILLA. The
        provider does not share any personal data with third parties, except for
        sharing the users' selected words with the GWDG which is the LLM
        provider.
      </p>
      <h3>Rights of data subjects</h3>
      <p>
        The user has the following rights regarding the storing and processing
        of personal data, according to the General Data Protection Regulation
        (GDPR) of the EU and the German law.
      </p>
      <h4>Right of access by the data subject (Article 15 GDPR; § 34 BDSG)</h4>
      <p>
        The user has the right to request confirmation from the provider whether
        his/her personal data is being processed (e.g. in website statistical
        analysis, etc.). This includes the right to obtain access to information
        as to whether the personal data concerning the user is transferred to a
        third country or to an international organization. For that matter, it
        is advisable to consider contacting the GWDG at <a
          href="mailto:support@gwdg.de"
          target="_blank"
          rel="noopener noreferrer">support@gwdg.de</a
        >.
      </p>
      <h4>
        Right to erasure / Right to be forgotten (Article 17/18 GDPR; § 35 BDSG)
      </h4>
      <p>
        The user has the right to request the deletion of his personal data at
        any time. The user data stored in by the website provider can be
        deleted, however, the data processed by the GWDG is not controlled by
        us. For that, the user needs to contact the GWDG directly at
        <a
          href="mailto:support@gwdg.de"
          target="_blank"
          rel="noopener noreferrer">support@gwdg.de</a
        >
      </p>
      <h4>Right of objection (Article 21 GDPR; § 36 BDSG)</h4>
      <p>
        The user has the right to object to the processing of his personal data
        at any time. Right to withdraw his/her consents in terms of data
        protection laws (Article 7 (3) GDPR). The withdrawal of consent does not
        affect the lawfulness of processing based on such consent before its
        withdrawal. To withdraw your consent, please contact the AILLA provider
        directly. You can find the contact information <a
          href={`/${$language}/imprint`}
          target="_blank"
          rel="noopener noreferrer">here</a
        >.
      </p>
    </div>
  </section>
</div>
