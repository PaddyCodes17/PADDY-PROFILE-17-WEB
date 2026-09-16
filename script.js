const toast=document.getElementById('toast');
function showToast(t){toast.textContent=t;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)}
async function share(url,text){
  if(navigator.share){try{await navigator.share({title:"PADDY'S PROFILE 17",text,url});return}catch(e){}}
  try{await navigator.clipboard.writeText(url);showToast("Profile link copied");}catch(e){showToast(url)}
}
document.getElementById('shareBtn').onclick=()=>share(location.href,"PADDY'S PROFILE 17");
document.getElementById('shareProfile').onclick=()=>share(location.href,"PADDY'S PROFILE 17");
document.getElementById('shareQr').onclick=()=>share(location.origin+location.pathname+"assets/qr.png","PADDY'S PROFILE 17 QR");
document.getElementById('contactBtn').onclick=()=>{
  const vcard=`BEGIN:VCARD\nVERSION:3.0\nFN:Prathamesh Vijay Mundhe\nN:Mundhe;Prathamesh Vijay;;;\nTEL;TYPE=CELL:+919130957961\nEMAIL;TYPE=INTERNET:mundheprathameshimp@gmail.com\nURL:${location.href}\nNOTE:PADDY • 17\nEND:VCARD`;
  const blob=new Blob([vcard],{type:"text/vcard"});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download="Prathamesh-Mundhe-PADDY.vcf";a.click();showToast("Contact file created");
};
