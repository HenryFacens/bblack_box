const { Reporte } = require('../../models');

exports.getReportesCoords = async (req, res) => {
  try {
    const reportes = await Reporte.findAll({
      attributes: ['id', 'descricaoReporte', 'localizacaoReporte']
    });

    const coords = reportes
      .map(r => {
        let lat, lng;
        if (typeof r.localizacaoReporte === 'string') {
          // Espera formato "-23.51946, -47.46121"
          const parts = r.localizacaoReporte.split(',');
          if (parts.length === 2) {
            lat = parseFloat(parts[0].trim());
            lng = parseFloat(parts[1].trim());
          }
        } else if (typeof r.localizacaoReporte === 'object' && r.localizacaoReporte !== null) {
          lat = r.localizacaoReporte.latitude;
          lng = r.localizacaoReporte.longitude;
        }
        if (
          typeof lat === 'number' &&
          typeof lng === 'number' &&
          !isNaN(lat) &&
          !isNaN(lng)
        ) {
          return {
            id: r.id,
            descricao: r.descricaoReporte,
            latitude: lat,
            longitude: lng
          };
        }
        return null;
      })
      .filter(Boolean);

    return res.status(200).json({ data: coords });
  } catch (error) {
    console.error('Erro ao listar coordenadas dos reportes:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};