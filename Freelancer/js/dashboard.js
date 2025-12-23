function showTab(tab){
  document.querySelectorAll('.tab').forEach(t=>t.classList.add('hidden'));
  document.getElementById(tab).classList.remove('hidden');

  // Update active nav button
  document.querySelectorAll('.nav-btn').forEach(btn=>btn.classList.remove('active'));
  event.target.classList.add('active');
}
