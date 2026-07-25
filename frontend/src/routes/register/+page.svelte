<script>
  import { goto } from "$app/navigation";
  import PasswordVisibility from "$lib/components/passwordVisibility.svelte";
  import { messageControl } from "$lib/components/utils";

  let email = $state("");
  let password = $state("");
  let passwordConfirm = $state("");

  let verifyMessage = $state("");
  let registerMessage = $state("");

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
      registerMessage = "";
      verifyMessage =
        "Please verify your email. A verification link has been sent to your email.";
      messageControl(
        (text) => {
          verifyMessage = text;
        },
        verifyMessage,
        1000,
      );
    } else {
      verifyMessage = "";
      if (!email || !password || !passwordConfirm) {
        registerMessage = "All fields are required.";
      } else if (password && password !== passwordConfirm) {
        registerMessage = "Passwords do not match.";
      } else if (password && password.length < 8) {
        registerMessage = "Password must be at least 8 characters long.";
      } else {
        registerMessage =
          "This email is already registered, please login or resend the verification link or use a different email to register.";
      }
    }
    messageControl((text) => {
      registerMessage = text;
    }, registerMessage);
  }

  async function verifyAccount() {
    const response = await fetch("http://localhost:3000/api/request-verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const result = await response.json();
    if (result.success) {
      verifyMessage = "Verification email sent. Please check your inbox.";
      registerMessage = "";
    } else {
      registerMessage = "Failed to send verification email. Please try again.";
      verifyMessage = "";
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

    <PasswordVisibility label="Password" _id="password" bind:value={password} />
    <PasswordVisibility
      label="Confirm Password"
      _id="passwordConfirm"
      bind:value={passwordConfirm}
    />

    <button id="register-btn" class="button is-primary" onclick={register}
      >Register</button
    >
    <button
      id="back-login-btn"
      class="button is-secondary"
      onclick={() => goto("/login")}>Back to Login</button
    >
    {#if registerMessage && registerMessage.includes("This email is already registered")}
      <button
        id="resend-verify-btn"
        class="button is-link mt-4"
        onclick={verifyAccount}
      >
        Resend Verification Email
      </button>
    {/if}

    {#if registerMessage}
      <p class="help is-danger is-size-6 mt-4">{registerMessage}</p>
    {:else if verifyMessage}
      <p class="help is-success is-size-6 mt-4">{verifyMessage}</p>
    {/if}
  </div>
</section>
