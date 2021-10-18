<script context="module">
	export async function preload(page, session) {
        let { discordUser } = session;
        return { discordUser };
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
    import { apiUrl } from '../discord';
    import { onMount } from 'svelte';
    import fetch from 'node-fetch';
    export let discordUser;
    export let callsign;
    onMount(() => {
        callsign = window.localStorage.getItem('callsign');
    })
    function login() {
        location.href = '/api/auth'
    }
    function dashLEO() {
        location.href = '/mdt'
    }
    function createCiv() {
        location.href = '/mdt/civ/create'
    }
    function errorToast(message) {
        toast.push(message, {
            pausable: true,
            theme: {
                '--toastBackground': '#F56565',
                '--toastProgressBackground': '#C53030'
            }
        })
    }
    function openLEOModal() {
        let modal = document.getElementById("md-leo");
        let span = document.getElementsByClassName("close-leo")[0];
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    function openCivModal() {
        let modal = document.getElementById("md-civ");
        let span = document.getElementsByClassName("close-civ")[0];
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    function submitCallsign() {
        let callsign = document.getElementById('callsign').value;
        if (!callsign) {
            return errorToast('You must provide a callsign');
        }
        window.localStorage.setItem('callsign', callsign.toUpperCase());
        dashLEO();
    }

    async function getCharacters(user) {
        let data = await fetch(`${apiUrl}/characters?userid=${user}`, {
            method: 'GET'
        })
        return await data.json();
    }

    function goToDash(uuid) {
        window.location.href = `/mdt/civ/${uuid}`
    }

</script>

<SvelteToast />

<div class="centered">
    <div>
        <div class="section">
            <img class="not-draggable" src="/img/MDT-200.png" alt="SimpleMDT">
            <p class="title">Welcome to SimpleMDT.</p>
            <p class="subtitle">A simple mobile data terminal web app that you can selfhost for your wonderful roleplay community.</p>
        </div>
    </div>
    <div>
        {#if !discordUser?.id}
            <button class="login" on:click={login}>
                <p class="text">
                    Login with
                    <i class="icon-r fab fa-discord white"></i>
                </p>
            </button>
        {:else}
            {#if !callsign}
                <div class="buttons">
                    <button class="login" on:click={openLEOModal}>
                        <p class="text">
                            Law Enforcement
                            <i class="icon-r fas fa-share-square"></i>
                        </p>
                    </button>
                    <button class="login" on:click={openCivModal}>
                        <p class="text">
                            Civilian
                            <i class="icon-r fas fa-share-square"></i>
                        </p>
                    </button>
                </div>
            {:else}
                <div class="buttons">
                    <button class="login" on:click={dashLEO}>
                        <p class="text">
                            Law Enforcement
                            <i class="icon-r fas fa-share-square"></i>
                        </p>
                    </button>
                    <button class="login" on:click={openCivModal}>
                        <p class="text">
                            Civilian
                            <i class="icon-r fas fa-share-square"></i>
                        </p>
                    </button>
                </div>
            {/if}
        {/if}
        <!-- Callsign pop-up modal -->
        <div id="md-leo" class="modal bounceIn centered">
            <div class="modal-content">
                <span class="close-leo">&times;</span>
                <h2 style="font-weight: 400;">Enter your callsign</h2>
                <input type="text" class="callsign" id="callsign"><br />
                <button class="login" on:click={submitCallsign}>
                    <p class="text">
                        Go
                        <i class="icon-r fas fa-chevron-right"></i>
                    </p>
                </button>
            </div>
        </div>
        <!-- Civ pop-up modal -->
        <div id="md-civ" class="modal bounceIn centered">
            <div class="modal-content">
                <span class="close-civ">&times;</span>
                <h2 class="centered" style="font-weight: 400;">Existing characters</h2>
                {#await getCharacters(discordUser.id)}
                    <p></p>
                {:then characters}
                    {#if characters.length > 0}
                        <div class="buttons">
                            {#each characters as character}
                                <button class="button secondary" on:click={(() => goToDash(character.uuid))}>
                                    <p class="text">
                                        {character.fname} {character.lname}
                                        <i class="icon-r fas fa-chevron-right"></i>
                                    </p>
                                </button>
                            {/each}
                        </div>
                    {:else}
                        <p>You have no characters</p>
                    {/if}
                {/await}
                <br />
                <button class="button primary" on:click={createCiv}>
                    <p class="text">
                        Create new character
                        <i class="icon-r fas fa-chevron-right"></i>
                    </p>
                </button>
            </div>
        </div>
    </div>
</div>