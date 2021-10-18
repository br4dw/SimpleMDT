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
        width: 100vw;
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
    .right {
        float: right;
    }
    li.admin {
        /* background-color: var(--red); */
        float: right;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }
    li.admin:hover {
        background-color: var(--red-dark);
    }
    a.admin {
        color: var(--font-secondary);
        transition: all 0.3s ease-in-out;
    }
    a.admin:hover {
        color: var(--nqd);
        background-color: var(--red);
    }
    .time {
        display: block;
        color: var(--text-secondary);
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }
</style>

<script>
    import { stores } from '@sapper/app';
	const { session } = stores()
    export let user;
	user = $session.discordUser.username ?
		   $session.discordUser :
		   'Logout'
    import { admins } from '../discord';
	async function signOut() {
        window.localStorage.removeItem('callsign');
        const authAPI = await fetch('/api/signout', {
            method: 'POST',
            credentials: 'same-origin',
        });
        await authAPI.json();
        window.location.href = '/';
    }
    function checkAdmin(id) {
        return admins.some(admin => id === admin) ? true : false;
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
        <li class="time">
            <i class="icon-l fas fa-clock"></i><span id="datetime">...</span>
        </li>
        <script>
            var dt = new Date();
            document.getElementById("datetime").innerHTML = dt.toLocaleString().split(',')[1];
            setInterval(() => {
                var dt = new Date();
                document.getElementById("datetime").innerHTML = dt.toLocaleString().split(',')[1];
            }, 1000);
        </script>
        {#if user !== 'Logout'}
            <li class="logout">
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="logout" on:click={signOut}>
                    Logout <i class="icon-r fas fa-sign-out-alt"></i>
                </a>
            </li>
            {#if checkAdmin(user.id)}
                <li class="right admin">
                    <a class="admin" href="/admin">
                        <i class="icon-l fas fa-tools"></i>Admin
                    </a>
                </li>
            {/if}
        {/if}
    </ul>
</div>