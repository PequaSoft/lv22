<template>
   <v-container class="bg-surface-variant">
      
    <v-row no-gutters justify="center">
      
      <v-col align-self="end" xl="6" lg="6" md="8" sm="8" color="grey">
        
        <v-sheet class="pa-4 text-center mx-auto"> .justify-center </v-sheet>

      </v-col>
    </v-row>
  
</v-container>
</template>

<script setup lang="js">
import { useGlobalStore } from '~/store/globalData'
import titleButtons from '~/components/Modal_Button.vue'

//const gdata = useGlobalStore()
//const route = useRoute()
//gdata.increment()
//const version = 22 + gdata.counter

const showDomainPanel = 1
const showLinksPanel = 1
const sDomainSearch = ''   
const sDomainDecription = ''

onMounted(() => {
  document.body.style.overflow = "hidden";
  console.log('About mounted');
});


</script>

<style>
  @import url("~/assets/css/about.css");

  .column2 {
        border-top: 1px solid rgb(200, 200, 200);
        border-left: 1px solid rgb(200, 200, 200);
        border-right: 1px solid rgb(200, 200, 200);
        
      }
  .column3 {
        border-top: 1px solid rgb(200, 200, 200);
        border-left: 1px solid rgb(200, 200, 200);
        border-right: 1px solid rgb(200, 200, 200);
        border-bottom: 1px solid rgb(200, 200, 200);        
      }      
  .space2 {
      padding-top: 28px;
      padding-bottom: 8px;
      }      
  .space3 {
      width: 70%;
      }
  .space4 {
      width: 14%;
      }      
  </style>