<template>
  <v-card class="mx-auto" style="overflow: hidden;" max-width="100%" variant="flat">
  <v-list class="listSub" density="compact" color="iconic"  style="overflow-x: hidden;">  
  
    <v-list-item v-for="(item, i) in xDomainHistory" :key="i" :value="xDomainHistory" >
      
      <template style="margin-right:13px;" v-slot:prepend>
        <v-card flat style="width: 30px">
        <v-icon color="iconic" v-if="isIconLike(item.icon) == 1" style="width:16px;" default @click="clickDomain(item)">{{ item.icon }}</v-icon>
        <v-img :src="item.icon" v-if="isIconLike(item.icon) == 0" style="width:26px;margin-right:8px;" @click="clickDomain(item)"></v-img>
      </v-card>
      </template>
      <span STYLE="font-family:arial; color: black;" @click="clickDomain(item)">{{ item.text }}</span>
      <template v-slot:append>
        <v-icon color="iconic" v-if="isDomainLike(item) == 0" size="small" @click="clickDomainLike(item)" >mdi-plus</v-icon> 
        <v-icon color="white" v-if="isDomainLike(item) != 0" size="small" @click="clickDomainLike(item)" >mdi-minus</v-icon> 
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
    xDomainHistory() {
      var res = [];

      if(this.gdata == undefined){return res;}        
      if(this.gdata.domainHistory != undefined || this.gdata.domainHistory != null) {res=this.gdata.domainHistory;}
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
      clickDomain(item) {
        //this.gdata.sCurrDomain = item.text

        this.gdata.addDomainHistory(item)
        //this.gdata.storeDomainHistory();
        //document.title = item.text;
        this.$bus.$emit('ACTIVATE_TITLE', item.text)      
        dload.selectDomain(this.gdata, item.text,1)
  
      },
      clickDomainLike(item) {
        this.gdata.addDomainFavorite(item)
        this.gdata.storeDomainFavorites()
      },      
      isDomainLike(item) {
        //this.gdata.addClickFavoriteSeq(item)
        //this.gdata.storeClickFavorites()
        return 0;
      },            
      isIconLike(itemIcon) {
        var sBuff = itemIcon;
        var result = 1;
      
      if (sBuff.substring(0,4) != 'mdi-'){result = 0;}

      return result;
      },                  

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
  height: 34.0vh;
  vertical-align: text-top;
  }     

  .v-theme--light{
  --v-hover-opacity: 0.04;
  --v-theme-overlay-multiplier: .1;
}

</style>