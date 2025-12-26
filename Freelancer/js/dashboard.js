function showTab(id, el){
  document.querySelectorAll('.tab').forEach(t=>t.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');

  // Update active nav button
  document.querySelectorAll('.sidebar-item').forEach(btn=>btn.classList.remove('active'));
  el.classList.add('active');
}
