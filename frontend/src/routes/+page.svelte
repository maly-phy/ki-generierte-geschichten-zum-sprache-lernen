<script>
  import { goto } from "$app/navigation";
</script>

<h1 class="title">AI language Learning App</h1>

<div class="buttons">
  <button class="button is-link" onclick={() => goto("/register")}
    >Register</button
  >
  <button class="button is-danger" onclick={() => goto("/login")}>Login</button>
</div>

<!-- <button onclick={() => goto("/register")}>Register</button>
<button onclick={() => goto("/login")}>Login</button> -->
