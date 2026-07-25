<script>
  import { goto } from "$app/navigation";
</script>

<section id="landing-section" class="hero is-danger is-fullheight is-centered">
  <div class="hero-body">
    <div id="landing-container" class="container has-text-centered">
      <h1 class="title">Welcome to the AI Language Learning App "AILLA"</h1>
      <h2 id="landing-subtitle" class="subtitle">
        Learn languages with AI-generated stories. Create an account or log in
        to get started.
      </h2>
      <div id="landing-btns" class="buttons is-centered">
        <button
          id="landing-register-btn"
          class="button is-primary"
          onclick={() => goto("/register")}
        >
          Register
        </button>
        <button
          id="landing-login-btn"
          class="button is-link"
          onclick={() => goto("/login")}
        >
          Login
        </button>
      </div>
    </div>
  </div>
</section>
