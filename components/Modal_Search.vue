<template>

  <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn density="comfortable" v-bind="activatorProps" rounded="sm" color="iconic" variant="outlined" @click="clickSearch" icon="mdi-magnify"><v-icon color="iconic">mdi-magnify</v-icon><v-tooltip class="sitesdesc" activator="parent" location="start">Search Bookmark Domains</v-tooltip></v-btn>    
        </template>
    
        <template v-slot:default="{ isActive }">
            <v-card>
              <v-toolbar color="primary" title="Search" STYLE="font-size:22.0pt;font-family:arial; color: white;"></v-toolbar>
                <v-card-text class="compact-form">
                  <v-layout row wrap style="height: 60px;width: 450px;" pl-3 justify-center>
                  <v-text-field placeholder="Enter Domain..." density="compact" style="padding-right:8px;" variant="solo" v-model="sSearchDomain" @keypress="disableKeyStroke"></v-text-field>     
                  <div style="padding-top:4px;">
                  <v-btn text color ="primary" variant="outlined" @click="doLoadSearch"icon="mdi-magnify"><v-icon color="primary">mdi-magnify</v-icon></v-btn>
                  </div>
                  </v-layout>
  
                  <div style="padding: 5px; height: 300px; text-align: left; overflow-y: scroll;">               
                  <v-layout row wrap style="width: 330px;" >
                    <v-list dense>
                    <v-subheader>Domains</v-subheader>
                    <v-list-item-group v-model="searchResults" color="primary">
                    
                      <v-card class="mx-auto" style="overflow: hidden;" max-width="100%" variant="flat">
                    
                      <v-list-item v-for="(item, i) in searchResults" :key="i">
                        <v-list-item-content>
                        <v-list-item-title v-model="sSearchSelect" @click="selectDomain(isActive,item)">{{ item }}</v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                      </v-card>  
                      </v-list-item-group>
                    </v-list>
                  </v-layout>                                            
                </div>
                </v-card-text>
                <v-card-actions class="justify-end compact-footer">
                  <v-btn density="comfortable" color="primary" variant="outlined" @click="closeLogin(isActive, false)" icon="mdi-check" size="large"></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn density="comfortable" color="primary" variant="outlined" @click="closeLogin(isActive, false)"  icon="mdi-close" size="large"></v-btn>
                </v-card-actions>
            </v-card>
        </template>
        </v-dialog>
  
  </template>
  
  <script lang="js">
    
    import { useGlobalStore } from '~/store/globalData'
    import axios from 'axios'
    import Swal from 'sweetalert2'
    import dload from '@/mixins/DataLoad'
  
    //const gdata = useGlobalStore()
    //<searchButton />
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
    },
      async mounted () {
        this.gdata = useGlobalStore()
        this.searchResults = [];
        console.log('Init_Buttons')
       
      },
      
      methods:{
        clickSearch(){
          this.gdata.iSearch = 1;  
          console.log('Init_Search')
        },
        async closeLogin (parSlot, bSwitch) {
          parSlot.value = false  
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
        async selectDomain(parSlot,parItem){
        var sTbuff = parItem.split("-");
  
        this.sSearchDomain = sTbuff[0];
  
            this.modalSearch = false;
                      
            localStorage.setItem('PS_CurrDomain', JSON.stringify(this.sSearchDomain));
            //this.$store.commit('globalData/setCurrDomain', this.sSearchDomain)
            //var iItem = {text: this.sSearchDomain}
           
            this.gdata.sCurrDomain = this.sSearchDomain;
            const x = await dload.loadDomainDescription(this.sSearchDomain, this.gdata.axios, this.gdata,1);
            var iItem = {text: this.sSearchDomain, icon: this.gdata.sCurrDomainIcon}

            this.gdata.addDomainHistory(iItem)
            
            dload.selectDomain(this.gdata, iItem.text,1)
            
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