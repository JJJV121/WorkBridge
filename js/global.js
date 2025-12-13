/* global.js
   Common JS utilities used across pages.
   Safe-guarded for pages that don't have every element.
*/

(function(){
  // Toggle simple dropdown by id (if present)
  window.toggleDropdown = function(id){
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('hidden');
  };

  // Simple dark mode toggle; stores choice in localStorage
  window.toggleDarkMode = function(){
    const html = document.documentElement;
    html.classList.toggle('dark');
    // store
    if (html.classList.contains('dark')) localStorage.setItem('wb_dark', '1');
    else localStorage.removeItem('wb_dark');
  };

  // Persist dark mode on load
  document.addEventListener('DOMContentLoaded', function(){
    if (localStorage.getItem('wb_dark')) document.documentElement.classList.add('dark');
  });

  // Generic modal open/close helpers (id)
  window.openModal = function(id){
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.remove('hidden');
  };
  window.closeModal = function(id){
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add('hidden');
  };

  // Simple show/hide for mobile sidebar if exists
  window.toggleSidebar = function(){
    document.querySelectorAll('.sidebar').forEach(s => s.classList.toggle('translate-x-0'));
  };

  // Small helper for nav-links to highlight active nav item
  document.addEventListener('click', function(e){
    if (e.target.matches('[data-nav]')) {
      document.querySelectorAll('[data-nav]').forEach(n => n.classList.remove('text-indigo-600'));
      e.target.classList.add('text-indigo-600');
    }
  });

})();
