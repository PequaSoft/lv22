<template>
  <v-flex xs12 md12 lg12 >      
    <v-row class="totalHt" >
      <v-col class="justify-center" xl="2" lg="2" md="auto" sm="auto" color="grey-lighten-3">
        
      </v-col>
      <v-col class="justify-center mt-n1 pr-0 pl-0" style="padding:0px;" align="right" xl="2" lg="2" md="auto" sm="auto" color="grey" v-if="showDomainPanel == 0">
        <div class="totalHt columnTopLeft" style="padding-top:6px;padding-left:20px;padding-right:20px;padding-bottom:4px;">  
        <v-btn density="comfortable" rounded="sm" color="iconic" variant="outlined" icon="mdi-chevron-double-left" @click="showDomainPanels(1)"><v-icon color="iconic">mdi-chevron-double-left</v-icon><v-tooltip class="sitesdesc" activator="parent" location="start">Show Domain Panel</v-tooltip></v-btn>
        </div>
      </v-col>  
      <v-col class="justify-center mt-n1 pr-0 pl-0" style="padding:0px;" align="right" xl="2" lg="2" md="auto" sm="auto" color="grey" v-if="showDomainPanel == 1">
        <div class="topRow columnTopLeft" align="right" style="padding-left:20px;padding-right:20px;padding-bottom:4px;">  
          <span STYLE="font-size:22.0pt;font-family:arial; color: white;">-</span>
          <v-btn density="comfortable" rounded="sm" color="iconic" variant="outlined" icon="mdi-chevron-double-right"  @click="showDomainPanels(0)"><v-icon color="iconic">mdi-chevron-double-right</v-icon><v-tooltip class="sitesdesc" activator="parent" location="start">Hide Domain Panel</v-tooltip></v-btn>
        </div> 
        <div class="botRow columnLeftSub2" align="left" >  
          <div class="topSub columnTopSub bg-primary" align="center" style="padding-bottom:6px;">  
            <h3 STYLE="font-family:arial; color: white;">Recent Domains</h3>
        </div>     
        <div class="botSub" align="left" style="padding-top:2px;" >  
          <recentDomains />
        </div> 
        <div class="topSub columnTopSub bg-primary" align="center" style="padding-top:0px;padding-bottom:6px;">  
            <h3 STYLE="font-family:arial; color: white;">Favorite Domains</h3>
        </div>     
        <div align="left" >  
          <favoriteDomains />
        </div>         
        </div>         
        
      </v-col>
      <v-col align="right" style="padding:0px;" xl="4" lg="4" md="6" sm="6" color="grey">
        <div >
            <v-card variant="flat" class="topRowImg" >
              <v-row style="padding-top:8px;padding-bottom:4px;padding-left:4px;padding-right:4px;">
              <div class="topRowImg partA" align="center" style="padding-left:0px;padding-right:0px;padding-bottom:0px;background-color: white;">  
                <titleModalImg />
              </div > 
              <div class="partB" align="left" style="padding-left:0px;padding-right:0px;padding-bottom:0px;background-color: white;">  
                <titleModal />
                <titleDescription />
              </div > 
              </v-row>
            </v-card>
          </div>
        <div class="botRowImg columnMidBot" align="left" >  
          <div class="editRow">
            <v-text-field class="compact-form" append-inner-icon="mdi-magnify" label="Search" style="padding:0px" id="text101" density="compact" variant="solo" v-model="sTreeSearch" hint="Enter Domain..." @keypress="disableKeyStroke" ></v-text-field>  
            
          </div>
          <div style="padding-left:4px;padding-right:4px;">
          <v-alert v-if="xInitApp == 100 && xDomain == '--'" color="info" type="info" dark>Please Login / Register to create your own Domain</v-alert>
          <v-alert v-if="xInitApp == 1 && xUID != '--' && xDomain == '--'" color="info" type="info" dark>Update your profile to create your own Domain</v-alert>
          </div>
          
          <treeModal />
          <div class="column2 sitesdesc" align="center"> 
            <v-alert v-if="xLocalData.length == 0" class="ml-2 mr-2 mt-3" style="margin:10px;" color="warning" dark>
              Export bookmarks from browser then import into EpicLink
            </v-alert>
            <upload v-if="xLocalData.length >= 0" />  
          </div> 

        </div>     
        
      </v-col>
      <v-col class="justify-center mt-n1 pr-0 pl-0" style="padding:0px;" align="left" xl="2" lg="2" md="auto" sm="auto" color="grey" v-if="showLinksPanel == 0">
        <div class="totalHt columnTopRight" style="padding-top:6px;padding-left:20px;padding-right:20px;padding-bottom:4px;">  
          <v-btn density="comfortable" rounded="sm" color="iconic" variant="outlined" icon="mdi-chevron-double-right" @click="showLinksPanels(1)"><v-icon color="iconic">mdi-chevron-double-right</v-icon><v-tooltip class="sitesdesc" activator="parent" location="end">Show Links Panel</v-tooltip></v-btn>
          <span STYLE="font-size:22.0pt;font-family:arial; color: white;">-</span>
          <v-btn density="comfortable" rounded="sm" color="iconic" variant="outlined" icon="mdi-chevron-double-left" nuxt to="/about"><v-icon color="iconic">mdi-information-variant</v-icon><v-tooltip class="sitesdesc" activator="parent" location="end">About Page</v-tooltip></v-btn>
        </div>  
      </v-col>        
      <v-col class="justify-center mt-n1 pr-0 pl-0" style="padding:0px;" align="right" xl="2" lg="2" md="auto" sm="auto" color="grey"v-if="showLinksPanel == 1">
        <div class="topRow columnTopRight" align="left" style="padding-left:10px;padding-right:20px;padding-bottom:4px;">  
          <span STYLE="font-size:22.0pt;font-family:arial; color: white;">-</span>
          <v-btn density="comfortable" rounded="sm" color="iconic" variant="outlined" icon="mdi-chevron-double-left" @click="showLinksPanels(0)"><v-icon color="iconic">mdi-chevron-double-left</v-icon><v-tooltip class="sitesdesc" activator="parent" location="end">Hide Links Panel</v-tooltip></v-btn>
          <span STYLE="font-size:22.0pt;font-family:arial; color: white;">-</span>
          <v-btn density="comfortable" rounded="sm" color="iconic" variant="outlined" icon="mdi-chevron-double-left" nuxt to="/about"><v-icon color="iconic">mdi-information-variant</v-icon><v-tooltip class="sitesdesc" activator="parent" location="end">About</v-tooltip></v-btn>                    
        </div> 
        <div class="botRow columnLeftSub2" align="left" >  
          <div class="topSub columnTopSub bg-primary" align="left" style="padding-bottom:6px;">  
            <h3 STYLE="font-family:arial; color: white;">Recent Links</h3>            
        </div>     
        <div class="botSub " align="left" style="padding-top:2px;">  
          <recentLinks />
        </div> 
        <div class="topSub columnTopSub bg-primary" align="left" style="padding-bottom:6px;" >  
            <h3 STYLE="font-family:arial; color: white;">Favorite Links</h3>
        </div>     
        <div align="left" style="padding-top:10px;">  
          <favoriteLinks />
        </div>         
        </div>         
      </v-col>      
    </v-row>
  </v-flex>
