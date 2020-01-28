<script>
  import { setContext as baseSetContext } from "svelte";
  import { fade } from "svelte/transition";

  export let key = "state-modal";
  //   export let closeButton = true;
  export let closeOnEsc = true;
  export let closeOnOuterClick = true;
  export let transitionBg = fade;
  export let transitionBgProps = { duration: 250 };
  export let transitionWindow = transitionBg;
  export let transitionWindowProps = transitionBgProps;
  export let styleBg = { top: 0, left: 0 };
  export let styleWindow = {};
  export let styleContent = {};
  export let setContext = baseSetContext;

  let Component = null;
  let props = null;

  let background;
  let wrap;

  const camelCaseToDash = str =>
    str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();

  const toCssString = props =>
    Object.keys(props).reduce(
      (str, key) => `${str}; ${camelCaseToDash(key)}: ${props[key]}`,
      ""
    );

  $: cssBg = toCssString(styleBg);
  $: cssWindow = toCssString(styleWindow);
  $: cssContent = toCssString(styleContent);

  const open = (NewComponent, newProps = {}) => {
    Component = NewComponent;
    props = newProps;
  };

  const close = () => {
    Component = null;
    props = null;
  };

  const state = {
    open: open,
    close: close
  };

  const handleKeyup = ({ key }) => {
    if (closeOnEsc && Component && key === "Escape") {
      event.preventDefault();
      close();
    }
  };

  const handleOuterClick = event => {
    if (
      closeOnOuterClick &&
      (event.target === background || event.target === wrap)
    ) {
      event.preventDefault();
      close();
    }
  };

  function cancelForm({ detail: msg }) {
    console.log(msg);
    close();
  }

  setContext(key, state);
</script>

<style>
  * {
    box-sizing: border-box;
  }

  .bg {
    position: fixed;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.66);
  }

  .window-wrap {
    position: relative;
    margin: 2rem;
    max-height: 100%;
  }

  .window {
    position: relative;
    width: 40rem;
    max-width: 100%;
    max-height: 100%;
    margin: 2rem auto;
    color: black;
    border-radius: 0.2rem;
    background: white;
  }

  .content {
    position: relative;
    padding: 1rem;
    max-height: calc(100vh - 4rem);
    overflow: auto;
  }
</style>

<!-- <svelte:window on:keyup={handleKeyup} /> -->

<div>
  {#if Component}
    <div
      class="bg"
      bind:this={background}
      transition:transitionBg={transitionBgProps}
      style={cssBg}>
      <div class="window-wrap" bind:this={wrap}>
        <div
          class="window"
          transition:transitionWindow={transitionWindowProps}
          style={cssWindow}>
          <!-- {#if closeButton}
            <button on:click={close} class="close" />
          {/if} -->
          <div class="content" style={cssContent}>
            <Component {...props} />
          </div>
        </div>
      </div>
    </div>
  {/if}
  <slot />
</div>
