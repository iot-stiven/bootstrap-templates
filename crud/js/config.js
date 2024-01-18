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
    name: "Rol",
    editable: true,
  },
]

//Test data
const users = [
  {
    id: 1,
    role_id: 1,
    name: "Usuario 1",
  },
  {
    id: 2,
    role_id: 2,
    name: "Usuario 2",
  },
  {
    id: 3,
    role_id: 2,
    name: "Usuario 3",
  },
  {
    id: 4,
    role_id: 2,
    name: "Usuario 4",
  },
  {
    id: 5,
    role_id: 2,
    name: "Usuario 5",
  },
  {
    id: 6,
    role_id: 2,
    name: "Usuario 6",
  },
]

const roles = [
  {
    id: 1,
    name: "Administrador",
  },
  {
    id: 2,
    name: "Recepcionista",
  },
]

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
