<script>
  import { fade } from "svelte/transition";
  import { calculate } from "../components/Store";
  let isOpen = false;

  let totals;

  const unsubscribe = calculate.subscribe(v => {
    totals = v;
  });
</script>

<div class="relative">
  <button
    on:click={() => {
      isOpen = !isOpen;
    }}
    class="inline-block text-sm px-4 py-2 leading-none border rounded text-white
    border-white hover:border-transparent hover:text-teal-500 hover:bg-white
    focus:border-white focus:outline-none mt-4 lg:mt-0">
    Totals : {totals.total} &nbsp;
    <i class="fas fa-chevron-down" />
  </button>
  {#if isOpen}
    <div
      transition:fade
      class="w-56 absolute right-0 z-10 bg-white rounded-lg py-2 mt-2 shadow-lg">
      <p class="block px-4 py-2 text-gray-800">per month : {totals.month}</p>
      <p class="block px-4 py-2 text-gray-800">per year : {totals.year}</p>
    </div>
  {/if}
</div>
