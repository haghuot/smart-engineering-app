(function () {
  const app = document.getElementById("app");
  let historyStack = [];

  function setActivePage(id, { push = true, fromTab = false } = {}) {
    const target = document.getElementById("page-" + id);
    if (!target) return;

    const current = document.querySelector(".page.active");
    if (current && push && current.id !== target.id) {
      historyStack.push(current.id.replace("page-", ""));
    }

    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    target.classList.add("active");

    const isSub = target.classList.contains("subpage");
    app.classList.toggle("hide-tabs", isSub);

    if (!isSub && fromTab) historyStack = [];

    document.querySelectorAll(".tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.tab === id);
    });

    target.querySelector(".scroll-body")?.scrollTo(0, 0);
  }

  function goBack() {
    const prev = historyStack.pop();
    if (prev) setActivePage(prev, { push: false });
    else setActivePage("home", { push: false, fromTab: true });
  }

  document.querySelectorAll("[data-go]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      setActivePage(el.dataset.go);
    });
  });

  document.querySelectorAll("[data-back]").forEach((el) => {
    el.addEventListener("click", goBack);
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      setActivePage(tab.dataset.tab, { push: false, fromTab: true });
    });
  });

  document.querySelectorAll(".filter-bar").forEach((bar) => {
    bar.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      bar.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
    });
  });

  document.querySelectorAll(".seg").forEach((seg) => {
    seg.addEventListener("click", (e) => {
      const btn = e.target.closest(".seg-btn");
      if (!btn) return;
      seg.querySelectorAll(".seg-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  window.AppNav = { go: setActivePage, back: goBack };
})();
