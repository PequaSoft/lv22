
<template>
  <NuxtLayout >
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import dload from '@/mixins/DataLoad'
const sTitle = ref('The Epic Link')
const sDescription = ref('Sharing Bookmarks across the Internet.')
const sImage = ref('https://epiclink-wizbang-pequasoft.vercel.app/favicon.png')
//const sImage2 = ref('https://epiclink-wizbang-pequasoft.vercel.app/EpicLogo.png')
const sImage2 = ref('https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/sports-1584678012.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*')
const sTwitterSetting = ref('summary')
const sTwitterSettingsm = ref('summary')
const sTwitterSettinglg = ref('summary_large_image')

const getTitle = () => {
    const router = useRouter()
    const sBuff = sTitle.value;
    
    var sRawLine = JSON.stringify(router.currentRoute._rawValue.query);
    console.log('Raw Line: ' + sRawLine)
    var sCommandLine = JSON.stringify(router.currentRoute._rawValue.query.domain);
    if(sCommandLine == undefined){return sTitle;}
    //if(sCommandLine.length > 1){return sTitle;}
    sCommandLine = sCommandLine.replaceAll("%20", " "); 
    sCommandLine = dload.cleanString(sCommandLine,34)
    
    //let domainResult = sCommandLine.includes("domain");
    //let iconResult = sCommandLine.includes("icon=");          

    
      //sCommandLine = sCommandLine.split(':')
      //sCommandLine = sCommandLine[1]
      //sCommandLine = sCommandLine.replaceAll("%20", " "); 
      //sCommandLine = sCommandLine.replaceAll("+", " ");      
      console.log('Domain Line: ' + sCommandLine)
    
    /*
    if(domainResult == true){
      sCommandLine = sCommandLine.split('domain=')
      sCommandLine = sCommandLine[1]
      sCommandLine = sCommandLine.replaceAll("%20", " "); 
      sCommandLine = sCommandLine.replaceAll("+", " ");      
      console.log('Command Line: ' + sCommandLine)
    }
    */
    
    return sCommandLine
    ;
}

const getDescription = () => {
    const router = useRouter()
    const sBuff = sTitle.value;
    
    var sCommandLine = JSON.stringify(router.currentRoute._rawValue.query.desc);
    //sCommandLine = sCommandLine.replaceAll("%20", " "); 
    if(sCommandLine == undefined){return sDescription;}
    //if(sCommandLine.length > 1){return sDescription;}
    sCommandLine = sCommandLine.replaceAll("%20", " "); 
    sCommandLine = dload.cleanString(sCommandLine,34)
    
    console.log('Description Line: ' + sCommandLine)
    
    return sCommandLine
    ;
}

const getIcon = () => {
    const router = useRouter()
    const sBuff = sTitle.value;
    
    var sCommandLine = JSON.stringify(router.currentRoute._rawValue.query.icon);
    if(sCommandLine == undefined){return sImage;}
    //if(sCommandLine.length > 1){return sImage;}
    sCommandLine = dload.cleanString(sCommandLine,34)
    
    let iconresult = sCommandLine.includes("mdi-");
    if(iconresult == true){sCommandLine = sImage;}
    //getStyle
    /*
    if(sTwitterSetting.value == 'summary_large_image'){
    
      sCommandLine = sImage2; 
    }
    */
    console.log('Image Line: ' + getStyle().value)

    if(getStyle().value == 'summary_large_image'){
      sCommandLine = getImage().value;  //sImage2; 
    }
    console.log('Icon Line: ' + sCommandLine)

    return sCommandLine
    ;
}

const getImage = () => {
    const router = useRouter()
    const sBuff = sTitle.value;
    
    var sCommandLine = JSON.stringify(router.currentRoute._rawValue.query.image);
    if(sCommandLine == undefined){return sImage;}
    //if(sCommandLine.length > 1){return sImage;}
    sCommandLine = dload.cleanString(sCommandLine,34)
    
    let iconresult = sCommandLine.includes("mdi-");
    if(iconresult == true){sCommandLine = sImage2;}
    
    console.log('Icon Line: ' + sCommandLine)

    return sCommandLine
    ;
}

const getStyle = () => {
    const router = useRouter()
    const sBuff = sTitle.value;
    
    var sCommandLine = JSON.stringify(router.currentRoute._rawValue.query.style);
    if(sCommandLine == undefined){return sTwitterSetting;}
    
    sCommandLine = dload.cleanString(sCommandLine,34)
    
    console.log('Style Setting: ' + sCommandLine)

    if(sCommandLine == 1){return sTwitterSettinglg}

    return sTwitterSettingsm    //sCommandLine
    ;
}

useSeoMeta({
  title: getTitle(),
  icon: sImage,
  ogTitle: sTitle,
  twitterTitle: 'My Amazing Site 2',
  description: getDescription(),  //'Sharing Bookmarks across the Internet.',
  ogDescription: getDescription(),  //'Sharing Bookmarks across the Internet.',
  ogImage: getImage(),   //sImage2,  //sImage,
  twitterImage: getIcon(),
  twitterCard: getStyle(),   //sTwitterSetting,
})

</script>

<style>
@import url("~/assets/css/main.css");
</style>