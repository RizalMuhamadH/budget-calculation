<script>
  import { onMount, afterUpdate } from "svelte";
  import { getContext } from "svelte";
  import Expense from "../components/Expense";
  import Title from "../components/Title";
  import FormExpense from "../components/Expense-form";
  import { expanses, calculate } from "../components/Store";
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";

  let dataExpanse;

  const unsubscribe = expanses.subscribe(v => {
    dataExpanse = v;
  });

  const { open, close } = getContext("state-modal");

  const showModal = () => {
    open(FormExpense, { mode: "add", id: "" });
  };

  function setCalculate() {
    let day = 0;
    let month = 0;
    let year = 0;
    let total = 0;

    $expanses.map(item => {
      if (item.plan === "day") {
        day += item.amount;
      }
      if (item.plan === "month") {
        month += item.amount;
      }
      if (item.plan === "year") {
        year += item.amount;
      }

      total += item.amount;
    });

    day = day * 31;

    month = month + day;

    year = year + month * 12;

    let totals = { total: total, month: month, year: year };

    calculate.set(totals);
  }

  function setLocalStorage() {
    setCalculate();
    localStorage.setItem("expanse", JSON.stringify($expanses));
    localStorage.setItem("totals", JSON.stringify($calculate));
  }

  function removeAll() {
    expanses.set([]);
    calculate.set({ total: 0, month: 0, year: 0 });
  }

  onMount(() => {
    expanses.set(
      localStorage.getItem("expanse")
        ? JSON.parse(localStorage.getItem("expanse"))
        : []
    );

    calculate.set(
      localStorage.getItem("totals")
        ? JSON.parse(localStorage.getItem("totals"))
        : { total: 0, month: 0, year: 0 }
    );
  });

  afterUpdate(() => {
    setLocalStorage();
  });
</script>

<style>

</style>

<svelte:head>
  <title>Budget Calculator</title>
</svelte:head>

<div class="flex justify-end">
  <button
    on:click={showModal}
    class="inline-block text-sm px-4 py-2 leading-none border rounded
    text-teal-500 border-teal-500 hover:border-transparent hover:text-white
    hover:bg-teal-500 mt-4 lg:mt-0">
    <i class="fas fa-plus" />
    Add Item
  </button>
</div>

<h1 class="text-xl">Expenses</h1>
<div class="flex flex-wrap">
  {#each dataExpanse as item, index (item.id)}
    <div
      class="max-w-sm w-full m-4"
      in:fly={{ x: -200, delay: (index + 1) * 500 }}
      out:fly={{ x: 200, delay: (index + 1) * 500 }}
      animate:flip>
      <Expense {item} />
    </div>
  {/each}
</div>

{#if dataExpanse.length != 0}
  <div class="flex w-full justify-center py-5">
    <button
      on:click={removeAll}
      class="capitalize inline-block text-md px-4 py-2 leading-none border
      rounded text-red-600 border-red-600 hover:border-transparent
      hover:text-white hover:bg-red-600 mt-4 lg:mt-0">
      <i class="fas fa-trash-alt" />
      Remove All
    </button>
  </div>
{/if}
