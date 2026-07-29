<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import PasswordVisibility from "$lib/components/passwordVisibility.svelte";
  import Navbar from "$lib/components/websiteNavbar.svelte";
  import { messageControl } from "$lib/components/utils";
  import { language } from "$lib/stores/items";

  let email = $state("");
  let password = $state("");
  let loginMessage = $state("");
  let resetMessage = $state("");

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
      if ("PasswordCredential" in window) {
        try {
          const PasswordCredentialCtor = (window as any).PasswordCredential;
          const cred = new PasswordCredentialCtor({
            id: email,
            password: password,
          });
          await navigator.credentials.store(cred);
        } catch (err) {
          console.error("Error storing credentials:", err);
        }
      }
      goto("/dashboard", {
        invalidateAll: true,
      });
      return;
    }
    messageControl((text) => {
      loginMessage = text;
    }, "Please check your email and password.");
  }

  async function resetPassword() {
    const response = await fetch("http://localhost:3000/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const result = await response.json();
    if (result.success) {
      messageControl(
        (text) => {
          resetMessage = text;
        },
        "A password reset link has been sent to your email.",
        5000,
      );
    } else {
      messageControl(
        (text) => {
          resetMessage = text;
        },
        "Please enter your email address to reset the password.",
        5000,
      );
    }
  }

  async function handleKeydown(evt: KeyboardEvent) {
    if (evt.key === "Enter") {
      await login();
    }
  }
</script>

<Navbar />
<section id="login-section" class="section">
  <div id="login-container" class="container">
    <form
      onsubmit={async (e) => {
        e.preventDefault();
        await login();
      }}
    >
      <div class="field">
        <label class="label" for="email"
          >{$language === "en" ? "Email" : "E-Mail"}</label
        >
        <input
          id="email"
          class="input"
          type="email"
          name="email"
          placeholder="john@example.com"
          autocomplete="username"
          bind:value={email}
          onkeydown={handleKeydown}
          required
        />
      </div>

      <PasswordVisibility
        label={$language === "en" ? "Password" : "Passwort"}
        _id="password"
        bind:value={password}
        keyEvt={handleKeydown}
      />
      <a
        id="reset-password-link"
        href="#"
        class="has-text-link has-text-right"
        onclick={(e) => {
          e.preventDefault();
          resetPassword();
        }}
      >
        {$language === "en" ? "Forgot Password?" : "Passwort vergessen?"}
      </a>
      <button id="login-btn" type="submit" class="button is-primary">
        {$language === "en" ? "Login" : "Einloggen"}
      </button>
    </form>

    {#if loginMessage}
      <p class="help is-danger is-size-6 mt-5">{loginMessage}</p>
    {/if}
    {#if resetMessage}
      <p class="help is-info is-size-6 mt-5">{resetMessage}</p>
    {/if}
  </div>
</section>
