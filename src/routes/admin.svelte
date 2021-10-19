<script context="module">
	export async function preload(page, session) {
        let { discordUser } = session;
        return { page, discordUser };
	}
</script>

<svelte:head>
    <title>SimpleMDT - Admin</title>
</svelte:head>

<script>
    export let discordUser;
    import { admins } from '../discord';
</script>

{#if admins.some(admin => discordUser.id === admin)}
    <div class="centered">
        <div class="section">
            <p class="title">Admin</p>
            <p class="subtitle">Coming soon...</p>
        </div>
    </div>
{:else}
    <div class="centered">
        <div class="section">
            <p class="title">Restricted</p>
            <p class="subtitle">You don't have permission to view this page.</p>
        </div>
    </div>
{/if}