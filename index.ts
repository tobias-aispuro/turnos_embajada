import { webkit } from 'playwright'


  const browser = await webkit.launch()
  const page = await browser.newPage()

  await page.goto('https://consbahiablanca.esteri.it/es/news/')

//   const latestTitle = page.getByRole('heading', { name: 'IMPORTANTE: gratuidad del' })
//   const turnos = page.getByRole('link', { name: 'Apertura turnos Servicio' })

  const lastNew = await page.$eval('.card-body', (element) => {
    const title = element.querySelector('h5')?.textContent || 'Título no disponible';
    return { title };
  });
 
  console.log(await lastNew)

  await browser.close()


