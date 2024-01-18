const crudContainer = document.querySelector("#crud-container")
const tableHeaders = dataDescription.filter((data) => !!data.tableHeader)

window.addEventListener("load", async () => {
  const tableData = joinData(users, roles, "role_id", "id", "role")
  const mainData = users
  const secondaryData = roles







  const createForm = document.createElement("div");
  dataDescription.forEach(data => {
    if(!!data.editable){
      if(data.type != "select"){
        createForm.append(bsFormInput(`${data.dataKey}-input`, data.type, data.name ))
      } else {
        createForm.append(bsFormSelect(`${data.dataKey}-input`, secondaryData, data.valueKey, data.textKey, data.name))
      }
    }
  })

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
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelado!",
              text: "Se ha cancelado la acción",
              icon: "error",
            })
          }
        })
    }),
    bsTable(tableHeaders, tableData)
  )
})
