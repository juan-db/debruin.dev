<script>
	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid #F2C57C55;
		font-weight: 350;
		padding: 0 1em;
		margin-bottom: 24px;

		background-color: var(--nav-background-color);

		display: flex;
		justify-content: center;
	}

	.spacer {
		flex-grow: 1;
		visibility: hidden;
	}

	ul {
		margin: 0;
		padding: 0;

		max-width: 600px;
		min-width: 400px;
		width: 100%;

		display: flex;
	}

	@media (max-width: 400px) {
		ul {
			min-width: 300px;
		}
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width:  calc(100% - 1.6em);
		height: 2px;
		background-color: #F2C57CDD;
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 0.7em 0.8em;
		display: block;
	}

	a:link {
		color: var(--nav-text-color);
	}

	a:visited {
		color: var(--nav-text-color);
	}

	a:hover {
		text-decoration: underline;
	}
</style>

<nav>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
		<li><a aria-current="{segment === 'circle-intersect' ? 'page' : undefined}" href="circle-intersect">circle toy</a></li>
		<li class="spacer"></li>
		<li><a href="https://www.github.com/juan-db/debruin.dev">src</a></li>
		<li><a href="https://www.github.com/juan-db">github</a></li>
		<li><a href="https://www.linkedin.com/in/juan-de-bruin">linkedin</a></li>
	</ul>
</nav>
