<script>
	// This component only exists to reduce code duplication. This exact pattern is
	// used a lot, so I extracted it into a component.
	export let legend;
	export let name;
	export let numberAttrs;
	export let sliderAttrs;

	export let numberLabel = undefined;
	let numberLabelInternal = numberLabel || `${name} text input`;
	export let sliderLabel = undefined;
	let sliderLabelInternal =  sliderLabel || `${name} slider`;

	export let value;
</script>

<style>
	fieldset {
		width: 100%;
		box-sizing: border-box;
		margin: 0;
	}

	.inputs-container {
		width: 100%;
		display: flex;
	}

	input[type="number"] {
		max-width: 7em;
		min-width: 7em;
		width: 7em;
		margin-right: 8px;
	}

	input[type="range"] {
		width: 100%;
		flex-grow: 1;

		touch-action: none;
	}
</style>

<fieldset>
	<legend>{legend}</legend>

	<div class="inputs-container">
		<label for="{name}-input" class:visually-hidden={!numberLabel}>{numberLabelInternal}</label>
		<input id="{name}-input" name="{name}" type="number" bind:value={value} {...numberAttrs}>

		<label for="{name}-range" class:visually-hidden={!sliderLabel}>{sliderLabelInternal}</label>
		<input id="{name}-range" name="{name}" type="range" {...sliderAttrs} bind:value={value}>
	</div>
</fieldset>
