let leiturasAtivas = [];

export const scanSessionService = {
  // Verifica se o código já foi lido na sessão atual
  jaFoiLido: (codigo) => {
    if (!codigo) return false;
    const codigoBuscado = String(codigo).trim();
    return leiturasAtivas.some((item) => String(item.codigo).trim() === codigoBuscado);
  },

  adicionarLeitura: (codigo, encontrado = false, descricao = 'Sem descrição') => {
    if (codigo) {
      const codigoFormatado = String(codigo).trim();
      const jaExiste = leiturasAtivas.some((item) => String(item.codigo).trim() === codigoFormatado);

      // Só adiciona se ainda não existir na lista
      if (!jaExiste) {
        leiturasAtivas.push({ codigo: codigoFormatado, encontrado, descricao });
      }
    }
  },

  temLeituras: () => leiturasAtivas.length > 0,

  obterTotalLidos: () => leiturasAtivas.length,

  obterResumo: () => {
    const totalLidos = leiturasAtivas.length;
    const encontrados = leiturasAtivas.filter((i) => i.encontrado).length;
    const naoEncontrados = totalLidos - encontrados;

    return {
      totalLidos,
      encontrados,
      naoEncontrados,
      listaLidos: leiturasAtivas,
    };
  },

  resetarSessao: () => {
    leiturasAtivas = [];
  },
};

export default scanSessionService;