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

  if (lastNew.includes("Reconstrucción")) {
    console.log('Se encontraron turnos disponibles')

    const sendEmail = async () => {
      const response = await fetch('https://api.mailjet.com/v3.1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${process.env.MJ_APIKEY_PUBLIC}:${process.env.MJ_APIKEY_PRIVATE}`).toString('base64')}`
        },
        body: JSON.stringify({
          Messages: [
            {
              From: {
                Email: process.env.SENDER_EMAIL,
                Name: "Me"
              },
              To: [
                {
                  Email: process.env.RECIPIENT_EMAIL,
                  Name: "You"
                }
              ],
              Subject: "My first Mailjet Email!",
              TextPart: "Greetings from Mailjet!",
              HTMLPart: "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
            }
          ]
        })
      });
    
      const data = await response.json();
      console.log(data);
    };
  }
 
  console.log(await lastNew)

  await browser.close()


