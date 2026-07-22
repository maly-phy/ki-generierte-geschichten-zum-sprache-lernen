<script>
  import { goto } from "$app/navigation";

  let email = $state("");
  let password = $state("");
  let passwordConfirm = $state("");

  async function register() {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        passwordConfirm,
      }),
    });
    const result = await response.json();

    if (result.success) {
      alert(
        "Please verify your email. A verification link has been sent to your email.",
      );
    } else {
      alert("Registration failed: " + result.error);
    }
  }
</script>

<section id="register-section" class="section">
  <div id="register-container" class="container">
    <h1 class="title">Create account</h1>
    <div class="field">
      <label class="label" for="email">Email</label>
      <div class="control">
        <input
          id="email"
          class="input"
          type="email"
          placeholder="john@example.com"
          bind:value={email}
        />
      </div>
    </div>
    <div class="field">
      <label class="label" for="password">Password</label>
      <div class="control">
        <input
          id="password"
          class="input"
          type="password"
          placeholder="1234@abc"
          bind:value={password}
        />
      </div>
    </div>
    <div class="field">
      <label class="label" for="passwordConfirm">Confirm Password</label>
      <div class="control">
        <input
          id="passwordConfirm"
          class="input"
          type="password"
          placeholder="1234@abc"
          bind:value={passwordConfirm}
        />
      </div>
    </div>
    <button id="register-btn" class="button is-primary" onclick={register}
      >Register</button
    >
    <button
      id="back-login-btn"
      class="button is-secondary"
      onclick={() => goto("/login")}>Back to Login</button
    >
  </div>
</section>
