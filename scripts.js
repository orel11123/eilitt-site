document.addEventListener('DOMContentLoaded', function(){
  const EXTERNAL_TAXI_LINK = "https://monitex.talents.co.il/vorder/?id=32-133";
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 🟡 מניעת בחירת תאריך שעבר
  const dateInput = document.querySelector('input[name="date"]');
  if (dateInput){
    const today = new Date();
    today.setHours(0,0,0,0); // אפס שעות כדי למנוע בלבול באזורים
    const todayStr = today.toISOString().split('T')[0];
    dateInput.setAttribute('min', todayStr);
    dateInput.value = todayStr; // ברירת מחדל – היום

    // גם אם מישהו מקליד ידנית תאריך ישן
    dateInput.addEventListener('change', function(){
      const selected = new Date(this.value);
      selected.setHours(0,0,0,0);
      if (selected < today){
        alert('לא ניתן לבחור תאריך שעבר. אנא בחר תאריך מהיום והלאה.');
        this.value = todayStr;
      }
    });
  }

  // תפריט נייד
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (hamburger && nav){
    hamburger.addEventListener('click', () => nav.classList.toggle('show'));
  }

  // אנימציות גלילה
  const animated = document.querySelectorAll('.section, .card, .feature-card');
  const onScroll = () => {
    const trigger = window.innerHeight * 0.88;
    animated.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) el.classList.add('visible');
    });
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // מודלים (טפסים ופרויקטים)
  const vehicleModal = document.getElementById('vehicle-modal');
  const projectModal = document.getElementById('project-modal');

  document.querySelectorAll('.open-vehicle-form').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('vehicle-type').textContent = btn.dataset.vehicle;
      document.getElementById('vehicle-input').value = btn.dataset.vehicle;
      vehicleModal.classList.remove('hidden');
    });
  });

  document.querySelectorAll('.open-project').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('project-title').textContent = btn.dataset.title;
      document.getElementById('project-desc').textContent = btn.dataset.desc;
      projectModal.classList.remove('hidden');
    });
  });

  document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.modal').classList.add('hidden'));
  });
  document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', (e) => { if (e.target === m) m.classList.add('hidden'); });
  });

  // קישור למערכת מוניות חיצונית
  document.querySelectorAll('.open-taxi').forEach(btn => {
    btn.addEventListener('click', () => window.open(EXTERNAL_TAXI_LINK, "_blank"));
  });

  // כפתורי וואטסאפ דינמיים
  function waMessage(label){
    const text = `שלום, אשמח להצעת מחיר על ${label}`;
    return `https://wa.me/972527673673?text=${encodeURIComponent(text)}`;
  }
  document.querySelectorAll('.open-wa').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.dataset.label || 'שירות';
      window.open(waMessage(label), "_blank");
    });
  });
});
