<template>
  <div class='install_home_div'>
       install_home:'调试主页',
  </div>
</template>

<script>
import Chart from '@/components/Charts/keyboard'

export default {
	name: 'install_home',
	components: { Chart }
}
</script>

<style scoped>
.install_home_div{
	position: relative;
	padding: 20px;
	width: 100%;
	height: 85vh;
}
</style>
