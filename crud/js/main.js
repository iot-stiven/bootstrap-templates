const crudContainer = document.querySelector("#crud-container")
const tableHeaders = dataDescription.filter((data) => !!data.tableHeader)
let selectedId

window.addEventListener("load", async () => {
  //Esto no va, sólo simula el login
  await login()
  //--------------------------------
  //Aquí se obtienen los datos!
  const mainData = await fetchData("users")
  const secondaryData = await fetchData("roles")
  const tableData = joinData(mainData, secondaryData, "role_id", "id", "role")
  console.log(mainData)
  console.log(secondaryData)
  console.log(tableData)
  //--------------------------------


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
        .then(async (result) => {
          if (result.isConfirmed) {
            const data = setDataFromDOM("create")
            try {
              await crudCreate(data)
              swalWithBootstrapButtons.fire({
                title: "Usuario Creado!",
                text: "El Ususario ha sido creado con éxito",
                icon: "success",
                showConfirmButton: false
              })
              setTimeout(() => window.location.href = "index.html", 2000)
            } catch (error) {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: "Ha ocurrido un error, vuelve a intentarlo",
                icon: "error",
              })
            }
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
              () => setDOMFromData(tableData, "update"),
              100
            ),
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              const data = setDataFromDOM("update")
              try {
                crudUpdate(data, selectedId)
                swalWithBootstrapButtons.fire({
                  title: "Usuario Editado!",
                  text: "El Ususario ha sido editado con éxito",
                  icon: "success",
                  showConfirmButton: false
                })
                setTimeout(() => window.location.href = "index.html", 2000)
              } catch (error) {
                swalWithBootstrapButtons.fire({
                  title: "Error!",
                  text: "Ha ocurrido un error, vuelve a intentarlo",
                  icon: "error",
                })
              }
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
              try {
                crudDelete(selectedId)
                swalWithBootstrapButtons.fire({
                  title: "Usuario Eliminado!",
                  text: "El Ususario ha sido eliminado con éxito",
                  icon: "success",
                  showConfirmButton: false
                })
                setTimeout(() => window.location.href = "index.html", 2000)
              } catch (error) {
                swalWithBootstrapButtons.fire({
                  title: "Error!",
                  text: "Ha ocurrido un error, vuelve a intentarlo",
                  icon: "error",
                })
              }
            }
          })
      }
    )
  )
})

function setDataFromDOM(action) {
  let data = dataDescription.filter((element) => !!element.editable)
  data = data.map((element) => element.dataKey)
  const object = {}
  for (i in data) {
    const value = document.getElementById(`${action}-${data[i]}`).value
    object[data[i]] = parseInt(value) ? parseInt(value) : value
  }
  return object
}

function setDOMFromData(tableData, action) {
  const values = tableData.find((data) => data.id == selectedId)
  let data = dataDescription.filter((element) => !!element.editable)
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
