<script>
  import { onMount } from "svelte";
  import { getContext } from "svelte";
  // import { createEventDispatcher } from "svelte";
  import { expanses } from "../components/Store";

  // const dispatch = createEventDispatcher();

  const { close } = getContext("state-modal");

  export let mode;

  export let id;

  let name = "";
  let description = "";
  let amount;
  let priority;
  let plan;

  let isEmptyName = false;
  let isEmptyDesc = false;
  let isEmptyAmount = false;

  let priorityData = ["low", "medium", "high"];
  let planData = ["one time", "day", "month", "year"];

  onMount(() => {
    if (mode === "update") {
      let expanse = $expanses.find(item => item.id === id);

      name = expanse.name;
      description = expanse.description;
      amount = expanse.amount;
      priority = expanse.priority;
      plan = expanse.plan;
    }
  });

  function submitHandle() {
    isEmptyName = !name;
    isEmptyDesc = !description;
    isEmptyAmount = !amount;

    if (!isEmptyName && !isEmptyDesc && !isEmptyAmount) {
      let expanse = {
        id: !id ? Math.random() * Date.now() : id,
        name,
        description,
        amount,
        priority,
        plan
      };
      if (mode === "add") {
        let newExpanse = [expanse, ...$expanses];

        expanses.set(newExpanse);
      } else {
        let data = $expanses.map(item => {
          return item.id === id ? { ...item, ...expanse } : { ...item };
        });

        expanses.set(data);
      }

      close();
    }
  }
</script>

<style>
  .appearance {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
</style>

<div class="border-b-2 border-gray-400 w-full mb-4 pb-2">
  <h1 class="text-3xl capitalize ">{mode} Expense</h1>
</div>
<form class="w-full">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold
        mb-2"
        for="grid-name">
        Name
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border
        border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none
        focus:bg-white focus:border-gray-500"
        type="text"
        bind:value={name}
        placeholder="Name" />
      {#if isEmptyName}
        <p class="text-red-600 text-xs italic">Cannot empty</p>
      {/if}
    </div>
  </div>

  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold
        mb-2"
        for="grid-description">
        Description
      </label>
      <textarea
        bind:value={description}
        class="appearance-none block w-full bg-gray-200 text-gray-700 border
        border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none
        focus:bg-white focus:border-gray-500 h-16" />
      {#if isEmptyDesc}
        <p class="text-red-600 text-xs italic">Cannot empty</p>
      {/if}
      <!-- <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> -->
    </div>
  </div>

  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold
        mb-2"
        for="grid-amount">
        Amount
      </label>
      <input
        class="appearance appearance-none block w-full bg-gray-200 text-gray-700
        border border-gray-200 rounded py-3 px-4 mb-3 leading-tight
        focus:outline-none focus:bg-white focus:border-gray-500"
        type="number"
        bind:value={amount}
        placeholder="Amount" />
      {#if isEmptyAmount}
        <p class="text-red-600 text-xs italic">Cannot empty</p>
      {/if}
      <!-- <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> -->
    </div>
  </div>

  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold
        mb-2"
        for="grid-priority">
        Priority
      </label>
      <div class="relative">
        <select
          bind:value={priority}
          class="block appearance-none appearance w-full bg-gray-200 border
          border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight
          focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-priority">
          {#each priorityData as item}
            <option value={item}>{item[0].toUpperCase()}{item.slice(1)}</option>
          {/each}
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex
          items-center px-2 text-gray-700">
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757
              6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold
        mb-2"
        for="grid-plan">
        Plan
      </label>
      <div class="relative">
        <select
          bind:value={plan}
          class="block appearance-none appearance w-full bg-gray-200 border
          border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight
          focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-plan">
          {#each planData as item}
            <option value={item}>{item[0].toUpperCase()}{item.slice(1)}</option>
          {/each}
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex
          items-center px-2 text-gray-700">
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757
              6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-between">
    <button
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded
      focus:outline-none focus:shadow-outline"
      type="button"
      on:click={() => close()}>
      Cancel
    </button>
    <button
      on:click={submitHandle}
      class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4
      rounded focus:outline-none focus:shadow-outline"
      type="button">
      {mode}
    </button>
  </div>
</form>
