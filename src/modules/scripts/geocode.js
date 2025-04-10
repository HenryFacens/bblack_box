const axios = require('axios');

/**
 * Recebe a string ou array de coordenadas e retorna o endereço formatado.
 * Lança erro com mensagem apropriada se formato inválido ou falha na API.
 */
async function parseAndReverseGeocode(localizacaoReporteRaw) {
  let localizacaoReporte;

  // Validação e parsing
  try {
    if (typeof localizacaoReporteRaw === 'string') {
      if (localizacaoReporteRaw.includes(',')) {
        localizacaoReporte = localizacaoReporteRaw.split(',').map(coord => parseFloat(coord.trim()));
      } else {
        localizacaoReporte = JSON.parse(localizacaoReporteRaw);
      }
    } else {
      localizacaoReporte = localizacaoReporteRaw;
    }

    if (!Array.isArray(localizacaoReporte) || localizacaoReporte.length !== 2) {
      throw new Error();
    }
  } catch (err) {
    const error = new Error('Formato inválido para localizacaoReporte. Use [lat, long] ou "lat,long"');
    error.code = 400;
    throw error;
  }

  const [latitude, longitude] = localizacaoReporte;

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat: latitude,
        lon: longitude,
        format: 'json'
      },
      headers: {
        'User-Agent': 'blackbox-app/1.0 (eduwmaldaner@gmail.com)',
        'Accept-Language': 'pt-BR' // opcional, ajuda no retorno em português
      },
      timeout: 5000,
      // descomente abaixo se quiser forçar ignorar certificados (⚠️ não recomendado em produção)
      // httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
    });

    const data = response.data;
    const rua = data.address?.road || data.name || 'Endereço desconhecido';
    const cidade = data.address?.city || data.address?.town || data.address?.village || 'Cidade desconhecida';
    const estado = data.address?.state || 'Estado desconhecido';

    return {
      endereco: `${rua}, ${cidade}, ${estado}`,
      latitude,
      longitude
    };
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      console.error('Timeout na requisição de reverse geocoding.');
      throw new Error('Timeout na API de geocodificação');
    }

    console.error('Erro ao fazer reverse geocoding:', err.message || err);
    throw new Error('Falha ao converter coordenadas em endereço');
  }
}

module.exports = {
  parseAndReverseGeocode
};
