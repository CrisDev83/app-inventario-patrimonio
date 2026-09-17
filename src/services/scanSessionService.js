let leiturasAtivas = [];

export const scanSessionService = {
  adicionarLeitura: (codigo, encontrado = false, descricao = 'Sem descrição') => {
    if (codigo) {
      leiturasAtivas.push({ codigo, encontrado, descricao });
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