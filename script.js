// Modo claro / escuro (escuro é o padrão; a escolha fica salva no navegador)
(function () {
  const botao = document.getElementById("tema");
  const icone = botao ? botao.querySelector("i") : null;

  const aplicar = (tema) => {
    document.documentElement.dataset.theme = tema;
    if (icone) icone.className = tema === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  };

  let salvo = null;
  try { salvo = localStorage.getItem("tema"); } catch (e) { /* armazenamento indisponível */ }
  aplicar(salvo === "light" ? "light" : "dark");

  if (botao) {
    botao.addEventListener("click", () => {
      const novo = document.documentElement.dataset.theme === "light" ? "dark" : "light";
      aplicar(novo);
      try { localStorage.setItem("tema", novo); } catch (e) { /* ignora */ }
    });
  }
})();

// Projetos: abrem o site do projeto em nova aba; sem link, abrem a janela de detalhes
(function () {
  const modal = document.getElementById("modal");
  const title = document.getElementById("modal-title");
  const text = document.getElementById("modal-text");
  const status = document.getElementById("modal-status");
  const tags = document.getElementById("modal-tags");

  document.querySelectorAll(".tile[data-title]").forEach((tile) => {
    const link = tile.dataset.link;

    if (link) {
      // Indicador visual de que o projeto abre um site
      const go = document.createElement("i");
      go.className = "fa-solid fa-arrow-up-right-from-square tile-go";
      go.setAttribute("aria-hidden", "true");
      tile.appendChild(go);
    }

    tile.addEventListener("click", () => {
      if (link) {
        window.open(link, "_blank", "noopener");
        return;
      }
      if (!modal) return;
      title.textContent = tile.dataset.title;
      text.textContent = tile.dataset.text || "";
      status.textContent = tile.dataset.status || "";
      tags.innerHTML = "";
      (tile.dataset.tags || "").split(",").forEach((t) => {
        const span = document.createElement("span");
        span.textContent = t.trim();
        tags.appendChild(span);
      });
      modal.showModal();
    });
  });

  if (modal) {
    document.getElementById("modal-close").addEventListener("click", () => modal.close());
    document.getElementById("modal-x").addEventListener("click", () => modal.close());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });
  }
})();
