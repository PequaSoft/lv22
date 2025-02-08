<template>
  <div style="padding-top:4px;">
  
      <v-card flat style="width: 100%;padding-right:0px;" >  
        <v-icon v-if="isIconLike(xCurrDomainIcon) == 1" style="padding-left:20px;padding-top:10px;padding-right:6px;" color="iconic" size="80px">{{xCurrDomainIcon}}</v-icon> 
        <v-img v-if="isIconLike(xCurrDomainIcon) == 0" :src="xCurrDomainIcon" height="80" style="margin-top:8px;padding-left:4px;" ></v-img>
      </v-card>
      
  
  </div>
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
      var sLocation = dload.getLocation()
      if(sLocation == 'home'){res=this.gdata.sDomain;}
      if(sLocation == 'local'){res='Local';}
      return res;

    },    
    xCurrDomainIcon() {
      var res = 'mdi-domain';

      if(this.gdata == undefined){return res;}        
      if(this.gdata.sCurrDomainIcon == undefined){return res;}        
      if(this.gdata.sCurrDomainIcon != undefined || this.gdata.sCurrDomainIcon != null) {res=this.gdata.sCurrDomainIcon;}
      if(this.gdata.sCurrDomainImage != undefined || this.gdata.sCurrDomainImage != null) {res=this.gdata.sCurrDomainImage;}
      var sLocation = dload.getLocation()
      if(sLocation == 'home' && this.gdata.sDomainIcon != undefined  && this.gdata.sDomainIcon != null ){res=this.gdata.sDomainIcon;}
      if(sLocation == 'home' && this.gdata.sDomainImage != undefined  && this.gdata.sDomainImage != null ){res=this.gdata.sDomainImage;}
      //if(sLocation == 'home'){res=this.gdata.sDomainIcon;}
      if(sLocation == 'local'){res='mdi-desktop-classic';}
      return res;

    },        
    xLocation() {
      var res = dload.getLocation()
      
      return res;
    },        
  },
    async mounted () {
      console.log('Init_Title')
      this.gdata = useGlobalStore()
      this.sDomain = this.xDomain;  // gdata.sDomain;
      //this.sDomain = 'Test Domain';
    },
    
    methods:{
      isIconLike(itemIcon) {
        var sBuff = itemIcon;
        var result = 1;
      
        if(itemIcon == undefined){return result;}
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
</style>