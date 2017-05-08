<template>
  <div class="hello">
    hello world
  </div>
</template>

<script>
export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hello{
		border:1px solid blue;
		&::before{
			content:'fdfdsfs';
			color:red;
		}
	}
</style>
