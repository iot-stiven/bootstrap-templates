function bsCrudTitle(titleText) {
  const title = document.createElement("h2")
  title.classList = "text-left text-secondary my-3"
  title.innerText = titleText
  return title
}

function bsButton(
  id,
  text = "Acción",
  bsColor = "primary",
  callback = () => {}
) {
  const button = document.createElement("button")
  button.className = `btn btn-${bsColor} mb-3`
  if (bsColor === "warning") button.classList.add("text-dark")
  button.id = id
  button.addEventListener("click", callback)
  button.innerText = text
  return button
}

function bsForm(dataHeaders, id, selectData = null) {
  const form = document.createElement("div");
  dataHeaders.forEach(async (header) => {
    if (!header.editable) return;
    if (header.type == "select") {
      form.append(
        bsFormSelect(
          `${id}-${header.dataKey}`,
          selectData,
          header.subDataId,
          header.subDataKey,
          header.name
        )
      );
    } else {
      form.append(
        bsFormInput(
          `${id}-${header.dataKey}`,
          header.type,
          header.name
        )
      );
    }
  });
  return form;
}

function bsFormInput(id, inputType, labelText = "", placeholder = "") {
  const inputContainer = document.createElement("div");
  inputContainer.className = "mb-3 text-start";

  const inputLabel = document.createElement("label");
  inputLabel.setAttribute("for", id);
  inputLabel.className = "form-label";
  inputLabel.innerText = labelText;

  const input = document.createElement("input");
  input.className = "form-control";
  input.type = inputType;
  input.placeholder = placeholder;
  input.autocomplete = false;
  input.id = id;

  inputContainer.append(inputLabel, input);
  return inputContainer;
}

function bsFormSelect(
  id,
  selectOptions,
  valueKey,
  textKey,
  labelText = ""
) {
  const selectContainer = document.createElement("div");
  selectContainer.className = "mb-3 text-start";

  const selectLabel = document.createElement("label");
  selectLabel.className = "form-label";
  selectLabel.setAttribute("for", id);
  selectLabel.innerText = labelText;

  const select = document.createElement("select");
  select.className = "form-select";
  select.id = id;
  selectOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option[valueKey];
    optionElement.innerText = option[textKey];
    select.append(optionElement);
  });

  selectContainer.append(selectLabel, select);
  return selectContainer;
}

function bsTable(
  tableHeaders,
  tableData,
  updateButtonCb = () => {},
  deleteButtonCb = () => {}
) {
  const table = document.createElement("table")
  table.className = "table table-striped"

  const tHead = document.createElement("thead")
  tHead.className = "table-dark"

  const trHeader = document.createElement("tr")
  tableHeaders.forEach((header) => {
    const thHeader = document.createElement("th")
    thHeader.innerText = header.tableHeader
    trHeader.append(thHeader)
  })
  const thUpdate = document.createElement("th")
  const thDelete = document.createElement("th")
  trHeader.append(thUpdate, thDelete)
  tHead.append(trHeader)

  const tBody = document.createElement("tbody")
  const headKeys = tableHeaders.map((header) => {
    const dataKey = header.dataKey
    const subDataKey = header.subDataKey
    if (subDataKey) return { dataKey, subDataKey }
    else return dataKey
  })
  let counter = 0
  tableData.forEach((row) => {
    const trBody = document.createElement("tr")
    for (let i in headKeys) {
      const tdBody = document.createElement("td")
      if (i == 0) tdBody.innerText = ++counter
      else {
        if (typeof headKeys[i] == "object") {
          try {
            tdBody.innerText = row[headKeys[i].dataKey][headKeys[i].subDataKey]
          } catch (err) {
            --counter
            return
          }
        } else {
          tdBody.innerText = row[headKeys[i]]
        }
      }
      trBody.append(tdBody)
    }

    const tdUpdate = document.createElement("td")
    const updateButton = bsButton("update-button", "Editar", "warning", () =>
      updateButtonCb(row)
    )
    tdUpdate.append(updateButton)

    const tdDelete = document.createElement("td")
    const deleteButton = bsButton("delete-button", "Eliminar", "danger", () =>
      deleteButtonCb(row)
    )
    tdDelete.append(deleteButton)

    trBody.append(tdUpdate, tdDelete)
    tBody.append(trBody)
  })

  table.append(tHead, tBody)
  table.append(tHead)
  return table
}
