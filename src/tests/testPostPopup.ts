import { handler } from '../lambdas/post_popup';
 // usa "src" y "lambdas" en minúscula

handler({
  body: JSON.stringify({
    module: "popup",
    startDate_index: 4,
    title: "¡Atención!",
    description: "Actualización del sistema",
    commerce_id: "com-001",
    endDate: "2025-06-01"
  })
} as any).then((response) => {
  console.log("📨 Respuesta Lambda POST popup:");
  console.log(JSON.stringify(response, null, 2));
});
