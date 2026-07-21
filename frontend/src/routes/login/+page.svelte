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

<input bind:value={email} type="email" />
<input bind:value={password} type="password" />

<button onclick={login}>Login</button>
