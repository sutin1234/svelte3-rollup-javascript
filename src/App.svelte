<script>
  import { Button } from 'svelte-materialify';
  export let name;
</script>

<main>
  <h1 class="text-red-200">
    {name} Svlete HMR 2021!
  </h1>
  <Button class="red white-text">Red Text Material</Button>
  <Button outlined class="primary-text">Primary Material</Button>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
