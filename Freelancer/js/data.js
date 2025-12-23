const jobs = [
  { id:1, title:"React Developer", client:"TechCorp", budget:"$60/hr", match:92 },
  { id:2, title:"UI/UX Designer", client:"DesignStudio", budget:"$40/hr", match:87 }
];

const proposals = [
  { role:"Frontend Dev", status:"Viewed" },
  { role:"UI Designer", status:"Accepted" }
];

const contracts = [
  { name:"React App", progress:64, earnings:"$3,200 / $5,000" }
];

document.querySelectorAll("button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    btn.classList.add("scale-95");
    setTimeout(()=>btn.classList.remove("scale-95"),120);
  });
});
