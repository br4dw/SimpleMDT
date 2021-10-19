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

<svelte:head>
    <title>SimpleMDT - MDT</title>
</svelte:head>

<style>
    .buttons {
        display: inline-block;
        margin: 10px;
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
        margin: 4px;
        text-transform: uppercase;
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
    .left {
        float: left;
    }
    .active-call {
        border: 2px solid var(--text);
        height: 250px;
        width: 500px;
        overflow-y: scroll;
        margin-left: -90px;
        border-radius: 4px;
        padding: 10px;
    }
    .active {
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 600;
    }
    .active-content {
        margin: 0;
        color: var(--text-secondary)
    }
    ::-webkit-scrollbar {
        transition: all 0.2s ease-in-out;
        width: 6px;
        border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb {
        background: var(--text-secondary);
        border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: var(--text);
    }
</style>

{#if callsign}
    <div class="centered content">
        <div class="section">
            <p class="title">Welcome, <b>{callsign}</b></p>
            <p class="subtitle">Here is your MDT dashboard.</p>
        </div>
    </div>
    <div class="centered">
        <div class="buttons">
            <button class="button primary">Name search</button>
            <button class="button primary">Plate search</button>
            <button class="button secondary">10 codes</button>
            <button class="button secondary">Notepad</button>
        </div>
    </div>
    <div class="container">
        <p class="active left">Active call</p> <br /><br />
        <div class="active-call left">
            <p class="active-content">What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


            </p>
        </div>
    </div>
{:else} <!-- User is not logged in / doesn't have a callsign -->
    <div class="centered">
        <div class="section">
            <div class="title">Not permitted</div>
            <div class="subtitle">Please make sure you open the mdt from the main page and pick a callsign.</div>
        </div>
    </div>
{/if}