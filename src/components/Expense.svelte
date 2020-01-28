<script>
  import { expanses } from "../components/Store";
  import FormExpense from "../components/Expense-form";
  import { getContext } from "svelte";
  import { slide } from "svelte/transition";

  export let item;

  let displayDetail = false;
  let detail = "Detail";
  // let dataExpanse;

  const { open } = getContext("state-modal");

  // const unsubscribe = expanses.subscribe(v => {
  //   dataExpanse = v;
  // });

  function toggleDetail() {
    displayDetail = !displayDetail;
    if (displayDetail) {
      detail = "Hide";
    } else {
      detail = "Detail";
    }
  }

  function deleteExpanse(id) {
    let data = $expanses.filter(item => item.id !== id);

    expanses.set(data);
  }

  const modalUpdate = id => {
    open(FormExpense, { mode: "update", id: id });
  };
</script>

<!-- <div class="max-w-sm w-full"> -->
<div class="rounded overflow-hidden shadow-lg w-full">
  <div class="px-6 py-4">
    <div class=" flex items-center font-bold text-xl mb-2">
      {item.name}
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm
        font-semibold text-gray-700 ml-2">
        {item.priority}
      </span>
    </div>
    <p class="text-gray-700 text-base">{item.description}</p>
  </div>

  {#if displayDetail}
    <div transition:slide>
      <!-- <div class="flex flex-wrap justify-between px-10 py-4">
        <div class="items-center">
          <div class="text-center">Amount</div>
          <span
            class="content-center inline-block bg-gray-200 rounded-full px-3
            py-1 text-sm font-semibold text-gray-700 mt-2">
            {item.amount}
          </span>
        </div>

        <div class="items-center">
          <div class="text-center">Plan</div>
          <span
            class="content-center inline-block bg-gray-200 rounded-full px-3
            py-1 text-sm font-semibold text-gray-700 mt-2">
            {item.plan}
          </span>
        </div>

      </div> -->
      <div class="flex items-center px-6 mb-2">
        <table class="table-auto text-sm">
          <tbody>
            <tr>
              <td class="capitalize py-2">Amount</td>
              <td class="pl-6">:</td>
              <td class="capitalize px-4 py-2">
                <span
                  class="content-center inline-block bg-gray-200 rounded-full
                  px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
                  {item.amount}
                </span>
              </td>
            </tr>
            <tr>
              <td class="capitalize">Plan</td>
              <td class="pl-6">:</td>
              <td class="capitalize px-4 py-2">
                <span
                  class="content-center inline-block bg-gray-200 rounded-full
                  px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
                  {item.plan}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <img class="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink">
        <div class="text-sm">
          <p class="text-gray-900 leading-none">Amount</p>
          <p class="text-gray-600">{item.amount}</p>
        </div> -->
      </div>

      <div class="flex flex-wrap justify-between px-10 py-4">
        <div class="items-center">
          <div class="text-center">Day</div>
          <span
            class="content-center inline-block bg-gray-200 rounded-full px-3
            py-1 text-sm font-semibold text-gray-700 mt-2">
            {item.plan === 'day' ? item.amount : 0}
          </span>
        </div>

        <div class="items-center">
          <div class="text-center">Month</div>
          <span
            class="content-center inline-block bg-gray-200 rounded-full px-3
            py-1 text-sm font-semibold text-gray-700 mt-2">
            {item.plan === 'day' ? item.amount * 31 : item.plan === 'month' ? item.amount : 0}
          </span>
        </div>

        <div class="items-center">
          <div class="text-center">Year</div>
          <span
            class="content-center inline-block bg-gray-200 rounded-full px-3
            py-1 text-sm font-semibold text-gray-700 mt-2">
            {item.plan === 'day' ? item.amount * 31 * 12 : item.plan === 'month' ? item.amount * 12 : item.plan === 'year' ? item.amount : 0}
          </span>
        </div>
      </div>
    </div>
  {/if}

  <div class="flex flex-wrap justify-between px-6 py-4">
    <div>
      <button
        on:click={toggleDetail}
        class="inline-block text-sm px-4 py-2 leading-none border rounded
        text-green-600 border-green-600 hover:border-transparent
        focus:outline-none focus:border-green-600 hover:text-white
        hover:bg-green-600 mt-4 lg:mt-0">
        <!-- <i class="fas fa-pen" /> -->
        {detail}
      </button>
    </div>
    <div>
      <button
        on:click={modalUpdate(item.id)}
        class="inline-block text-sm px-4 py-2 leading-none border rounded
        text-blue-600 border-blue-600 hover:border-transparent hover:text-white
        hover:bg-blue-600 mt-4 lg:mt-0">
        <i class="fas fa-pen" />
        Edit
      </button>
      <button
        on:click={deleteExpanse(item.id)}
        class="inline-block text-sm px-4 py-2 leading-none border rounded
        text-red-600 border-red-600 hover:border-transparent hover:text-white
        hover:bg-red-600 mt-4 lg:mt-0">
        <i class="fas fa-trash" />
        Delete
      </button>
    </div>
  </div>
</div>
<!-- </div> -->
