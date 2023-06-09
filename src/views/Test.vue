<script>
import {Niivue} from '@niivue/niivue'
const nv = new Niivue()


export default {
  name: 'Test',
  props: {

  },
  data(){
    return {
      volumeList: [
        {
          url: "/api/image/202302/0b2be9e0-886b-4144-99f0-8bb4c6eaa848.nii.gz",
        }
      ]

    }
  },

  mounted() {

    nv.attachTo('gl')
    nv.loadVolumes(this.volumeList)
  }
}

</script>

<template>
  <canvas id="gl" height="480" width="640">

  </canvas>
</template>