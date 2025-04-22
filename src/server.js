const app = require('./app');
const os = require('os');
const PORT = process.env.PORT || 3000;

const getLocalIPs = () => {
  const interfaces = os.networkInterfaces();
  const ips = [];

  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push({ name, ip: iface.address });
      }
    }
  }

  return ips;
};

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n Servidor rodando com sucesso!`);
  console.log(` Local:  http://localhost:${PORT}`);

  const ips = getLocalIPs();
  if (ips.length > 0) {
    console.log(' Endereços disponíveis na rede local:');
    ips.forEach(({ name, ip }) => {
      console.log(`  - ${name}: http://${ip}:${PORT}`);
    });
    console.log(`\n Use o IP correspondente à sua rede Wi-Fi ou Ethernet no .env do app mobile.`);
  } else {
    console.log(' Nenhum IP externo encontrado. Verifique sua rede.');
  }
});
