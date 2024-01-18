const crudContainer = document.querySelector("#crud-container")
const tableHeaders = dataDescription.filter((data) => !!data.tableHeader)
let selectedId

window.addEventListener("load", async () => {
  const mainData = users
  const secondaryData = roles
  const tableData = joinData(mainData, secondaryData, "role_id", "id", "role")



  const createForm = bsForm(dataDescription, "create", secondaryData)
  const updateForm = bsForm(dataDescription, "update", secondaryData)
  crudContainer.append(
    bsCrudTitle(crudTitle),
    bsButton("create-button", "Crear", "success", () => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success ms-2",
          cancelButton: "btn btn-secondary me-2",
        },
        buttonsStyling: false,
      })
      swalWithBootstrapButtons
        .fire({
          title: "Crear",
          html: createForm,
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            })
          }
        })
    }),
    bsTable(
      tableHeaders,
      tableData,
      (row) => {
        selectedId = row.id
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-warning ms-2",
            cancelButton: "btn btn-secondary me-2",
          },
          buttonsStyling: false,
        })
        swalWithBootstrapButtons
          .fire({
            title: "Editar",
            html: updateForm,
            didOpen: setTimeout(
              () => setDOMFromData(dataDescription, tableData, "update"),
              100
            ),
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              })
            }
          })
      },
      (row) => {
        selectedId = row.id
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-danger ms-2",
            cancelButton: "btn btn-secondary me-2",
          },
          buttonsStyling: false,
        })
        swalWithBootstrapButtons
          .fire({
            title: "Eliminar",
            text: `¿Está seguro que desea eliminar ${row.name ? row.name : 'el registro'}?`,
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              })
            }
          })
      }
    )
  )
})

function setDataFromDOM(dataHeaders, action) {
  let data = dataHeaders.filter((element) => !!element.editable)
  data = data.map((element) => element.dataKey)
  const object = {}
  for (i in data) {
    const value = document.getElementById(`${action}-${data[i]}`).value
    object[data[i]] = parseInt(value) ? parseInt(value) : value
  }
  return object
}

function setDOMFromData(dataHeaders, tableData, action) {
  const values = tableData.find((data) => data.id == selectedId)
  let data = dataHeaders.filter((element) => !!element.editable)
  for (i in data) {
    if (data[i].type == "select") {
      document.getElementById(`${action}-${data[i].dataKey}`).value =
        values[data[i].dataKey][data[i].subDataId]
    } else {
      document.getElementById(`${action}-${data[i].dataKey}`).value = !!values[
        data[i].dataKey
      ]
        ? values[data[i].dataKey]
        : ""
    }
  }
}
