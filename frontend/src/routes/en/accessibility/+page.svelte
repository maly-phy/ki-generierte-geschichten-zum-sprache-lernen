<script>
  import Navbar from "$lib/components/websiteNavbar.svelte";
  import { language } from "$lib/stores/items";
</script>

<div>
  <Navbar />
  <section class="section">
    <div id="access-content" class="content">
      <h2>Declaration of Accessibility</h2>
      <p>
        The provider of AILLA aims to make the website accessible in accordance
        with EU directive 2016/2102. Accessibility means that information is
        readable and operable for people with different disabilities.<br />
        The following declaration of accessibility documents the implementation status
        in accordance with the Disability Discrimination Act (BGG) and the relevanct
        contact options.<br />
        The assessment is based on a self-assessment (based on the Web Content Accessibility
        Guidelines (WCAG)). The AILLA provider makes every effort to continuously
        check the accessibility of website by means of spot checks.
      </p>
      <h3>Spots of the declaration</h3>
      <p>
        The accessibility statement applies to all pages of the AILLA website.
        Excluded are the websites of external links, that do not belong to
        AILLA.
      </p>
      <h3>Status of compatibility with the requirements</h3>
      <p>
        AILLA website is partially compliant with the EU Directive 2016/2102.
        However, there are still some areas that do not meet the requirements of
        the EU Directive 2016/2102. The implemented IT features that enhance
        accessibility are listed below.
      </p>
      <h4>Accessibility features</h4>
      <ul>
        <li>
          High contrast colors for all functions of the website with enough
          spaces between them.
        </li>
        <li>Two themes are available (light and dark).</li>
        <li>Two languages (English and German) are supported for all pages.</li>
        <li>
          Keyboard navigation between all functions with the ability to select a
          function (Enter press) or close a burger menu (Escape or space). All
          functions are accessible in a short path and highlighted when focused.
        </li>
        <li>
          Mouse events are supported, where a menu of items can be cosed through
          a mouse click outside the menu, and gets automatically closed once the
          user clicks on another item in the page.
        </li>
        <li>
          Login credentials can be saved in the browser (upto user choice) and
          are then filled automatically in future logins.
        </li>
        <li>
          Information messages given to the user at every action and the
          information message disappears automatically after a certain time (~ 5
          seconds).
        </li>
        <li>
          Adjustability of the website to the mobile mode (small screens upto
          300px).
        </li>
      </ul>
      <p>The designs, which are not barrier-free are listed below.</p>
      <h4>Non-accessible features</h4>
      <ul>
        <li>Easy and sign language are not supported.</li>
        <li>
          The size of the website icon in the browser is small, and controlled
          by the browser.
        </li>
      </ul>
      <h3>Reasons for a lack of accessibility</h3>
      <p>
        The website does not have audio, video, image or PDF content, and
        therefore does not have any accessibility issues related to these items.
        The provider however checks the website regularly and does its best to
        improve accessability, which take a long time to implement.
      </p>
      <h3>Contact and Feedback</h3>
      <p>
        If you would like to report any deficiencies with regard to compliance
        with accessibility requirements or have suggestions or questions
        regarding the implementation of accessibility, please contact the AILLA
        provider directly. You can find the contact information <a
          href={`/${$language}/imprint`}
          target="_blank"
          rel="noopener noreferrer">here</a
        >.
      </p>
      <h3>Conciliation procedure</h3>
      <p>
        If you do not receive a satisfactory response from the AILLA provider,
        you can submit an application to the arbitration board set up by the
        Federal Government Commissioner for Matters relating to Persons with
        Disabilities to initiate arbitration proceedings in accordance with the
        Disability Equality Act (BGG). The arbitration procedure is free of
        charge and no legal assistance is needed.
      </p>
      <h3>Contact to the arbitration board</h3>
      <p>
        Federal Government Commissioner for Matters relating to Persons with
        Disabilities<br /><br />
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
