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

<input bind:value={email} placeholder="Email Address" type="email" />
<input bind:value={password} placeholder="Password" type="password" />
<input
  bind:value={passwordConfirm}
  placeholder="Confirm Password"
  type="password"
/>

<button onclick={register}>Register</button>
<button onclick={() => goto("/login")}>Back to Login</button>
