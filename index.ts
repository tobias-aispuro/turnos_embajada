import { webkit } from 'playwright'
import * as dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const browser = await webkit.launch()
const page = await browser.newPage()

await page.goto('https://consbahiablanca.esteri.it/es/news/')

const lastNew = await page.$eval('.card-body', (element) => {
  const title = element.querySelector('h5')?.textContent || 'Título no disponible';
  return  title ;
});

if (lastNew.includes("reconstrucción")) {   
  console.log('Se encontraron turnos disponibles')
     
  const resend = new Resend(process.env.MJ_APIKEY_PRIVATE);
  resend.emails.send({
  from: 'onboarding@resend.dev',
  to: '',
  subject: 'HABILITICACIÓN DE TURNOS!',
  html: '<p>Se encuentran habilitados los turnos servicio ciudadanía por reconstrucción!</p>'
   
 });
};

await browser.close()


