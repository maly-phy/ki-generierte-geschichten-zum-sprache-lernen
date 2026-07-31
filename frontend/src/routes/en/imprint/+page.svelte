<script>
  import Navbar from "$lib/components/websiteNavbar.svelte";
  import { language } from "$lib/stores/items";
</script>

<div>
  <Navbar />
  <section class="section">
    <div id="imprint-content" class="content">
      <h2>Imprint</h2>
      <p>
        The following provides information concerning the provider of this
        Website, liability, third-parties, and legal affairs.
      </p>
      <h3>Website</h3>
      <p>AI Language Learning App, abbreviated as AILLA.</p>

      <h3>Provider and editor</h3>
      <p>This Website is provided by:</p>
      <p>
        MSc. Mohamed Aly<br />
        Master degree in Physics<br />
        Master student in applied computer science
      </p>
      <p>
        Institute of Mathematics and Computer Science<br />
        George-August-University of Göttingen Goldschmidtstr. 7<br />
        37077 Göttingen, Germany<br />
      </p>
      <p>
        Primary Email: mohamed.aly@stud.uni-goettingen.de<br />
        Secondary Email: mohamedscience8@gmail.com
      </p>
      <h3>Legal Structure</h3>
      <p>
        AILLA is a <strong>non-profit</strong> personal project and is not associated
        with any company or organization. The website is maintained by Mr. Mohamed
        Aly, who is responsible for its content and operation.
      </p>
      <h3>Foreign Languages</h3>
      <p>AILLA is provided in both English and German.</p>
      <h3>Liability of Content</h3>
      <p>
        AILLA relies on AI-generated stories for language learning. The provider
        makes every effort to ensure that the generated content by the Large
        Language Model (LLM) remains within the learning goals and the purpose
        of the website. However, LLMs can sometimes hallucinate and generate
        inaccurate ,misleading or even unlawful content. Therefore, the provider
        is not liable for any damages or losses arising from the direct or
        indirect use of the website.
      </p>
      <h3>Third Parties</h3>
      <p>We use third-party services to run the website:</p>
      <ul>
        <li>
          Database: We use a self-hosted <a
            href="https://pocketbase.io/"
            target="_blank"
            rel="noopener noreferrer">Pocketbase</a
          > server to store the user registration data and the user data created
          on the UI.
        </li>
        <li>
          API Model: The LLM used in the backend is through a hosted model by
          the <a
            href="https://gwdg.de/"
            target="_blank"
            rel="noopener noreferrer">GWDG</a
          >. The access to the service occurs through an authenticated API key.
        </li>
        <li>
          API Backend: It is built using a self-hosted server provided by the
          open source <a
            href="https://hono.dev/"
            target="_blank"
            rel="noopener noreferrer">Hono</a
          > framework.
        </li>
        <li>
          Frontend: It is built using a self-hosted server provided by the open
          source <a
            href="https://svelte.dev/"
            target="_blank"
            rel="noopener noreferrer">Svelte</a
          > framework.
        </li>
        <li>
          Layout and Icons: The layout of AILLA is designed using the open
          source locally installed <a
            href="https://bulma.io/"
            target="_blank"
            rel="noopener noreferrer">Bulma CSS</a
          >
          framework. The icons used on the website are from locally installed
          <a
            href="https://fontawesome.com/"
            target="_blank"
            rel="noopener noreferrer">Font Awesome</a
          > packages.
        </li>
      </ul>
      <p>
        You can read more about the processing of user's data in our <a
          href={`/${$language}/data-privacy`}
          target="_blank"
          rel="noopener noreferrer">Privacy Policy</a
        >.
      </p>
      <h3>License and copyright</h3>
      <p>
        The content on this website licensed under the <a
          href="https://creativecommons.org/licenses/by-nc/4.0/deed.en"
          target="_blank"
          rel="noopener noreferrrer">Creative Commons</a
        > Attribution-NonCommercial 4.0 International license. The content is subject
        to the German copyright law. Any duplication, processing, distribution, or
        any form of commercialization of such material beyond the scope of copyright
        law requires the prior written consent of the provider. Downloads and copies
        of this website are only permitted for educational and non-commercial use.
      </p>
      <p>© AILLA. All rights reserved.</p>
    </div>
  </section>
</div>
