<script>
	export let categories = [];
</script>

<div class="progress-bar">
	{#each categories as { label, color, percentage }}
		<div
			class="progress-segment"
			style="width: {percentage}%; background-color: {color};"
			title="{label}: {percentage}%"
		>
			{percentage}%
		</div>
	{/each}
</div>

<style>
	.progress-bar {
		display: flex;
		height: 30px;
		width: 100%;
		background-color: #e0e0df;
		border-radius: 5px;
		overflow: hidden;
	}
	.progress-segment {
		height: 100%;
		text-align: center;
		line-height: 30px;
		color: white;
	}
</style>
