<script context="module">
	export async function preload(page, session) {
        let { userToken, discordUser } = session;
        if (!userToken) {
            return this.redirect(302, '/api/auth'); // force user to auth if they have no access token.
        }
        return { discordUser };
	}
</script>

<script>
    import { SvelteToast, toast } from '@zerodevx/svelte-toast';
    import { stores } from '@sapper/app';
    import { apiUrl } from '../discord';
    import { onMount } from 'svelte';
    import fetch from 'node-fetch';
    const { session } = stores();
    onMount(() => {
        document.getElementById("contact-form").addEventListener("click", function(event){
            event.preventDefault();
        });
    })
    function errorToast(message) {
        toast.push(message, {
            theme: {
                '--toastBackground': 'var(--red)',
                '--toastProgressBackground': 'var(--red-dark)'
            }
        })
    }
    async function checkForm() {
        let fname = document.getElementById('fname').value;
        let lname = document.getElementById('lname').value;
        let dob = document.getElementById('dob').value;
        if (fname.length < 1 || lname.length < 1 || !dob) {
            errorToast('All fields must be filled out.');
            return false;
        }
        await createCharacter($session.discordUser.id, {fname, lname, dob});
    }

    async function createCharacter(user, characterData) {
        let data = await fetch(`${apiUrl}/characters/create?userid=${user}`, {
            method: 'POST',
            body: JSON.stringify(characterData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$session.userToken}`
            }
        });
        await data.json();
        window.location.href = '/';
    }
    
</script>

<svelte:head>
    <title>SimpleMDT - Creating a character</title>
</svelte:head>

<SvelteToast />

<div class="centered">
    <div class="section">
        <p class="title">Character creator.</p>
        <p class="subtitle">Here you can create your new civilian character!</p>
    </div>
    <form class="contact-form" id="contact-form" >
        <div class="centered">
            <label for="fname">First name</label>
            <div class="control">
                <input class="input" type="text" id="fname" name="fname" autocomplete="off">
            </div>
        </div>
        <div class="centered">
            <label for="lname">Last name</label>
            <div class="control">
                <input class="input" type="text" id="lname" name="lname" autocomplete="off">
            </div>
        </div>
        <div class="centered">
            <label for="dob">DOB</label>
            <div class="control">
                <input class="input date" type="date" id="dob" name="dob" autocomplete="off">
            </div>
        </div>
        <button class="submit-form" on:click={checkForm}>
            Create character<i class="icon-r fas fa-chevron-circle-right"></i>
        </button>
    </form>
</div>

<style>
    .contact-form {
        align-items: center;
        background-color: var(--primary-dark);
        padding: 16px;
        border-radius: 8px;
        vertical-align: middle;
    }
    .input {
        color: var(--nqw);
        width: 250px;
        height: 30px;
        font-size: 18px;
        background-color: var(--primary);
        border: 2px solid var(--nqd);
        border-radius: 5px;
        margin: 6px;
        margin-bottom: 18px;
        padding: 4px;
    }
    .submit-form {
        margin-top: 20px;
        background-color: var(--accent);
        color: var(--nqw);
        border: 1.5px solid var(--nqd);
        border-radius: 6px;
        font-size: 18px;
        /* font-weight: 700; */
        padding: 16px;
        max-width: 50vw;
        cursor: pointer;
        transition: all 0.3s;
    }
    .control {
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .submit-form:hover {
        background-color: var(--accent-dark);
        transition: all 0.5s;
    }
    label {
        text-transform: uppercase;
        font-weight: 600;
    }
</style>