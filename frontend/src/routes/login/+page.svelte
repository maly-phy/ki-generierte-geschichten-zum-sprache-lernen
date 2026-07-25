<script>
  import { goto } from "$app/navigation";
  import PasswordVisibility from "$lib/components/passwordVisibility.svelte";
  import { messageControl } from "$lib/components/utils";

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
      return;
    }
    messageControl((text) => {
      loginMessage = text;
    }, "Please check your email and password.");
  }
</script>

<section id="login-section" class="section">
  <div id="login-container" class="container">
    <div class="field">
      <label class="label" for="email">Email</label>
      <input id="email" class="input" type="email" bind:value={email} />
    </div>
    <PasswordVisibility label="Password" _id="password" bind:value={password} />
    <button id="login-btn" class="button is-primary" onclick={login}>
      Login
    </button>

    {#if loginMessage}
      <p class="help is-danger is-size-6 mt-4">{loginMessage}</p>
    {/if}
  </div>
</section>
