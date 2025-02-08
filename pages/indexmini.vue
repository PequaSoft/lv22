<template>
<v-flex xs12 md12 lg12 class="my-2 mt-0">        
    <v-row class="totalHt" >

      <v-col style="padding:0px;" cols="11" color="grey">
        <div >
          <v-card variant="flat" class="topRowImg" >
        <v-row style="padding-top:8px;padding-bottom:4px;padding-left:8px;padding-right:4px;">
          
        <div class="topRowImg partA" align="center" style="padding-left:0px;padding-right:0px;padding-bottom:0px;background-color: white;">  
          <titleModalImg />
          
        </div > 
        <div class="partB" align="left" style="padding-left:0px;padding-right:0px;padding-bottom:0px;background-color: white;">  
          <titleModal2 />
          <titleDescription />
        </div > 
      
        </v-row>
      </v-card>
      </div>
        <div class="botRowImg columnMidBot" align="left" >  
          <div class="editRow">
            <v-text-field class="compact-form" append-inner-icon="mdi-magnify" label="Search" style="padding:0px" id="text101" density="compact" v-model="sTreeSearch" hint="Enter Domain..." @keypress="disableKeyStroke" ></v-text-field>  
            
          </div>
          <div style="padding-left:8px;padding-right:4px;">
          
          <v-alert v-if="xInitApp == 100 && xDomain == '--'" color="info" type="info" dark>Please Login / Register to create your own Domain</v-alert>
          <v-alert v-if="xInitApp == 1 && xUID != '--' && xDomain == '--'" color="info" type="info" dark>Update your profile to create your own Domain</v-alert>
          <treeModal />
          </div>
          
        </div>     
        
      </v-col>
      
      
    </v-row>
  </v-flex>
</template>

<script lang="js">
//searchButton
  
  //import titleModal from '~/components/Modal_Title.vue'
  import titleModal2 from '~/components/Modal_Title2.vue'
  import titleDescription from '~/components/Modal_Description.vue'
  import titleModalImg from '~/components/Modal_Title_Img.vue'
  import treeModal from '~/components/Modal_Tree.vue'
  //import titleButtons from '~/components/Modal_Button.vue'
  import titleButtonsImg from '~/components/Modal_Button_Img.vue'
  import recentLinks from '~/components/Modal_RecentLinks.vue'
  import favoriteLinks from '~/components/Modal_FavoriteLinks.vue'
  import recentDomains from '~/components/Modal_RecentDomains.vue'
  import favoriteDomains from '~/components/Modal_FavoriteDomains.vue'
  //<searchModal v-show="xSearch" />
  //import searchModal from '~/components/Modal_Search.vue'

//<recentLinks />
  import axios from 'axios'
  import Swal from 'sweetalert2'
  import dload from '@/mixins/DataLoad'

  import { useGlobalStore } from '~/store/globalData'

  //const router = useRouter()
  
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
        router: null,
        //sDeviceType: 'desktop',
        componentKey: 0
        
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
      //dload.loadClickFavorites( this.gdata)
      //console.log('itemFavorite-initapp:' + this.gdata.itemFavorites.length);
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

      //var sBuff = this.genURLTitle()
      //console.log('URL Title:' + sBuff)
      
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
    
    },
    async created () {
      console.log('Create_Index')
      
    },

    async mounted () {
      /*
      var sURL = "https://instapundit.com/"
      let title = await getTitleAtUrl(sURL);
      */
      
      this.gdata = useGlobalStore()
      this.router = useRouter()
      
      this.gdata.sDeviceType = 'desktop';
      if(window.innerHeight > window.innerWidth){this.gdata.sDeviceType = 'Mobile';} 
      if(this.gdata.sDeviceType == 'desktop'){ this.$router.push('/');}

      this.$bus.$on('ACTIVATE_TITLE', (data) => {
        document.title = data;    //this.sCurrDomain
        console.log('new title: ' + data)
      })
      
      //if(this.gdata == undefined){console.log('itemFavorite-uncheck');}        
      //if(this.gdata != undefined){dload.loadClickFavorites( this.gdata);console.log('itemFavorite-check');}    
      console.log('Mount_Index')    
      console.log('Mount_Index: ' + this.gdata.sUID )
      //this.$bus.$emit('ACTIVATE_FAVORITE_LINKS', this.gdata)      
      dload.doCurrDomain(this.gdata)
      this.sUID = this.gdata.sUID;
      this.sCurrDomain = this.gdata.sCurrDomain;
      this.showDomainPanel = this.gdata.showDomainPanel
      this.showLinksPanel = this.gdata.showLinksPanel
      //dload.setAddressBar(this.sCurrDomain)
      //dload.loadSidebars(this.gdata)
      
      dload.selectDomain(this.gdata, this.sCurrDomain)
      
      //var sCombo = {text: '--', icon: '--'}
      //this.gdata.addClickFavoriteSeq(sCombo)
      this.componentKey+=1;
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