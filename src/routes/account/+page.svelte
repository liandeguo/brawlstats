<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const id = $page.url.searchParams.get('id');
	const url = encodeURI(
		'https://bsproxy.royaleapi.dev/v1/players/%23' +
			id +
			'?Authorization=Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijk3ZDRhMzIzLWJiMmItNDYyNS04OGY3LWRhOWQ3MzUyOWZjNCIsImlhdCI6MTcyMDAyOTE1Mywic3ViIjoiZGV2ZWxvcGVyLzQ3YjJmZDgxLTZjYmEtN2QxYS0wZWIyLWJhZTIwY2FkNDNhMSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.rhcA-17kcd7hdO3oGZQIMENFVMeQOOp7giJ5PvsOn5mhX7fuuuxbiggQdjonSOvJySUMBCB5UI43hn2nuQIwXg'
	);
	const fetchurl = 'https://api.allorigins.win/get?url=' + url;

	let dataLoaded = false;
	let noData = false;
	let playerName = '';
	let trophies = 0;
	let highestTrophies = 0;
	let difference = 0;
	let duoVictories = 0;
	let vs3Victories = 0;
	let soloVictories = 0;
	let brawlersLength = 0;
	let brawlers = [];
	let tag = '';
	async function getJSON(url) {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			return error;
		}
	}

	getJSON(fetchurl)
		.then((data) => {
			if (data && data.contents) {
				try {
					data = JSON.parse(data.contents);
					if (data.name) {
						playerName = data.name;
						trophies = data.trophies;
						highestTrophies = data.highestTrophies;
						difference = highestTrophies - trophies;
						duoVictories = data.duoVictories;
						vs3Victories = data['3vs3Victories'];
						soloVictories = data.soloVictories;
						brawlersLength = data.brawlers.length;
						tag = data.tag;
						brawlers = data.brawlers;
						dataLoaded = true;
					} else {
						console.log('No Data Found');
						noData = true;
					}
				} catch (error) {
					console.error('Error parsing JSON:', error);
				}
			} else {
				console.log('Invalid data received:', data);
			}
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});

		let selected = 0
		function categorySelector(selection) {
			selected = selection
			if (selected == 0) {
				document.querySelector('#a_brawlers').style.textDecoration = 'underline';
				document.querySelector('#a_battle_log').style.textDecoration = 'none';
			}
			if (selected == 1) {
				document.querySelector('#a_brawlers').style.textDecoration = 'none';
				document.querySelector('#a_battle_log').style.textDecoration = 'underline';
			}
		}
</script>

<main>
	{#if dataLoaded == true}
		<div class="container">
			<div class="card" style="background-color: #CD6441;">
				<h2 id="name">{playerName}</h2>
				<span
					><img src="trophy.png" alt="trohpy" />
					<p>{trophies}</p></span
				>
				<span style="align-items: end;"
					><img src="id.png" alt="brawlstars id" />
					<p>{tag}</p></span
				>
			</div>
			<div class="card" style="background-color: #1A2F21;">
				<div>
					<h3>Most Trophies</h3>
					<span
						><img src="trophy.png" alt="trohpy" />
						<p>{highestTrophies}</p></span
					>
					<p><xxx>+{difference}</xxx> more than<br />current Trophies</p>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="card" style="background-color: #426F3F;">
				<div>
					<h3>Wins</h3>
					<span><img src="solo.png" alt="Solo Victories" />{soloVictories}</span>
					<span><img src="duo.png" alt="Duo Victories" />{duoVictories}</span>
					<span><img src="3v3.png" alt="3v3 Victories" />{vs3Victories}</span>
				</div>
			</div>
			<div class="card" style="background-color: #E8C05E; text-align:center">
				<p style="font-size: 24px;">Has <b>{brawlersLength}</b> from<br />81 Brawlers</p>
			</div>
		</div>

		<div class="container">
			<div class="card" style="background-color: #6f3f61;">
				<h3>Potential Trophies</h3>
				<p>Potential Trophies show how many Trophies you could have if they were all on</p>
				<p>Rank 20 {brawlersLength * 500}</p>
				<p>Rank 25 {brawlersLength * 750}</p>
			</div>
			<div class="card" style="background-color: #1A2F21;">
				<div>
					<h3>Most Trophies</h3>
					<span
						><img src="trophy.png" alt="trohpy" />
						<p>{highestTrophies}</p></span
					>
					<p><xxx>+{difference}</xxx> more than<br />current Trophies</p>
				</div>
			</div>
		</div>

		<div class="selector">
			<a on:click={() => categorySelector(0)} id='a_brawlers' style="text-decoration: underline;">Brawlers</a>
			<a on:click={() => categorySelector(1)} id='a_battle_log'>Battle Log</a>
		</div>

		{#if selected == 0}
			<div class="brawlers">
			{#each brawlers as brawler}
				<div
					class="card"
					id="brawler-card"
					style="background: url(portrait/{brawler.name
						.toLowerCase()
						.replaceAll(' ', '')}_portrait.png); background-size: cover;"
				>
					<h1 style="color: black;">
						{brawler.name}
					</h1>
					<span
						><img src="trophy.png" alt="trohpy" />
						<p>{brawler.trophies}</p></span
					>
					<span
						><img src="star.png" alt="trohpy" />
						<p>{brawler.rank}</p></span
					>
				</div>
			{/each}
		</div>
		{:else if selected == 1}
		<p style="color: red;">Oh nothing there yet</p>
		{/if}

	{:else if noData == true}
		{alert(
			'The account #' + id + " doesn't seem to exist.\nAre you sure you entered the correct ID?"
		)}
	{:else if dataLoaded == false}
		<p style="color: red;">Data is getting loaded, please be patient.</p>
	{/if}
</main>

<style>
	/* .grid-container {
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 1fr 1fr; 
        gap: 50px 50px; 
        grid-template-areas: 
            ". ."
            ". ."; 
    }

    .grid-item {
        border-radius: 20px;
        width: 200px;
        height: 200px;
    } */

	main {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	a {
		color: black;
	}
	#name {
		font-size: 28px;
	}

	.container {
		display: flex;
	}

	.card {
		border-radius: 15px;
		width: 40vw;
		height: 40vw;
		margin: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	span {
		display: flex;
		align-items: center;
	}

	img {
		height: 25px;
		margin: 0 2px 0 0;
	}
	xxx {
		color: #7eb500;
	}
	@media screen and (min-width: 500px) {
		.card {
			width: 200px;
			height: 200px;
		}
	}

	.brawlers {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(5, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	#brawler-card {
		justify-content: end;
		align-items: start;
	}

	.selector {
		margin: 10px;
	}

	.selector a {
		margin: 0 10px 0 10px;
	}
</style>
