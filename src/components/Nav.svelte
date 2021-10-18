<style>
    .nav {
        margin-bottom: 30px;
    }
    ul {
        list-style-type: none;
        margin: -8px;
        padding: 0;
        overflow: hidden;
        background-color: var(--background-dark);
    }

    li {
        float: left;
    }

    li a {
        display: block;
        color: var(--text-secondary);
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    li a:hover {
        background-color: var(--background-secondary);
    }
    li.logout {
        background-color: var(--accent);
        float: right;
        cursor: pointer;
    }
    a.logout:hover {
        background-color: var(--accent-dark);
    }
    a.logout {
        color: var(--nqd);
        transition: all 0.2s ease-in-out;
    }
</style>

<script>
    import { stores } from '@sapper/app';
	const { session } = stores()
    export let user;
	user = $session.discordUser.username ?
		   $session.discordUser :
		   'Logout'
	async function signOut() {
        window.localStorage.removeItem('callsign');
        const authAPI = await fetch('/api/signout', {
            method: 'POST',
            credentials: 'same-origin',
        });
        await authAPI.json();
        window.location.href = '/';
    }
</script>

<div class="nav">
    <ul>
        <li>
            <a href="/">
                <i class="icon-l fas fa-home"></i>Home
            </a>
        </li>
        <li>
            <a href="/info">
                <i class="icon-l fas fa-question-circle"></i>Info
            </a>
        </li>
        {#if user !== 'Logout'}
            <li class="logout">
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="logout" on:click={signOut}>
                    Logout <i class="icon-r fas fa-sign-out-alt"></i>
                </a>
            </li>
        {/if}
    </ul>
</div>