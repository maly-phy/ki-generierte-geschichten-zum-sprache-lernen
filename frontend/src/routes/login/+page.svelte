<script>
  import { goto } from "$app/navigation";
  import { userRecordId } from "$lib/stores/user_record";

  let email = $state("");
  let password = $state("");

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
      userRecordId.set(result.user.id);
      alert("Login successful");
      goto("/dashboard");
    } else {
      alert("Login failed: " + result.error);
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
  </div>
</section>
