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
    import { SvelteToast, toast } from '@zerodevx/svelte-toast';
    import { apiUrl } from '../../discord';
    // import interact from 'interactjs';
    import { onMount } from 'svelte';
    import fetch from 'node-fetch';
    export let callsign;
    export let tencodes;
    tencodes = [
        'Poor reception',
        'Good reception',
        'Stop transmitting',
        'Message received, affirmative, OK',
        'Relay this information to (name of a person, officer, etc.)',
        'Officer is busy',
        'Out of service, unavailable',
        'In-service',
        'Please repeat (please repeat the message)',
        'Negative (no)',
        'Dog case (or other animal)',
        'Standby',
        'Civilians present and listening (this let’s dispatch or others know not to disclose sensitive information)',
        'Prowler report',
        'En route to the station with suspect',
        'Domestic problem',
        'Meet complainant',
        'Urgent matter',
        'Return to the station',
        'Specify location/my location is (name of location)',
        'Place a phone call to (name of person)',
        'Disregard',
        'Stand by on this frequency (1023 also stands for “on the scene” in some areas)',
        'Assignment completed',
        'Please report in person (meeting)',
        'Detaining suspect',
        'Vehicle registration request',
        'Arrests / warrants found on driver’s license',
        'Arrests / warrants found on the vehicle',
        'Unnecessary use of police radio',
        'Crime or criminal act in progress',
        'Gun / firearm',
        'Emergency traffic follows, hold routine messages',
        'Radio Frequency open (cancels the 10-33 message)',
        'Major crime alert',
        'What is the correct time of day?',
        'Suspicious vehicle (investigate)',
        'Suspicious vehicle (stopping)',
        'False alarm, premises were occupied',
        'False alarm, no activity, premises appears to be secure',
        'Begin watch',
        'End of watch. The end of watch signal is used when an officer passes away. For instance, either in the line of duty or due to illness. The ceremony is typically conducted by the dispatcher issuing one last call to the officer, followed by a moment of silence.',
        'Information',
        'Permission to leave',
        'Fueling squad car / vehicle',
        'Provide motorist assistance',
        'Emergency road repair needed at',
        'Traffic standard repair needed at',
        'En route to an assignment',
        'Accident',
        'Tow truck needed',
        'Ambulance needed',
        'Road blocked at (name of location)',
        'Animals on the highway',
        'Security check (also used for an intoxicated driver)',
        'Intoxicated pedestrian',
        'Hit-and-run accident',
        'Direct traffic',
        'Escort',
        'Squad in the vicinity, lock-out',
        'Personnel in area',
        'Reply to message',
        'Clear to copy info?',
        'Message for delivery',
        'Net message assignment',
        'Net message cancellation',
        'Person calling for help',
        'Dispatch message',
        'Confirms message received',
        'Prowler, fire alarm',
        'Gun involved, advise nature of fire',
        'Shooting, fire progress report',
        'Smoke reported',
        'Negative, no',
        'In contact with (name)',
        'Officer is en route / on the way',
        'Estimated Time of Arrival (ETA), amount of time until',
        'Need assistance',
        'bomb threat',
        'Bomb has exploded',
        'Breathalyzer report',
        'Reserve lodging',
        'Work school crossing at (location)',
        'If meeting _, please advise ETA',
        'Delay due to (reason)',
        'Police officer on-duty',
        'Pickup',
        'Please lookup the present phone number of (person)',
        'Bomb threat',
        'Bank alarm going off at (location)',
        'Picking up a prisoner',
        'Improperly parked vehicle',
        'Blockage',
        'Drag racing',
        'Prisoner/subject is in custody',
        'Psych patient, a person exhibiting crazy or psychotic behavior',
        'Check signal (1097 also means “On Scene” in California and other areas)',
        'Prison break or jailbreak',
        'Wanted/stolen record',
    ]


    // function drag(elementId) {
    //     const position = { x: 0, y: 0 };
    //     interact(elementId).draggable({
    //         listeners: {
    //             start (event) {
    //             console.log(event.type, event.target)
    //         },
    //         move (event) {
    //             position.x += event.dx
    //             position.y += event.dy

    //             event.target.style.transform =
    //                 `translate(${position.x}px, ${position.y}px)`
    //             },
    //         }
    //     })
    // }

    
    onMount(() => {
        Element.prototype.drag = function() {
            var mousemove = function(e) { // document mousemove
                this.style.left = e.clientX + 'px'
                this.style.top = e.clientY + 'px'
                this.style.left = ( e.clientX - this.dragStartX - 290 ) + 'px';
                this.style.top  = ( e.clientY - this.dragStartY - 78 ) + 'px';
            }.bind(this);
            var mouseup = function(e) { // document mouseup
                document.removeEventListener('mousemove',mousemove);
                document.removeEventListener('mouseup',mouseup);
            }.bind(this);
            const handle = document.getElementById('handle');
            handle.addEventListener('mousedown', function(e) { // element mousedown
                this.dragStartX = e.offsetX;
                this.dragStartY = e.offsetY;
                document.addEventListener('mousemove',mousemove);
                document.addEventListener('mouseup',mouseup);
            }.bind(this));
            this.style.position = 'absolute' // fixed might work as well
        }
        document.getElementById('md-notepad').drag();
        // drag('.md-notepad-header')
        let notepad = document.getElementById('notepad')
        notepad.addEventListener('dragover', function (e) {
            e.preventDefault();
            return false;
        })
        notepad.addEventListener('drop', function (e) {
            e.preventDefault();
            return false;
        })
        // dragElement(document.getElementById('md-notepad'));
        callsign = window.localStorage.getItem('callsign');
        if (!callsign) {
            setTimeout(() => {
                window.location.href = '/';
            }, 3000)
        }
    })
    function errorToast(message) {
        toast.push(message, {
            pausable: true,
            theme: {
                '--toastBackground': 'var(--red)',
                '--toastProgressBackground': 'var(--red-dark)'
            }
        })
    }
    function openCharacterSearchModal() {
        let modal = document.getElementById('md-char');
        let span = document.getElementsByClassName('close-char')[0];
        let fname = document.getElementById('fname');
        let lname = document.getElementById('lname');
        let submit = document.getElementById('submit');
        function focusInput() {
            fname.focus();
        }
        setTimeout(focusInput, 100);
        fname.addEventListener('keyup', function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                submit.click();
            }
        })
        lname.addEventListener('keyup', function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                submit.click();
            }
        })
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
    function openTenCodesModal() {
        let modal = document.getElementById('md-10codes');
        let span = document.getElementsByClassName('close-10codes')[0];
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
    function openNotepadModal() {
        let modal = document.getElementById('md-notepad');
        let close = document.getElementById('close-notepad');
        let minimise = document.getElementById('minimise-notepad');
        modal.style.display = "flex";
        close.onclick = function() {
            document.getElementById('notepad').innerHTML = '';
            modal.style.display = "none";
        }
        minimise.onclick = function() {
            modal.style.display = "none";
        }
        // window.onclick = function(event) {
        //     if (event.target == modal) {
        //         modal.style.display = "none";
        //     }
        // }
    }
    function redir(path) {
        location.href = path;
    }
    async function searchForCharacter() {
        let fname = document.getElementById('fname').value;
        let lname = document.getElementById('lname').value;
        if (!fname) return errorToast("Please provide a first name");
        if (!lname) return errorToast("Please provide a last name");
        let data = await fetch(`${apiUrl}/characters/search?fname=${fname}&lname=${lname}`, {
            method: 'GET'
        })
        let characters = await data.json();
        if (characters.length < 1) return errorToast("Name not found");
        let base = document.getElementById('results');
        for (let character of characters) {
            base.innerHTML = '';
            let button = document.createElement('button');
            button.classList.add('button', 'primary', 'svelte-ccmxlj');
            button.onclick = function() {
                redir(`/mdt/search/${character.uuid}`);
            }
            let text = document.createTextNode(`${character.fname} ${character.lname} - DOB: ${new Date(character.dob).toLocaleDateString()}`)
            let icon = document.createElement('i')
            icon.classList.add('icon-r', 'right', 'fas', 'fa-chevron-right', 'svelte-ccmxlj');
            button.appendChild(text);
            button.appendChild(icon);
            base.appendChild(button);
        }
    }
    function clearResults() {
        let base = document.getElementById('results');
        base.innerHTML = '';
    }
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
        margin: 6px;
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
    .danger {
        background-color: var(--red);
    }
    .danger:hover {
        background-color: var(--red-dark);
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
    .search {
        margin: 5px;
        width: 150px;
        font-size: 18px;
    }
    .icon {
        color: var(--nqw);
        font-size: 16px;
        padding-left: 3px;
        padding-right: 3px;
        vertical-align: middle;
    }
    .round {
        border-radius: 8px;
        width: 50px;
        vertical-align: middle;
    }
    .notepad-content {
        font-family: var(--notepad) !important;
    }
</style>

<SvelteToast />

{#if callsign}
    <div class="centered content">
        <div class="section">
            <p class="title">Welcome, <b>{callsign}</b></p>
            <p class="subtitle">Here is your MDT dashboard.</p>
        </div>
    </div>
    <div class="centered">
        <div class="buttons">
            <button class="button primary" on:click={openCharacterSearchModal}>Name search</button>
            <button class="button primary">Plate search</button>
            <button class="button secondary" on:click={openTenCodesModal}>10 codes</button>
            <button class="button secondary" on:click={openNotepadModal}>Notepad</button>
        </div>
    </div>
    <div class="container">
        <p class="active left">Active call</p> <br /><br />
        <div class="active-call left">
            <p class="active-content">
                What is Lorem Ipsum?
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

<!-- Character search pop-up modal -->
<div id="md-char" class="modal bounceIn centered">
    <div class="modal-content">
        <span class="close-char">&times;</span>
        <h2 style="font-weight: 400;">Name search</h2>
        <input placeholder="First name" type="text" class="callsign search" id="fname" autocomplete="off">
        <input placeholder="Last name" type="text" class="callsign search" id="lname" autocomplete="off">
        <button class="login primary round" on:click={searchForCharacter} id="submit">
            <i class="icon fas fa-search"></i>
        </button>
        <div class="centered" style="margin: 30px;">
            <div class="buttons" style="display: grid;" id="results">
            </div>
        </div>
        <div class="centered">
            <div class="buttons">
                <button class="button danger" on:click={clearResults}>
                    <i class="icon-l fas fa-trash-alt"></i>Clear results
                </button>
            </div>
        </div>
    </div>
</div>

<!-- 10 codes pop-up modal -->
<div id="md-10codes" class="modal bounceIn centered">
    <div class="modal-content">
        <span class="close-10codes">&times;</span>
        <div class="centered">
            <h1 style="font-weight: 600; margin-bottom: 60px; margin-left: 20px;">Police 10 codes</h1>
            {#each tencodes as code, i}
                <p class="title">10-{i+1}</p>
                <p class="subtitle">{code}</p>
            {/each}
        </div>
    </div>
</div>

<!-- Notepad pop-up modal -->
<div id="md-notepad" class="notepad-modal bounceIn centered">
    <div class="notepad-modal-content">
        <div class="handle" id="handle">
            <div class="title notepad-header" id="md-notepad-header" draggable="false">
                <span class="left notepad-title noselect" draggable="false">Notepad</span>
                <span class="close-notepad noselect large" id="close-notepad" draggable="false">&times;</span>
                <span class="button-notepad noselect" id="minimise-notepad" draggable="false">─</span>
            </div>
        </div>
        <div class="notepad-content" contenteditable="true" id="notepad">
            <!-- <p class="notepad-inside">This is a test</p> -->
        </div>

        <div class="centered">

        </div>
    </div>
</div>