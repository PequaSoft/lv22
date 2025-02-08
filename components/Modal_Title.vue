<template>
  <div style="padding-top:18px;padding-left:10px;" align="left">
    <v-row>
      <v-card flat style="width: 30px;padding-right:6px;">  
        <v-icon v-if="isIconLike(xCurrDomainIcon) == 1" style="padding-bottom:8px;padding-right:6px;" color="iconic" size="large">{{xCurrDomainIcon}}</v-icon> 
        <v-img v-if="isIconLike(xCurrDomainIcon) == 0" :src="xCurrDomainIcon" height="30" style="padding-left:10px;" ></v-img>
      </v-card>
    <span STYLE="font-size:18.0pt;font-family:arial; color: black;">{{ xCurrDomain }}</span>
  </v-row>
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
      var res = '--';

      if(this.gdata == undefined){return res;}        
      if(this.gdata.sCurrDomainIcon == undefined){return res;}        
      if(this.gdata.sCurrDomainIcon != undefined || this.gdata.sCurrDomainIcon != null) {res=this.gdata.sCurrDomainIcon;}
      var sLocation = dload.getLocation()
      if(sLocation == 'home'){res=this.gdata.sDomainIcon;}
      if(sLocation == 'local'){res='Local';}
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