import { handler } from "./insertInformationLambda";

handler({
  body: JSON.stringify({
    module: "noticia",
    startDate_index: 3,
    title: "Novedad 4",
    description: "Se actualizó el sistema",
    commerce_id: "com-123"
  })
}).then(console.log).catch(console.error);
