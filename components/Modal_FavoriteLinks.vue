<template>
   <v-card class="mx-auto listSub" style="overflow: hidden;" max-width="100%"  variant="flat">
    <v-list :key="componentKey" class="listSub" density="compact" style="overflow-x: hidden;border-bottom: solid grey 1px">  
    <v-list-item v-for="(item, i) in xItemFavorites" :key="i" :value="xItemFavorites" >
      <template style="margin-right:13px;" v-slot:prepend>
        <v-img :src="item.icon" style="width:26px;margin-right:8px;" @click="clickLeafRecent(item)"></v-img>
      </template>
      <span STYLE="font-family:arial; color: black;" @click="clickLeafRecent(item)">{{ item.text }}</span>
      <template v-slot:append>
        <v-icon color="delete" size="small" @click="deleteLeafLike(item)">mdi-delete</v-icon> 
      </template>        
    </v-list-item>
    </v-list>
  </v-card>
</template>
  <script lang="js">
  import { useGlobalStore } from '~/store/globalData'
  import axios from 'axios'
  import Swal from 'sweetalert2'
  import dload from '@/mixins/DataLoad'

  //const gdata = useGlobalStore()
  
  export default {
    data() {
      return {
        sDomain: '',
        sDomainDescription: '',
        sDomainIcon: '',
        gdata: null,
        dataReady: 0,
        renderComponent: true,
        componentKey: 0,
        itemFavorites: []
      }
    },
    computed:  {
      xDataReady() {
      
      return this.dataReady;

    },
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
      return res;

    },
    xItemFavorites() {
      
      var res = [];   this.itemFavorites;
      
      console.log('itemFavorite-1');
      if(this.gdata == undefined){return res;}        
      console.log('itemFavorite-1a');
      if(this.gdata.itemFavorites != undefined || this.gdata.itemFavorites != null) {res=this.gdata.itemFavorites;}

      console.log('itemFavorite-2: ' + res.length);
      if(this.gdata.itemFavorites != null){
      return this.gdata.itemFavorites;
      }
      
      return res;
    },
  },
    async mounted () {
      console.log('Mount_FavoriteLinks')
      this.gdata = useGlobalStore()
      this.sDomain = this.xDomain;
      //dload.loadClickFavorites(this.gdata)   //parAxios, parStore
      //this.sDomain = 'Test Domain';
      
    },
    
    methods:{
      clickLeafRecent(item) {
        if(item.nav == '--'){return;}

        var sCombo = {domain: this.xCurrDomain, id: 1, text: item.text, icon: item.icon, nav: item.nav}
        this.gdata.addClickHistory(sCombo);
        //this.$store.commit('globalData/addClickHistory', sCombo)

        //et newTab = window.open(item.nav, '_blank', '');

      },
      deleteLeafLike(item){
      //this.$store.commit('globalData/deleteItemFavorite', item)
      this.gdata.deleteItemFavorite(item) 
      
      },

      async forceRerender() {
      // Remove MyComponent from the DOM
      this.renderComponent = false;

            // Wait for the change to get flushed to the DOM
      await this.$nextTick();

      // Add the component back in
      this.renderComponent = true;
    }
    },  
    

    //deleteItemFavorite(sText) 

    }
  
  </script>
  <script setup lang="js">

    onMounted(() => {
      console.log('login mounted');
    });

   
  </script>

<style >
  @import url("~/assets/css/main.css");

  .listSub {
  height: 31.0vh;
  vertical-align: text-top;
  }     
</style>