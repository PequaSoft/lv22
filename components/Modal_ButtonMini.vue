<template>
   <div align="right" style="width: 42%; height: 5vh;background-color: white;padding-top:6px;" >  
      <search />  
      <span STYLE="font-size:22.0pt;font-family:arial; color: white;">-</span>
    </div>    

</template>
  <script lang="js">
  
  import { useGlobalStore } from '~/store/globalData'
  import axios from 'axios'
  import Swal from 'sweetalert2'
  import dload from '@/mixins/DataLoad'
  
  import search from '~/components/Modal_Search.vue'
  import edit from '~/components/Modal_Edit.vue'

  //<v-btn v-if="xLocation =='local'" density="comfortable" rounded="sm" color="iconic" variant="outlined" icon="mdi-pencil" nuxt to="/local"><v-icon color="iconic">mdi-pencil</v-icon><v-tooltip class="sitesdesc" activator="parent" location="end">Local Domain</v-tooltip></v-btn>
  //const gdata = useGlobalStore()
  //
  export default {
    data() {
      return {
        sDomain: '',
        sDomainDescription: '',
        sDomainIcon: '',
        sSearchSelect: '',      
        searchResults: ['Main'],
        sSearchDomain: '',      
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
    xLocation() {
      var res = '--'
      if(this.gdata == undefined){return res;}        
      res = dload.getLocation()

      /*
      var res = 'index';

      var nextURL = window.location.href;   // + '?domain=PequaSoft';
      let loc_home = nextURL.includes("/home");
      let loc_local = nextURL.includes("/local");
      let loc_localhost = nextURL.includes("/localhost");
      
      if(loc_home == true){res ='home';}        
      if(loc_local == true && loc_localhost == false){res ='local';}        
      */
      return res;

    },  
    xLoginStatus() {
      var res = 0
      if(this.gdata == undefined){return res;}        
      res = this.gdata.loginStatus
            
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
    xCurrDomainDesc() {
      var res = '--';

      if(this.gdata == undefined){return res;}        
      if(this.gdata.sCurrDomainDesc != undefined || this.gdata.sCurrDomainDesc != null) {res=this.gdata.sCurrDomainDesc;}
      var sLocation = dload.getLocation()
      if(sLocation == 'home'){res=this.gdata.sDomainDesc;}
      if(sLocation == 'local'){res='Local';}
      return res;

    },        
    
    
    
    //this.loginStatus
  },
    async mounted () {
      this.gdata = useGlobalStore()
      this.searchResults = [];
      //console.log('Init_Buttons:' + this.xLocation)
     
    },
    
    methods:{
      clickSearch(){
        this.gdata.iSearch = 1;  
        console.log('Init_Search')
      },
      async closeLogin (parSlot, bSwitch) {
        parSlot.value = false  
      },
      clickLocal() {
        //document.title = 'Local Desktop'
        const router = useRouter()
        
        router.push({ path: '/local' })
        //to="/local"
        //this.$bus.$emit('ACTIVATE_TITLE_LOCAL', 'abc')      
  
      },
      disableKeyStroke (e) {
      //if (e.charCode === 33) { e.preventDefault()}
      if (e.charCode === 39 || e.charCode === 34) { e.preventDefault()}
      },
      doLoadSearch(){
          const formData = new FormData()

          formData.append("search",  this.sSearchDomain.toUpperCase())

          this.searchResults = [];

          var n = true
          if(this.sSearchDomain == '...'){n = false;}
          if(this.sSearchDomain.length == 0){n = false;}
          if(this.sSearchDomain == undefined){n = false;}

          if(n != true){
            Swal.fire({
            title: '<font face="verdana" color="red">Invalid Request</font>',
            html: '<font face="verdana" color="black">Invalid request. Enter a string to search on.</font>',
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
            })
          return;
          }

          axios.post(this.gdata.axios + 'domainsearch', formData).then((res) => {
        
            var result = JSON.stringify(res.data.rows)
            
            result = dload.cleanString(result,92)
            result = dload.cleanString(result,34)
            result = dload.cleanString(result,39)

            //alert("Search Results: " + result);
            if(result.includes("}") == true){
              //alert("Search Results: " + result);            
              var sTbuff = result.split("},")
              var arraylength = sTbuff.length

              for (let i = 0; i < arraylength; i++) {
                var xBbuff = sTbuff[i].split(",")
                var wBbuff = xBbuff[0].split(":")
                var uBbuff = xBbuff[1].split(":")
                var nBuff = JSON.stringify(xBbuff)

                nBuff = dload.cleanString(nBuff,91)
                nBuff = dload.cleanString(nBuff,93)
                nBuff = dload.cleanString(nBuff,34)
                nBuff = dload.cleanString(nBuff,125)
                uBbuff[1] = uBbuff[1].replace('}','')
                uBbuff[1] = uBbuff[1].replace('}}','')
                uBbuff[1] = uBbuff[1].replace('}]}','')

                if(uBbuff[1] == 'null'){uBbuff[1] = wBbuff[1]}
                
                var sSearchItem = wBbuff[1] +'-' + uBbuff[1]  //+ ' (' + typeBbuff + ')'
                // alert("Search Results: " + sSearchItem);            
                this.searchResults.push(sSearchItem)
              }
            return
          }          
        });

      },        
      selectDomain(parSlot,parItem){
      var sTbuff = parItem.split("-");

      this.sSearchDomain = sTbuff[0];

          this.modalSearch = false;
                    
          localStorage.setItem('PS_CurrDomain', JSON.stringify(this.sSearchDomain));
          //this.$store.commit('globalData/setCurrDomain', this.sSearchDomain)
          this.gdata.sCurrDomain = this.sSearchDomain;
          
          parSlot.value = false  
        },                

    },  

    }
  
  </script>
  <script setup lang="js">

    onMounted(() => {
      //this.gdata = useGlobalStore()
      console.log('login mounted');
    });

   
  </script>

<style >
  @import url("~/assets/css/main.css");
</style>