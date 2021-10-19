<script context="module">
	export async function preload(page, session) {
        let { discordUser } = session;
        const { uuid } = page.params;
        return { uuid, discordUser };
	}
</script>

<style>
    .buttons {
        margin-bottom: 20px;
        display: grid;
    }
    .inline {
        display: inline-block;
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
        margin: 5px;
    }
    .blurple {
        background-color: var(--blurple);
    }
    .blurple:hover {
        background-color: var(--blurple-dark);
    }
    .danger {
        background-color: var(--red);
    }
    .danger:hover {
        background-color: var(--red-dark);
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
    .box {
        width: 40%;
        height: 250px;
        background-color: var(--background-dark);
        border-radius: 5px;
        padding: 10px;
        margin: 5px;
        overflow-y: scroll;
    }
    .box-title {
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 600;
        text-align: center !important;
    }
    .right {
        float: right;
    }
    .left {
        float: left;
    }
    .space {
        margin: 20px;
    }
</style>

<svelte:head>
    <title>SimpleMDT - Home</title>
</svelte:head>

<script>
    import { SvelteToast, toast } from '@zerodevx/svelte-toast';
    import { apiUrl } from '../../../../discord';
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

    async function getVehicles(user) {
        let data = await fetch(`${apiUrl}/vehicles?uuid=${uuid}&userid=${user}`, {
            method: 'GET'
        })
        return await data.json();
    }

    async function deleteCharacter(uuid, user) {
        let data = await fetch(`${apiUrl}/characters/delete?uuid=${uuid}&userid=${user}`, {
            method: 'GET'
        })
        await data.json();
        window.location.href = '/';
    }

    function openVehicleMenu(vehicle) {

    }

    function registerNewVehicle() {
        window.location.href = `/mdt/civ/${uuid}/vehicles/register`
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
                <p class="title space">Hello {character.fname} {character.lname}</p>
                <div class="buttons inline">
                    <a href="/?modal=true&type=civ">
                        <button class="button blurple" style="padding: 4px;">
                            <i class="icon-l fas fa-sync"></i>Switch character
                        </button>
                    </a>
                    <button class="button danger" style="padding: 4px;" on:click={(async() => { deleteCharacter(character.uuid, discordUser.id) })}>
                        <i class="icon-l fas fa-trash-alt"></i>Delete character
                    </button>
                </div>
            </div>
        </div>
        <div class="centered">
            <div class="box left">
                <span class="box-title">Registered vehicles</span><br />
                {#await getVehicles(discordUser.id)}
                    <p></p>
                {:then vehicles}
                    {#if vehicles.length > 0}
                        <div class="buttons">
                            {#each vehicles as vehicle}
                                <button class="button secondary" on:click={(() => openVehicleMenu(vehicle))}>
                                    {`${vehicle.make} ${vehicle.model}`}
                                </button>
                            {/each}
                        </div>
                    {:else}
                        <p style="margin-bottom: 30px;">You have no registered vehicles</p>
                    {/if}
                {/await}
                <button class="button primary" on:click={registerNewVehicle}>
                    Register new vehicle<i class="icon-r fas fa-plus"></i>
                </button>
            </div>
            <div class="box right">
                <span class="box-title">Licenses</span><br />
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