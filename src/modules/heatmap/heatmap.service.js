const { Reporte } = require('../../models');

class HeatmapService {
    async getReportesCoords() {
        const reportes = await Reporte.findAll({
            attributes: ['id', 'descricaoReporte', 'localizacaoReporte']
        });

        return reportes
            .map(r => {
                let lat, lng;
                if (typeof r.localizacaoReporte === 'string') {
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
    }
}

module.exports = HeatmapService;