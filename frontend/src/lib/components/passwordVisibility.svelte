<script>
  let { value = $bindable(), label = "Password", _id = "password" } = $props();
  let showPassword = $state(false);

  const togglePassword = () => {
    showPassword = !showPassword;
  };
</script>

<div class="field">
  <label class="label" for={_id}>{label}</label>
  <div class="control password-control">
    <input
      id={_id}
      class="input"
      type={showPassword ? "text" : "password"}
      placeholder="1234@abc"
      bind:value
    />
    <button
      type="button"
      class="password-toggle"
      aria-label="toggle password visibility"
      aria-pressed={showPassword}
      onclick={togglePassword}
    >
      <span class="icon is-small">
        <i class={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
      </span>
    </button>
  </div>
</div>
