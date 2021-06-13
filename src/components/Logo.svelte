<script>
  import { link } from 'svelte-spa-router'
</script>

<a 
  use:link
  href="/">
  <span>OBDbAPI</span>.COM
</a>

<style lang="scss">
  a {
    display: block;
    font-family: 'Oswald', sans-serif;
    font-size: 20px;
    color: rgba($color--white-50,0.5);
    text-decoration: none;
    span {
      color: $color--primary;
    }
  }
</style>

