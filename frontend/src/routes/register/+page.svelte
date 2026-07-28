<script>
  import { goto } from "$app/navigation";
  import PasswordVisibility from "$lib/components/passwordVisibility.svelte";
  import Navbar from "$lib/components/websiteNavbar.svelte";
  import { messageControl } from "$lib/components/utils";
  import { language } from "$lib/stores/items";

  let email = $state("");
  let password = $state("");
  let passwordConfirm = $state("");

  let verifyMessage = $state("");
  let registerMessage = $state("");
  let checked = $state(false);

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
    if (!registerMessage.includes("This email is already registered")) {
      messageControl((text) => {
        registerMessage = text;
      }, registerMessage);
    }
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

<Navbar />
<section id="register-section" class="section">
  <div id="register-container" class="container">
    <h1 class="title">
      {$language === "en" ? "Create account" : "Konto erstellen"}
    </h1>
    <div class="field">
      <label class="label" for="email"
        >{$language === "en" ? "Email" : "E-Mail"}</label
      >
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

    <PasswordVisibility
      label={$language === "en" ? "Password" : "Passwort"}
      _id="password"
      bind:value={password}
    />
    <PasswordVisibility
      label={$language === "en" ? "Confirm Password" : "Passwort bestätigen"}
      _id="passwordConfirm"
      bind:value={passwordConfirm}
    />
    <div id="privacy-check" class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" required bind:checked />
          {$language === "en" ? "I agree to the" : "Ich stimme der"}
          <a
            href={`/${$language}/data-privacy`}
            target="_blank"
            rel="noopener noreferrer"
            >{$language === "en"
              ? "data privacy policy"
              : "Datenschutzrichtlinie"}</a
          >
        </label>
      </div>
    </div>

    {#if checked}
      <button id="register-btn" class="button is-primary" onclick={register}
        >{$language === "en" ? "Register" : "Registrieren"}</button
      >
    {/if}

    <button
      id="back-login-btn"
      class="button is-secondary"
      onclick={() => goto("/login")}
      >{$language === "en" ? "Back to Login" : "Zurück zum Login"}</button
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
