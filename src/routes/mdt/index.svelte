<script context="module">
	export async function preload(page, session) {
        let { userToken, discordUser } = session;
        if (!userToken) {
            return this.redirect(302, '/api/auth');
        }
        return { discordUser };
	}
</script>

<script>
    import { onMount } from "svelte";
    export let callsign;
    onMount(() => {
        callsign = window.localStorage.getItem('callsign');
        if (!callsign) {
            setTimeout(() => {
                window.location.href = '/';
            }, 3000)
        }
    })
</script>

{#if callsign}
    <div class="centered">
        <div class="section">
            <div class="title">Welcome, {callsign}</div>
        </div>
    </div>
{:else}
    <div class="centered">
        <div class="section">
            <div class="title">Not permitted</div>
            <div class="subtitle">Please make sure you open the mdt from the main page and pick a callsign.</div>
        </div>
    </div>
{/if}