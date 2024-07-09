<script>
	var welcome = 'none';
	var sign = 'block';

	function getstarted() {
		welcome = 'none';
		sign = 'block';
	}
	function signin() {
		window.location.replace('account?id=' + document.querySelector('#id').value);
	}
</script>

<div class="bg">
	<p>h</p>
	<div style="z-index: 100; display: {welcome};">
		<h2>Welcome</h2>
		<h3>Analyze your Brawl Stars Account</h3>
		<button on:click={getstarted}>Get Started</button>
	</div>

	<div style="z-index: 100; display: {sign};">
		<h2>Sign in</h2>
		<h3 style="margin-bottom: 10px;">Enter your Brawl Stars ID</h3>
		<input type="text" placeholder="YOURID" id="id" style="margin: 10px;" />
		<br />
		<button on:click={signin} style="margin: 0 0 30px 0; width: 288.667px;">Let's Go</button>
	</div>
</div>
<div class="black"></div>
<div class="shadow"></div>

<style>
	.bg {
		background-image: url(loading_2020_arcade.png);
		width: 100vw;
		height: 100vh;
		background-size: cover;
		background-position: center;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	h3 {
		font-size: 15px;
		font-weight: 300;
	}

	h2 {
		font-size: 40px;
	}

	h1 {
		font-size: 10px;
	}

	button {
		border: 0px;
		background-color: #dd76df;
		color: black;
		border-radius: 15px;
		padding: 15px 30px;
		font-weight: bold;
		font-size: 17px;
		margin: 30px 0 30px 0;
	}

	input {
		border: 0px;
		background-color: #e8a2ea;
		color: black;
		border-radius: 15px;
		padding: 15px 30px;
		font-weight: bold;
		font-size: 17px;
		margin: 30px 0 30px 0;
	}
	.shadow {
		width: 100vw;
		height: 40vh;
		background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
		position: absolute;
		bottom: 15vh;
	}

	.black {
		position: absolute;
		background-color: #000;
		bottom: 0;
		height: 15vh;
		width: 100vw;
	}
</style>
