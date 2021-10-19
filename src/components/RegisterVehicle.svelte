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
        let make = document.getElementById('make').value;
        let model = document.getElementById('model').value;
        let plate = document.getElementById('plate').value;
        let color = document.getElementById('color').value;
        let stolen = document.getElementById('stolen').checked;
        // if (make.length < 1 || model.length < 1 || plate.length < 1 || color.length < 1) {
        //     errorToast('All fields must be filled out.');
        //     return false;
        // }
        await registerVehicle($session.discordUser.id, {make, model, plate, color, stolen});
    }

    async function registerVehicle(user, vehicleData) {
        let url = window.location.href.split('/');
        let uuid = url[url.length-3];
        let data = await fetch(`${apiUrl}/vehicles/create?uuid=${uuid}&userid=${user}`, {
            method: 'POST',
            body: JSON.stringify(vehicleData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$session.userToken}`
            }
        });
        await data.json();
        window.location.href = `javascript:history.back()`;
    }
    
</script>

<svelte:head>
    <title>SimpleMDT - Registering a vehicle</title>
</svelte:head>

<SvelteToast />

<div class="centered">
    <div class="section">
        <p class="title">Vehicle registration</p>
        <p class="subtitle">Here you can register a new vehicle!</p>
    </div>
    <form class="contact-form" id="contact-form" >
        <div class="centered">
            <label for="make">Make</label>
            <div class="control">
                <input class="input" type="text" id="make" name="make" autocomplete="off">
            </div>
        </div>
        <div class="centered">
            <label for="model">Model</label>
            <div class="control">
                <input class="input" type="text" id="model" name="model" autocomplete="off">
            </div>
        </div>
        <div class="centered">
            <label for="plate">Plate</label>
            <div class="control">
                <input class="input" type="text" id="plate" name="plate" autocomplete="off">
            </div>
        </div>
        <div class="centered">
            <label for="color">Color</label>
            <div class="control">
                <input class="input" type="text" id="color" name="color" autocomplete="off">
            </div>
        </div>
        <div class="centered">
            <label for="stolen">Reported stolen</label>
            <div class="control">
                <input class="check" type="checkbox" id="stolen" name="stolen" autocomplete="off">
            </div>
        </div>
        <button class="submit-form" on:click={checkForm}>
            Register vehicle<i class="icon-r fas fa-chevron-circle-right"></i>
        </button>
    </form>
</div>

<style>
    .check {
        width: 40px;
        height: 40px;
        border-radius: 6px;
    }
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