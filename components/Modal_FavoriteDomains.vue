<template>
<v-card class="mx-auto" style="overflow: hidden;" max-width="100%" variant="flat">
  <v-list class="listSub" density="compact" style="overflow-x: hidden;">  
  
    <v-list-item v-for="(item, i) in xDomainFavorites" :key="i" :value="xDomainFavorites" >
      
      <template v-slot:prepend>
        <v-card flat style="width: 30px">
        <v-icon color="iconic" v-if="isIconLike(item.icon) == 1" style="width:16px;" default @click="clickDomain(item)">{{ item.icon }}</v-icon>
        <v-img :src="item.icon" v-if="isIconLike(item.icon) == 0" style="width:26px;margin-right:8px;" @click="clickDomain(item)"></v-img>
      </v-card>
      </template>
      <v-card flat >
      <span STYLE="font-family:arial; color: black;" @click="clickDomain(item)">{{ item.text }}</span>
    </v-card>
      <template v-slot:append>
        <v-icon color="delete" v-if="isDomainLike(xCurrDomainIcon) == 0" size="small" @click="deleteDomainLike(item)">mdi-delete</v-icon>       
        <v-icon color="delete" v-if="isDomainLike(xCurrDomainIcon) == 1" size="small" @click="deleteDomainLike(item)">mdi-delete</v-icon>       
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
    xCurrDomainIcon() {
      var res = '--';

      if(this.gdata == undefined){return res;}        
      if(this.gdata.sCurrDomainIcon != undefined || this.gdata.sCurrDomainIcon != null) {res=this.gdata.sCurrDomainIcon;}
      return res;

    },    
    xDomainHistory() {
      var res = [];

      if(this.gdata == undefined){return res;}        
      if(this.gdata.domainHistory != undefined || this.gdata.domainHistory != null) {res=this.gdata.domainHistory;}
      return res;

    },
    xDomainFavorites() {
      var res = [];

      if(this.gdata == undefined){return res;}        
      if(this.gdata.domainFavorites != undefined || this.gdata.domainFavorites != null) {res=this.gdata.domainFavorites;}
      return res;

    },    
  },
    async mounted () {
      console.log('Mount_FavoriteDomains')
      this.gdata = useGlobalStore()
      this.sDomain = this.xDomain;
      //this.sDomain = 'Test Domain';
    },
    
    methods:{
      clickDomain(item) {
        //this.gdata.sCurrDomain = item.text
        this.gdata.addDomainHistory(item)
        //document.title = item.text;
        //this.$bus.$emit('ACTIVATE_TITLE', item.text)     
        this.$bus.$emit('ACTIVATE_TITLE', item.text)       
        dload.selectDomain(this.gdata, item.text,1)
        
      },
      clickDomainLike(item) {
        //this.gdata.addClickFavoriteSeq(item)
        //this.gdata.storeClickFavorites()
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
      deleteDomainLike(item) {
        this.gdata.deleteDomainFavorite(item) 
        //this.gdata.addClickFavoriteSeq(item)
        //this.gdata.storeClickFavorites()
        
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
  height: 31.6vh;
  vertical-align: text-top;
  }     

</style>