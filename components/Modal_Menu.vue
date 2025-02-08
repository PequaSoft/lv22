<template>
  
  <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        
        <v-icon color="white" icon="mdi-menu" v-bind="activatorProps" >mdi-menu</v-icon>
      </template>
  
      <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar color="primary" title="Select Menu" STYLE="font-family:arial; color: white;"></v-toolbar>
              <v-tabs v-model="tab" >
                <v-tab><v-icon color="primary">mdi-history</v-icon><v-icon color="primary">mdi-domain</v-icon></v-tab>
                <v-tab><v-icon color="primary">mdi-heart</v-icon><v-icon color="primary">mdi-domain</v-icon></v-tab>
                <v-tab><v-icon color="primary">mdi-history</v-icon><v-icon color="primary">mdi-link</v-icon></v-tab>
                <v-tab><v-icon color="primary">mdi-heart</v-icon><v-icon color="primary">mdi-link</v-icon></v-tab>
              </v-tabs>

              <v-card-text class="compact-form">                
              <v-window v-model="tab">
                <v-window-item>
                  <v-card flat >
                    <span STYLE="font-size:20.0pt;font-family:arial; color: darkblue;">Epic</span>
                  </v-card>
                </v-window-item>
                <v-window-item>
                  <v-card flat>
			            <h3 STYLE="font-family:arial; color: blue;">Favorite Domains</h3>
                  </v-card>
                </v-window-item>
                <v-window-item>
                  <v-card flat>
			            <h3 STYLE="font-family:arial; color: blue;">Recent Links</h3>
                  </v-card>
                </v-window-item>
                <v-window-item>
                  <v-card flat>
			            <h3 STYLE="font-family:arial; color: blue;">Favorite Links</h3>
                  </v-card>
                </v-window-item>
              </v-window>
              </v-card-text>              
              <v-card-actions class="justify-end compact-footer">
                <v-btn density="comfortable" color="primary" variant="outlined" @click="closeEdit(isActive, true)" icon="mdi-check" size="large"></v-btn>
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
  /*
  
  import Swal from 'sweetalert2'

  const gdata = useGlobalStore()
  */
  export default {
    data() {
      return {
        tab: null,
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
        gdata: null,
        links: [
        { text: 'Recent Domains', route: '/indices' },
        { text: 'Favorite Domains', route: '/technical' },
        { text: 'Recent Links', route: '/forex' },
        { text: 'Favorite Links', route: '/About' }
      ],
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