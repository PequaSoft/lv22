<template>
   <v-sheet color="sheet" class="d-inline-flex bg-surface-variant">
      
    <v-row no-gutters>
      <v-col class="justify-center" xl="3" lg="3" md="2" sm="2" color="grey-lighten-3">
      
      </v-col>
      
      <v-col class="justify-center mt-n1 pr-0 pl-0" align="right" xl="6" lg="6" md="8" sm="8" color="grey">
        <v-table>
        <tbody>
        <tr>
          <div class="column2 ga-3" style="padding-left:20px;padding-right:20px;padding-top:5px;padding-bottom:10px;">  
          <v-row>
          <v-col cols="4">
            <span STYLE="font-size:22.0pt;font-family:arial; color: black;">About Epic Link</span>
          </v-col>
          <titleButtons />
          </v-row>
          </div>  
        </tr>  
        <tr>
          <div class="column2" style="padding:20px;" align="center">  
          <img src="~/assets/EpicLogo.png" class="mx-2 mt-2 mb-0" alt="Forest" style="width:140px"/>
        </div>
        </tr>
        <tr>
          <div class="column2 sitesdesc" style="padding:10px;" align="left">  
            <v-alert class="ml-2 mr-2 mt-3" style="margin:10px;" color="iconic" dark>
            Welcome to The Epic Link. Where users can share bookmarks across the internet. Booksmarks are grouped into domains which visitors are free to explore.
          </v-alert>
        </div>
        </tr>
        <tr>
          <div class="column2 sitesdesc" style="padding:10px;" align="left">  
            <v-alert class="ml-2 mr-2 mt-3" style="margin:10px;" color="iconic" dark>
            Visitors can Login / Register in order to be able the creation of their own domain. Bookmarks that are added to this domain are available publicly.
          </v-alert>
        </div>
        </tr>
        <tr>
          <div class="column2 sitesdesc" style="padding:10px;" align="left">  
            <v-alert class="ml-2 mr-2 mt-3" style="margin:10px;" color="iconic" dark>
            In the local tab users can export their bookmarks from their current browser and upload into the Epic Link. These bookmarks are only visible from their local desktop.
          </v-alert>
        </div>
        </tr>      
        <tr>
          <div class="column3" style="padding:20px;" align="center">  
            <img src="~/assets/Logo2.png" class="VuetifyLogo mx-2 mt-2 mb-0" alt="Forest" style="width:140px"/>
        </div>
        </tr>    
                      
        </tbody>
        
        </v-table>
    
      </v-col>
    </v-row>
  
</v-sheet>
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