<script context="module">
	export async function preload(page, session) {
        let { discordUser } = session;
        const { uuid } = page.params;
        return { uuid, discordUser };
	}
</script>

<style>
    .buttons {
        display: inline-block;
        margin-bottom: 40px;
    }
    .button {
        border: none;
        box-shadow: none;
        transition: all 0.3s ease-in-out;
        color: var(--text);
        font-size: 16px;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
    }
    .login {
        margin: 2px !important;
    }
    .primary {
        background-color: var(--accent);
    }
    .primary:hover {
        background-color: var(--accent-dark);
    }
    .secondary {
        background-color: var(--nqd);
    }
    .secondary:hover {
        background-color: var(--background-secondary);
    }
</style>

<svelte:head>
    <title>SimpleMDT - Home</title>
</svelte:head>

<script>
    import { SvelteToast, toast } from '@zerodevx/svelte-toast';
    import { apiUrl } from '../../../discord';
    import { onMount } from 'svelte';
    import fetch from 'node-fetch';
    export let discordUser;
    export let uuid;
    function errorToast(message) {
        toast.push(message, {
            pausable: true,
            theme: {
                '--toastBackground': '#F56565',
                '--toastProgressBackground': '#C53030'
            }
        })
    }
    async function validateCharacter(uuid, user) {
        let data = await fetch(`${apiUrl}/characters/get?uuid=${uuid}&userid=${user}`, {
            method: 'GET'
        })
        return await data.json();
    }

</script>

<SvelteToast />

{#await validateCharacter(uuid, discordUser.id)}
    <div class="centered">
        <div class="section">
            <p class="title">Checking your character...</p>
            <p class="subtitle">Please wait a moment while we check this character exists and belongs to you.</p>
        </div>
    </div>
{:then character}
    {#if character}
        <div class="centered">
            <div class="section">
                <p class="title">Hello {character.fname} {character.lname}</p>
                <p class="subtitle"></p>
            </div>
        </div>
    {:else}
        <div class="centered">
            <div class="section">
                <p class="title">Something went wrong</p>
                <p class="subtitle">This character either doesn't exist or it doesn't belong to you.</p>
            </div>
        </div>
    {/if}
{/await}