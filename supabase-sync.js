(function bindSupabaseSaving() {
  window.syncEmployeeAndRefresh = async function (employeePayload) {
    if (typeof window.saveEmployeeToSupabase !== 'function') return null;
    const saved = await window.saveEmployeeToSupabase(employeePayload);
    if (typeof window.loadAllFromSupabase === 'function') {
      await window.loadAllFromSupabase();
    }
    return saved;
  };

  window.syncDocumentAndRefresh = async function (docPayload) {
    if (typeof window.saveDocumentToSupabase !== 'function') return null;
    const saved = await window.saveDocumentToSupabase(docPayload);
    if (typeof window.loadAllFromSupabase === 'function') {
      await window.loadAllFromSupabase();
    }
    return saved;
  };

  document.addEventListener('submit', async (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    const formText = (form.id + ' ' + form.className + ' ' + form.innerText).toLowerCase();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (Object.keys(payload).length === 0) return;

    if (formText.includes('қызметкер') || formText.includes('staff') || formText.includes('employee')) {
      try {
        await window.syncEmployeeAndRefresh(payload);
      } catch (err) {
        console.error('Қызметкерді автоматты сақтау қатесі:', err);
      }
    } else if (formText.includes('құжат') || formText.includes('doc') || formText.includes('сценарий')) {
      try {
        await window.syncDocumentAndRefresh(payload);
      } catch (err) {
        console.error('Құжатты автоматты сақтау қатесі:', err);
      }
    }
  });
})();
