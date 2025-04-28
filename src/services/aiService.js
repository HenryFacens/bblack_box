const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function moderarTexto(texto) {
    try {                                                                                                                                   
      const response = await openai.moderations.create({ input: texto });
      // Verifique o retorno completo da resposta
      console.log(response);  // Log para ver como a estrutura está vindo
      if (response && response.results && response.results[0]) {
        return response.results[0];  // Retorne apenas o primeiro resultado
      } else {
        throw new Error("Resposta da moderação inválida");
      }
    } catch (error) {
      console.error("Erro ao moderar:", error);
      throw error;  // Propaga o erro para o controller
    }
}

module.exports = {
    moderarTexto
}