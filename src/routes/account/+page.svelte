<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ProgressBar from '../../components/ProgressBar.svelte';
	const id = $page.url.searchParams.get('id');
	const url = encodeURI(
		'https://bsproxy.royaleapi.dev/v1/players/%23' +
			id +
			'?Authorization=Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijk3ZDRhMzIzLWJiMmItNDYyNS04OGY3LWRhOWQ3MzUyOWZjNCIsImlhdCI6MTcyMDAyOTE1Mywic3ViIjoiZGV2ZWxvcGVyLzQ3YjJmZDgxLTZjYmEtN2QxYS0wZWIyLWJhZTIwY2FkNDNhMSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.rhcA-17kcd7hdO3oGZQIMENFVMeQOOp7giJ5PvsOn5mhX7fuuuxbiggQdjonSOvJySUMBCB5UI43hn2nuQIwXg'
	);
	const BattleLogUrl = encodeURI(
		'https://bsproxy.royaleapi.dev/v1/players/%23' +
			id +
			'/battlelog/?Authorization=Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijk3ZDRhMzIzLWJiMmItNDYyNS04OGY3LWRhOWQ3MzUyOWZjNCIsImlhdCI6MTcyMDAyOTE1Mywic3ViIjoiZGV2ZWxvcGVyLzQ3YjJmZDgxLTZjYmEtN2QxYS0wZWIyLWJhZTIwY2FkNDNhMSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.rhcA-17kcd7hdO3oGZQIMENFVMeQOOp7giJ5PvsOn5mhX7fuuuxbiggQdjonSOvJySUMBCB5UI43hn2nuQIwXg'
	);
	const fetchurl = 'https://api.allorigins.win/get?url=' + url;
	const fetchBattleLog = 'https://api.allorigins.win/get?url=' + BattleLogUrl;

	// Variables for /players request
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
	let brawlersUnsorted = [];
	let tag = '';

	// Variables for Battle Log request
	let battlelog = [];

	async function getJSON(url) {
		// Sends a API Request to the Brawl Stars API
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
	// Get the Battle Log
	getJSON(fetchBattleLog).then((data) => {
		if (data && data.contents) {
			data = JSON.parse(data.contents);
			if (data.items) {
				battlelog = data.items;
				console.log(battlelog);
			}
		}
	});
	// Get the Player Information
	getJSON(fetchurl)
		// Calls the function to get data from the brawl stars api
		.then((data) => {
			if (data && data.contents) {
				try {
					data = JSON.parse(data.contents);
					// Parses the data from the API into JSON to make it easier to use the data
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
						brawlersUnsorted = data.brawlers;
						dataLoaded = true;
						sort('trophies-d');
						heap.addUserProperties({ tag: tag, playerName: playerName });
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
	const xxx = 'background-size: cover;';
	function sort(sorting) {
		// For sorting brawlers using the trophies, highest Trophies or the Power Level
		if (sorting == 'trophies-d') {
			// Descending Trophies
			brawlers = [...brawlersUnsorted].sort((a, b) => b.trophies - a.trophies);
		} else if (sorting == 'trophies-a') {
			// Ascending Trophies
			brawlers = [...brawlersUnsorted].sort((a, b) => a.trophies - b.trophies);
		} else if (sorting == 'highestTrophies') {
			brawlers = [...brawlersUnsorted].sort((a, b) => b.highestTrophies - a.highestTrophies);
		} else if (sorting == 'powerlvl') {
			brawlers = [...brawlersUnsorted].sort((a, b) => b.power - a.power);
		}
	}

	let selected = 0;
	function categorySelector(selection) {
		// Select between different pages one for brawlers the other one for battle log (ik I could improve this)
		selected = selection;
		if (selected == 0) {
			document.querySelector('#a_brawlers').style.textDecoration = 'underline';
			document.querySelector('#a_battle_log').style.textDecoration = 'none';
		}
		if (selected == 1) {
			document.querySelector('#a_brawlers').style.textDecoration = 'none';
			document.querySelector('#a_battle_log').style.textDecoration = 'underline';
		}
	}

	function brawlerTrophiesColorCalc(current, highest) {
		// Shows a red yellow or green colour using the current brawler and the highest brawler trophies
		const difference = current - highest;
		if (current == highest) {
			return '#66ff00';
		}
		if (difference > 90) {
			return '#EE4B2B';
		}
		if (current > highest) {
			return 'yellow';
		}
	}

	function getEventColor(event) {
		// Get the matching color for the Event
		const eventColors = [
			{ event: 'duoShowdown', color: '#a3df56' },
			{ event: 'soloShowdown', color: '#a3df56' },
			{ event: 'brawlBall', color: '#9eb0f7' },
			{ event: 'knockout', color: '#efa03c' },
			{ event: 'gemGrab', color: '#c85bf7' },
			{ event: 'hotZone', color: '#eb534c' },
			{ event: 'heist', color: '#c85bf7' },
			{ event: 'bounty', color: '#c85bf7' },
			{ event: 'roboRumble', color: '#c85bf7' },
			{ event: 'takedown', color: '#c85bf7' },
			{ event: 'presentPlunder', color: '#c85bf7' },
			{ event: 'loneStar', color: '#c85bf7' },
			{ event: 'superCityRampage', color: '#c85bf7' },
			{ event: 'volleyBrawl', color: '#c85bf7' },
			{ event: 'basketBrawl', color: '#c85bf7' },
			{ event: 'trophyThieves', color: '#c85bf7' },
			{ event: 'duels', color: '#c85bf7' },
			{ event: 'wipeout', color: '#c85bf7' },
			{ event: 'payload', color: '#c85bf7' },
			{ event: 'hunters', color: '#c85bf7' },
			{ event: 'lastStand', color: '#c85bf7' },
			{ event: 'botDrop', color: '#c85bf7' },
			{ event: 'trophyEscape', color: '#c85bf7' }
		];

		const selectedEvent = eventColors.find((item) => item.event === event);
		return selectedEvent ? selectedEvent.color : '';
	}

	function getProperEventName(event) {
		// Get the matching Name for the Event
		const eventNames = [
			{ event: 'duoShowdown', name: 'Duo Showdown' },
			{ event: 'soloShowdown', name: 'Solo Showdown' },
			{ event: 'brawlBall', name: 'Brawl Ball' },
			{ event: 'knockout', name: 'Knockout' },
			{ event: 'gemGrab', name: 'Gem Grab' },
			{ event: 'hotZone', name: 'Hot Zone' },
			{ event: 'heist', name: 'Heist' },
			{ event: 'bounty', name: 'Bounty' },
			{ event: 'roboRumble', name: 'Robo Rumble' },
			{ event: 'takedown', name: 'Takedown' },
			{ event: 'presentPlunder', name: 'Present Plunder' },
			{ event: 'loneStar', name: 'Lone Star' },
			{ event: 'superCityRampage', name: 'Super City Rampage' },
			{ event: 'volleyBrawl', name: 'Volleybrawl' },
			{ event: 'basketBrawl', name: 'Basketbrawl' },
			{ event: 'trophyThieves', name: 'Trophy Thieves' },
			{ event: 'duels', name: 'Duels' },
			{ event: 'wipeout', name: 'Wipeout' },
			{ event: 'payload', name: 'Payload' },
			{ event: 'hunters', name: 'Hunters' },
			{ event: 'lastStand', name: 'Last Stand' },
			{ event: 'botDrop', name: 'Bot Drop' },
			{ event: 'trophyEscape', name: 'Trophy Escape' }
		];
		const selectedEvent = eventNames.find((item) => item.event === event);
		return selectedEvent ? selectedEvent.name : '';
	}
</script>

<header>
	<span>
		<img src="back.png" alt="Back Arrrow" />
		<a href="..">Go Back</a>
	</span>
	<span>
		<img src="code.png" alt="" />
		<a href="https://github.com/liandeguo/brawlstats">GitHub</a>
	</span>
</header>
<main>
	<!-- Checks if the data from the API was loaded  -->
	{#if dataLoaded == true}
		<div class="mainInfo">
			<div class="container" style="">
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
						<span
							><img
								src="solo.png"
								alt="Solo Victories"
								title="Solo Victories"
							/>{soloVictories}</span
						>
						<span
							><img src="duo.png" alt="Duo Victories" title="Duo Victories" />{duoVictories}</span
						>
						<span
							><img src="3v3.png" alt="3v3 Victories" title="3v3 Victories" />{vs3Victories}</span
						>
					</div>
				</div>
				<div class="card" style="background-color: #E8C05E; text-align:center">
					<p style="font-size: 24px;">Has <b>{brawlersLength}</b> from<br />81 Brawlers</p>
				</div>
			</div>

			<div class="container">
				<div class="card" style="background-color: #6f3f61; text-align:center;">
					<h3>Potential Trophies</h3>
					<p>Potential Trophies show how many Trophies you could have if they were all on:</p>
					<p>Rank 20 {brawlersLength * 500}</p>
					<p>Rank 25 {brawlersLength * 750}</p>
				</div>
				<div class="card" style="background-color: #1f232f; text-align:center;">
					<p>More Cards are still <br /> in development</p>
				</div>
			</div>
		</div>

		<div class="moreThings">
			<!-- Select between categories, Brawlers and Battle Log -->
			<div class="selector" style="text-align: center;">
				<a on:click={() => categorySelector(0)} id="a_brawlers" style="text-decoration: underline;"
					>Brawlers</a
				>
				<a on:click={() => categorySelector(1)} id="a_battle_log">Battle Log</a>
			</div>

			{#if selected == 0}
				<select
					id="sort_brawlers"
					style="text-align: center;"
					on:change={(event) => sort(event.target.value)}
				>
					<option value="trophies-d">Trophies Descending 📈</option>
					<option value="trophies-a">Trophies Ascending 📉</option>
					<option value="highestTrophies">Highest Trophies</option>
					<option value="powerlvl">Power Level</option>
				</select>
				<p style="color: black;">Hover over a Brawler to show more information about it</p>
				<div class="brawlers">
					<!-- Import all brawlers and their portrait -->
					{#each brawlers as brawler}
						<div
							class="card"
							id="brawler-card"
							style="background: url(portrait/{brawler.name
								.toLowerCase()
								.replaceAll(' ', '')}_portrait.webp); {xxx}"
						>
							<div id="brawlersInfo">
								<h1 style="">
									{brawler.name}
								</h1>
								<p style="white-space: nowrap;">Most Trophies:</p>
								<div style="display: flex; align-items:start;">
									<div>
										<span>
											<img src="trophy.png" alt="highest brawler trophies" />
											<p>
												<!-- Calculate the difference between the highest Trophies of the Brawler and the current -->
												<!-- Call a function that selects a fitting colour for the difference -->
												{brawler.highestTrophies} (<haya
													style="color: {brawlerTrophiesColorCalc(
														brawler.highestTrophies,
														brawler.trophies
													)};">+{brawler.highestTrophies - brawler.trophies}</haya
												>)
											</p></span
										>
										<span
											><img src="trophy.png" alt="current trophies" />
											<p>{brawler.trophies}</p></span
										>
										<span
											><img src="star.png" alt="brawler rank" />
											<p>{brawler.rank}</p></span
										>
									</div>
									<div>
										<span>
											<img src="power.png" alt="powerlevel brawler" />
											<p>{brawler.power}</p></span
										>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else if selected == 1}
				{#each battlelog as battle}
					<div class="battle" style="background-color: {getEventColor(battle.battle.mode)};">
						<div
							style="display: flex; justify-content: space-between; align-items: center; width: 100%;"
						>
							<!-- Shows the icon of the event played -->
							<div style="flex: 1;">
								<img src={'battleIcons/' + battle.battle.mode + '.webp'} alt="" />
							</div>
							<!-- Shows the name of the event played -->
							<div
								style="flex: 2; display: flex; justify-content: center; align-items: center; text-align: center;"
							>
								<h4 style="flex-grow: 1;">{getProperEventName(battle.battle.mode)}</h4>
							</div>
							<!-- Shows the change in trophies in the game played -->
							<div style="flex: 1; display: flex; justify-content: flex-end; align-items: center;">
								{#if battle.battle.trophyChange != null}
									<p>
										<!-- Check if trophies are - or + if - don't add a + if + add a + -->
										{#if Math.sign(battle.battle.trophyChange) == -1}
											<x style="color: #EE4B2B;">{battle.battle.trophyChange}</x>
										{:else}
											+{battle.battle.trophyChange}
										{/if}
									</p>
								{:else if battle.battle.type == 'ranked' || battle.battle.type == 'soloRanked'}
									<!-- Check if ranked was played to display it -->
									<p>Ranked</p>
								{:else if battle.battle.trophyChange == null}
									<!-- Is displayed when the server didn't respond with a trophy amount, for exmaple a error.-->
									<p>null</p>
								{/if}
							</div>
						</div>
						<hr style="margin: 10px 0 10px 0; border: 1px solid white;" />
						<div style="teams">
							{#each battlelog.battle.battle.teams as team}
								{console.log(battlelog.battle)}
							{/each}
						</div>
					</div>
				{/each}
			{/if}
		</div>
	{:else if noData == true}
		<!-- If the API gave a response without data this is shown. Could be because the account doesn't exist -->
		{alert(
			'The account #' + id + " doesn't seem to exist.\nAre you sure you entered the correct ID?"
		)}
	{:else if dataLoaded == false}
		<!-- Is shown while the data is loaded, the API request is sent and the data is put into variables -->
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

	/* Basic Things */
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	@media screen and (min-width: 800px) {
		main {
			flex-direction: row;
			align-items: start;
			justify-content: start;
		}

		.mainInfo {
			margin-top: 76px;
		}
	}

	header {
		display: flex;
		width: 98vw;
		justify-content: space-between;
		box-sizing: border-box;
		align-items: center;
		padding: 10px;
		margin: 10px 0 10px 0;
	}
	header a {
		color: #bf6a4a;
		text-decoration: none;
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

	span {
		display: flex;
		align-items: center;
	}

	.selector {
		margin: 10px 0 5px 0;
	}

	.selector a {
		margin: 0 10px 0 10px;
	}

	select {
		border: 0px;
		color: black;
		padding: 5px 20px;
		border-radius: 10px;
		background-color: #f5eedd;
	}

	@media screen and (max-width: 500px) {
		h1 {
			font-size: 6vw;
		}
		p {
			font-size: 3.5vw;
		}
	}
	/* Cards */
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

	@media screen and (min-width: 500px) {
		.card {
			width: 200px;
			height: 200px;
		}
	}
	img {
		height: 25px;
		margin: 0 2px 0 0;
	}
	xxx {
		color: #7eb500;
	}

	/* Brawler Listr */
	.brawlers {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(5, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	@media screen and (min-width: 800px) {
		.moreThings {
			width: 100%;
		}
		.brawlers {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			grid-template-rows: repeat(5, 1fr);
			gap: 0;
			grid-column-gap: 0px;
			grid-row-gap: 0px;
		}
	}

	#brawlersInfo {
		display: none;
		box-sizing: border-box;
	}

	#brawler-card {
		justify-content: end;
		align-items: start;
	}
	.brawlers .card:hover #brawlersInfo {
		background-color: black;
		width: 100%;
		height: 100%;
		border-radius: 15px;
		display: flex;
		padding: 10px;
		flex-direction: column;
		justify-content: end;
		/* Glassmorpish */
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}
	.brawlers .card:active #brawlersInfo {
		background-color: black;
		width: 100%;
		height: 100%;
		border-radius: 15px;
		display: flex;
		padding: 10px;
		flex-direction: column;
		justify-content: end;
		/* Glassmorpish */
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	/* Battle Log */
	.battle {
		background-color: #1f2f23;
		margin: 10px;
		border-radius: 10px;
		padding: 10px;
		width: 78vw;
	}

	@media screen and (min-width: 500px) {
		.battle {
			width: 390px;
		}
	}
</style>
