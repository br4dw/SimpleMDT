<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<style>
	h1, p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Rada | {status}</title>
</svelte:head>

<h1 class="centered spacer-top">{status}</h1>

{#if dev && error.stack}
	<p class="left">{error.message}</p>
	<pre class="centered">
		<ul style="border-radius: 5px; padding: 5px;" class="left">
			{error.stack}
		</ul>
	</pre>
{:else if !error.stack}
	<p class="centered">{error.message}</p>
{/if}

<h2 class="centered spacer-top">
	<a href="/" class="main-link">
		<i class="fas fa-home" style="margin-right: 3px;"></i>
		Return home
	</a>
</h2>