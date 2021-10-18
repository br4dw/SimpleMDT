<script context="module">
	export async function preload(page, session) {
        let { discordUser } = session;
        return { discordUser };
	}
</script>

<style>

</style>

<svelte:head>
    <title>SimpleMDT - Home</title>
</svelte:head>

<script>
    import { SvelteToast, toast } from '@zerodevx/svelte-toast'
    import { onMount } from 'svelte';
    export let discordUser;
    export let callsign;
    onMount(() => {
        callsign = window.localStorage.getItem('callsign');
    })
    function login() {
        location.href = '/api/auth'
    }
    function dash() {
        location.href = '/mdt'
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
    function openModal() {
        let modal = document.getElementById("md");
        let span = document.getElementsByClassName("close")[0];
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
        dash();
    }

</script>

<SvelteToast />

<div class="centered">
    <div>
        <div class="section">
            <img class="logo not-draggable" src="/img/MDT.png" alt="SimpleMDT">
            <p class="title">Welcome to SimpleMDT.</p>
            <p class="subtitle">A simple mobile data terminal web app that you can selfhost for your wonderful roleplay community.</p>
        </div>
    </div>
    <div class="v-center">
        {#if !discordUser?.id}
            <button class="login" on:click={login}>
                <p class="text">
                    Login with
                    <i class="icon-r fab fa-discord white"></i>
                </p>
            </button>
        {:else}
            {#if !callsign}
                <button class="login" on:click={openModal}>
                    <p class="text">
                        Open MDT
                        <i class="icon-r fas fa-share-square"></i>
                    </p>
                </button>
            {:else}
                <button class="login" on:click={dash}>
                    <p class="text">
                        Open MDT
                        <i class="icon-r fas fa-share-square"></i>
                    </p>
                </button>
            {/if}
        {/if}
        <div id="md" class="modal bounceIn centered">
            <div class="modal-content">
                <span class="close">&times;</span>
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
    </div>
</div>