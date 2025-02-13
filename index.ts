import { webkit } from 'playwright'
import * as dotenv from 'dotenv';

  dotenv.config();

  const browser = await webkit.launch()
  const page = await browser.newPage()

  await page.goto('https://consbahiablanca.esteri.it/es/news/')

  const lastNew = await page.$eval('.card-body', (element) => {
    const title = element.querySelector('h5')?.textContent || 'Título no disponible';
    return  title ;
  });

  if (lastNew.includes("servicio")) {
    console.log('Se encontraron turnos disponibles')

    await fetch('https://api.mailjet.com/v3.1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${process.env.MJ_APIKEY_PUBLIC}:${process.env.MJ_APIKEY_PRIVATE}`).toString('base64')}`
        },
        body: JSON.stringify({
          Messages: [
            {
              From: {
                Email: "tobiasaispuro10@gmail.com",
                Name: "Tobias Aispuro"
              },
              To: [
                {
                  Email: "tobiasaispuro10@gmail.com",
                  Name: "Tobias Aispuro"
                }
              ],
              Subject: "Hay turnos disponibles en la embajada!",
              TextPart: "Esta habilitado la reservacion de turnos por reconstrucción",
              HTMLPart: "<h3>Esta habilitado la reservacion de turnos por reconstrucción</h3><br />May the delivery force be with you!"
            }
          ]
        })
      });
    };
 
  console.log(await lastNew)

  await browser.close()