</template>

<script lang="js">
//searchButton
  
  import titleModal from '~/components/Modal_TitleHome.vue'
  import titleModalImg from '~/components/Modal_Title_Img.vue'
  import titleDescription from '~/components/Modal_Description.vue'
  import treeModal from '~/components/Modal_Tree.vue'
  import titleButtons from '~/components/Modal_Button.vue'
  import recentLinks from '~/components/Modal_RecentLinks.vue'
  import favoriteLinks from '~/components/Modal_FavoriteLinks.vue'
  import recentDomains from '~/components/Modal_RecentDomains.vue'
  import favoriteDomains from '~/components/Modal_FavoriteDomains.vue'
  import upload from '~/components/Modal_Upload.vue'
  //<searchModal v-show="xSearch" />
  //import searchModal from '~/components/Modal_Search.vue'

//<recentLinks />
  import axios from 'axios'
  import Swal from 'sweetalert2'
  import dload from '@/mixins/DataLoad'

  import { useGlobalStore } from '~/store/globalData'
  
  export default {
    data() {
      return {
        showDomainPanel: 1,
        showLinksPanel: 1,
        InitApp: 0,
        sUID: '',
        sCurrDomain: '',
        sTreeSearch: '',
        gdata: null,
        
      }
    },
    computed:  {
    xShowDomainPanel() {
      
        return this.gdata.showDomainPanel;
    },

    xInitApp() {
      var res = 0;

      if(this.gdata == undefined){return res;}  
      if(this.gdata.initApp == undefined){return 0;}  
      if(this.gdata.initApp == null){return 0;}  

      if(this.gdata.initApp != undefined || this.gdata.initApp != null) {res=this.gdata.initApp;}
      return res;
    },
    
    xUID() {
      var res = '--';

      if(this.gdata == undefined){return res;}  
      if(this.gdata.sUID != undefined || this.gdata.sUID != null) {res=this.gdata.sUID;}
      return res;
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
    xSearch() {
      var res = 0;

      if(this.gdata == undefined){return res;}        
      if(this.gdata.iSearch != undefined || this.gdata.iSearch != null) {res=this.gdata.iSearch;}
      return res;

    },    
    xLocalData() {
      var res = 0;

      if(this.gdata == undefined){return res;}        
      if(this.gdata.localData != undefined || this.gdata.localData != null) {res=this.gdata.localData;}
      return res;

    },        
    
    },
    async created () {
      console.log('Create_local')
      /*
      this.gdata = useGlobalStore()
      console.log('Create_Index: ' + this.gdata.sUID )
      dload.doCurrDomain(this.gdata)
      this.sUID = this.gdata.sUID;
      this.sCurrDomain = this.gdata.sCurrDomain;
      this.showDomainPanel = this.gdata.showDomainPanel
      this.showLinksPanel = this.gdata.showLinksPanel
      //dload.setAddressBar(this.sCurrDomain)
      dload.selectDomain(this.gdata, this.sCurrDomain)
      */
    },

    async mounted () {
      
      this.gdata = useGlobalStore()
      console.log('Mount_local: ' + this.gdata.sUID )
      //dload.doCurrDomain(this.gdata)
      
      dload.loadLocalDomain(this.gdata)
      console.log('loadLocalDomain')
      this.$bus.$on('xACTIVATE_TITLE_LOCAL', (data) => {
        document.title = 'Local Desktop'
        console.log('new title: Local Desktop')
      })
      //if(dload.getLocation() == 'local'){document.title = 'Local Desktop'}
      
    },    
       
    methods:{
      showDomainPanels(parInput){
        console.log('Show Domain')
        this.showDomainPanel = parInput
        this.gdata.showDomainPanel = this.showDomainPanel
      },
      showLinksPanels(parInput){
        this.showLinksPanel = parInput
        this.gdata.showLinksPanel = this.showLinksPanel
      },   
      disableKeyStroke (e) {
      //if (e.charCode === 33) { e.preventDefault()}
      if (e.charCode === 39 || e.charCode === 34) { e.preventDefault()}
      },       

    }
    
  }  
  </script>

<script setup lang="js">
import { ref, onUpdated } from 'vue'

onMounted(() => {
  document.body.style.overflow = "hidden";
  console.log('myheader mounted');
});

onUpdated(() => {
  
  console.log('Index updated');
});


</script>

<style>
  @import url("~/assets/css/about.css");

  .partA {
      width: 30%;
      height: 10vh;
   }
   .partB {
      width: 70%;
   }
   .partC {
      width: 30%;
      height: 5vh;
   }
  
   .columnMidTop {
    border-top: 1px solid rgb(200, 200, 200);
    border-bottom: 1px solid rgb(200, 200, 200);        
    }
   .columnMidBot {
    border-bottom: 1px solid rgb(200, 200, 200);        
    }      
   
   .editRow {
    border-top: 1px solid rgb(200, 200, 200);
    height: 7vh;
    }      
    .topRow {
    height: 5vh;
    }        
    .topRowImg {
    height: 11.2vh;
    }        
   .totalHt {
    height: 87vh;
    }      
    
   .botRow {
    height: 80.0vh;
    vertical-align: text-top;
    }      
    .botRowImg {
    height: 74.3vh;
    vertical-align: text-top;
    }        
   .topSub {
    height: 5vh;
    text-align: center;
    }                  
   .botSub {
    height: 34.0vh;
    vertical-align: text-top;
    }                        
   .columnTopLeft {
    border-right: 1px solid rgb(200, 200, 200);
   }
   .columnTopRight {
    border-left: 1px solid rgb(200, 200, 200);
   }
   .columnTopSub {
    border-top: 1px solid rgb(200, 200, 200);
    border-bottom: 1px solid rgb(200, 200, 200);
    vertical-align: text-center;
   }        
    
   .columnLeftSub2 {
    border-top: 1px solid white;
    border-bottom: 1px solid rgb(200, 200, 200);  
    border-left: 1px solid rgb(200, 200, 200);
    border-right: 1px solid rgb(200, 200, 200);
   }
  
   .alignCenter {
    vertical-align: text-center;
   }
  
   .v-text-field--outlined >>> fieldset {
    border-color: rgba(250, 0, 50, 0.986);
  }
  
  .compactEdit {
        font-family: "Arial", Helvetica, sans-serif;
        padding-top: 0px;
        padding-bottom: 0px;
        
      }
 /*
 .columnLeftBot {
  border-left: 1px solid rgb(200, 200, 200);
  border-bottom: 1px solid rgb(200, 200, 200);        
  }            
 .columnRightBot {
  border-right: 1px solid rgb(200, 200, 200);
  border-bottom: 1px solid rgb(200, 200, 200);        
  }              

.columnTopSub2 {
  border-top: 1px solid rgb(200, 200, 200);
  border-left: 1px solid rgb(200, 200, 200);
  border-right: 1px solid rgb(200, 200, 200);
  border-bottom: 1px solid rgb(200, 200, 200);
 }            

 .columnLeftSub {
  border-top: 1px solid white;
  border-left: 1px solid rgb(200, 200, 200);
  border-right: 1px solid rgb(200, 200, 200);
 }
 .columnPlug {
  border-top: 1px solid white;
  
 }

 .columnRightSub {
  border-right: 1px solid rgb(200, 200, 200);
  border-left: 1px solid rgb(200, 200, 200);
 }
 .columnRightSub2 {
  border-bottom: 1px solid rgb(200, 200, 200);  
  border-right: 1px solid rgb(200, 200, 200);
  border-left: 1px solid rgb(200, 200, 200);
 }
*/ 
  </style>

<style >
  @import url("~/assets/css/main.css");
  
</style>