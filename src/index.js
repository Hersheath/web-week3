fetch("https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff")
  .then((response) => response.json())
  .then((data) => {
    // get the dataset of municipality and population
    const msDic = data.dataset.dimension.Alue.category.label;
    const ms = Object.values(msDic);
    const vs = data.dataset.value;

    const tB = document.getElementById("tbody");
    fetch(
      "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065"
    )
      .then((response) => response.json())
      .then((data) => {
        //get the dataset of employment
        const es = data.dataset.value;

        for (let i = 0; i < vs.length; i++) {
          const m = ms[i];
          const v = vs[i];
          const e = es[i];
          const ev = ((e / v) * 100).toFixed(2);
          // create row and cell
          const newrow = document.createElement("tr");
          const mcell = document.createElement("td");
          const vcell = document.createElement("td");
          const ecell = document.createElement("td");
          const evcell = document.createElement("td");
          // insert values
          mcell.textContent = m;
          vcell.textContent = v;
          ecell.textContent = e;
          evcell.textContent = ev + "%";
          // append elements to the table body
          newrow.appendChild(mcell);
          newrow.appendChild(vcell);
          newrow.appendChild(ecell);
          newrow.appendChild(evcell);

          if (ev > 45) {
            newrow.style.backgroundColor = "#abffbd";
          } else if (ev < 25) {
            newrow.style.backgroundColor = "#ff9e9e";
          }
          tB.appendChild(newrow);
        }
      });
  });
