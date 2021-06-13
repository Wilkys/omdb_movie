<script>
  import Router from 'svelte-spa-router'
  import routes from '~/routes/index.js';
  import Header from '~/components/Header.svelte'  
  import Footer from '~/components/Footer.svelte'
</script>

<Header />
<Router routes={routes} />
<Footer />
