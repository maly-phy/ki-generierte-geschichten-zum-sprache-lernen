<script>
  import { goto } from "$app/navigation";

  let email = $state("");
  let password = $state("");
  let loginMessage = $state("");

  async function login() {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await response.json();

    if (result.success) {
      goto("/dashboard");
    } else {
      loginMessage = "Please check your login email and password.";
    }
  }
</script>

<section id="login-section" class="section">
  <div id="login-container" class="container">
    <div class="field">
      <label class="label" for="email">Email</label>
      <input id="email" class="input" type="email" bind:value={email} />
    </div>
    <div class="field">
      <label class="label" for="password">Password</label>
      <input
        id="password"
        class="input"
        type="password"
        bind:value={password}
      />
    </div>
    <button id="login-btn" class="button is-primary" onclick={login}>
      Login
    </button>

    {#if loginMessage}
      <article class="message is-danger mt-4 has-text-centered">
        <div class="message-body">
          {loginMessage}
        </div>
      </article>
    {/if}
  </div>
</section>
