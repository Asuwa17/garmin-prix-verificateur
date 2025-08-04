import fetch from 'node-fetch';

export default async function handler(req, res) {
  const seuil = 1100;
  const url = 'https://api.allorigins.win/raw?url=https://www.bestbuy.ca/en-ca/product/garmin-fenix-7-pro-sapphire-solar-gps-smartwatch-47-mm-carbon-gray-titanium/17108629';

  try {
    const r = await fetch(url);
    const html = await r.text();
    const match = html.match(/"currentPrice":([0-9]+\.[0-9]+)/);
    if (match) {
      const price = parseFloat(match[1]);
      if (price <= seuil) {
        return res.status(200).json([
          {
            name: 'Fenix 7 Pro Sapphire Solar (47 mm)',
            price,
            link: 'https://www.bestbuy.ca/en-ca/product/17108629'
          }
        ]);
      }
    }
    return res.status(200).json([]);
  } catch (e) {
    console.error('Erreur récupération prix:', e);
    return res.status(500).json({ error: 'Erreur de récupération.' });
  }
}
