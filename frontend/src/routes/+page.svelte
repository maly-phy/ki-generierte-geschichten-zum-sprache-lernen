<script>
  import { goto } from "$app/navigation";
</script>

<section id="landing-section" class="section">
  <div id="landing-container" class="container">
    <h1 class="title">Welcome to the AI Language Learning App</h1>
    <p id="landing-subtitle" class="subtitle">
      Learn languages with AI-generated stories. Create an account or log in to
      get started.
    </p>
    <div id="landing-btns" class="buttons">
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
</section>
