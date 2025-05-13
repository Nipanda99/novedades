import { handler } from '../lambdas/post_popup_by_commerce';

handler({
  body: JSON.stringify({
    module: 'popup',
    startDate_index: 5,
    title: 'Nueva promoción',
    description: 'Descuento exclusivo por tiempo limitado',
    commerce_id: 'com-999',
    endDate: '2025-06-15'
  })
} as any).then((response: any) => {
  console.log('📦 Respuesta Lambda POST popup_by_commerces:');
  console.log(JSON.stringify(response, null, 2));
});
