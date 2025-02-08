<template >
  <v-card class="mx-auto" style="overflow: hidden;" max-width="100%" variant="flat">
    <v-list class="listSub" density="compact" color="iconic"  style="overflow-x: hidden;">  
  
    <v-list-item v-for="(item, i) in xItemHistory" :key="i" :value="xItemHistory" >
      
      <template style="margin-right:13px;" v-slot:prepend>
        <v-img :src="item.icon" style="width:26px;margin-right:8px;" @click="clickLeafRecent(item)"></v-img>
      </template>
      <span STYLE="font-family:arial; color: black;" @click="clickLeafRecent(item)">{{ item.text }}</span>
      <template v-slot:append>
        <v-icon color="iconic" v-if="isLeafLike(item) == 0" size="small" @click="clickLeafLike(item)" >mdi-plus</v-icon> 
        <v-icon color="white" v-if="isLeafLike(item) != 0" size="small" @click="clickLeafLike(item)" >mdi-minus</v-icon> 
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
      return res;

    },
    xItemHistory() {
      var res = [];

      if(this.gdata == undefined){return res;}        
      if(this.gdata.itemHistory != undefined || this.gdata.itemHistory != null) {res=this.gdata.itemHistory;}
      console.log('itemHistory-2: ' + res.length);
      return res;

    },    
    xItemFavorites() {
      var res = [];

      if(this.gdata == undefined){return res;}        
      if(this.gdata.ItemFavorites != undefined || this.gdata.ItemFavorites != null) {res=this.gdata.ItemFavorites;}
      return res;

    },    
  },
    async mounted () {
      console.log('Init_Title')
      this.gdata = useGlobalStore()
      this.sDomain = this.xDomain;
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
      clickLeafLike(item) {
        this.gdata.addClickFavoriteSeq(item)
        this.gdata.storeClickFavorites()
      },
      isLeafLike(item) {
        
        if(item.nav == '--'){return 0;}
          
          if(this.xItemFavorites.length == 0 ){
            return 0;
          }
    
          for (var mm = 0; mm < this.xItemFavorites.length; mm++) {  
            if(item.text == this.xItemFavorites[mm].text && item.nav == this.xItemFavorites[mm].nav){
              return 1;
            }
           }
          return 0;
      }  
    },  

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
  height: 33.0vh;
  vertical-align: text-top;
  }     


</style>