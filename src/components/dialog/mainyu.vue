<template>
    <div class="mainyu">
        <show></show>
        <click></click>
    </div>
</template>
<script>
import Bus from '@/store/bus.js'
import show from '@/components/dialog/show'
import click from '@/components/dialog/click'
export default {
    name:'mainyu',
    components:{
        show,
        click
    }
}
</script>