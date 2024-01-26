const API_USERNAME = "Albeiro"
const API_PASSWORD = "123"
const API_ROOT_URL = "http://localhost:8000/api"

const crudTitle = "Administración de Usuarios"
const dataDescription = [
  {
    type: "number",
    tableHeader: "#",
    dataKey: "id",
    editable: false,
  },
  {
    type: "text",
    tableHeader: "Nombre",
    name: "Nombre",
    dataKey: "name",
    editable: true,
  },
  {
    type: "password",
    dataKey: "password",
    name: "Contraseña",
    editable: true,
  },
  {
    type: "select",
    tableHeader: "Rol",
    dataKey: "role",
    valueKey: "id",
    textKey: "name",
    subDataKey: "name",
    subDataId: "id",
    name: "Rol",
    editable: true,
  },
]

async function crudCreate(data){
  const dataForAction = {...data, role_id : data.role}
  delete dataForAction.role
  return await saveData("users", dataForAction)
}
function crudUpdate(data, id){

}
function crudDelete(id){

}

function joinData(mainData, secondaryData, mainKey, secondaryKey, subDataName) {
  const mainDataCopy = [...mainData]
  mainDataCopy.forEach((mainElement) => {
    const subData = secondaryData.find(
      (secondaryElement) =>
        secondaryElement[secondaryKey] == mainElement[mainKey]
    )
    if (!!subData) mainElement[subDataName] = subData
  })
  return mainDataCopy
}
