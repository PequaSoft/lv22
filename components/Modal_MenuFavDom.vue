<template>
  
  <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-list-item>
        <v-list-item-title v-bind="activatorProps" style="font-family:arial; color: black;">Favorite Domains</v-list-item-title>
      </v-list-item>
      </template>
  
      <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar color="primary" title="Favorite Domains" STYLE="font-size:22.0pt;font-family:arial; color: white;"></v-toolbar>
              <v-card-text class="compact-form">
                <favoriteDomains @click="closeEdit(isActive, false)" />
              </v-card-text>
              <v-card-actions class="justify-end compact-footer">
               
                <v-spacer></v-spacer>
                <v-btn density="comfortable" color="primary" variant="outlined" @click="closeEdit(isActive, false)" icon="mdi-close" size="large"></v-btn>
              </v-card-actions>
          </v-card>
      </template>
      </v-dialog>
  
  </template>
  <script lang="js">
  import { useGlobalStore } from '~/store/globalData'
  import dload from '@/mixins/DataLoad'
  import axios from 'axios'
  import getTitleAtUrl from 'get-title-at-url';
  import favoriteDomains from '~/components/Modal_FavoriteDomains.vue'
  /*
  
  import Swal from 'sweetalert2'

  const gdata = useGlobalStore()
  */
  export default {
    data() {
      return {
        valid: false,
        bStayLoggedIn: true,
        sUID: '',
        sPWD: '',
        sAxios: '',
        semail: '',
        sDomain: '',
        sDomainDescription: '',
        sDomainIcon: '',
        sLoginStatus: 0,
        sDuration: '1m',
        
        domainFavorites: [],
        sCurrDomain: '',
        gdata: null
      }
    },
    computed:  {
      xDomain() {
      var res = '--';

      if(this.gdata == undefined){return res;}        
      if(this.gdata.sDomain != undefined || this.gdata.sDomain != null) {res=this.gdata.sDomain;}
      return res;

    },
    xCurrDomain() {
      var res = '--';

      if(this.gdata == undefined){return res;}        
      if(this.gdata.sCurrDomain != undefined || this.gdata.sCurrDomain != null) {res=this.gdata.sCurrDomain;}
      var sLocation = dload.getLocation()
      if(sLocation == 'home'){res=this.gdata.sDomain;}
      if(sLocation == 'local'){res='Local';}
      return res;

    },    
    xLocation() {
      var res = dload.getLocation()
      
      return res;
    },        
  },
    async mounted () {
      this.gdata = useGlobalStore()
      console.log('INIT_EDIT')

      /*
 
      const result = await axios.get(sURL);
      console.log('URL Title:' + result)
      */
      

    },
    
    methods:{
      async closeEdit (parSlot, bSwitch) {
        /*
        var sURL = "https://instapundit.com/"
        var sTitle = await dload.getURLTitle(this.gdata.axios ,sURL)
        console.log('URL Title:' + sTitle)
        */
        console.log('Close Edit')

        parSlot.value = false  
      },
    }
  }  
  </script>
  <script setup lang="js">

    onMounted(() => {
      console.log('login mounted');
    });

   
  </script>

<style >
  @import url("~/assets/css/main.css");
</style>