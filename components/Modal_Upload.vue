<template>
  
  <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn density="comfortable" v-bind="activatorProps" rounded="sm" size="x-large" color="iconic" variant="outlined" icon="mdi-upload"><v-icon color="iconic">mdi-upload</v-icon><v-tooltip class="sitesdesc" activator="parent" location="start">Upload Local Bookmarks</v-tooltip></v-btn>    
      </template>
  
      <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar color="primary" title="Upload" STYLE="font-size:22.0pt;font-family:arial; color: white;"></v-toolbar>
              <v-card-text class="compact-form">
                <v-file-input label="Click here to select a file" outlined v-model="sChosenFile" @change="readfile(isActive)"></v-file-input>
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
        sChosenFile: [],
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
       
        if (bSwitch == true){
          parSlot.value = false
        }

        console.log('Close Edit')
        if (bSwitch == false){
          parSlot.value = false
        }  
      },
      readfile: function(parSlot) {
        
        if(this.sChosenFile == undefined){return;} 
          // alert(JSON.stringify('File name: ' + this.sChosenFile[0].name))
          var file = this.sChosenFile[0];
          const reader = new FileReader();
          if (file.name.includes(".html")) {
          alert("file selected: " + JSON.stringify(file.name))
            
          reader.onload = (res) => {
          this.sReadText = res.target.result;

          localStorage.setItem('PS_ReadText', this.sReadText);

          var iAddDate = this.sReadText.indexOf('ADD_DATE');

          if(iAddDate != -1){dload.loadLocalDomainHTML(this.gdata);} 
          if(iAddDate == -1){dload.loadLocalDomainHTML_Safari(this.gdata);} 

        //console.log("Read File: " + this.sReadText) 
          parSlot.value = false
          return;
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(file);
        
        }

      }   

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