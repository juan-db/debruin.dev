<script>
    import {onDestroy, tick} from 'svelte';
    import {movable} from './movable';

    let canvas;
    let obj;
    let image;
    let ids = [];
    let svg;

    onDestroy(() => {
        if (image) {
            URL.revokeObjectURL(image);
            image = undefined;
        }
    })

    async function onSvgUploaded(e) {
        e.preventDefault();

        /** @type {FileList} */
        const files = e.target['svg-input'].files;
        if (files.length === 0) {
            return;
        }

        if (image) {
            URL.revokeObjectURL(image);
            image = undefined;
        }

        image = URL.createObjectURL(files[0]);
    }

    async function imageLoaded(e) {
        svg = e.target.getSVGDocument();
        const elements = [...svg.querySelectorAll('*[data-region]')];
        ids = elements.map(x => x.getAttribute('data-region'));

        await tick();
        for (const i of ids) {
            updateColor(i);
        }
    }

    function updateColor(id) {
        const selectors = [...document.querySelectorAll(`input[group=${id}]`)];
        const [r, g, b] = selectors.map(e => e.value);
        const element = svg.querySelector(`g[data-region=${id}]`);
        element.setAttribute('fill', `rgb(${r}, ${g}, ${b})`);
    }
</script>

<form on:submit={onSvgUploaded} style="margin-bottom: 20px;">
    <label for="svg-input">Select an SVG file</label>
    <input type="file" id="svg-input" accept=".svg" name="svg-input">
    <button type="submit">Upload</button>
</form>

<div style="display: flex; column-gap: 20px;">
    <div style="width: 600px; height: 600px; overflow: hidden; background-color: gray; border: 3px solid lightcoral; position: static;" bind:this={canvas}>
        {#if image}
            <div use:movable style="top: 0px; left: 0px; position: relative; display: inline-block">
                <embed type="image/svg+xml" src={image} on:load={imageLoaded}>
                <div style="z-index: 2; width: 100%; height: 100%; position: absolute; top: 0; left: 0"></div>
            </div>
        {/if}
    </div>

    <div>
        <h3>Regions</h3>
        {#each ids as id}
            <div style="border-bottom: 1px solid gray; padding-left: 10px; margin-bottom: 3px;">{id}</div>
            <div style="display: flex; margin-bottom: 10px;">
                <label for="{id}-red">Red</label>
                <input type="range" min="0" max="255" step="1" id="{id}-red" group={id} on:change={() => updateColor(id)}>
                <label for="{id}-green">Green</label>
                <input type="range" min="0" max="255" step="1" id="{id}-green" group={id} on:change={() => updateColor(id)}>
                <label for="{id}-blue">Blue</label>
                <input type="range" min="0" max="255" step="1" id="{id}-blue" group={id} on:change={() => updateColor(id)}>
            </div>
        {/each}
    </div>
</div>
